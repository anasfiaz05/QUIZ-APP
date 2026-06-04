import { useEffect, useRef } from "react";
import QuizOption from "./QuizOption";
import Timer from "../ui/Timer";
import GlassCard from "../ui/GlassCard";

export default function QuestionCard({ question, index, total, selected, revealed, timer, cat, onSelect }) {
  const cardRef = useRef(null);
  useEffect(() => {
    if (cardRef.current) {
      cardRef.current.style.animation = "none";
      requestAnimationFrame(() => {
        cardRef.current.style.animation = "";
      });
    }
  }, [index]);

  const getState = (i) => {
    if (!revealed) return selected === i ? "selected" : "idle";
    if (i === question.a) return "correct";
    if (i === selected) return "wrong";
    return "disabled";
  };

  return (
    <GlassCard className="p-6 sm:p-8 anim-scale-in" style={{ animationDuration: "0.35s" }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold uppercase tracking-widest text-white/40">Question</span>
            <span className="font-display font-black text-lg text-white">{index + 1}</span>
            <span className="text-white/30 text-sm">/ {total}</span>
          </div>
          <div className="h-1.5 rounded-full bg-white/10 overflow-hidden" style={{ width: "140px" }}>
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${((index + 1) / total) * 100}%`, background: cat.color }}
            />
          </div>
        </div>
        <Timer time={timer} total={50} />
      </div>

      {/* Category badge */}
      <div
        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-5 border"
        style={{ background: `${cat.color}18`, color: cat.color, borderColor: `${cat.color}40` }}
      >
        {cat.icon} {cat.name}
      </div>

      {/* Question */}
      <p className="font-display font-bold text-xl sm:text-2xl leading-snug text-white mb-7">{question.q}</p>

      {/* Options */}
      <div className="flex flex-col gap-3">
        {question.opts.map((opt, i) => (
          <QuizOption
            key={i}
            text={opt}
            index={i}
            state={getState(i)}
            onClick={() => onSelect(i)}
            delay={i * 0.06}
          />
        ))}
      </div>
    </GlassCard>
  );
}
