import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui.derive/dialog";
import MonacoEditor from "@monaco-editor/react";
import { CheckIcon, CodeIcon, SaveIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";

interface Props {
  height?: string;
  width?: string;
  defaultValue?: string;
  value?: string;
  onConfirm?: (val?: string) => void;
  onCancel?: (val?: string) => void;
  onChange?: (val?: string) => void;
  open?: boolean;
  readOnly?: boolean;
  language?: string;
  onOpenChange?: (val: boolean) => void;
}

export default function CodeDialog({
  height = "100%",
  width = "100%",
  defaultValue = "// ...",
  value,
  onConfirm,
  onCancel,
  onChange,
  readOnly = true,
  open,
  onOpenChange,
  language,
}: Props) {
  const [code, setCode] = useState(value ?? defaultValue);

  useEffect(() => {
    setCode(value ?? defaultValue);
  }, [defaultValue, value]);

  const onCodeChange = useCallback(
    (val: string = "") => {
      setCode(val);
      onChange?.(val);
    },
    [onChange]
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-none w-[54rem] h-[75vh] px-0 pb-0 pt-0 overflow-clip !rounded-none">
        <DialogHeader
          className={cn(
            "px-4 absolute z-50 backdrop-blur-sm bg-slate-900 bg-opacity-20 w-full",
            "text-slate-50 border-b border-slate-500",
            "h-12 flex flex-row gap-2 items-center"
          )}
        >
          <CodeIcon className="size-6" />
          <DialogTitle className="!m-0">
            {readOnly ? "代码浏览" : "代码编辑"}
          </DialogTitle>
          <DialogDescription className="text-slate-300"></DialogDescription>

          <div className="mx-auto" />

          {!readOnly && (
            <>
              <DialogClose
                className="!m-0 px-2 flex"
                onClick={() => {
                  setCode(value ?? defaultValue);
                  onCancel?.(code);
                }}
              >
                取消
              </DialogClose>

              <Button
                size={"sm"}
                variant={"outline"}
                className="bg-transparent gap-1 h-8 !mt-0"
                onClick={() => onConfirm?.(code)}
              >
                <SaveIcon className="size-4" />
                保存
              </Button>
            </>
          )}
        </DialogHeader>

        <div className="relative">
          <MonacoEditor
            height={height}
            width={width}
            defaultLanguage={language ?? "javascript"}
            theme="vs-dark"
            value={code}
            options={{
              minimap: { enabled: true },
              readOnly,
              lineNumbersMinChars: 2,
              fontSize: 14,
              wordWrap: "off",
              padding: { top: 56, bottom: 16 },
            }}
            onChange={onCodeChange}
          />
        </div>

        <DialogFooter className="px-4 hidden">
          <div className="mx-auto w-full" />

          <Button size={"sm"} className="w-24 gap-2">
            <CheckIcon className="size-4" />
            完成
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
