import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatMoney(inputValue: string): string {
  if (!inputValue || inputValue === "") return "";
  let cleanValue = inputValue.replace(/[^0-9.]/g, "");

  const decimalIndex = cleanValue.indexOf(".");
  if (decimalIndex !== -1) {
    const beforeDecimal = cleanValue.substring(0, decimalIndex);
    const afterDecimal = cleanValue
      .substring(decimalIndex + 1)
      .replace(/\./g, "");
    cleanValue = beforeDecimal + "." + afterDecimal.substring(0, 2);
  } else {
    cleanValue = cleanValue + ".00";
  }

  const parts = cleanValue.split(".");
  const integerPart = parts[0] || "0";
  let decimalPart = parts[1] || "00";

  if (decimalPart.length === 1) {
    decimalPart += "0";
  }

  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return `${formattedInteger}.${decimalPart}`;
}
