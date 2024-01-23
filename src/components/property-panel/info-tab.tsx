import { TabsContent } from "@radix-ui/react-tabs";
import { OptionsCaption, OptionsInput } from "../form-base";

export default function InfoTab() {
  return (
    <TabsContent value="info">
      <div className="w-full flex gap-1 flex-col">
        <OptionsInput id="" label="文件名" />
        <OptionsInput
          id=""
          label="文件名后缀"
          tip="可用变量：{time}, {date}, {size}"
        />

        <OptionsCaption text="大小信息" className="my-2" />

        <p className="text-sm flex flex-col gap-2 items-center">
          <span>1120 x 2222 像素</span>
        </p>
      </div>
    </TabsContent>
  );
}
