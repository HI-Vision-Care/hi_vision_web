// types/arvRegimen.ts

export interface ArvDrug {
  arvId: string;
  genericName: string;
  drugClass: string;
  dosageStrength: string;
  admRoute: string;
  rcmDosage: string;
  shelfLife: string;
  fundingSource: string;
  regimenLevel: string;
  lastUpdated: string | null;
}

export interface Regimen {
  id: string;
  regimenName: string;
  regimenLevel: string;
  arvList: string;
  indication: string;
  recommendedDosage: string;
  lastUpdated: string | null;
}

export interface ArvRegimenResponse {
  regiment: Regimen;
  arvs: ArvDrug[];
}
