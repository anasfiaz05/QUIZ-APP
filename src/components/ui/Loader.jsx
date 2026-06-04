export default function Loader({ text = "Loading..." }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <div className="w-12 h-12 rounded-full border-4 border-white/10 border-t-violet-500 animate-spin" />
      <p className="text-white/50 text-sm">{text}</p>
    </div>
  );
}
