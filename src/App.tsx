import EditorPanel from "./components/editor-panel";
import PropertyPanel from "./components/property-panel";
import ToolbarPanel from "./components/toolbar-panel";

import { cn } from "./lib/utils";

export default function App() {
  const cssVariables = {
    "--editor-pabel-height": "calc(100dvh - 142px)",
  } as Record<string, string>;

  return (
    <>
      <div className="h-[100dvh] w-[100dvw]" style={{ ...cssVariables }}>
        <div className="h-full w-full grid gap-2 grid-cols-[1fr_360px] grid-rows-[52px_1fr_42px] p-4">
          <header
            className={cn("col-span-2", "outline outline-1 flex items-center")}
          >
            <ToolbarPanel />
          </header>

          <main className={cn("col-span-1", "outline outline-1")}>
            <EditorPanel />
          </main>

          <aside className={cn("col-span-1", "outline outline-1")}>
            <PropertyPanel />
          </aside>

          <footer className={cn("col-span-2", "outline outline-1")}>
            foot
          </footer>
        </div>
      </div>
    </>
  );
}
