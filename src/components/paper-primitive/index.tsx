import { cn } from "@/lib/utils";
import { useStore } from "@nanostores/react";
import { $paperOptions, $paperScale, $paperWdith, setPaperNode } from "@/store";
import { useRef } from "react";
import { useMount } from "react-use";

interface Props {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export default function PaperPrimitive({ children, className, style }: Props) {
  const scale = useStore($paperScale);
  const paperWidth = useStore($paperWdith);
  const { radius, border, shadow, styles } = useStore($paperOptions);

  const ref = useRef(null);

  useMount(() => {
    ref.current && setPaperNode(ref.current);
  });

  return (
    <>
      <div ref={ref} className={cn(shadow && "p-2")}>
        <style>{styles}</style>
        <figure
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
            }[scale],

            "Paper"
          )}
          style={{
            ...style,
            borderRadius: `${radius}px`,
            width: `${paperWidth}px`,
            minHeight: "640px",
            backgroundColor: "var(--backgroundColor)",
          }}
        >
          {children}
        </figure>
      </div>
    </>
  );
}
