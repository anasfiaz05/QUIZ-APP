import GlassCard from "../ui/GlassCard";

export default function CategoryCard({ cat, selected, onClick }) {
  return (
    <GlassCard
      onClick={onClick}
      className={`p-5 text-center transition-all duration-250 group ${selected ? "border-2 scale-[1.02]" : "hover:-translate-y-1"}`}
      style={selected ? { borderColor: cat.color, background: `${cat.color}18` } : {}}
    >
      <div className="text-4xl mb-3">{cat.icon}</div>
      <div className="font-display font-bold text-sm mb-1" style={{ color: selected ? cat.color : "white" }}>
        {cat.name}
      </div>
      <div className="text-white/40 text-xs">100 questions</div>
      {selected && (
        <div className="mt-2 text-xs font-bold" style={{ color: cat.color }}>✓ Selected</div>
      )}
    </GlassCard>
  );
}
