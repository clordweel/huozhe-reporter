import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface Props {
  children: React.ReactNode;
}

export default function PaperPanel({ children }: Props) {
  return (
    <ScrollArea
      className="w-[var(--paper-panel-width)] h-[var(--paper-panel-height)]"
      style={{
        backgroundImage:
          "linear-gradient(45deg, rgba(0, 0, 0, 0.12) 25%, transparent 25%, transparent 75%,rgba(0, 0, 0, 0.12) 75%), linear-gradient(45deg,rgba(0, 0, 0, 0.12) 25%, transparent 25%, transparent 75%, rgba(0, 0, 0, 0.12) 75%)",
        backgroundPosition: "0 0, 10px 10px",
        backgroundSize: "20px 20px",
      }}
    >
      <figure className="w-full flex items-start justify-center p-2">
        {children}
      </figure>

      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
