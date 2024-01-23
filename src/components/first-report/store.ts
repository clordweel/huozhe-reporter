import { ambiguous } from "@/lib/utils";
import { action, map, onMount } from "nanostores";
import { ofetch } from "ofetch";
import { toast } from "../ui/use-toast";
import { $paperOptions } from "@/store";

type Row = {
  name: string;
  price: string;
  number: string;
};

export type Table = {
  tip?: string;
  headings: string[];
  rows: Row[];
};

type Data = {
  title: string;
  subtitle: string;

  heading: string;
  caption: string;

  tables: Table[];

  address: string;
  phone: string;

  headerLogoUrl: string;
  footerLogoUrl: string;
};

export const $reportData = map<Data>();

export const addTableRow = action(
  $reportData,
  "add.table.row",
  (store, tableIndex: number) => {
    const tables = store.get().tables;

    tables[tableIndex].rows = [
      ...tables[tableIndex].rows,
      {
        name: "",
        price: "",
        number: "",
      },
    ];

    store.setKey("tables", [...tables]);
  }
);

export const fetchReportData = action(
  $reportData,
  "fetch.report.data",
  async (store, url: string) => {
    const result = await ambiguous(() => ofetch<Data>(url));

    if (typeof result === "string") {
      const isJSON = ambiguous(() => JSON.parse(result));

      if (isJSON instanceof Error) {
        return toast({
          variant: "destructive",
          title: "解析报表 JSON 数据出错",
          description: isJSON.message,
        });
      }

      return toast({
        variant: "destructive",
        title: "获取报表数据出错",
        description: result,
      });
    }

    if (result instanceof Error) {
      return toast({
        variant: "destructive",
        title: "获取报表请求失败",
        description: result.message,
      });
    }

    store.set(result);

    $paperOptions.setKey("name", result.title);
  }
);

onMount($reportData, () => {
  fetchReportData("reports/000.json");
});
