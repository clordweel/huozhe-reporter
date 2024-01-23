import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function downloadFromData(data: string, filename?: string) {
  const link = document.createElement("a");

  const { ext } =
    data.match(/^data:image\/(?<ext>(png|jpe?g|svg)).*;/)?.groups ?? {};

  link.download = filename ?? "未命名." + ext ?? "错误格式";
  link.href = data;

  link.click();
}
