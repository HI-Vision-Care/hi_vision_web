import { X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ARV {
  arvId: string;
  genericName: string;
  drugClass: string;
  dosageStrength: string;
  admRoute: string;
  rcmDosage: string;
  fundingSource: string;
  shelfLife: string;
  regimenLevel: string;
  indication?: string[];
  contraindication?: string[];
  sideEffect?: string[];
}

interface ARVModalProps {
  arv: ARV;
  onClose: () => void;
}

export default function ARVModal({ arv, onClose }: ARVModalProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center px-4">
      <Card className="w-full max-w-2xl bg-white border shadow-xl">
        <CardContent className="relative p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-red-600"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">
              {arv.genericName}
            </h2>
            <p className="text-sm text-gray-500 mb-2">ID: {arv.arvId}</p>
            <div className="flex flex-wrap gap-2">
              <Badge>{arv.drugClass}</Badge>
              <Badge>{arv.regimenLevel}</Badge>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Dosage Strength:</p>
              <p className="font-medium text-gray-800">{arv.dosageStrength}</p>
            </div>
            <div>
              <p className="text-gray-500">Administration Route:</p>
              <p className="font-medium text-gray-800">{arv.admRoute}</p>
            </div>
            <div>
              <p className="text-gray-500">Recommended Dosage:</p>
              <p className="font-medium text-gray-800">{arv.rcmDosage}</p>
            </div>
            <div>
              <p className="text-gray-500">Funding Source:</p>
              <p className="font-medium text-gray-800">{arv.fundingSource}</p>
            </div>
            <div>
              <p className="text-gray-500">Shelf Life:</p>
              <p className="font-medium text-gray-800">{arv.shelfLife}</p>
            </div>
          </div>

          {arv.indication && (
            <div>
              <h4 className="text-sm font-semibold text-green-700 mb-1">
                Indications
              </h4>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                {arv.indication.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {arv.contraindication && (
            <div>
              <h4 className="text-sm font-semibold text-red-700 mb-1">
                Contraindications
              </h4>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                {arv.contraindication.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {arv.sideEffect && (
            <div>
              <h4 className="text-sm font-semibold text-amber-700 mb-1">
                Side Effects
              </h4>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                {arv.sideEffect.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="pt-4 flex justify-end">
            <Button onClick={onClose} variant="outline">
              Close
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
