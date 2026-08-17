import { cx } from "@/lib/cx";

export function ProjectVideo({
  src,
  className,
  rounded = "rounded-lg",
}: {
  src: string;
  className?: string;
  rounded?: string;
}) {
  return (
    <div className={cx("relative overflow-hidden bg-surface-2", rounded, className)}>
      <video
        src={src}
        className="h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />
    </div>
  );
}
