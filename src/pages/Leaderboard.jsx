import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { CATEGORIES } from "../assets/mockData";

function getInitials(name) { return name?.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2) || "?"; }
function avatarColor(name) {
  const c = ["#7c6bfa","#10d9a0","#ff4f6d","#4f9eff","#f5a623","#a855f7"];
  return c[(name?.charCodeAt(0) || 0) % c.length];
}
const BADGE = (pct) => pct >= 90 ? ["Legendary","#f5a623"] : pct >= 70 ? ["Expert","#7c6bfa"] : pct >= 50 ? ["Pro","#10d9a0"] : ["Learner","#4f9eff"];

export default function Leaderboard() {
  const { leaderboard, user } = useContext(AppContext);
  const [filter, setFilter] = useState("all");
  const sorted = [...leaderboard].sort((a, b) => b.pct - a.pct || b.score - a.score);
  const filtered = filter === "all" ? sorted : sorted.filter(e => e.cat === filter);
  const top3 = filtered.slice(0, 3);
  const rest = filtered.slice(3);
  const filters = ["all", ...Object.keys(CATEGORIES)];

  return (
    <div className="py-8 max-w-2xl mx-auto">
      <h1 className="font-display font-black text-3xl mb-1 anim-fade-up">🏆 <span className="grad-text">Leaderboard</span></h1>
      <p className="text-white/40 text-sm mb-6 anim-fade-up delay-1">Top performers across all categories</p>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap mb-6 anim-fade-up delay-2">
        {filters.map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${filter === f ? "bg-violet-500 border-violet-500 text-white" : "glass border-white/10 text-white/50 hover:text-white"}`}>
            {f === "all" ? "All" : CATEGORIES[f]?.icon + " " + CATEGORIES[f]?.name}
          </button>
        ))}
      </div>

      {/* Podium */}
      {top3.length >= 2 && (
        <div className="grid grid-cols-3 gap-3 mb-5 anim-scale-in">
          {[1, 0, 2].map(idx => {
            const e = top3[idx];
            if (!e) return <div key={idx} />;
            const medal = idx === 0 ? "🥇" : idx === 1 ? "🥈" : "🥉";
            const isMe = e.email === user?.email;
            const bg = avatarColor(e.name);
            const podiumBorder = idx === 0 ? "border-amber-400/30 bg-amber-400/[0.06]" : idx === 1 ? "border-white/15 bg-white/[0.04]" : "border-orange-400/25 bg-orange-400/[0.05]";
            return (
              <div key={idx} className={`glass border ${podiumBorder} rounded-2xl p-4 text-center`}>
                <span className="text-2xl block mb-2">{medal}</span>
                <div className="w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center font-display font-bold text-sm" style={{ background: bg }}>{getInitials(e.name)}</div>
                <div className="font-display font-bold text-xs text-white truncate">{e.name}</div>
                <div className="text-white/40 text-xs">{e.score}/10 · {e.pct}%</div>
                {isMe && <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30 mt-1 inline-block">You</span>}
              </div>
            );
          })}
        </div>
      )}

      {/* Rest of list */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 glass border border-white/[0.08] rounded-3xl">
          <span className="text-4xl block mb-3 opacity-40">🏜️</span>
          <p className="text-white/40 font-semibold">No scores yet</p>
          <p className="text-white/25 text-sm mt-1">Be the first to play!</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {rest.map((e, i) => {
            const isMe = e.email === user?.email;
            const badge = BADGE(e.pct);
            const bg = avatarColor(e.name);
            return (
              <div key={i} className={`flex items-center gap-4 px-5 py-4 rounded-2xl border transition-all duration-200 hover:border-white/20 ${isMe ? "border-violet-500/40 bg-violet-500/[0.08]" : "glass border-white/[0.08]"}`}>
                <span className="font-display font-black text-white/30 w-6 text-sm">#{i + 4}</span>
                <div className="w-9 h-9 rounded-full flex items-center justify-center font-display font-bold text-sm flex-shrink-0" style={{ background: bg }}>{getInitials(e.name)}</div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm text-white flex items-center gap-2">
                    {e.name}
                    {isMe && <span className="text-xs px-1.5 py-0.5 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30">You</span>}
                  </div>
                  <div className="text-white/30 text-xs">{CATEGORIES[e.cat]?.name || e.cat}</div>
                </div>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: `${badge[1]}18`, color: badge[1] }}>{badge[0]}</span>
                <div className="text-right">
                  <div className="font-display font-black text-sm text-white">{e.score}/10</div>
                  <div className="text-white/30 text-xs">{e.pct}%</div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
