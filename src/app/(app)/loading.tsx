import { appendClass, eyebrow } from "@/styles/classes";

export default function Loading() {
  return <p className={appendClass(eyebrow, "p-2")}>Loading…</p>;
}
