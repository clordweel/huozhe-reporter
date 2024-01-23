import { action, atom, computed, map } from "nanostores";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/zh-cn";
import { nextTick } from "./lib/utils";

dayjs.locale("zh-cn");
dayjs.extend(customParseFormat);
dayjs.extend(relativeTime);

export type ValueItem = { value: string; label: string };

export const $paperNode = atom<HTMLDivElement | null>(null);

export type propertyPanelValue = "info" | "options" | "data";

export const propertyPanelItems: {
  value: propertyPanelValue;
  label: string;
}[] = [
  { value: "info", label: "报表信息" },
  {
    value: "options",
    label: "画纸选项",
  },
  {
    value: "data",
    label: "数据",
  },
];

export const $propertyPanelValue = atom<propertyPanelValue>("info");

export const switchPropertyPanelValue = action(
  $propertyPanelValue,
  "switch.options.pabel.value",
  (store, value: string) => {
    console.log(value);
    if (!value) return;

    store.set(value as propertyPanelValue);
  }
);

export const $paperWdith = atom<number>(640);

export const $paperRealSize = atom<{ width: number; height: number }>({
  width: 0,
  height: 0,
});

export const $$paperSizeText = computed(
  $paperRealSize,
  ({ width, height }) => `${width}x${height}`
);

export const $paperObserver = atom<ResizeObserver | null>(null);

export const setPaperNode = action(
  $paperNode,
  "set.paper.node",
  (store, node: HTMLDivElement) => {
    store.set(node);

    nextTick(() => {
      if ($paperObserver.get()) return;

      const ob = new ResizeObserver(
        ([
          {
            contentRect: { width, height },
          },
        ]) => {
          $paperRealSize.set({ width, height });
        }
      );
      $paperObserver.set(ob);

      ob.observe(node);
    });
  }
);

export const scaleItems: ValueItem[] = [
  { value: "150", label: "150%" },
  { value: "125", label: "125%" },
  { value: "100", label: "100%" },
  { value: "90", label: "90%" },
  { value: "75", label: "75%" },
  { value: "50", label: "50%" },
];

export const $paperScale = atom<string>("100");

export type PaperOptions = {
  name?: string;
  suffix?: string;
  backgroundColor?: string;
  shadow?: boolean;
  shadowColor?: string;
  shadowBlur?: number;
};

export const defaultSuffix = "-{date}.{ext}";
export const defaultName = "未命名报表";

export const $paperOptions = map<PaperOptions>({});

export const $$paperFilename = computed(
  $paperOptions,
  ({ name = defaultName, suffix = defaultSuffix }) => {
    const data = {
      // time: Date.now().toString(),
      date: dayjs().format("YYYY-MM-DD"),
      size: $$paperSizeText.get(),
    };

    const extra = suffix.replace(
      /\{(time|date|size)\}/g,
      (_, v: keyof typeof data) => (v ? data[v] : v)
    );

    return `${name}${extra}`;
  }
);