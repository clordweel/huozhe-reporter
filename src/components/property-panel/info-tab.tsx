import { TabsContent } from "@radix-ui/react-tabs";
import { OptionsCaption, OptionsInput } from "../form-base";
import {
  $$paperSizeText,
  $exportData,
  $paperNode,
  $paperOptions,
  defaultSuffix,
} from "@/store";
import { useStore } from "@nanostores/react";
import { useCallback, useEffect, useState } from "react";
import { useToPng } from "@hugocxl/react-to-image";
import { transparentGridStyle } from "@/lib/utils";

let timeout: undefined | number;

export default function InfoTab() {
  const sizeText = useStore($$paperSizeText);
  const { name } = useStore($paperOptions);
  const paperNode = useStore($paperNode);

  const [thumbnail, setThumbnail] = useState<string | undefined>(undefined);

  const [, convertToPng, pngRef] = useToPng<HTMLDivElement>({
    pixelRatio: 0.25,
    onSuccess: (data: string) => {
      setThumbnail(data);
    },
  });

  const thumbnailListener = useCallback(() => {
    timeout && clearTimeout(timeout);

    timeout = window.setTimeout(() => {
      convertToPng();
      clearTimeout(timeout);
    }, 200);
  }, [convertToPng]);

  useEffect(() => {
    if (!paperNode) return;
    const node = paperNode;

    pngRef(node as HTMLDivElement);

    $exportData.listen(thumbnailListener);
    $paperOptions.listen(thumbnailListener);
  }, [convertToPng, paperNode, pngRef, thumbnailListener]);

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
          tip="变量：{date} | {size} | {ext} | {ratio}"
          placeholder={"" + defaultSuffix}
          onChange={(v) => $paperOptions.setKey("suffix", v)}
        />

        <OptionsCaption text="预览" className="my-2" />

        <section className="text-xs flex flex-col gap-2 items-center">
          <figure
            className="h-56 w-full flex justify-center items-center shadow-inner p-2"
            style={{ ...transparentGridStyle(5) }}
          >
            {thumbnail && (
              <img src={thumbnail} className="h-full w-auto" alt="" />
            )}
          </figure>

          <span>{sizeText} 像素</span>
        </section>

        <OptionsCaption text="备注" className="my-2" />

        <pre className="text-xs text-wrap">
          <span className="font-bold">1· 添加表格列：</span>
          鼠标移动到“表头”后会出现添加按钮，点击即可新增列。
        </pre>

        <pre className="text-xs text-wrap">
          <span className="font-bold">2· 缩放 & 保存图纸：</span>
          缩放仅用于预览，保存为图片时，图纸会自动缩放到 100% 再触发下载。
        </pre>

        <pre className="text-xs text-wrap">
          <span className="font-bold">3· 文件名 & 后缀：</span>
          默认从报表标题获取初始文件名；后缀支持使用模板变量。
        </pre>

        <pre className="text-xs text-wrap">
          <span className="font-bold">4· 导入 & 导出：</span>
          格式为 JSON 对象，只支持从此编辑器导出的数据文件。
        </pre>

        {!window.__TAURI__ && (
          <>
            <pre className="text-xs text-wrap">
              <span className="font-bold">5· 基础模板：</span>
              路径 `./dist/reports`
              下存在基础报表模板，默认从该模板加载初始数据。
            </pre>
          </>
        )}
      </div>
    </TabsContent>
  );
}
