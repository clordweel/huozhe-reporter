import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { ColorPickerPopup } from "./color-picker";
import { cn } from "@/lib/utils";
import {
  CodeIcon,
  DeleteIcon,
  FullscreenIcon,
  ImageIcon,
  InfoIcon,
  XIcon,
} from "lucide-react";
import { useState, type ReactNode, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { Check, ChevronsUpDown } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";
import { useUpdateEffect } from "react-use";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";

import MonacoEditor from "@monaco-editor/react";
import CodeDialog from "./code-dialog";

export function OptionsCaption({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <div className={cn("w-full grid grid-cols-3 items-center px-2", className)}>
      <Separator />
      <h4 className="text-center text-xs text-slate-500">{text}</h4>
      <Separator />
    </div>
  );
}

export function OptionsSectionItem({
  children,
  label,
  id,
  dir = "row",
  tip,
}: {
  children: React.ReactNode;
  label?: string;
  id?: string;
  dir?: "col" | "row";
  tip?: string;
}) {
  const ItemLabel = () =>
    !!label &&
    (!id ? (
      <div className="pl-1 text-slate-500 flex-shrink-0 flex text-sm cursor-default">
        {label}
      </div>
    ) : (
      <Label htmlFor={id} className="text-slate-500 flex-shrink-0 flex">
        {label}
      </Label>
    ));

  return (
    <section
      className={cn(
        "px-2 py-2 flex gap-2 justify-between relative",
        { row: "items-center", col: "flex-col" }[dir]
      )}
    >
      {tip ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="flex gap-1">
              <ItemLabel />
              <InfoIcon className="h-2 w-2 text-slate-400" />
            </TooltipTrigger>
            <TooltipContent>
              <p>{tip}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        <ItemLabel />
      )}
      {children}
    </section>
  );
}

type ItemProps = {
  id: string;
  label: string;

  value?: unknown;
  defaultValue?: unknown;

  placeholder?: string;
  readonly?: boolean;
  disabled?: boolean;
  tip?: string;
};

export function OptionsInput({
  label,
  id,
  type,
  max,
  min,
  defaultValue,
  onChange,
  onBlur,
  className,
  disabled,
  placeholder,
  tip,
}: ItemProps & {
  type?: "text" | "number";
  defaultValue?: string | number;
  value?: string | number;
  max?: number;
  min?: number;
  className?: string;
  onChange?: (v: string) => void;
  onBlur?: (v: string) => void;
}) {
  return (
    <OptionsSectionItem label={label} id={id} tip={tip}>
      <Input
        id={id}
        className={cn("w-42 h-8", className)}
        defaultValue={defaultValue}
        max={max}
        min={min}
        type={type}
        disabled={disabled}
        placeholder={placeholder}
        onChange={(e) => onChange && onChange(e.target.value)}
        onBlur={(e) => onBlur && onBlur(e.target.value)}
      />
    </OptionsSectionItem>
  );
}

export function OptionsTextarea({
  id,
  label,
  value,
  defaultValue,
  onChange,
  onBlur,
  children,
  className,
  readonly,
  disabled,
  placeholder,
}: ItemProps & {
  value?: string;
  defaultValue?: string;
  onChange?: (v: string) => void;
  children?: ReactNode;
  className?: string;
  onBlur?: (v: string) => void;
}) {
  return (
    <OptionsSectionItem label={label} id={id} dir="col">
      <Textarea
        id={id}
        placeholder={placeholder ?? "..."}
        value={value}
        defaultValue={defaultValue}
        onChange={(e) => onChange && onChange(e.target.value)}
        className={cn(className)}
        readOnly={readonly}
        disabled={disabled}
        onBlur={(e) => onBlur && onBlur(e.target.value)}
      />
      {children}
    </OptionsSectionItem>
  );
}

export function OptionsImage({
  label,
  id,
  src,
  onChange,
}: ItemProps & {
  value?: string | null;
  src?: string | null;
  onChange?: (src: string | null) => void;
}) {
  console.log(src);

  const onInput: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    const file = e.target.files?.item(0);

    if (!file) return toast({ title: "未选择文件" });

    // 设置（去除多余参数的）图片
    const url = `result.url.split('?')[0]`;

    onChange && onChange(url);

    return toast({
      title: "上传成功",
      variant: "default",
    });
  };

  return (
    <OptionsSectionItem label={label} dir="col">
      <Input
        id={id}
        type="file"
        className="hidden"
        multiple={false}
        onInput={onInput}
      />
      {!src ? (
        <Label
          htmlFor={id}
          className={cn(
            "w-full h-24 outline-dashed outline-1 outline-slate-200",
            "cursor-pointer flex items-center justify-center rounded-lg"
          )}
        >
          <ImageIcon className="h-12 w-12 text-slate-200" />
        </Label>
      ) : (
        <div>
          <img
            src={src ?? undefined}
            alt="image"
            className={cn("rounded-lg object-cover", "w-full h-24")}
          />
        </div>
      )}
      {!!src && (
        <Button
          variant="destructive"
          size="icon"
          className="absolute top-4 right-1 w-6 h-6 rounded-full p-1"
          onClick={() => onChange && onChange("")}
        >
          <XIcon />
        </Button>
      )}
    </OptionsSectionItem>
  );
}

export function OptionsSwitch({
  label,
  id,
  defaultChecked,
  onChange,
}: ItemProps & {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: ((checked: boolean) => void) | undefined;
}) {
  return (
    <OptionsSectionItem label={label} id={id}>
      <Switch
        id={id}
        defaultChecked={defaultChecked}
        onCheckedChange={onChange}
      />
    </OptionsSectionItem>
  );
}

export function OptionsColor({
  label,
  id,
  color,
  onChange,
}: ItemProps & { color?: string; onChange?: (color?: string) => void }) {
  return (
    <OptionsSectionItem label={label} id={id}>
      {!!color && (
        <Button
          variant="ghost"
          size="icon"
          className="w-6 h-4 ml-auto -mr-2"
          onClick={() => onChange && onChange("")}
        >
          <DeleteIcon className="h-4 text-destructive" />
        </Button>
      )}
      <ColorPickerPopup id={id} color={color} onChange={onChange} />
    </OptionsSectionItem>
  );
}

export type OptionsComboxValue = {
  label: string;
  value: string;
  disabled?: boolean;
};

export function OptionsCombox({
  label,
  id,
  placeholder,
  items = [],
  defaultValue,
  value,
  onChange,
  onValueChange,
  onOpenChange,
  triggerClassName,
  contentClassName,
  disabled,
  render,
}: ItemProps & {
  items?: OptionsComboxValue[];
  defaultValue?: OptionsComboxValue;
  value?: OptionsComboxValue;
  onChange?: (value?: string) => void;
  onValueChange?: (value?: OptionsComboxValue) => void;
  onOpenChange?: (open: boolean) => void;
  triggerClassName?: string;
  contentClassName?: string;
  render?: (item: OptionsComboxValue) => ReactNode;
}) {
  const [open, setOpen] = useState(false);

  const [selected, setSelected] = useState<OptionsComboxValue | undefined>(
    value ?? defaultValue
  );

  useUpdateEffect(() => {
    onValueChange && onValueChange(selected);
    onChange && onChange(selected?.value);

    setOpen(false);
  }, [selected]);

  return (
    <OptionsSectionItem label={label} dir="col">
      <Popover
        onOpenChange={(opened) => {
          setOpen(opened);
          onOpenChange?.(opened);
        }}
        open={open}
      >
        <PopoverTrigger disabled={disabled} asChild>
          <Button
            variant="outline"
            role="combobox"
            className={cn(
              "w-full justify-start text-slate-400",
              !!selected?.value && "text-slate-800",
              triggerClassName
            )}
          >
            <span className="w-full overflow-hidden text-left text-ellipsis">
              {selected?.value ? selected.label : placeholder ?? "未选择"}
            </span>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className={cn("w-60 p-0", contentClassName)} asChild>
          <Command>
            <CommandInput id={id} placeholder="搜索..." />
            <CommandEmpty>空</CommandEmpty>
            <CommandGroup>
              <ScrollArea className="w-full h-[50vh]">
                {!!items &&
                  !!items?.length &&
                  items.map((item) => (
                    <CommandItem
                      value={item.label}
                      key={item.value}
                      disabled={item.disabled}
                      onSelect={() => !item.disabled && setSelected(item)}
                      className={cn(
                        "px-0",
                        item.disabled && "hover:bg-transparent"
                      )}
                    >
                      {render ? (
                        render(item)
                      ) : (
                        <>
                          <Check
                            className={cn(
                              "mr-1 h-4 w-4 shrink-0",
                              selected?.value === item.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          <span className="text-xs">{item.label}</span>
                        </>
                      )}
                    </CommandItem>
                  ))}
              </ScrollArea>
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </OptionsSectionItem>
  );
}

export function OptionsSelect<Value extends string>({
  id,
  label,
  items,
  value,
  defaultValue,
  contentClass,
  triggerClass,
  onValueChange,
  tip,
}: ItemProps & {
  items: { label: string; value: Value }[];
  value?: Value;
  defaultValue?: Value;
  contentClass?: string;
  triggerClass?: string;
  onValueChange?: (value: Value) => void;
}) {
  return (
    <OptionsSectionItem {...{ label, tip }}>
      <Select
        defaultValue={defaultValue}
        value={value}
        onValueChange={onValueChange}
      >
        <SelectTrigger className={cn("w-32 h-8 text-xs", triggerClass)}>
          <SelectValue
            id={id}
            className={cn(
              "w-6 justify-start text-slate-400"
              // !!selected?.value && 'text-slate-800',
            )}
            placeholder="..."
          />
        </SelectTrigger>
        <SelectContent className={cn("w-32 min-w-0 p-0", contentClass)}>
          {items.map((item) => (
            <SelectItem key={item.value} value={item.value} className="text-xs">
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </OptionsSectionItem>
  );
}

export function OptionsCode({
  id,
  label,
  language,
  height = "16rem",
  defaultValue = "",
  value = "",
  onChange,
}: ItemProps & {
  language?: string;
  height?: string;
  defaultValue?: string;
  value?: string;
  onChange?: (val: string) => void;
}) {
  const [code, setCode] = useState(value || defaultValue);
  const [open, setOpen] = useState(false);

  const onCodeChange = useCallback(
    (val: string = "") => {
      setCode(val);
      onChange?.(val);
    },
    [onChange]
  );

  return (
    <>
      <OptionsSectionItem id={id} dir="col">
        <nav
          className={cn(
            "absolute z-50 border-b border-slate-500 backdrop-blur-sm bg-opacity-20 bg-slate-300 left-2 right-2",
            "flex items-center h-8 px-2 gap-1",
            "text-xs text-slate-400"
          )}
        >
          <CodeIcon className="size-4 text-slate-200" />
          <span className="text-slate-200">{label}</span>
          <div className="mx-auto"></div>
          <FullscreenIcon
            className="size-4 hover:text-slate-200 transition-colors duration-200 cursor-pointer"
            onClick={() => setOpen(true)}
          />
        </nav>

        <MonacoEditor
          height={height}
          defaultLanguage={language || "javascript"}
          theme="vs-dark"
          value={code}
          options={{
            minimap: { enabled: false },
            lineNumbersMinChars: 2,
            fontSize: 12,
            padding: { top: 34 },
            wordWrap: "on",
            readOnly: true,
          }}
          onChange={(v) => onCodeChange(v)}
        />
      </OptionsSectionItem>

      <CodeDialog
        defaultValue={code}
        onConfirm={(v) => {
          onCodeChange(v);
          setOpen(false);
        }}
        open={open}
        onOpenChange={setOpen}
      />
    </>
  );
}
