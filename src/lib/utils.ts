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

export function addCommas(value: number | string): string {
  // Convert to string and remove existing commas
  const numStr = value.toString().replace(/,/g, "");

  // Handle invalid input
  if (isNaN(Number(numStr))) {
    return value.toString();
  }

  // Split into integer and decimal parts
  const parts = numStr.split(".");
  const integerPart = parts[0];
  const decimalPart = parts[1];

  // Add commas to integer part
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Combine with decimal part if it exists
  return decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger;
}

export function shortenText(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength) + "...";
}
