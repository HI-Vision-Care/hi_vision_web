export interface ARVResponse {
  arvId: string;
  genericName: string;
  drugClass: string;
  dosageStrength: string;
  admRoute: string;
  rcmDosage: string;
  shelfLife: string;
  fundingSource: string;
  regimenLevel: string;
  lastUpdated: string; // hoặc `Date` nếu bạn parse
  contraindication: string[];
  indication: string[];
  sideEffect: string[];
}