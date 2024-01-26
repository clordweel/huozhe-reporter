import { Tabs } from "@/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  $propertyPanelValue,
  propertyPanelItems,
  switchPropertyPanelValue,
} from "@/store";
import { useStore } from "@nanostores/react";
import { CodeSquareIcon, InfoIcon, Settings2Icon } from "lucide-react";
import OptionsTab from "./options-tab";
import InfoTab from "./info-tab";
import DataTab from "./data-tab";
import { ScrollArea } from "../ui/scroll-area";

export default function PropertyPanel() {
  const value = useStore($propertyPanelValue);

  return (
    <div className="grid grid-cols-[48px_1fr]">
      <header className="col-span-2 pt-4 mb-2">
        <h3 className="text-lg font-bold px-4">
          {propertyPanelItems.find((e) => e.value === value)?.label}
        </h3>
      </header>

      <ToggleGroup
        type="single"
        value={value}
        className="flex flex-col gap-0 shrink-0 justify-start pt-2"
        onValueChange={switchPropertyPanelValue}
      >
        <ToggleGroupItem
          value="info"
          className="size-12 rounded-none hover:bg-transparent"
        >
          <InfoIcon className="size-4" />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="options"
          className="size-12 rounded-none hover:bg-transparent"
        >
          <Settings2Icon className="size-4" />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="data"
          className="size-12 rounded-none hover:bg-transparent"
        >
          <CodeSquareIcon className="size-4" />
        </ToggleGroupItem>
      </ToggleGroup>

      <ScrollArea className="h-[calc(var(--paper-panel-height)-76px)] pt-2 pr-4">
        <Tabs value={value} orientation={"vertical"} className="w-full">
          <InfoTab />
          <OptionsTab />
          <DataTab />
        </Tabs>
        <div className="py-8"></div>
      </ScrollArea>
    </div>
  );
}
