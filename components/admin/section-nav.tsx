"use client";

import type { EditableSectionKey } from "@/types/site-content";

type NavItem = {
  key: EditableSectionKey;
  label: string;
};

type SectionNavProps = {
  items: NavItem[];
  activeSection: EditableSectionKey;
  onSelect: (section: EditableSectionKey) => void;
};

export function SectionNav({ items, activeSection, onSelect }: SectionNavProps) {
  return (
    <aside className="rounded-[28px] border border-white/10 bg-white/5 p-4">
      <div className="space-y-2">
        {items.map((item) => {
          const active = item.key === activeSection;

          return (
            <button
              key={item.key}
              type="button"
              onClick={() => onSelect(item.key)}
              className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm transition-colors ${
                active
                  ? "bg-[#ab8453] text-white"
                  : "bg-white/5 text-zinc-300 hover:bg-white/10"
              }`}
            >
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
