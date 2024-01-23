import { action, atom } from "nanostores";

export type propertyPanelValue = "info" | "paper";

export const propertyPanelItems: {
  value: propertyPanelValue;
  label: string;
}[] = [
  { value: "info", label: "信息" },
  {
    value: "paper",
    label: "画纸选项",
  },
];

export const $propertyPanelValue = atom<propertyPanelValue>("info");

export const switchPropertyPanelValue = action(
  $propertyPanelValue,
  "switch.paper.pabel.value",
  (store, value: string) => {
    console.log(value);
    if (!value) return;

    store.set(value as propertyPanelValue);
  }
);
