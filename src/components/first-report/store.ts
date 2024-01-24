import { ambiguous } from "@/lib/utils";
import { action, map, onMount, onSet } from "nanostores";
import { ofetch } from "ofetch";
import { toast } from "../ui/use-toast";
import { $exportData, $importData, $paperOptions } from "@/store";

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
  updated?: number; // 更新时间戳

  title: string;
  subtitle: string;

  heading: string;
  caption: string;

  tables: Table[];

  shipmentCaption?: string;
  address: string;
  phone: string;

  headerLogoUrl: string;
  footerLogoUrl: string;
};

export const $reportData = map<Data>();

onSet($reportData, async ({ newValue: data }) => {
  $exportData.set(data);
});

onSet($importData, ({ newValue: data }) => {
  $reportData.set(data as Data);
});

export const setTable = action(
  $reportData,
  "set.table",
  (store, tableIndex: number, key: keyof Pick<Table, "tip">, value: string) => {
    const tables = store.get().tables;

    tables[tableIndex][key] = value;

    store.setKey("tables", [...tables]);
  }
);

export const setTableHeader = action(
  $reportData,
  "set.table.header",
  (store, tableIndex: number, headerIndex, value: string) => {
    const tables = store.get().tables;

    tables[tableIndex].headings[headerIndex] = value;

    store.setKey("tables", [...tables]);
  }
);

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

export const removeTableRow = action(
  $reportData,
  "add.table.row",
  (store, tableIndex: number, rowIndex) => {
    const tables = store.get().tables;

    tables[tableIndex].rows = tables[tableIndex].rows.filter(
      (_, i) => i !== rowIndex
    );

    store.setKey("tables", [...tables]);
  }
);

export const setTableRow = action(
  $reportData,
  "set.table.row",
  (
    store,
    tableIndex: number,
    rowIndex: number,
    key: "name" | "price" | "number",
    value: string
  ) => {
    const tables = store.get().tables;

    tables[tableIndex].rows[rowIndex][key] = value;

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
