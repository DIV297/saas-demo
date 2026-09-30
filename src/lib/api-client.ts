import type { Customer, CustomerFilters, DashboardStats, JobStatus, JobWithRelations } from "@/types";
import type { CreateJobInput, UpdateJobInput } from "./schemas";

/** Build "?a=1&b=2", skipping empty values. */
function toQueryString(params: Record<string, string | undefined>): string {
  const search = new URLSearchParams(Object.entries(params).filter((entry): entry is [string, string] => !!entry[1]));
  const qs = search.toString();
  return qs ? `?${qs}` : "";
}

/** All API endpoints in one place. Hooks call these; components never call fetch directly. */
const endpoints = {
  login: "/api/auth/login",
  logout: "/api/auth/logout",
  stats: "/api/stats",
  jobs: "/api/jobs",
  job: (id: string) => `/api/jobs/${id}`,
  customers: (filters: CustomerFilters = {}) => `/api/customers${toQueryString({ ...filters })}`,
};

class ApiError extends Error {
  constructor(message: string, public status: number) {
    super(message);
  }
}

/** Typed fetch wrapper: unwraps `{ data }` and turns error responses into ApiError. */
async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...init,
    headers: { "Content-Type": "application/json", ...init?.headers },
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    const fallback = res.status >= 500 ? `Server error (${res.status}). Please try again.` : `Request failed (${res.status})`;
    throw new ApiError(body.error ?? fallback, res.status);
  }
  return (body.data ?? body) as T;
}

export const api = {
  login: (credentials: { email: string; password: string }) =>
    request<{ ok: true }>(endpoints.login, { method: "POST", body: JSON.stringify(credentials) }),

  logout: () => request<{ ok: true }>(endpoints.logout, { method: "POST" }),

  getStats: () => request<DashboardStats>(endpoints.stats),

  getJobs: () => request<JobWithRelations[]>(endpoints.jobs),

  getCustomers: (filters?: CustomerFilters) => request<Customer[]>(endpoints.customers(filters)),

  createJob: (input: CreateJobInput) =>
    request<JobWithRelations>(endpoints.jobs, { method: "POST", body: JSON.stringify(input) }),

  /** Reschedule, reassign, edit or cancel (status "cancelled") a job. */
  updateJob: ({ id, ...patch }: { id: string } & UpdateJobInput) =>
    request<JobWithRelations>(endpoints.job(id), { method: "PATCH", body: JSON.stringify(patch) }),

  updateJobStatus: ({ id, status }: { id: string; status: JobStatus }) => api.updateJob({ id, status }),
};
