import type { ButtonHTMLAttributes } from "react";
import { cx } from "@/lib/cx";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "tertiary" | "destructive" | "outline";
  size?: "sm" | "md" | "lg";
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cx(
        "inline-flex items-center justify-center gap-2 font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-40",
        size === "sm" && "h-8 rounded-md px-3 text-[13px]",
        size === "md" && "h-10 rounded-md px-4 text-sm",
        size === "lg" && "h-11 rounded-md px-5 text-sm",
        variant === "primary" &&
          "bg-forge-green text-bg hover:bg-forge-green-bright",
        variant === "secondary" &&
          "border border-border bg-surface-2 text-text-primary hover:bg-surface-3",
        variant === "outline" &&
          "border border-forge-green bg-transparent text-forge-green hover:bg-forge-green-muted/40",
        variant === "tertiary" &&
          "bg-transparent px-0 text-text-secondary hover:text-text-primary",
        variant === "destructive" &&
          "border border-error/40 bg-[#2a1414] text-error hover:bg-[#3a1818]",
        className,
      )}
      {...props}
    />
  );
}
