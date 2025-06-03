export function capitalizeWords(str: string): string {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function getRandomNumInRange(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
