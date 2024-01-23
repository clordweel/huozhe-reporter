import { FirstReport } from "../first-report";
import { ScrollArea } from "@/components/ui/scroll-area";
import PaperPrimitive from "../paper-primitive";

export default function PaperPanel() {
  return (
    <ScrollArea className="w-full h-[var(--paper-panel-height)]">
      <PaperPrimitive
        className="w-full flex items-start justify-center p-2"
        style={{
          backgroundImage:
            "linear-gradient(45deg, rgba(0, 0, 0, 0.12) 25%, transparent 25%, transparent 75%,rgba(0, 0, 0, 0.12) 75%), linear-gradient(45deg,rgba(0, 0, 0, 0.12) 25%, transparent 25%, transparent 75%, rgba(0, 0, 0, 0.12) 75%)",
          backgroundPosition: "0 0, 10px 10px",
          backgroundSize: "20px 20px",
        }}
      >
        <FirstReport className="shadow-lg" />
      </PaperPrimitive>
    </ScrollArea>
  );
}
