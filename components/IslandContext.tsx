"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { DEFAULT_ISLAND, ISLANDS, findIsland, type Island } from "@/components/islands";

const STORAGE_KEY = "sovereign-classroom:island";

type Ctx = { island: Island; setIsland: (id: string) => void };

const IslandCtx = createContext<Ctx>({ island: DEFAULT_ISLAND, setIsland: () => {} });

export function IslandProvider({ children }: { children: React.ReactNode }) {
  const [island, setState] = useState<Island>(DEFAULT_ISLAND);

  useEffect(() => {
    try {
      setState(findIsland(window.localStorage.getItem(STORAGE_KEY)));
    } catch {
      // Storage can be blocked (private mode); the default island still works.
    }
  }, []);

  function setIsland(id: string) {
    setState(findIsland(id));
    try {
      window.localStorage.setItem(STORAGE_KEY, id);
    } catch {}
  }

  return <IslandCtx.Provider value={{ island, setIsland }}>{children}</IslandCtx.Provider>;
}

export function useIsland() {
  return useContext(IslandCtx);
}

export function IslandPicker() {
  const { island, setIsland } = useIsland();
  return (
    <div role="radiogroup" aria-label="Choose your country" className="flex flex-wrap gap-2">
      {ISLANDS.map((i) => {
        const on = i.id === island.id;
        return (
          <button
            key={i.id}
            type="button"
            role="radio"
            aria-checked={on}
            onClick={() => setIsland(i.id)}
            className={`min-h-[44px] px-[18px] rounded-full border-2 border-ink text-[15px] transition-colors ${on ? "bg-ink text-sun font-bold" : "bg-transparent text-ink font-semibold hover:bg-ink/10"}`}
          >
            {i.name}
          </button>
        );
      })}
    </div>
  );
}

export function IslandSummary() {
  const { island } = useIsland();
  return (
    <div className="basis-full bg-ink text-sand rounded-2xl px-5 py-4 flex flex-wrap gap-x-6 gap-y-2 text-[15px]">
      <span className="font-bold text-sun">Now drawing on — {island.name}</span>
      <span>Policy: {island.policy}</span>
      <span>Quality assurance: {island.qa}</span>
      <span>Exams: {island.exams}</span>
      <span>Home language: {island.lang}</span>
    </div>
  );
}

export function IslandField({ field }: { field: keyof Island }) {
  const { island } = useIsland();
  return <>{island[field]}</>;
}
