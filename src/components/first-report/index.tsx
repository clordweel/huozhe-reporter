import { cn } from "@/lib/utils";
import PaperPrimitive from "../paper-primitive";
import { useStore } from "@nanostores/react";
import { $paperWdith } from "@/store";
import { DeleteIcon, ListPlusIcon, TruckIcon } from "lucide-react";
import {
  $reportData,
  Table,
  addTableRow,
  removeTableRow,
  setTable,
  setTableHeader,
  setTableRow,
} from "./store";
import { Button } from "../ui/button";
import Editable from "../form-base/editable";

interface Props {
  className?: string;
}

export function FirstReport({ className }: Props) {
  const paperWidth = useStore($paperWdith);
  const { tables } = useStore($reportData);

  return (
    <PaperPrimitive
      className={cn(
        "shadow-xl font-sans origin-top flex flex-col",
        "[&_input]:bg-transparent [&_textarea]:bg-transparent",
        className
      )}
      style={{
        width: `${paperWidth}px`,
        minHeight: "640px",
        backgroundColor: "var(--backgroundColor)",
      }}
    >
      <Header />

      <Intro />

      <Editable className="h-[2em] w-full text-center"></Editable>

      <div className="w-[580px] mx-auto flex flex-col items-center">
        {tables?.map((table, index) => (
          <div key={index} className="w-full">
            <OrderTable data={table} index={index} />
            <div className="my-8"></div>
          </div>
        ))}
      </div>

      <Editable className="h-[2em] mb-2 w-full text-center"></Editable>

      <Footer />
    </PaperPrimitive>
  );
}

function Header() {
  const { title, subtitle, headerLogoUrl } = useStore($reportData);

  return (
    <header className="px-4 pt-3">
      <div className="flex justify-between items-end border-b-2 border-[var(--primaryColor)]">
        <div className="w-full">
          <p className="text-sm font-bold text-[var(--textColor)] -mb-1">
            <Editable
              type="text"
              value={subtitle}
              onFinish={(e) => $reportData.setKey("subtitle", e)}
            />
          </p>
          <p className="text-xl font-extrabold text-[var(--primaryColor)] w-full">
            <Editable
              type="text"
              value={title}
              className="tracking-wider w-full"
              onFinish={(e) => $reportData.setKey("title", e)}
            />
          </p>
        </div>

        <figure className="bg-[var(--primaryColor)] h-12 px-4 flex items-center justify-center overflow-hidden shrink-0">
          <img
            src={headerLogoUrl ?? "./images/表头-LOGO.png"}
            className="h-8 w-auto"
            alt=""
          />
        </figure>
      </div>
    </header>
  );
}

function Intro() {
  const { heading, caption } = useStore($reportData);

  return (
    <div className="flex flex-col items-center w-full text-[var(--primaryColor)]">
      <div className="my-4"></div>
      <h2 className="text-center text-2xl font-semibold w-full">
        <Editable
          type="text"
          value={heading}
          className="w-full text-center"
          onFinish={(e) => $reportData.setKey("heading", e)}
        />
      </h2>

      <div className="my-2"></div>

      <p className="w-[460px]">
        <Editable
          value={caption}
          className="w-full text-sm font-bold text-center resize-none"
          onFinish={(e) => $reportData.setKey("caption", e)}
        />
      </p>
    </div>
  );
}

function Footer() {
  const { address, phone, footerLogoUrl, shipmentCaption } =
    useStore($reportData);

  return (
    <footer className="bg-[var(--primaryColor)] text-[var(--backgroundColor)] py-4 px-6">
      <section className="text-xs pl-6">
        <p className="my-1 flex items-center text-lg font-bold -ml-7">
          <TruckIcon className="mr-1 size-6" />
          <Editable
            type="text"
            value={shipmentCaption ?? "寄送货品说明"}
            onFinish={(e) => $reportData.setKey("shipmentCaption", e)}
            className="bg-transparent w-full"
          />
        </p>
        <p className="my-1 flex items-center">
          <span className="mr-2 shrink-0 font-bold">收货地址</span>
          <Editable
            type="text"
            value={address}
            className="bg-transparent w-full"
            onFinish={(e) => $reportData.setKey("address", e)}
          />
        </p>
        <p className="my-1 flex items-center">
          <span className="mr-2 shrink-0 font-bold">联系电话</span>
          <Editable
            type="text"
            value={phone}
            className="bg-transparent w-full"
            onFinish={(e) => $reportData.setKey("phone", e)}
          />
        </p>
        <div className="my-1 flex gap-4 items-center">
          <p className="flex">
            <span className="mr-2 shrink-0 font-bold">寄件人称呼</span>
            <Editable
              type="text"
              value={"(你的名字)"}
              className="bg-transparent w-full"
            />
          </p>
          <p className="flex">
            <span className="mr-2 shrink-0 font-bold">寄件人联系方式</span>
            <Editable
              type="text"
              value="(你的手机号码)"
              className="bg-transparent w-full"
            />
          </p>
        </div>
      </section>

      <figure className="flex justify-center mt-10 mb-8">
        <img
          src={footerLogoUrl ?? "./images/页脚-LOGO.png"}
          className="h-14 w-auto"
          alt=""
        />
      </figure>
    </footer>
  );
}

function OrderTable({
  data,
  index: tableIndex,
}: {
  data: Table;
  index: number;
}) {
  return (
    <article className="w-full flex flex-col gap-y-1 px-6">
      <Editable
        className="text-center text-sm text-[var(--primaryColor)]"
        value={data.tip}
        onFinish={(v) => setTable(tableIndex, "tip", v)}
      />

      <header className="grid grid-cols-6 gap-1 relative -mr-8 pr-8 [&>button]:hover:flex">
        {data?.headings?.map((heading, index) => (
          <p
            key={index}
            className={cn(
              "h-8 text-sm bg-[var(--primaryColor)]",
              index === 0 ? "col-span-4 font-semibold" : "col-span-1"
            )}
          >
            <Editable
              type="text"
              value={heading}
              onFinish={(v) => setTableHeader(tableIndex, index, v)}
              className={cn(
                "w-full h-full leading-8 px-2",
                index === 0
                  ? "pl-4 text-[var(--secondaryColor)] text-left"
                  : "text-[var(--backgroundColor)] text-center"
              )}
            />
          </p>
        ))}

        <Button
          size={"icon"}
          variant={"ghost"}
          className="absolute -right-2 scale-75 -top-1 hidden"
          onClick={() => addTableRow(tableIndex)}
        >
          <ListPlusIcon className="size-4" />
        </Button>
      </header>

      {data?.rows?.map((row, index) => (
        <section
          className="grid grid-cols-6 gap-1 relative -mr-8 pr-8 [&>button]:hover:flex"
          key={index}
        >
          <p className="col-span-4 h-8 text-sm font-semibold">
            <Editable
              type="text"
              value={row.name}
              className="w-full pl-4 text-left text-[var(--textColor)] leading-8 border-b-2 border-[var(--primaryColor)]"
              onFinish={(e) => setTableRow(tableIndex, index, "name", e)}
            />
          </p>
          <p className="col-span-1 h-8 text-sm">
            <Editable
              type="text"
              value={row.price}
              className="w-full text-center text-[var(--textColor)] leading-8 border-b-2 border-[var(--primaryColor)]"
              onFinish={(e) => setTableRow(tableIndex, index, "price", e)}
            />
          </p>
          <p className="col-span-1 h-8 text-sm">
            <Editable
              type="text"
              value={row.number}
              className="w-full text-center text-[var(--textColor)] leading-8 border-b-2 border-[var(--primaryColor)]"
              onFinish={(e) => setTableRow(tableIndex, index, "number", e)}
            />
          </p>

          <Button
            size={"icon"}
            variant={"ghost"}
            className="absolute -right-2 scale-75 -top-1 hidden"
            onClick={() => removeTableRow(tableIndex, index)}
          >
            <DeleteIcon className="size-4 text-destructive" />
          </Button>
        </section>
      ))}
    </article>
  );
}
