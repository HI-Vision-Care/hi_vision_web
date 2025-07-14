"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Hospital } from "lucide-react";

interface UnderlyingDiseasesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  diseases: string[];
  patientName?: string;
}

export default function UnderlyingDiseasesModal({
  open,
  onOpenChange,
  diseases,
  patientName,
}: UnderlyingDiseasesModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex gap-2 items-center">
            <Hospital className="h-5 w-5 text-primary" />
            Underlying Diseases {patientName ? `of ${patientName}` : ""}
          </DialogTitle>
        </DialogHeader>
        <div className="py-2">
          {diseases?.length > 0 ? (
            <ul className="list-disc pl-5 space-y-1">
              {diseases.map((d, idx) => (
                <li key={idx} className="text-base text-muted-foreground">
                  {d}
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center text-muted-foreground">
              No underlying diseases recorded.
            </div>
          )}
        </div>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)} variant="outline">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
