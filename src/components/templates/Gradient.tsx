"use client";

const SynthwaveGradient = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Top-right purple glow */}
      <div
        className="absolute -top-40 -right-40 h-96 w-96 rounded-full opacity-20 blur-[120px]"
        style={{ background: "#7C3AED" }}
      />
      {/* Bottom-left magenta glow */}
      <div
        className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full opacity-15 blur-[120px]"
        style={{ background: "#E040FB" }}
      />
      {/* Center-right cyan glow */}
      <div
        className="absolute top-1/2 -right-20 h-72 w-72 -translate-y-1/2 rounded-full opacity-10 blur-[100px]"
        style={{ background: "#22D3EE" }}
      />
    </div>
  );
};

export default SynthwaveGradient;
