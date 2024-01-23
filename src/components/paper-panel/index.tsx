import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { $paperOptions } from "@/store";
import { useStore } from "@nanostores/react";

interface Props {
  children: React.ReactNode;
}

export default function PaperPanel({ children }: Props) {
  const { backgroundColor, textColor, primaryColor, secondaryColor } =
    useStore($paperOptions);

  return (
    <ScrollArea
      className="w-[var(--paper-panel-width)] h-[var(--paper-panel-height)]"
      style={{
        backgroundImage:
          "linear-gradient(45deg, rgba(0, 0, 0, 0.12) 25%, transparent 25%, transparent 75%,rgba(0, 0, 0, 0.12) 75%), linear-gradient(45deg,rgba(0, 0, 0, 0.12) 25%, transparent 25%, transparent 75%, rgba(0, 0, 0, 0.12) 75%)",
        backgroundPosition: "0 0, 10px 10px",
        backgroundSize: "20px 20px",
        ...({
          "--textColor": textColor,
          "--backgroundColor": backgroundColor,
          "--primaryColor": primaryColor,
          "--secondaryColor": secondaryColor,
        } as Record<string, string>),
      }}
    >
      <figure className="w-full flex items-start justify-center p-2">
        {children}
      </figure>

      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
