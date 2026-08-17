import { project } from "@/lib/project";
import { cx } from "@/lib/cx";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cx("h-6 w-6", className)} aria-hidden>
      <path d="M7.5 3.5 L13.5 12 L7.5 20.5 L1.5 12 Z" fill="#65E65F" />
      <path
        d="M16.5 3.5 L22.5 12 L16.5 20.5 L10.5 12 Z"
        fill="#65E65F"
        opacity="0.45"
      />
    </svg>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cx("inline-flex items-center gap-2", className)}>
      <LogoMark />
      <span className="text-[15px] font-semibold tracking-tight">
        {project.name}
      </span>
    </span>
  );
}
