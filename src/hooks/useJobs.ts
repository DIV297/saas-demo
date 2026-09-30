"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api-client";
import { queryKeys } from "@/lib/query-keys";
import type { JobWithRelations } from "@/types";

/** All work orders. `initialJobs` comes from the server render, so there's no loading flash. */
export function useJobs(initialJobs?: JobWithRelations[]) {
  return useQuery({
    queryKey: queryKeys.jobs,
    queryFn: api.getJobs,
    initialData: initialJobs,
  });
}

/**
 * Book a new job. On success, refresh cached jobs + KPIs, and re-render
 * server components (the week calendar reads jobs on the server).
 */
export function useCreateJob() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: api.createJob,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.jobs });
      queryClient.invalidateQueries({ queryKey: queryKeys.stats });
      router.refresh();
    },
  });
}

/** Change a job's status with an optimistic update and automatic rollback on failure. */
export function useUpdateJobStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.updateJobStatus,

    onMutate: async ({ id, status }) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.jobs });
      const previous = queryClient.getQueryData<JobWithRelations[]>(queryKeys.jobs);
      queryClient.setQueryData<JobWithRelations[]>(queryKeys.jobs, (jobs) =>
        jobs?.map((j) => (j.id === id ? { ...j, status } : j)),
      );
      return { previous };
    },

    onError: (_error, _vars, context) => {
      queryClient.setQueryData(queryKeys.jobs, context?.previous);
    },

    // Status changes affect KPIs too (active jobs, revenue), so refresh both.
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.jobs });
      queryClient.invalidateQueries({ queryKey: queryKeys.stats });
    },
  });
}
