export default function GlassCard({ children, className = "", onClick, style }) {
  return (
    <div
      onClick={onClick}
      style={style}
      className={`glass border border-white/[0.08] rounded-2xl ${onClick ? "cursor-pointer hover:border-white/20 hover:bg-white/[0.07] transition-all duration-200" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
