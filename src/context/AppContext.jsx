import { createContext, useState, useCallback } from "react";

export const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [accounts, setAccounts] = useState({});
  const [leaderboard, setLeaderboard] = useState([
    { name: "Ali Hassan", email: "ali@demo.com", cat: "it", score: 9, pct: 90 },
    { name: "Sara Khan", email: "sara@demo.com", cat: "pakistan", score: 8, pct: 80 },
    { name: "Omar Butt", email: "omar@demo.com", cat: "math", score: 7, pct: 70 },
  ]);
  const [category, setCategory] = useState(null);

  const createAccount = useCallback((email, password, name) => {
    if (accounts[email]) return { error: "An account with this email already exists." };
    setAccounts((prev) => ({ ...prev, [email]: { password, name } }));
    setUser({ email, name });
    return { success: true };
  }, [accounts]);

  const login = useCallback((email, password) => {
    const acc = accounts[email];
    if (!acc) return { error: "No account found with this email." };
    if (acc.password !== password) return { error: "Incorrect password." };
    setUser({ email, name: acc.name });
    return { success: true };
  }, [accounts]);

  const logout = useCallback(() => setUser(null), []);

  const addScore = useCallback((entry) => {
    setLeaderboard((prev) => [...prev, entry]);
  }, []);

  return (
    <AppContext.Provider value={{ user, accounts, leaderboard, category, setCategory, createAccount, login, logout, addScore }}>
      {children}
    </AppContext.Provider>
  );
}
