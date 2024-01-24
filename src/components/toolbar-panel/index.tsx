import { useToJpeg, useToPng } from "@hugocxl/react-to-image";

import { ImageDownIcon, Loader2Icon, RefreshCcwDotIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useStore } from "@nanostores/react";
import {
  $$paperFilename,
  $paperNode,
  $paperOptions,
  $paperScale,
  imageRatioItems,
  imageTypeItems,
  resetPaperScale,
  scaleItems,
} from "@/store";
import { useCallback, useEffect, useState } from "react";
import { downloadFromData } from "@/lib/utils";
import { OptionsSelect } from "../form-base";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Separator } from "../ui/separator";
import { Menu } from "./menu";

export default function ToolbarPanel() {
  const paperNode = useStore($paperNode);
  const scale = useStore($paperScale);
  const options = useStore($paperOptions);

  const filename = useStore($$paperFilename);

  const [convertLoading, setConvertLoading] = useState(false);

  const [, convertToJpeg, jpegRef] = useToJpeg<HTMLDivElement>({
    pixelRatio: options.imageRatio,
    onSuccess: (data: string) => {
      downloadFromData(data, filename);
      setConvertLoading(false);
    },
  });

  const [, convertToPng, pngRef] = useToPng<HTMLDivElement>({
    pixelRatio: options.imageRatio,
    onSuccess: (data: string) => {
      downloadFromData(data, filename);
      setConvertLoading(false);
    },
  });

  useEffect(() => {
    if (!paperNode) return;
    pngRef(paperNode);
    jpegRef(paperNode);
  }, [paperNode, jpegRef, pngRef]);

  const convert = useCallback(() => {
    setConvertLoading(true);

    resetPaperScale();

    if (options.imageType === "jpeg") {
      convertToJpeg();
    } else if (options.imageType === "png") {
      convertToPng();
    }
  }, [convertToJpeg, convertToPng, options.imageType]);

  return (
    <div className="px-2 flex w-full items-center">
      <TooltipProvider>
        <Menu />

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

        <Separator orientation={"vertical"} className="h-6" />

        <Tooltip>
          <TooltipTrigger className="flex gap-1" asChild>
            <Button
              size={"icon"}
              variant={"ghost"}
              onClick={() => window.location.reload()}
            >
              <RefreshCcwDotIcon className="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>重新加载</p>
          </TooltipContent>
        </Tooltip>

        <div className="mx-auto"></div>

        <OptionsSelect
          id={""}
          value={options.imageType}
          triggerClass="w-24"
          contentClass="w-24"
          onValueChange={(v) =>
            $paperOptions.setKey("imageType", v as "jpeg" | "png")
          }
          label={"格式"}
          items={imageTypeItems}
        />
        <Separator orientation={"vertical"} className="h-6" />

        <OptionsSelect
          id={""}
          value={options.imageRatio.toString()}
          triggerClass="w-16"
          contentClass="w-16"
          onValueChange={(v) => $paperOptions.setKey("imageRatio", Number(v))}
          label={"倍率"}
          items={imageRatioItems}
        />

        <Separator orientation={"vertical"} className="h-6" />

        <Button
          size={"sm"}
          className="space-x-2 ml-2"
          onClick={convert}
          disabled={convertLoading}
        >
          {convertLoading ? (
            <Loader2Icon className="size-4 animate-spin" />
          ) : (
            <ImageDownIcon className="size-4" />
          )}
          <span>保存为图片</span>
        </Button>
      </TooltipProvider>
    </div>
  );
}
