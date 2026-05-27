import { Exhibit, STORAGE_KEY } from "@/types/exhibit";

export function getExhibits(): Exhibit[] {
  if (typeof window === "undefined") return [];

  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveExhibit(exhibit: Exhibit): void {
  const exhibits = getExhibits();
  exhibits.push(exhibit);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(exhibits));
}

export function deleteExhibit(id: string): void {
  const exhibits = getExhibits();
  const filtered = exhibits.filter((e) => e.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}

export function getNextExhibitNumber(): number {
  const exhibits = getExhibits();
  if (exhibits.length === 0) return 1;
  return Math.max(...exhibits.map((e) => e.exhibitNumber)) + 1;
}
