import { useContext } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/ui/Navbar";
import { AppContext } from "../context/AppContext";

export default function MainLayout() {
  const { user, logout } = useContext(AppContext);
  return (
    <div className="min-h-screen flex flex-col">
      {/* Ambient orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-20" style={{ background: "radial-gradient(circle,#7c6bfa,transparent)", filter: "blur(80px)", animation: "float 8s ease-in-out infinite" }} />
        <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full opacity-15" style={{ background: "radial-gradient(circle,#ec4899,transparent)", filter: "blur(80px)", animation: "float 8s ease-in-out infinite 3s" }} />
        <div className="absolute top-1/2 left-1/3 w-[300px] h-[300px] rounded-full opacity-10" style={{ background: "radial-gradient(circle,#10d9a0,transparent)", filter: "blur(80px)", animation: "float 8s ease-in-out infinite 5s" }} />
      </div>
      <style>{`@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-24px)}}`}</style>
      <Navbar user={user} onLogout={logout} />
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 pb-12">
        <Outlet />
      </main>
    </div>
  );
}
