const LABELS = ["A", "B", "C", "D"];

export default function QuizOption({ text, index, state = "idle", onClick, delay = 0 }) {
  const states = {
    idle: "border-white/10 bg-white/[0.04] hover:border-white/25 hover:bg-white/[0.08] hover:translate-x-1 cursor-pointer",
    selected: "border-violet-500 bg-violet-500/15 cursor-pointer",
    correct: "border-emerald-400 bg-emerald-400/10 cursor-default",
    wrong: "border-red-400 bg-red-400/[0.08] opacity-70 cursor-default",
    disabled: "border-white/10 bg-white/[0.04] cursor-default opacity-60",
  };
  const labelStates = {
    idle: "bg-white/[0.07] border-white/10 text-white/50",
    selected: "bg-violet-500 border-violet-500 text-white",
    correct: "bg-emerald-400 border-emerald-400 text-black",
    wrong: "bg-red-400 border-red-400 text-white",
    disabled: "bg-white/[0.07] border-white/10 text-white/30",
  };
  const icon = state === "correct" ? "✓" : state === "wrong" ? "✗" : null;

  return (
    <div
      onClick={state === "idle" || state === "selected" ? onClick : undefined}
      className={`flex items-center gap-4 px-5 py-4 rounded-2xl border transition-all duration-200 anim-fade-up ${states[state]}`}
      style={{ animationDelay: `${delay}s` }}
    >
      <div className={`w-9 h-9 rounded-xl border flex items-center justify-center font-display font-bold text-sm flex-shrink-0 transition-all duration-200 ${labelStates[state]}`}>
        {LABELS[index]}
      </div>
      <span className={`flex-1 text-sm ${state === "correct" ? "text-emerald-300 font-semibold" : state === "wrong" ? "text-red-300" : "text-white/90"}`}>
        {text}
      </span>
      {icon && (
        <span className={`text-lg font-bold ${state === "correct" ? "text-emerald-400" : "text-red-400"}`}>{icon}</span>
      )}
    </div>
  );
}
