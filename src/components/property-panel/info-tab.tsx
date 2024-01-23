import { TabsContent } from "@radix-ui/react-tabs";
import { OptionsCaption, OptionsInput } from "../form-base";
import { $$paperSizeText, $paperOptions, defaultSuffix } from "@/store";
import { useStore } from "@nanostores/react";

export default function InfoTab() {
  const sizeText = useStore($$paperSizeText);
  const { name } = useStore($paperOptions);

  return (
    <TabsContent value="info">
      <div className="w-full flex gap-1 flex-col">
        <OptionsInput
          id=""
          label="文件名"
          defaultValue={name}
          onChange={(v) => $paperOptions.setKey("name", v)}
        />
        <OptionsInput
          id=""
          label="文件名后缀"
          tip="变量：{date} | {size} | {ext}"
          placeholder={'默认：' + defaultSuffix}
          onChange={(v) => $paperOptions.setKey("suffix", v)}
        />

        <OptionsCaption text="大小信息" className="my-2" />

        <p className="text-xs flex flex-col gap-2 items-center">
          <span>{sizeText} 像素</span>
        </p>
      </div>
    </TabsContent>
  );
}
