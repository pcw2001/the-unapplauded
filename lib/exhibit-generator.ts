import { Exhibit, GalleryType } from "@/types/exhibit";
import { matchGallery } from "./galleries";
import {
  generateTitle,
  generateLabel,
  generateCuratorNote,
  generateMaterials,
} from "./templates";
import { getNextExhibitNumber } from "./storage";

export function generateExhibit(rawInput: string): Exhibit {
  const gallery = matchGallery(rawInput);
  const galleryId = gallery.id as GalleryType;

  return {
    id: crypto.randomUUID(),
    exhibitNumber: getNextExhibitNumber(),
    title: generateTitle(galleryId),
    gallery: gallery.name,
    materials: generateMaterials(galleryId),
    date: new Date().toISOString().split("T")[0],
    museumLabel: generateLabel(galleryId),
    curatorNote: generateCuratorNote(galleryId),
    rawInput,
    createdAt: new Date().toISOString(),
  };
}
