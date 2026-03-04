export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-accent-purple/30 bg-accent-purple/10 animate-pulse">
          <span className="text-xl font-bold text-accent-purple font-mono">
            PDJ
          </span>
        </div>
        <div className="h-0.5 w-12 rounded-full bg-synthwave animate-pulse" />
      </div>
    </div>
  );
}
