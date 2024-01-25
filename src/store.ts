import { action, atom, computed, map, onMount } from "nanostores";
import { downloadAsFile, nextTick, sleep } from "./lib/utils";
import { toast } from "./components/ui/use-toast";
import { getVersion } from "@tauri-apps/api/app";
import { checkUpdate, installUpdate } from "@tauri-apps/api/updater";
import { relaunch } from "@tauri-apps/api/process";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/zh-cn";

dayjs.locale("zh-cn");
dayjs.extend(customParseFormat);
dayjs.extend(relativeTime);

export type ValueItem = { value: string; label: string };

export const $paperNode = atom<HTMLDivElement | null>(null);

export type propertyPanelValue = "info" | "options" | "data";

export const propertyPanelItems: {
  value: propertyPanelValue;
  label: string;
}[] = [
  { value: "info", label: "报表信息" },
  {
    value: "options",
    label: "画纸选项",
  },
  {
    value: "data",
    label: "数据",
  },
];

export const $propertyPanelValue = atom<propertyPanelValue>("info");

export const switchPropertyPanelValue = action(
  $propertyPanelValue,
  "switch.options.pabel.value",
  (store, value: string) => {
    if (!value) return;

    store.set(value as propertyPanelValue);
  }
);

export const $paperWdith = atom<number>(640);

export const $paperRealSize = atom<{ width: number; height: number }>({
  width: 0,
  height: 0,
});

export const $$paperSizeText = computed(
  $paperRealSize,
  ({ width, height }) => `${width}x${height}`
);

export const $paperObserver = atom<ResizeObserver | null>(null);

export const setPaperNode = action(
  $paperNode,
  "set.paper.node",
  (store, node: HTMLDivElement) => {
    store.set(node);

    nextTick(() => {
      if ($paperObserver.get()) return;

      const ob = new ResizeObserver(
        ([
          {
            contentRect: { width, height },
          },
        ]) => {
          $paperRealSize.set({ width, height });
        }
      );
      $paperObserver.set(ob);

      ob.observe(node);
    });
  }
);

export const scaleItems: ValueItem[] = [
  { value: "150", label: "150%" },
  { value: "125", label: "125%" },
  { value: "100", label: "100%" },
  { value: "90", label: "90%" },
  { value: "75", label: "75%" },
  { value: "50", label: "50%" },
];

export const $paperScale = atom<string>("100");

export const resetPaperScale = action(
  $paperScale,
  "reset.paper.scale",
  (store) => {
    store.set("100");
  }
);

export const imageTypeItems: ValueItem[] = [
  { value: "jpeg", label: "JPEG" },
  { value: "png", label: "PNG" },
];

export const imageRatioItems: ValueItem[] = [
  { value: "1", label: "x1" },
  { value: "2", label: "x2" },
  { value: "3", label: "x3" },
  { value: "4", label: "x4" },
  { value: "5", label: "x5" },
];

export type PaperOptions = {
  name?: string;
  suffix?: string;

  imageType: "jpeg" | "png";
  imageRatio: number;

  backgroundColor?: string;
  textColor?: string;
  primaryColor?: string;
  secondaryColor?: string;

  border: boolean;
  radius: number;
  shadow: boolean;
  shadowColor?: string;
  shadowBlur?: number;

  styles?: string;
};

export const $paperOptions = map<PaperOptions>({
  imageRatio: 2,
  imageType: "png",
  backgroundColor: "#ffffff",
  textColor: "#172645",
  primaryColor: "#172645",
  secondaryColor: "#ec7558",

  border: true,
  radius: 10,
  shadow: false,
});

export const defaultStyles = `/** 自定义全局样式覆盖 */
.Paper { /* 画纸 */ }
.Header { /* 表头 */ }
.Intro { /* 引导说明 */ }
.Table { /* 表格 */ }
.Footer { /* 页脚 */ }
`;

export const setCustomStyles = action(
  $paperOptions,
  "set.custom.styles",
  (store, value: string) => {
    store.setKey("styles", value);
  }
);

export const defaultSuffix = "-{date}@x{ratio}.{ext}";
export const defaultName = "未命名报表";

export const $$paperFilename = computed(
  [$paperOptions, $$paperSizeText],
  ({ name = defaultName, imageType, suffix = defaultSuffix, imageRatio }) => {
    const data = {
      date: dayjs().format("YYYY-MM-DD"),
      size: $$paperSizeText.get(),
      ext: imageType,
      ratio: imageRatio.toString(),
    };

    const extra = suffix.replace(
      /\{(date|size|ext|ratio)\}/g,
      (_, v: keyof typeof data) => (v ? data[v] : v)
    );

    return `${name}${extra}`;
  }
);

$$paperFilename.listen((name) => {
  document.head.querySelector("title")!.textContent = `报表设计: ${name}`;
});

export type JSONData = {
  headerLogoUrl?: string;
  footerLogoUrl?: string;
};

export const $importData = map<JSONData>();
export const $exportData = map<JSONData>();

export const importJSON = action(
  $importData,
  "import.json",
  (store, text?: string) => {
    if (!text) return;

    try {
      const json = JSON.parse(text);

      const { data, ...options } = json;

      if (!data) throw new Error("数据为空");

      store.set(data);

      $paperOptions.set(options);
    } catch (error) {
      toast({
        title: "导入失败",
        description: `${error}`,
        variant: "destructive",
      });
    }
  }
);

export const exportJSON = action($paperOptions, "export.json", (store) => {
  const options = store.get();
  const json = JSON.stringify({ ...options, data: $exportData.get() });

  downloadAsFile(json, `${options.name}.json`);
});

export const $updateDialogOpened = atom(false);

export const $localVersion = atom('0.0.0');

export const $remoteVersion = atom<string | null>(null);
export const $updateContent = atom<string | null>(null);

export const getAppVersion = action(
  $localVersion,
  "get.app.version",
  async (store) => {
    store.set(await getVersion());
  }
);

export const checkAppUpdate = action(
  $remoteVersion,
  "check.app.update",
  async (store, dialog: boolean = true) => {
    try {
      const { shouldUpdate, manifest } = await checkUpdate();

      if (shouldUpdate) {
        dialog && $updateDialogOpened.set(true);

        console.log(
          `Installing update ${manifest?.version}, ${manifest?.date}, ${manifest?.body}`
        );

        store.set(manifest?.version ?? null);

        $updateContent.set(manifest?.body ?? null);
      }
    } catch (error) {
      console.error(error);
    }
  }
);

export const $installAppLoading = atom(false);

export const installAppUpdate = action(
  $installAppLoading,
  "install.app.update",
  async (store) => {
    store.set(true);

    try {
      await sleep(2000);

      // 安装更新
      await installUpdate();

      // 重启应用
      await relaunch();
    } catch (error) {
      toast({
        title: "安装更新失败",
        description: "请检查网络或稍后重试",
        variant: "destructive",
      });

      console.error(error);
    }

    store.set(false);
  }
);

onMount($remoteVersion, () => {
  getAppVersion();
});
