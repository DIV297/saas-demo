import Link from "next/link";
import { appendClass, eyebrow, flexCol, fullScreenCenter, linkAccent, pageTitle } from "@/styles/classes";

export default function NotFound() {
  return (
    <main className={fullScreenCenter}>
      <div className={appendClass(flexCol, "items-center gap-3")}>
        <p className={eyebrow}>404</p>
        <h1 className={pageTitle}>That page isn&apos;t on the schedule.</h1>
        <Link href="/dashboard" className={linkAccent}>
          Back to overview
        </Link>
      </div>
    </main>
  );
}
