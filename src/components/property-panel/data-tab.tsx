import { TabsContent } from "@radix-ui/react-tabs";
import { OptionsCode } from "../form-base";
import { useStore } from "@nanostores/react";
import { $exportData } from "@/store";
import { ambiguous } from "@/lib/utils";

export default function DataTab() {
  const data = useStore($exportData) as string;
  const code = ambiguous(() => JSON.stringify(data, null, 4));

  return (
    <TabsContent value="data">
      <div className="w-full flex gap-1 flex-col">
        <OptionsCode
          id=""
          label="JSON 导出数据预览"
          language="json"
          height="60dvh"
          value={code instanceof Error ? "" : (code as string)}
        />
      </div>
    </TabsContent>
  );
}
