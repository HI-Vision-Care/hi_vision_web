"use client";

import React from "react";
import { SectionGroup } from "./SectionGroup";
import { SectionsInterfaceProps } from "@/types";
import { cn } from "@/lib/utils";

export function SectionsInterface({
  sections,
  className,
  showNavigation = false,
}: SectionsInterfaceProps) {
  return (
    <div className={cn("w-full space-y-16", className)}>
      {showNavigation && sections.length > 1 && (
        <nav
          className="flex flex-wrap gap-4 pb-6 border-b border-border"
          role="navigation"
          aria-label="Section navigation"
        >
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#section-${section.id}`}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors px-3 py-1 rounded-md hover:bg-accent"
            >
              {section.title}
            </a>
          ))}
        </nav>
      )}

      {sections.map((section) => (
        <SectionGroup
          key={section.id}
          section={section}
          className="scroll-mt-20"
          id={`section-${section.id}`}
        />
      ))}
    </div>
  );
}
