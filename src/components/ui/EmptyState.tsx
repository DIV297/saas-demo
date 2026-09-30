import { emptyStateStyles as s } from "./styles";

export function EmptyState({ title, hint }: { title: string; hint?: string }) {
  return (
    <div className={s.root}>
      <p className={s.title}>{title}</p>
      {hint && <p className={s.hint}>{hint}</p>}
    </div>
  );
}
