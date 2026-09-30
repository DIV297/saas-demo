/** Case-insensitive "does any field contain the query" (an empty query matches everything). */
export function matchesQuery(fields: (string | undefined)[], query: string): boolean {
  const q = query.trim().toLowerCase();
  return !q || fields.some((field) => field?.toLowerCase().includes(q));
}
