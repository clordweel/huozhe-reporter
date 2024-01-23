import { action, atom } from "nanostores";

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
