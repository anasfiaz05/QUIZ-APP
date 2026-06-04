export default function Logo({ size = "md" }) {
  const sizes = { sm: "text-xl", md: "text-2xl", lg: "text-4xl" };
  return (
    <span className={`font-display font-black ${sizes[size]}`}>
      Quiz<span className="grad-text">Master</span>
    </span>
  );
}
