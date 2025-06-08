import type { TPokerHand } from "@/store/poker-hand-reducer";
import { useState } from "react";

// Simple API functions
export const pokerApi = {
  getAllHands: async (): Promise<TPokerHand[]> => {
    const response = await fetch("/api/poker/all-hands");
    const data = await response.json();
    return data.hands || [];
  },

  generateNewHand: async (): Promise<TPokerHand> => {
    const response = await fetch("/api/poker/new-hand");
    const data = await response.json();
    return data.result;
  },

  compareHands: async (handIds: string[]) => {
    const response = await fetch("/api/poker/compare-hands", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(handIds),
    });
    const data = await response.json();
    return data.result;
  },
};

// Simple hook for loading states
export const usePokerApi = () => {
  const [loading, setLoading] = useState(false);

  const call = async (apiFunction: Function, ...args: any[]) => {
    setLoading(true);
    const result = await apiFunction(...args);
    setLoading(false);
    return result;
  };

  return { loading, call };
};
