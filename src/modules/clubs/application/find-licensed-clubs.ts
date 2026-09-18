import { CLUBS } from "../data/seed";

export function findLicensedClubs(input: {
  countyId?: string;
  sportScope?: string;
  now?: Date;
}) {
  const now = input.now ?? new Date();
  return CLUBS.filter((club) => {
    if (input.countyId && club.countyId !== input.countyId) return false;
    if (input.sportScope && club.sportScope !== input.sportScope) return false;
    if (club.licenseStatus !== "active") return false;
    return new Date(club.licenseExpiresAt).getTime() >= now.getTime();
  });
}

export function getClub(id: string) {
  return CLUBS.find((club) => club.id === id);
}
