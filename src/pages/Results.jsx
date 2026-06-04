import { useLocation, useNavigate } from "react-router-dom";
import { CATEGORIES } from "../assets/mockData";
import GradientButton from "../components/ui/GradientButton";
import ProgressRing from "../components/ui/ProgressRing";

const PERF = (pct) => pct >= 90 ? ["Legendary 🌟","#f5a623"] : pct >= 70 ? ["Excellent 🎯","#7c6bfa"] : pct >= 50 ? ["Good Job! 💪","#10d9a0"] : ["Keep Trying 📚","#4f9eff"];

export default function Results() {
  const { state } = useLocation();
  const nav = useNavigate();
  if (!state) { nav("/categories"); return null; }
  const { score, total, answers, questions, cat: catId } = state;
  const cat = CATEGORIES[catId];
  const pct = Math.round((score / total) * 100);
  const [perfLabel, perfColor] = PERF(pct);
  const wrong = total - score;
  const r = 70; const circ = 2 * Math.PI * r;

  return (
    <div className="py-8 max-w-2xl mx-auto">
      {/* Score hero */}
      <div className="text-center mb-8 anim-scale-in">
        <div className="relative w-40 h-40 mx-auto mb-5">
          <svg width="160" height="160" viewBox="0 0 160 160" className="absolute inset-0">
            <circle cx="80" cy="80" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="10" />
            <circle cx="80" cy="80" r={r} fill="none" stroke={perfColor} strokeWidth="10"
              strokeDasharray={circ} strokeDashoffset={circ - circ * (pct / 100)}
              strokeLinecap="round" transform="rotate(-90 80 80)"
              style={{ transition: "stroke-dashoffset 1.5s cubic-bezier(.34,1.1,.64,1)" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-display font-black text-4xl" style={{ color: perfColor }}>{pct}%</span>
            <span className="text-white/40 text-xs font-bold">Score</span>
          </div>
        </div>
        <div className="inline-block px-5 py-2 rounded-full font-display font-bold text-base mb-2 border"
          style={{ background: `${perfColor}18`, color: perfColor, borderColor: `${perfColor}40` }}>
          {perfLabel}
        </div>
        <p className="text-white/50 text-sm">{cat?.icon} {cat?.name} · {score}/{total} correct</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6 anim-fade-up delay-1">
        {[["Correct", score, "#10d9a0"],["Incorrect", wrong, "#ff4f6d"],["Accuracy", `${pct}%`, "#7c6bfa"]].map(([l,v,c]) => (
          <div key={l} className="glass border border-white/[0.08] rounded-2xl p-4 text-center">
            <div className="font-display font-black text-2xl" style={{ color: c }}>{v}</div>
            <div className="text-white/40 text-xs mt-0.5">{l}</div>
          </div>
        ))}
      </div>

      {/* Review */}
      <div className="glass border border-white/[0.08] rounded-3xl p-6 mb-6 anim-fade-up delay-2">
        <h3 className="font-display font-bold text-base mb-4">📋 Question Review</h3>
        <div className="flex flex-col gap-2.5 max-h-72 overflow-y-auto pr-1">
          {answers.map((ans, i) => {
            const q = questions[ans.qi];
            return (
              <div key={i} className={`flex gap-3 items-start p-3 rounded-xl border ${ans.correct ? "border-emerald-500/20 bg-emerald-500/[0.05]" : "border-red-400/15 bg-red-400/[0.04]"}`}>
                <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${ans.correct ? "bg-emerald-400" : "bg-red-400"}`} />
                <div>
                  <p className="text-white/80 text-sm mb-1">Q{i+1}: {q?.q}</p>
                  <p className="text-xs">
                    {ans.correct
                      ? <span className="text-emerald-400">✓ {q?.opts[q?.a]}</span>
                      : <><span className="text-red-400">✗ {ans.selected === -1 ? "Time's Up" : q?.opts[ans.selected]}</span><span className="text-white/30"> → </span><span className="text-emerald-400">✓ {q?.opts[q?.a]}</span></>
                    }
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-3 anim-fade-up delay-3">
        <GradientButton size="md" className="w-full" onClick={() => nav("/categories")}>🔄 Play Again</GradientButton>
        <button onClick={() => nav("/leaderboard")} className="w-full px-5 py-3 rounded-xl glass border border-white/10 text-white/70 hover:text-white text-sm font-bold transition-all">
          🏆 Leaderboard
        </button>
      </div>
    </div>
  );
}
