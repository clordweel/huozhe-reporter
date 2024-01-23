import { $paperNode } from "@/lib/store";
import { cn } from "@/lib/utils";
import { useStore } from "@nanostores/react";
import { $paperScale } from "@/lib/store";

interface Props {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export default function PaperPrimitive({ children, className, style }: Props) {
  const scale = useStore($paperScale);
  return (
    <div
      ref={(node) => {
        $paperNode.set(node);
      }}
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
