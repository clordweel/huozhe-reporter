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

export function ambiguous<T>(
  program: () => T,
  nitpick?: (result: T) => string | void | null | Promise<string | void | null>
): T | Promise<T> | Error {
  try {
    const result = program();

    if (nitpick) {
      const message = nitpick(result);

      if (message instanceof Promise) {
        return message
          .then((msg) => (msg ? new Error(msg) : result))
          .catch((error) => error);
      }

      if (message) {
        return new Error(message);
      }
    }

    if (result instanceof Promise) {
      return result.catch((error) => error);
    }

    return result;
  } catch (error) {
    if (error instanceof Error) return error;
    return new Error("Internal Program Errors.");
  }
}

export function debounce<T extends (...args: Parameters<T>) => void>(
  this: ThisParameterType<T>,
  fn: T,
  delay = 250
) {
  let timer: ReturnType<typeof setTimeout> | undefined;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function nextTick<T extends (...args: unknown[]) => unknown>(fn: T) {
  Promise.resolve().then(fn);
}
