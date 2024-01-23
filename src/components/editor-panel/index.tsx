import { FirstReport } from "../first-report";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function EditorPanel() {
  return (
    <ScrollArea className="w-full h-[var(--editor-pabel-height)]">
      <div
        className="w-full flex items-start justify-center p-2"
        style={{
          backgroundImage:
            "linear-gradient(45deg, rgba(0, 0, 0, 0.12) 25%, transparent 25%, transparent 75%,rgba(0, 0, 0, 0.12) 75%), linear-gradient(45deg,rgba(0, 0, 0, 0.12) 25%, transparent 25%, transparent 75%, rgba(0, 0, 0, 0.12) 75%)",
          backgroundPosition: "0 0, 10px 10px",
          backgroundSize: "20px 20px",
        }}
      >
        <FirstReport className="shadow-lg" />
      </div>
    </ScrollArea>
  );
}
