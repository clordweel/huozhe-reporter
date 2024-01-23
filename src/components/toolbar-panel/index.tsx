import { ImageDownIcon } from "lucide-react";
import { Button } from "../ui/button";

export default function ToolbarPanel() {
  return (
    <div className="px-2 flex w-full">
      <div className="mx-auto"></div>

      <Button size={"sm"} className="space-x-2">
        <ImageDownIcon className="size-4" />
        <span>保存为图片</span>
      </Button>
    </div>
  );
}
