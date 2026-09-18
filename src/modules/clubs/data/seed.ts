import type { Club } from "../domain/types";

export const CLUBS: Club[] = [
  {
    id: "club-olympic-west",
    organizationId: "org-club-olympic-west",
    name: "باشگاه ورزشی المپیک غرب",
    provinceId: "tehran",
    countyId: "tehran-city",
    locationLabel: "تهران، پونک",
    sportsLabel: "تکواندو / بدنسازی",
    sportScope: "functional-fitness",
    managerName: "رضا مرادی",
    licenseStatus: "active",
    licenseExpiresAt: "2027-03-20",
  },
  {
    id: "club-kia",
    organizationId: "org-club-kia",
    name: "آکادمی فوتبال کیا",
    provinceId: "tehran",
    countyId: "tehran-city",
    locationLabel: "تهران، تهران‌ویلا",
    sportsLabel: "فوتبال پایه",
    sportScope: "football",
    managerName: "علی کریمی",
    licenseStatus: "active",
    licenseExpiresAt: "2027-01-10",
  },
  {
    id: "club-arad",
    organizationId: "org-club-arad",
    name: "مجموعه فرهنگی ورزشی آراد",
    provinceId: "alborz",
    countyId: "karaj",
    locationLabel: "البرز، کرج",
    sportsLabel: "کاراته / کاردیو",
    sportScope: "karate",
    managerName: "مینا صالحی",
    licenseStatus: "active",
    licenseExpiresAt: "2027-06-01",
  },
];

export function listClubs() {
  return CLUBS;
}

export function searchClubs(query: string) {
  const term = query.trim();
  if (!term) return CLUBS.filter((club) => club.licenseStatus === "active");
  return CLUBS.filter((club) => {
    if (club.licenseStatus !== "active") return false;
    return `${club.name} ${club.locationLabel} ${club.sportsLabel}`.includes(term);
  });
}
