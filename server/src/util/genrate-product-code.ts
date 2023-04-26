export function gernateRandomUniqueCode(code: string): string {
  const currentDate = new Date();

  // Convert the date to a string with format YYYYMMDD
  const dateString = currentDate.toISOString().slice(0, 10).replace(/-/g, "");
  // Generate a random 3-digit number
  const randomNumber = Math.floor(Math.random() * 900) + 100;

  return `${code + dateString + randomNumber}`;
}
