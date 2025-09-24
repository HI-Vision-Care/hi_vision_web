"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { SectionItem as SectionItemType } from "@/types";

interface SectionItemProps {
  item: SectionItemType;
  layout?: "horizontal" | "vertical" | "grid";
  className?: string;
}

export function SectionItem({
  item,
  layout = "vertical",
  className,
}: SectionItemProps) {
  const Component = item.href ? "a" : "div";

  return (
    <Component
      href={item.href}
      className={cn(
        "group cursor-pointer transition-all duration-300",
        item.href && "hover:no-underline",
        className
      )}
      role={item.href ? "link" : "article"}
      tabIndex={0}
      onKeyDown={(e) => {
        if (item.href && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          window.open(item.href, "_self");
        }
      }}
    >
      <Card
        className={cn(
          "h-full border border-blue-100 bg-white shadow-sm hover:shadow-md rounded-2xl transition-colors",
          "group-hover:border-blue-200"
        )}
      >
        <CardContent
          className={cn(
            "p-5 md:p-6 space-y-2",
            layout === "horizontal" &&
              "flex flex-row items-center space-y-0 space-x-4"
          )}
        >
          {item.icon && (
            <div
              className={cn(
                "flex-shrink-0 text-blue-600",
                layout === "horizontal" ? "w-8 h-8" : "w-12 h-12 mb-3"
              )}
            >
              {item.icon}
            </div>
          )}

          <div className="flex-1 min-w-0">
            <h3
              className={cn(
                "font-semibold text-blue-900 group-hover:text-blue-700 transition-colors",
                layout === "horizontal" ? "text-base" : "text-lg mb-2"
              )}
            >
              {item.title}
            </h3>

            {item.description && (
              <p className="text-sm text-slate-600 leading-relaxed">
                {item.description}
              </p>
            )}

            {item.content && (
              <div className="text-sm text-slate-600 mt-2">{item.content}</div>
            )}
          </div>
        </CardContent>
      </Card>
    </Component>
  );
}
