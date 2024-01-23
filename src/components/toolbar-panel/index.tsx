import { useToJpeg } from "@hugocxl/react-to-image";

import { ImageDownIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useStore } from "@nanostores/react";
import { $$paperFilename, $paperNode, $paperScale, scaleItems } from "@/store";
import { useEffect } from "react";
import { downloadFromData } from "@/lib/utils";
import { OptionsSelect } from "../form-base";

export default function ToolbarPanel() {
  const paperNode = useStore($paperNode);
  const scale = useStore($paperScale);
  const filename = useStore($$paperFilename);

  const [, convertToJpeg, ref] = useToJpeg<HTMLDivElement>({
    onSuccess: (data) => {
      downloadFromData(data, filename);
    },
  });

  useEffect(() => {
    paperNode && ref(paperNode);
  }, [paperNode, ref]);

  return (
    <div className="px-2 flex w-full items-center">
      <div className="mx-auto"></div>

      <OptionsSelect
        tip="缩放图纸会影响图片下载尺寸"
        id={""}
        value={scale}
        triggerClass="w-24"
        contentClass="w-24"
        onValueChange={$paperScale.set}
        label={"缩放"}
        items={scaleItems}
      />

      <div className="mx-auto"></div>

      <Button size={"sm"} className="space-x-2" onClick={convertToJpeg}>
        <ImageDownIcon className="size-4" />
        <span>保存为图片</span>
      </Button>
    </div>
  );
}
