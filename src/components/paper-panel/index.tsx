import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { transparentGridStyle } from "@/lib/utils";
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
        ...transparentGridStyle(10),
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
