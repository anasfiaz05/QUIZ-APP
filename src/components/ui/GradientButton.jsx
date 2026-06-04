export default function GradientButton({ children, onClick, disabled, className = "", size = "md" }) {
  const sizes = { sm: "px-4 py-2 text-sm", md: "px-6 py-3 text-base", lg: "px-8 py-4 text-lg" };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`grad-btn font-display font-bold rounded-xl text-white transition-all duration-200
        hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(124,107,250,0.45)]
        active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0
        ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
}
