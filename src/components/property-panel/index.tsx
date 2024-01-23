import { Tabs, TabsContent } from "@/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  $propertyPanelValue,
  propertyPanelItems,
  switchPropertyPanelValue,
} from "@/lib/store";
import { useStore } from "@nanostores/react";
import { InfoIcon, Settings2Icon } from "lucide-react";

export default function PropertyPanel() {
  const value = useStore($propertyPanelValue);

  return (
    <div className="grid gap-2 grid-cols-[_1fr] p-2">
      <header className="col-span-2 px-2 py-4">
        <h3 className="text-lg font-bold">
          {propertyPanelItems.find((e) => e.value === value)?.label}
        </h3>
      </header>

      <ToggleGroup
        type="single"
        value={value}
        className="flex flex-col shrink-0"
        onValueChange={switchPropertyPanelValue}
      >
        <ToggleGroupItem value="info" className="size-12">
          <InfoIcon />
        </ToggleGroupItem>
        <ToggleGroupItem value="paper" className="size-12">
          <Settings2Icon />
        </ToggleGroupItem>
      </ToggleGroup>

      <Tabs
        value={value}
        // onValueChange={switchPropertyPanelValue}
        orientation={"vertical"}
        className="w-[400px] px-4"
      >
        <TabsContent value="info">
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="paper">Change your password here.</TabsContent>
      </Tabs>
    </div>
  );
}
