"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { SectionGroup as SectionGroupType } from "@/types";
import { SectionItem } from "./SectionItem";

interface SectionGroupProps {
  section: SectionGroupType;
  className?: string;
}

export function SectionGroup({ section, className }: SectionGroupProps) {
  const { title, subtitle, items, layout = "vertical" } = section;

  const getGridClasses = () => {
    switch (layout) {
      case "horizontal":
        return "flex flex-col md:flex-row md:items-start md:space-x-8 space-y-6 md:space-y-0";
      case "grid":
        return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6";
      default:
        return "space-y-6";
    }
  };

  return (
    <section
      className={cn("w-full", className)}
      aria-labelledby={`section-${section.id}-title`}
    >
      {(title || subtitle) && (
        <div className="mb-8">
          {title && (
            <h2
              id={`section-${section.id}-title`}
              className="text-2xl md:text-3xl font-bold text-blue-900 mb-2"
            >
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-slate-600 text-lg leading-relaxed max-w-2xl">
              {subtitle}
            </p>
          )}
        </div>
      )}

      <div className={getGridClasses()}>
        {items.map((item) => (
          <SectionItem
            key={item.id}
            item={item}
            layout={layout}
            className="h-full"
          />
        ))}
      </div>
    </section>
  );
}
