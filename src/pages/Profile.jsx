import { useContext } from "react";
import { AppContext } from "../context/AppContext";

function getInitials(name) { return name?.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2) || "?"; }

export default function Profile() {
  const { user, leaderboard } = useContext(AppContext);
  const scores = leaderboard.filter(e => e.email === user?.email);
  return (
    <div className="py-8 max-w-lg mx-auto">
      <div className="glass border border-white/[0.08] rounded-3xl p-8 text-center mb-5">
        <div className="w-20 h-20 rounded-full grad-btn flex items-center justify-center font-display font-black text-3xl mx-auto mb-4">{getInitials(user?.name)}</div>
        <h2 className="font-display font-black text-2xl">{user?.name}</h2>
        <p className="text-white/40 text-sm">{user?.email}</p>
      </div>
      <div className="glass border border-white/[0.08] rounded-3xl p-6">
        <h3 className="font-display font-bold mb-4">Recent Scores</h3>
        {scores.length === 0 ? <p className="text-white/30 text-sm">No scores yet. Play a quiz!</p> : scores.map((s, i) => (
          <div key={i} className="flex justify-between py-2 border-b border-white/[0.05] last:border-0 text-sm">
            <span className="text-white/60 capitalize">{s.cat}</span>
            <span className="font-bold" style={{ color: s.pct >= 70 ? "#10d9a0" : s.pct >= 50 ? "#7c6bfa" : "#ff4f6d" }}>{s.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
