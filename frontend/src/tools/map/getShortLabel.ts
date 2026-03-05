import type { NominatimResultType } from "../../types/NominatimResultType";

export default function getShortLabel(location: NominatimResultType) {
  const locality = [
    "city",
    "town",
    "village",
    "hamlet",
    "municipality",
    "state",
    "observatory",
  ];
  const addressType = location.addresstype;

  if (locality.includes(addressType)) {
    const localityDetails = location.display_name
      .split(",")
      .map((l) => l.trim());
    if (localityDetails.length >= 2) {
      const first = localityDetails[0];
      const last = localityDetails[localityDetails.length - 1];
      const label = `${first}, ${last}`;
      const shortLabel = label.length > 25 ? label.slice(0, 25) + "..." : label;

      return `${shortLabel}`;
    }
  }
  return;
}
