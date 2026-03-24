export function AnimatedBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -left-24 top-12 h-72 w-72 rounded-full bg-brand-500/22 blur-3xl animate-float-slow" />
      <div className="absolute right-[-7rem] top-1/4 h-96 w-96 rounded-full bg-brand-700/25 blur-3xl animate-float-medium" />
      <div className="absolute bottom-[-9rem] left-1/3 h-[28rem] w-[28rem] rounded-full bg-brand-200/10 blur-3xl animate-float-fast" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(176,228,204,0.08),transparent_36%),radial-gradient(circle_at_78%_25%,_rgba(64,138,113,0.12),transparent_35%)]" />
      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(176,228,204,0.05)_0.0625rem,transparent_0.0625rem),linear-gradient(90deg,rgba(176,228,204,0.05)_0.0625rem,transparent_0.0625rem)] [background-size:4.5rem_4.5rem]" />

      <div className="absolute inset-0 opacity-55">
        <div className="animate-geo-spin absolute left-[8%] top-[18%] h-20 w-20 border border-brand-200/25 bg-brand-200/5" />
        <div className="animate-geo-drift absolute right-[16%] top-[28%] h-16 w-16 rotate-45 border border-brand-500/35 bg-brand-500/10" />
        <div className="animate-geo-pulse absolute left-[55%] top-[65%] h-24 w-24 border border-brand-200/20 [clip-path:polygon(50%_0%,95%_25%,95%_75%,50%_100%,5%_75%,5%_25%)]" />
        <div className="animate-geo-spin-reverse absolute left-[25%] bottom-[14%] h-14 w-14 border border-brand-500/35" />
        <div className="animate-geo-drift absolute right-[35%] bottom-[20%] h-10 w-28 border border-brand-200/20 bg-brand-700/10" />
      </div>
    </div>
  );
}
