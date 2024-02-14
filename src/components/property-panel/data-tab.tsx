import { TabsContent } from "@radix-ui/react-tabs";
import { OptionsCode } from "../form-base";
import { useStore } from "@nanostores/react";
import { $uploadScript } from "@/store";

export default function DataTab() {
  const code = useStore($uploadScript);

  return (
    <TabsContent value="data">
      <div className="w-full flex gap-1 flex-col">
        <OptionsCode
          id=""
          label="上传执行脚本"
          language="javascript"
          height="60dvh"
          wrap={true}
          readOnly={false}
          value={code}
          onChange={(v) => $uploadScript.set(v)}
        />
      </div>
    </TabsContent>
  );
}
