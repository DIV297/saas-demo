import type { LucideIcon } from "lucide-react";
import { initials } from "@/lib/format";
import { appendClass } from "@/styles/classes";
import { avatarStyles as s } from "./styles";

interface AvatarProps {
  /** Shown as initials when no icon is given; always used as the accessible label. */
  name: string;
  icon?: LucideIcon;
  size?: keyof typeof s.size;
  tone?: keyof typeof s.tone;
}

export function Avatar({ name, icon: Icon, size = "md", tone = "paper" }: AvatarProps) {
  return (
    <span className={appendClass(s.base, s.size[size], s.tone[tone])} role="img" aria-label={name}>
      {Icon ? <Icon size={s.iconSize[size]} strokeWidth={1.9} aria-hidden /> : initials(name)}
    </span>
  );
}
