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

/** After a booking changes: refresh cached jobs + KPIs and re-render server components (the calendar reads jobs on the server). */
function useRefreshSchedule() {
  const queryClient = useQueryClient();
  const router = useRouter();
  return () => {
    queryClient.invalidateQueries({ queryKey: queryKeys.jobs });
    queryClient.invalidateQueries({ queryKey: queryKeys.stats });
    router.refresh();
  };
}

/** Book a new job. */
export function useCreateJob() {
  const refresh = useRefreshSchedule();
  return useMutation({ mutationFn: api.createJob, onSuccess: refresh });
}

/** Edit, reschedule or cancel a booking (cancelling keeps the job with status "cancelled"). */
export function useUpdateJob() {
  const refresh = useRefreshSchedule();
  return useMutation({ mutationFn: api.updateJob, onSuccess: refresh });
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
