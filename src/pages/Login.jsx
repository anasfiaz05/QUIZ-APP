import { useState, useContext, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import Logo from "../components/ui/Logo";
import GradientButton from "../components/ui/GradientButton";

export default function Login() {
  const { login } = useContext(AppContext);
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);

  const shake = () => {
    formRef.current?.classList.add("anim-shake");
    setTimeout(() => formRef.current?.classList.remove("anim-shake"), 500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!email) { setError("Please enter your email."); shake(); return; }
    if (!pass) { setError("Please enter your password."); shake(); return; }
    setLoading(true);
    setTimeout(() => {
      const res = login(email, pass);
      setLoading(false);
      if (res.error) { setError(res.error); shake(); }
      else nav("/categories");
    }, 600);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-[900px] grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Left hero */}
        <div className="anim-fade-up flex flex-col gap-6">
          <div>
            <Logo size="lg" />
            <p className="text-white/50 mt-3 text-sm leading-relaxed max-w-sm">
              The most advanced quiz platform. Test your knowledge, compete on the leaderboard, and master every subject.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[["500+","Questions"],["5","Categories"],["50s","Per Question"],["Live","Leaderboard"]].map(([v,l]) => (
              <div key={l} className="glass border border-white/[0.08] rounded-2xl p-4">
                <div className="font-display font-black text-2xl grad-text">{v}</div>
                <div className="text-white/40 text-xs mt-0.5">{l}</div>
              </div>
            ))}
          </div>
          <div className="glass border border-white/[0.08] rounded-2xl p-5">
            <p className="text-xs font-bold uppercase tracking-widest text-white/30 mb-3">Features</p>
            {["🧠 5 Quiz Categories","⏱️ 50-Second Timer","🏆 Live Leaderboard","📊 Detailed Results","🔒 Secure Accounts"].map(f => (
              <p key={f} className="text-white/50 text-sm py-1.5 border-b border-white/[0.05] last:border-0">{f}</p>
            ))}
          </div>
        </div>

        {/* Right form */}
        <div ref={formRef} className="glass border border-white/[0.08] rounded-3xl p-8 anim-scale-in">
          <h2 className="font-display font-black text-2xl mb-1">Welcome back 👋</h2>
          <p className="text-white/40 text-sm mb-7">Sign in to your QuizMaster account</p>

          {/* Tabs */}
          <div className="flex gap-1 glass border border-white/[0.08] rounded-xl p-1 mb-6">
            <Link to="/" className="flex-1 py-2 rounded-lg text-center text-sm font-bold bg-white/10 text-white transition-all">Sign In</Link>
            <Link to="/signup" className="flex-1 py-2 rounded-lg text-center text-sm font-semibold text-white/40 hover:text-white transition-all">Create Account</Link>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-white/40 mb-1.5">Email Address</label>
              <input
                type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full glass-md border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 outline-none focus:border-violet-500 focus:shadow-[0_0_0_3px_rgba(124,107,250,0.2)] transition-all"
              />
            </div>
            <div className="relative">
              <label className="block text-xs font-bold uppercase tracking-widest text-white/40 mb-1.5">Password</label>
              <input
                type={showPass ? "text" : "password"} value={pass} onChange={e => setPass(e.target.value)}
                placeholder="Enter your password"
                className="w-full glass-md border border-white/10 rounded-xl px-4 py-3 pr-12 text-white text-sm placeholder-white/20 outline-none focus:border-violet-500 focus:shadow-[0_0_0_3px_rgba(124,107,250,0.2)] transition-all"
              />
              <button type="button" onClick={() => setShowPass(s => !s)} className="absolute right-3 top-9 text-white/30 hover:text-white transition-colors text-lg">
                {showPass ? "🙈" : "👁️"}
              </button>
            </div>
            <div className="text-right -mt-2">
              <button type="button" className="text-xs text-violet-400 hover:text-violet-300 transition-colors">Forgot password?</button>
            </div>
            {error && (
              <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">{error}</div>
            )}
            <GradientButton size="lg" className="w-full mt-1" disabled={loading}>
              {loading ? "Signing in…" : "Sign In →"}
            </GradientButton>
          </form>

          <p className="text-center text-white/40 text-sm mt-5">
            Don't have an account?{" "}
            <Link to="/signup" className="text-violet-400 hover:text-violet-300 transition-colors">Create one</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
