export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`font-serif tracking-tight select-none leading-none ${className}`}>
      <span className="text-foreground">Fit</span>
      <span className="text-primary">Me</span>
    </span>
  );
}
