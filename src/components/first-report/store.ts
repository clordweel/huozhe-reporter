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

export type TableOld = {
  tip?: string;
  headings: string[];
  rows: Row[];
};

export type Table = {
  tip?: string;
  headings: string[];
  rows: string[][];
};

interface DataOld {
  updated?: number; // 更新时间戳

  title: string;
  subtitle: string;

  heading: string;
  caption: string;

  tables: TableOld[];

  shipmentCaption?: string;
  address: string;
  phone: string;

  headerLogoUrl: string;
  footerLogoUrl: string;
}

interface Data extends Omit<DataOld, "tables"> {
  version: number;
  tables: Table[];
}

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
      Array(tables[tableIndex].headings.length).fill(""),
    ];

    store.setKey("tables", [...tables]);
  }
);

export const addTableCol = action(
  $reportData,
  "add.table.col",
  (store, tableIndex: number) => {
    const tables = store.get().tables;

    const table = tables[tableIndex];

    table.headings = [...table.headings, ""];
    table.rows = [...table.rows.map((row) => [...row, ""])];

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

export const removeTableCol = action(
  $reportData,
  "add.table.row",
  (store, tableIndex: number, index) => {
    const tables = store.get().tables;

    const table = tables[tableIndex];

    table.headings = table.headings.filter((_, i) => i !== index);
    table.rows = table.rows.map((row) => row.filter((_, i) => i !== index));

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
    spanIndex: number,
    value: string
  ) => {
    const tables = store.get().tables;

    tables[tableIndex].rows[rowIndex][spanIndex] = value;

    store.setKey("tables", [...tables]);
  }
);

const isOldData = (data: Data | DataOld): data is DataOld => {
  return !("version" in data);
};

const convertOldData = (old: DataOld): Data => {
  return {
    ...old,
    version: 1,
    tables: old.tables.map((table) => ({
      ...table,
      rows: table.rows.map((row) => Object.values(row)),
    })),
  };
};

export const fetchReportData = action(
  $reportData,
  "fetch.report.data",
  async (store, url: string) => {
    const result = await ambiguous(() => ofetch<Data | DataOld>(url));

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

    if (isOldData(result)) {
      store.set(convertOldData(result));
    } else {
      store.set(result);
    }
    console.log(result, store.get());

    $paperOptions.setKey("name", result.title);
  }
);

onMount($reportData, () => {
  fetchReportData("reports/000.json");
});
