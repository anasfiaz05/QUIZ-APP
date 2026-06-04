import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { CATEGORIES } from "../assets/mockData";
import GradientButton from "../components/ui/GradientButton";

export default function Dashboard() {
  const { user, leaderboard } = useContext(AppContext);
  const nav = useNavigate();
  const userScores = leaderboard.filter(e => e.email === user?.email);
  const best = userScores.length ? Math.max(...userScores.map(e => e.pct)) : 0;
  return (
    <div className="py-8">
      <h1 className="font-display font-black text-3xl mb-1">Welcome back, <span className="grad-text">{user?.name?.split(" ")[0]}</span> 👋</h1>
      <p className="text-white/40 text-sm mb-8">Ready to beat your high score?</p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        {[["Games Played", userScores.length],["Best Score", `${best}%`],["Categories", Object.keys(CATEGORIES).length],["Questions", "100+"]].map(([l,v]) => (
          <div key={l} className="glass border border-white/[0.08] rounded-2xl p-4">
            <div className="font-display font-black text-2xl grad-text">{v}</div>
            <div className="text-white/40 text-xs mt-0.5">{l}</div>
          </div>
        ))}
      </div>
      <GradientButton size="lg" onClick={() => nav("/categories")}>Start a Quiz →</GradientButton>
    </div>
  );
}
