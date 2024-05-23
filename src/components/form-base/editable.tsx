import { cn } from "@/lib/utils";
import {
  FormEventHandler,
  useCallback,
  useDeferredValue,
  useState,
} from "react";
import { useUpdateEffect } from "react-use";

interface Props {
  type?: "text";
  className?: string;
  defaultValue?: string;
  value?: string;
  onInput?: (value: string) => void;
  onFinish?: (value: string) => void;
}

export default function Editable({
  type,
  className,
  value: _value,
  defaultValue,
  onInput,
  onFinish,
}: Props) {
  const [value_, setValue] = useState(_value ?? (defaultValue || ""));
  const value = useDeferredValue(value_);

  useUpdateEffect(() => {
    if (value !== _value) setValue(_value ?? "");
  }, [_value]);

  const handleChange = useCallback<FormEventHandler<HTMLElement>>(
    (ev) => {
      const content = (ev.target as HTMLElement).textContent ?? "";

      onInput && onInput(content);
    },
    [onInput]
  );
  const handleFinish = useCallback<FormEventHandler<HTMLElement>>(
    (ev) => {
      const content = (ev.target as HTMLElement).textContent ?? "";
      onFinish && onFinish(content); // 失去焦点时触发
    },
    [onFinish]
  );

  return (
    <i
      data-type={type}
      contentEditable
      suppressContentEditableWarning={true}
      onInput={handleChange}
      onBlur={handleFinish}
      className={cn("block not-italic w-full h-full", className)}
    >
      {value}
    </i>
  );
}
