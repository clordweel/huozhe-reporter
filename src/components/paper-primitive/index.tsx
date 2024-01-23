import { $paperNode } from "@/lib/store";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export default function PaperPrimitive({ children, className, style }: Props) {
  return (
    <div
      ref={(node) => {
        $paperNode.set(node);
      }}
      className={cn(className)}
      style={style}
    >
      {children}
    </div>
  );
}
