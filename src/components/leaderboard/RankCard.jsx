import { CATEGORIES } from "../../assets/mockData";

function getInitials(name) { return name?.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2) || "?"; }
function avatarColor(name) {
  const colors = ["#7c6bfa","#10d9a0","#ff4f6d","#4f9eff","#f5a623","#a855f7"];
  return colors[(name?.charCodeAt(0) || 0) % colors.length];
}
const BADGE = (pct) => pct >= 90 ? ["Legendary","#f5a623"] : pct >= 70 ? ["Expert","#7c6bfa"] : pct >= 50 ? ["Pro","#10d9a0"] : ["Learner","#4f9eff"];

export default function RankCard({ entry, rank, isYou }) {
  const badge = BADGE(entry.pct);
  const bg = avatarColor(entry.name);
  return (
    <div className={`flex items-center gap-4 px-5 py-4 rounded-2xl border transition-all duration-200 hover:border-white/20 ${isYou ? "border-violet-500/50 bg-violet-500/10" : "border-white/[0.08] glass"}`}>
      <span className="font-display font-black text-white/40 w-7 text-sm">#{rank}</span>
      <div className="w-9 h-9 rounded-full flex items-center justify-center font-display font-bold text-sm flex-shrink-0" style={{ background: bg }}>
        {getInitials(entry.name)}
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-sm text-white flex items-center gap-2">
          {entry.name}
          {isYou && <span className="text-xs px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30">You</span>}
        </div>
        <div className="text-white/40 text-xs">{CATEGORIES[entry.cat]?.name || entry.cat}</div>
      </div>
      <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: `${badge[1]}18`, color: badge[1] }}>{badge[0]}</span>
      <div className="text-right">
        <div className="font-display font-black text-sm text-white">{entry.score}/10</div>
        <div className="text-white/40 text-xs">{entry.pct}%</div>
      </div>
    </div>
  );
}
