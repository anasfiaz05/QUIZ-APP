import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "./Logo";

export default function Navbar({ user, onLogout }) {
  const loc = useLocation();
  const nav = useNavigate();
  const tabs = [
    { label: "🎯 Quiz", path: "/categories" },
    { label: "🏆 Leaderboard", path: "/leaderboard" },
  ];
  return (
    <nav className="w-full max-w-5xl mx-auto flex items-center justify-between py-5 px-4">
      <Logo />
      <div className="flex gap-1 glass border border-white/[0.08] rounded-xl p-1">
        {tabs.map((t) => (
          <Link
            key={t.path}
            to={t.path}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${loc.pathname.startsWith(t.path) ? "bg-white/10 text-white" : "text-white/50 hover:text-white"}`}
          >
            {t.label}
          </Link>
        ))}
      </div>
      {user ? (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full grad-btn flex items-center justify-center text-sm font-bold">
            {user.name?.[0]?.toUpperCase()}
          </div>
          <span className="text-white/70 text-sm hidden sm:block">{user.name.split(" ")[0]}</span>
          <button
            onClick={onLogout}
            className="text-xs px-3 py-1.5 rounded-lg glass border border-white/10 text-white/60 hover:text-white transition-colors"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <button onClick={() => nav("/")} className="text-sm text-violet-400 hover:text-violet-300 transition-colors">
          Sign In →
        </button>
      )}
    </nav>
  );
}
