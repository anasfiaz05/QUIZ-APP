import { useState, useContext, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import Logo from "../components/ui/Logo";
import GradientButton from "../components/ui/GradientButton";

function strength(p) {
  let s = 0;
  if (p.length >= 8) s++;
  if (/[A-Z]/.test(p)) s++;
  if (/[0-9]/.test(p)) s++;
  if (/[^a-zA-Z0-9]/.test(p)) s++;
  return s;
}

export default function CreateAccount() {
  const { createAccount } = useContext(AppContext);
  const nav = useNavigate();
  const [first, setFirst] = useState(""); const [last, setLast] = useState("");
  const [email, setEmail] = useState(""); const [pass, setPass] = useState(""); const [confirm, setConfirm] = useState("");
  const [showPass, setShowPass] = useState(false); const [terms, setTerms] = useState(false);
  const [error, setError] = useState(""); const [loading, setLoading] = useState(false);
  const formRef = useRef(null);
  const s = strength(pass);
  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][s];
  const strengthColor = ["", "#ff4f6d", "#f5a623", "#4f9eff", "#10d9a0"][s];
  const reqs = [
    { label: "At least 8 characters", met: pass.length >= 8 },
    { label: "One uppercase letter", met: /[A-Z]/.test(pass) },
    { label: "One number", met: /[0-9]/.test(pass) },
    { label: "One special character", met: /[^a-zA-Z0-9]/.test(pass) },
  ];

  const shake = () => { formRef.current?.classList.add("anim-shake"); setTimeout(() => formRef.current?.classList.remove("anim-shake"), 500); };

  const handleSubmit = (e) => {
    e.preventDefault(); setError("");
    if (!first || !last) { setError("Please enter your first and last name."); shake(); return; }
    if (!email || !/\S+@\S+\.\S+/.test(email)) { setError("Please enter a valid email."); shake(); return; }
    if (pass.length < 8) { setError("Password must be at least 8 characters."); shake(); return; }
    if (pass !== confirm) { setError("Passwords do not match."); shake(); return; }
    if (!terms) { setError("Please accept the Terms of Service."); shake(); return; }
    setLoading(true);
    setTimeout(() => {
      const res = createAccount(email, pass, `${first} ${last}`);
      setLoading(false);
      if (res.error) { setError(res.error); shake(); }
      else nav("/categories");
    }, 700);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-[900px] grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Left hero */}
        <div className="anim-fade-up flex flex-col gap-6">
          <div>
            <Logo size="lg" />
            <p className="text-white/50 mt-3 text-sm leading-relaxed max-w-sm">Join thousands of quiz enthusiasts and prove your knowledge across 5 epic categories.</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[["500+","Questions"],["5","Categories"],["50s","Per Question"],["Live","Leaderboard"]].map(([v,l]) => (
              <div key={l} className="glass border border-white/[0.08] rounded-2xl p-4">
                <div className="font-display font-black text-2xl grad-text">{v}</div>
                <div className="text-white/40 text-xs mt-0.5">{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right form */}
        <div ref={formRef} className="glass border border-white/[0.08] rounded-3xl p-8 anim-scale-in">
          <h2 className="font-display font-black text-2xl mb-1">Create account ✨</h2>
          <p className="text-white/40 text-sm mb-7">Join QuizMaster Pro for free</p>

          {/* Tabs */}
          <div className="flex gap-1 glass border border-white/[0.08] rounded-xl p-1 mb-6">
            <Link to="/" className="flex-1 py-2 rounded-lg text-center text-sm font-semibold text-white/40 hover:text-white transition-all">Sign In</Link>
            <Link to="/signup" className="flex-1 py-2 rounded-lg text-center text-sm font-bold bg-white/10 text-white transition-all">Create Account</Link>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3">
              {[["First Name", first, setFirst, "Anas"], ["Last Name", last, setLast, "Khan"]].map(([lbl, val, set, ph]) => (
                <div key={lbl}>
                  <label className="block text-xs font-bold uppercase tracking-widest text-white/40 mb-1.5">{lbl}</label>
                  <input value={val} onChange={e => set(e.target.value)} placeholder={ph}
                    className="w-full glass-md border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 outline-none focus:border-violet-500 focus:shadow-[0_0_0_3px_rgba(124,107,250,0.2)] transition-all" />
                </div>
              ))}
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-white/40 mb-1.5">Email Address</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com"
                className="w-full glass-md border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 outline-none focus:border-violet-500 focus:shadow-[0_0_0_3px_rgba(124,107,250,0.2)] transition-all" />
            </div>
            <div className="relative">
              <label className="block text-xs font-bold uppercase tracking-widest text-white/40 mb-1.5">Password</label>
              <input type={showPass ? "text" : "password"} value={pass} onChange={e => setPass(e.target.value)} placeholder="Create a strong password"
                className="w-full glass-md border border-white/10 rounded-xl px-4 py-3 pr-12 text-white text-sm placeholder-white/20 outline-none focus:border-violet-500 focus:shadow-[0_0_0_3px_rgba(124,107,250,0.2)] transition-all" />
              <button type="button" onClick={() => setShowPass(v => !v)} className="absolute right-3 top-9 text-white/30 hover:text-white transition-colors text-lg">{showPass ? "🙈" : "👁️"}</button>
              {pass && (
                <>
                  <div className="flex gap-1 mt-2">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="flex-1 h-1 rounded-full transition-all duration-300" style={{ background: i <= s ? strengthColor : "rgba(255,255,255,0.1)" }} />
                    ))}
                  </div>
                  <p className="text-xs mt-1 font-semibold" style={{ color: strengthColor }}>{strengthLabel}</p>
                  <div className="mt-2 flex flex-col gap-1">
                    {reqs.map(r => (
                      <span key={r.label} className={`text-xs flex items-center gap-1.5 transition-colors ${r.met ? "text-emerald-400" : "text-white/30"}`}>
                        {r.met ? "✓" : "○"} {r.label}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>
            <div className="relative">
              <label className="block text-xs font-bold uppercase tracking-widest text-white/40 mb-1.5">Confirm Password</label>
              <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="Repeat your password"
                className={`w-full glass-md border rounded-xl px-4 py-3 pr-10 text-white text-sm placeholder-white/20 outline-none transition-all ${confirm ? (confirm === pass ? "border-emerald-500 focus:border-emerald-500" : "border-red-400 focus:border-red-400") : "border-white/10 focus:border-violet-500"}`} />
              {confirm && <span className="absolute right-3 top-9 text-lg">{confirm === pass ? "✅" : "❌"}</span>}
            </div>
            <label className="flex items-start gap-3 cursor-pointer group">
              <input type="checkbox" checked={terms} onChange={e => setTerms(e.target.checked)} className="mt-0.5 accent-violet-500" />
              <span className="text-xs text-white/40 group-hover:text-white/60 transition-colors">
                I agree to the <span className="text-violet-400">Terms of Service</span> and <span className="text-violet-400">Privacy Policy</span>
              </span>
            </label>
            {error && <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">{error}</div>}
            <GradientButton size="lg" className="w-full mt-1" disabled={loading}>
              {loading ? "Creating account…" : "Create Account →"}
            </GradientButton>
          </form>
          <p className="text-center text-white/40 text-sm mt-5">
            Already have an account? <Link to="/" className="text-violet-400 hover:text-violet-300 transition-colors">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
