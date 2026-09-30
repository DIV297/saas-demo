"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api-client";

export function useLogin() {
  const router = useRouter();

  return useMutation({
    mutationFn: api.login,
    onSuccess: () => {
      router.replace("/dashboard");
      router.refresh();
    },
  });
}

export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.logout,
    onSuccess: () => {
      queryClient.clear(); // drop cached data from the signed-out session
      router.replace("/login");
      router.refresh();
    },
  });
}
