import { useToJpeg } from "@hugocxl/react-to-image";

import { ImageDownIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useStore } from "@nanostores/react";
import { $paperNode } from "@/lib/store";
import { useEffect } from "react";
import { downloadFromData } from "@/lib/utils";

export default function ToolbarPanel() {
  const paperNode = useStore($paperNode);

  const [, convertToJpeg, ref] = useToJpeg<HTMLDivElement>({
    onSuccess: (data) => {
      console.log(data);
      downloadFromData(data);
    },
  });

  useEffect(() => {
    paperNode && ref(paperNode);
  }, [paperNode, ref]);

  return (
    <div className="px-2 flex w-full">
      <div className="mx-auto"></div>

      <Button size={"sm"} className="space-x-2" onClick={convertToJpeg}>
        <ImageDownIcon className="size-4" />
        <span>保存为图片</span>
      </Button>
    </div>
  );
}
