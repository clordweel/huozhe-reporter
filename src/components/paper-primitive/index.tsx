import { cn } from "@/lib/utils";
import { useStore } from "@nanostores/react";
import { $paperOptions, $paperScale, setPaperNode } from "@/store";
import { useRef } from "react";
import { useMount } from "react-use";

interface Props {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export default function PaperPrimitive({ children, className, style }: Props) {
  const scale = useStore($paperScale);
  const { radius, border, shadow } = useStore($paperOptions);

  const ref = useRef(null);

  useMount(() => {
    ref.current && setPaperNode(ref.current);
  });

  return (
    <figure ref={ref} className={cn(shadow && "p-2")}>
      <div
        className={cn(
          "font-sans origin-top flex flex-col overflow-clip",
          shadow && "shadow-lg shadow-primary/25",
          border && "border",
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
        style={{ ...style, borderRadius: `${radius}px` }}
      >
        {children}
      </div>
    </figure>
  );
}
