export function formatID(ID: string) {
  return /^\d+$/.test(ID) ? ID : `${ID.trim().replaceAll(' ', '_')}.ID`;
}
