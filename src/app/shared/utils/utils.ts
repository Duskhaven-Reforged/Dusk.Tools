export function formatID(ID: string) {
  return /^\d+$/.test(ID) ? ID : `${ID}.ID`;
}
