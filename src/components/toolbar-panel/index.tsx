import { useToJpeg, useToPng } from "@hugocxl/react-to-image";

import { ImageDownIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useStore } from "@nanostores/react";
import {
  $$paperFilename,
  $paperNode,
  $paperOptions,
  $paperScale,
  imageTypeItems,
  resetPaperScale,
  scaleItems,
} from "@/store";
import { useCallback, useEffect } from "react";
import { downloadFromData } from "@/lib/utils";
import { OptionsSelect } from "../form-base";

export default function ToolbarPanel() {
  const paperNode = useStore($paperNode);
  const scale = useStore($paperScale);
  const options = useStore($paperOptions);

  const filename = useStore($$paperFilename);

  const [, convertToJpeg, jpegRef] = useToJpeg<HTMLDivElement>({
    onSuccess: (data) => {
      downloadFromData(data, filename);
    },
  });

  const [, convertToPng, pngRef] = useToPng<HTMLDivElement>({
    onSuccess: (data) => {
      downloadFromData(data, filename);
    },
  });

  useEffect(() => {
    if (!paperNode) return;
    pngRef(paperNode);
    jpegRef(paperNode);
  }, [paperNode, jpegRef, pngRef]);

  const convert = useCallback(() => {
    resetPaperScale();

    if (options.imageType === "jpeg") {
      convertToJpeg();
    } else if (options.imageType === "png") {
      convertToPng();
    }
  }, [convertToJpeg, convertToPng, options.imageType]);

  return (
    <div className="px-2 flex w-full items-center">
      <div className="mx-auto"></div>

      <OptionsSelect
        tip="缩放图纸与图片下载尺寸无关"
        id={""}
        value={scale}
        triggerClass="w-24"
        contentClass="w-24"
        onValueChange={$paperScale.set}
        label={"缩放"}
        items={scaleItems}
      />

      <div className="mx-auto"></div>

      <OptionsSelect
        id={""}
        value={options.imageType}
        triggerClass="w-24"
        contentClass="w-24"
        onValueChange={(v) =>
          $paperOptions.setKey("imageType", v as "jpeg" | "png")
        }
        label={""}
        items={imageTypeItems}
      />

      <Button size={"sm"} className="space-x-2" onClick={convert}>
        <ImageDownIcon className="size-4" />
        <span>保存为图片</span>
      </Button>
    </div>
  );
}
