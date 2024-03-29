import { TabsContent } from "@radix-ui/react-tabs";
import {
  OptionsCaption,
  OptionsCode,
  OptionsColor,
  OptionsImageTauri,
  OptionsInput,
  OptionsSlider,
  OptionsSwitch,
} from "../form-base";
import { useStore } from "@nanostores/react";
import {
  $exportData,
  $paperOptions,
  defaultStyles,
  setCustomStyles,
} from "@/store";
import { $reportData } from "../first-report/store";
import { debounce } from "@/lib/utils";

export default function OptionsTab() {
  const {
    backgroundColor,
    textColor,
    primaryColor,
    secondaryColor,
    radius,
    border,
    shadow,
    styles,
  } = useStore($paperOptions);

  const { headerLogoUrl, footerLogoUrl } = useStore($exportData);

  return (
    <TabsContent value="options">
      <div className="w-full flex gap-1 flex-col pt-1">
        <OptionsCode
          id=""
          label="自定义样式"
          height="12rem"
          value={styles ?? defaultStyles}
          language="css"
          readOnly={false}
          onChange={debounce(setCustomStyles, 1000)}
        />

        <OptionsCaption text="颜色" />

        <OptionsColor
          id=""
          label="主要颜色"
          color={primaryColor}
          defaultValue={primaryColor}
          onChange={(v) => $paperOptions.setKey("primaryColor", v)}
        />

        <OptionsColor
          id=""
          label="次级颜色"
          color={secondaryColor}
          defaultValue={secondaryColor}
          onChange={(v) => $paperOptions.setKey("secondaryColor", v)}
        />

        <OptionsColor
          id=""
          label="图纸背景颜色"
          color={backgroundColor}
          defaultValue={backgroundColor}
          onChange={(v) => $paperOptions.setKey("backgroundColor", v)}
        />

        <OptionsColor
          id=""
          label="图纸文字颜色"
          color={textColor}
          defaultValue={textColor}
          onChange={(v) => $paperOptions.setKey("textColor", v)}
        />

        <OptionsCaption text="边框" className="my-4" />

        <OptionsSwitch
          id=""
          label="边缘阴影"
          defaultChecked={shadow}
          onChange={(v) => $paperOptions.setKey("shadow", v)}
        />

        <OptionsSwitch
          id=""
          label="边框线条"
          defaultChecked={border}
          onChange={(v) => $paperOptions.setKey("border", v)}
        />

        <OptionsSlider
          id=""
          label="图片圆角"
          defaultValue={[radius]}
          className="w-32 bg-slate-50"
          onChange={(v) => $paperOptions.setKey("radius", v[0])}
        />

        <OptionsCaption text="图像" className="my-4" />

        {window?.__TAURI__ ? (
          <>
            <OptionsImageTauri
              src={headerLogoUrl}
              id="__header_logo"
              label="表头 Logo"
              onChange={(v) => $reportData.setKey("headerLogoUrl", v ?? "")}
            />
            <OptionsImageTauri
              src={footerLogoUrl}
              id="__footer_logo"
              label="页脚 Logo"
              onChange={(v) => $reportData.setKey("footerLogoUrl", v ?? "")}
            />
          </>
        ) : (
          <>
            <OptionsInput
              id=""
              label="表头 Logo 地址"
              defaultValue={headerLogoUrl}
              className="text-xs"
              onBlur={(v) => $reportData.setKey("headerLogoUrl", v)}
            />
            <OptionsInput
              id=""
              label="页底 Logo 地址"
              defaultValue={footerLogoUrl}
              className="text-xs"
              onBlur={(v) => $reportData.setKey("footerLogoUrl", v)}
            />
          </>
        )}
      </div>
    </TabsContent>
  );
}
