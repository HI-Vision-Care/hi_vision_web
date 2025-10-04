"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

export default function VideoModal() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => setOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full text-base font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-2"
        >
          <Play className="h-4 w-4" />
          Watch Patient Journey
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-4xl p-0 overflow-hidden rounded-2xl shadow-2xl">
        <div className="relative w-full aspect-video bg-black">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/oMFsBnHi1B0?si=ascIxiTjlAlK5E2L"
            title="YouTube video player"
          ></iframe>
        </div>
      </DialogContent>
    </Dialog>
  );
}
