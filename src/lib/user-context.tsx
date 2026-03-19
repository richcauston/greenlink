"use client";

import { createContext, useContext, useState, useEffect } from "react";
import type { UserTier } from "@/types";

interface UserContextType {
  tier: UserTier;
  setTier: (tier: UserTier) => void;
  isPro: boolean;
}

const UserContext = createContext<UserContextType>({
  tier: "free",
  setTier: () => {},
  isPro: false,
});

export function useUser() {
  return useContext(UserContext);
}

export default function UserProvider({ children }: { children: React.ReactNode }) {
  const [tier, setTierState] = useState<UserTier>("free");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("greenlink_tier") as UserTier | null;
    if (stored === "pro" || stored === "free") {
      setTierState(stored);
    }
    setMounted(true);
  }, []);

  const setTier = (t: UserTier) => {
    setTierState(t);
    if (mounted) localStorage.setItem("greenlink_tier", t);
  };

  return (
    <UserContext.Provider value={{ tier, setTier, isPro: tier === "pro" }}>
      {children}
    </UserContext.Provider>
  );
}
