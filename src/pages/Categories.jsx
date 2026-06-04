import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { CATEGORIES } from "../assets/mockData";
import CategoryCard from "../components/quiz/CategoryCard";
import GradientButton from "../components/ui/GradientButton";

export default function Categories() {
  const { user, category, setCategory } = useContext(AppContext);
  const [name, setName] = useState(user?.name || "");
  const nav = useNavigate();

  const handleStart = () => {
    if (!category) return;
    nav("/quiz");
  };

  return (
    <div className="py-8">
      <div className="text-center mb-10 anim-fade-up">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-violet-500/20 text-violet-300 text-xs font-bold mb-5 tracking-wide">
          ⚡ 500+ Questions · 5 Categories
        </div>
        <h1 className="font-display font-black text-4xl sm:text-5xl leading-tight mb-3">
          Test Your <span className="grad-text">Knowledge</span>
        </h1>
        <p className="text-white/40 text-base max-w-md mx-auto">Choose a category, beat the timer, and climb the leaderboard</p>
      </div>

      <div className="glass border border-white/[0.08] rounded-3xl p-6 sm:p-8 mb-6 anim-fade-up delay-1">
        <h2 className="font-display font-bold text-base mb-5">🎯 Choose Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
          {Object.values(CATEGORIES).map((cat) => (
            <CategoryCard key={cat.id} cat={cat} selected={category === cat.id} onClick={() => setCategory(cat.id)} />
          ))}
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-4">
          <div className="flex-1">
            <label className="block text-xs font-bold uppercase tracking-widest text-white/40 mb-1.5">Display Name</label>
            <input
              value={name} onChange={e => setName(e.target.value)}
              placeholder="Enter your name…"
              className="w-full glass border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 outline-none focus:border-violet-500 transition-all"
            />
          </div>
          <GradientButton size="lg" onClick={handleStart} disabled={!category}>
            {category ? `Start ${CATEGORIES[category]?.icon} Quiz` : "Select a Category"}
          </GradientButton>
        </div>
      </div>
    </div>
  );
}
