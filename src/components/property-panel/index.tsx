import { Tabs } from "@/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  $propertyPanelValue,
  propertyPanelItems,
  switchPropertyPanelValue,
} from "@/lib/store";
import { useStore } from "@nanostores/react";
import { CodeSquareIcon, InfoIcon, Settings2Icon } from "lucide-react";
import OptionsTab from "./options-tab";
import InfoTab from "./info-tab";
import DataTab from "./data-tab";
import { Separator } from "../ui/separator";

export default function PropertyPanel() {
  const value = useStore($propertyPanelValue);

  return (
    <div className="grid gap-y-4 grid-cols-[48px_1fr] px-2">
      <header className="col-span-2 px-2 pt-4">
        <h3 className="text-lg font-bold">
          {propertyPanelItems.find((e) => e.value === value)?.label}
        </h3>
      </header>

      <Separator className="col-span-2" />

      <ToggleGroup
        type="single"
        value={value}
        className="flex flex-col gap-1 shrink-0 justify-start"
        onValueChange={switchPropertyPanelValue}
      >
        <ToggleGroupItem value="info" className="size-12">
          <InfoIcon className="size-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="options" className="size-12">
          <Settings2Icon className="size-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="data" className="size-12">
          <CodeSquareIcon className="size-4" />
        </ToggleGroupItem>
      </ToggleGroup>

      <Tabs value={value} orientation={"vertical"} className="w-full">
        <InfoTab />
        <OptionsTab />
        <DataTab />
      </Tabs>
    </div>
  );
}
