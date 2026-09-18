import type { County, Province } from "../domain/types";

export const PROVINCES: Province[] = [
  { id: "tehran", name: "تهران" },
  { id: "alborz", name: "البرز" },
  { id: "isfahan", name: "اصفهان" },
  { id: "fars", name: "فارس" },
  { id: "khorasan-razavi", name: "خراسان رضوی" },
];

export const COUNTIES: County[] = [
  { id: "tehran-city", provinceId: "tehran", name: "تهران" },
  { id: "rey", provinceId: "tehran", name: "ری" },
  { id: "karaj", provinceId: "alborz", name: "کرج" },
  { id: "isfahan-city", provinceId: "isfahan", name: "اصفهان" },
  { id: "kashan", provinceId: "isfahan", name: "کاشان" },
  { id: "shiraz", provinceId: "fars", name: "شیراز" },
  { id: "mashhad", provinceId: "khorasan-razavi", name: "مشهد" },
];

export function listProvinces() {
  return PROVINCES;
}

export function listCounties(provinceId?: string) {
  if (!provinceId) return COUNTIES;
  return COUNTIES.filter((county) => county.provinceId === provinceId);
}

export function getProvince(id: string) {
  return PROVINCES.find((item) => item.id === id);
}

export function getCounty(id: string) {
  return COUNTIES.find((item) => item.id === id);
}
