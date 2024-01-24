import { FirstReport } from "./components/first-report";
import PaperPanel from "./components/paper-panel";
import PropertyPanel from "./components/property-panel";
import ToolbarPanel from "./components/toolbar-panel";
import { Toaster } from "./components/ui/toaster";

import { cn } from "./lib/utils";

export default function App() {
  const cssVariables = {
    "--paper-panel-height": "calc(100dvh - 92px)",
    "--paper-panel-width": "calc(100dvw - 400px)",
  } as Record<string, string>;

  return (
    <>
      <div
        className="h-[100dvh] w-[100dvw] bg-slate-50"
        style={{ ...cssVariables }}
      >
        <div className="h-full w-full grid gap-2 grid-cols-[1fr_360px] grid-rows-[52px_1fr] p-4">
          <header
            className={cn(
              "col-span-2",
              "bg-white shadow outline outline-1 outline-slate-300 rounded flex items-center"
            )}
          >
            <ToolbarPanel />
          </header>

          <main
            className={cn(
              "col-span-1",
              "bg-white shadow outline outline-1 outline-slate-300 rounded"
            )}
          >
            <PaperPanel>
              <FirstReport />
            </PaperPanel>
          </main>

          <aside
            className={cn(
              "col-span-1",
              "bg-white shadow outline outline-1 outline-slate-300 rounded"
            )}
          >
            <PropertyPanel />
          </aside>
        </div>
      </div>

      <Toaster />
    </>
  );
}
