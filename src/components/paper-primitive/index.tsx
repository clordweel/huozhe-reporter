import { cn } from "@/lib/utils";
import { useStore } from "@nanostores/react";
import { $paperScale, setPaperNode } from "@/store";
import { useRef } from "react";
import { useMount } from "react-use";

interface Props {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export default function PaperPrimitive({ children, className, style }: Props) {
  const scale = useStore($paperScale);

  const ref = useRef(null);

  useMount(() => {
    ref.current && setPaperNode(ref.current);
  });

  return (
    <div
      ref={ref}
      className={cn(
        className,
        {
          "150": "scale-150",
          "125": "scale-125",
          "100": "scale-100",
          "90": "scale-90",
          "75": "scale-75",
          "50": "scale-50",
        }[scale]
      )}
      style={style}
    >
      {children}
    </div>
  );
}
