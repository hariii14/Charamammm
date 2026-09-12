export type Category =
  | "All"
  | "Electronics"
  | "Stationery"
  | "Clothing"
  | "Furniture"
  | "Toys"
  | "Household"
  | "Miscellaneous";

export type FilterSection = "all" | "recent" | "mourned" | "questionable" | "forgotten";

export interface TributeComment {
  id: string;
  author: string;
  text: string;
  createdAt: string;
}

export interface ObjectStats {
  yearsServed: number | string;
  knownOwners: number | string;
  majorIncidents: number | string;
  successfulRepairs: number | string;
  lastKnownLocation: string;
  historicalImportance: string;
}

export interface Memorial {
  id: string;
  name: string;
  category: Category;
  bornYear: string;
  departedYear: string;
  causeOfDeath: string;
  obituary: string;
  story?: string;
  imageUrl: string;
  candleCount: number;
  rotationDeg: number; // e.g., -1.5 to 1.5
  isObjectOfTheDay?: boolean;
  stats: ObjectStats;
  comments: TributeComment[];
  createdAt: number;
}
