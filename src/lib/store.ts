import { action, atom } from "nanostores";

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

export const scaleItems: ValueItem[] = [
  { value: "150", label: "150%" },
  { value: "125", label: "125%" },
  { value: "100", label: "100%" },
  { value: "90", label: "90%" },
  { value: "75", label: "75%" },
  { value: "50", label: "50%" },
];

export const $paperScale = atom<string>("100");
