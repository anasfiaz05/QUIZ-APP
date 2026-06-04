import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AppProvider, AppContext } from "./context/AppContext";
import MainLayout from "./layouts/MainLayout";
import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";
import Categories from "./pages/Categories";
import Quiz from "./pages/Quiz";
import Results from "./pages/Results";
import Leaderboard from "./pages/Leaderboard";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

function ProtectedRoute({ children }) {
  const { user } = useContext(AppContext);
  return user ? children : <Navigate to="/" replace />;
}

function GuestRoute({ children }) {
  const { user } = useContext(AppContext);
  return user ? <Navigate to="/categories" replace /> : children;
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth routes — no layout */}
        <Route path="/" element={<GuestRoute><Login /></GuestRoute>} />
        <Route path="/signup" element={<GuestRoute><CreateAccount /></GuestRoute>} />

        {/* Protected app routes — with layout */}
        <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
          <Route path="/categories" element={<Categories />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/results" element={<Results />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
}
