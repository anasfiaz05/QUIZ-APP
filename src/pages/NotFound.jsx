import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center gap-4">
      <div className="font-display font-black text-8xl grad-text">404</div>
      <p className="text-white/40">Page not found</p>
      <Link to="/" className="text-violet-400 hover:text-violet-300 transition-colors text-sm">← Go home</Link>
    </div>
  );
}
