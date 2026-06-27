"use client";

import { useState } from "react";
import { Reorder } from "framer-motion";
import { GripVertical } from "lucide-react";

const INITIAL = ["Homepage", "Services", "Portfolio", "Contact"];

/** Drag to reorder — Framer's Reorder works with mouse and touch out of the box. */
export default function ReorderList() {
  const [items, setItems] = useState(INITIAL);

  return (
    <Reorder.Group
      axis="y"
      values={items}
      onReorder={setItems}
      className="w-full max-w-xs space-y-2"
    >
      {items.map((item, i) => (
        <Reorder.Item
          key={item}
          value={item}
          whileDrag={{ scale: 1.04 }}
          className="flex cursor-grab items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-medium text-white/85 active:cursor-grabbing"
        >
          <GripVertical size={15} className="text-white/35" />
          <span className="font-mono text-xs text-[#8fd6cf]">
            {String(i + 1).padStart(2, "0")}
          </span>
          {item}
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
}
