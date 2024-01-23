import { useToJpeg, useToPng } from "@hugocxl/react-to-image";

import { FileCode2Icon, FileInputIcon, ImageDownIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useStore } from "@nanostores/react";
import {
  $$paperFilename,
  $paperNode,
  $paperOptions,
  $paperScale,
  exportJSON,
  imageTypeItems,
  importJSON,
  resetPaperScale,
  scaleItems,
} from "@/store";
import { useCallback, useEffect } from "react";
import { downloadFromData } from "@/lib/utils";
import { OptionsSelect } from "../form-base";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

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

  const importPaper = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    async (file) => {
      importJSON(await file.target.files?.[0].text());
    },
    []
  );
  const exportPaper = useCallback(() => {
    exportJSON();
  }, []);

  return (
    <div className="px-2 flex w-full items-center">
      <TooltipProvider>
        <div className="flex gap-2">
          <Tooltip>
            <TooltipTrigger className="flex gap-1" asChild>
              <Button size={"icon"} variant={"ghost"}>
                <Label htmlFor="import_data_file" className="cursor-pointer">
                  <FileInputIcon className="size-6" />
                </Label>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>导入报表</p>
            </TooltipContent>
          </Tooltip>
          <Input
            id={"import_data_file"}
            type="file"
            className="hidden"
            multiple={false}
            onInput={importPaper}
          />
          <Tooltip>
            <TooltipTrigger className="flex gap-1" asChild>
              <Button size={"icon"} variant={"ghost"} onClick={exportPaper}>
                <FileCode2Icon className="size-6" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>导出 JSON</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>

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
