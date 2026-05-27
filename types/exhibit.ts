export interface Exhibit {
  id: string;
  exhibitNumber: number;
  title: string;
  gallery: string;
  materials: string;
  date: string;
  museumLabel: string;
  curatorNote: string;
  rawInput: string;
  createdAt: string;
}

export const STORAGE_KEY = "the-unapplauded-exhibits";

export type GalleryType =
  | "self-care"
  | "order"
  | "social"
  | "emotional"
  | "rest"
  | "kitchen";

export interface GalleryInfo {
  id: GalleryType;
  name: string;
  keywords: string[];
}
