import { cn } from "@/lib/utils";
import PaperPrimitive from "../paper-primitive";
import { useStore } from "@nanostores/react";
import { $paperWdith } from "@/store";
import { ListPlusIcon, TruckIcon } from "lucide-react";
import { $reportData, Table, addTableRow } from "./store";
import { Button } from "../ui/button";

interface Props {
  className?: string;
}

export function FirstReport({ className }: Props) {
  const paperWidth = useStore($paperWdith);

  const { tables } = useStore($reportData);

  return (
    <PaperPrimitive
      className={cn("shadow-xl font-sans origin-top flex flex-col", className)}
      style={{
        width: `${paperWidth}px`,
        minHeight: "640px",
        backgroundColor: "white",
      }}
    >
      <Header />

      <Intro />

      <div className="mt-8 w-[580px] mx-auto flex flex-col items-center">
        {tables?.map((table, index) => (
          <div key={index}>
            <OrderTable data={table} index={index} />
            <div className="my-8"></div>
          </div>
        ))}
      </div>

      <div className="my-auto h-12"></div>

      <Footer />
    </PaperPrimitive>
  );
}

function Header() {
  const { title, subtitle, headerLogoUrl } = useStore($reportData);

  return (
    <header className="px-4 pt-3">
      <div className="flex justify-between items-end border-b-2 border-primary">
        <div className="w-full">
          <p className="text-sm font-bold text-primary -mb-1">
            <input type="text" defaultValue={subtitle} />
          </p>
          <p className="text-xl font-extrabold text-primary w-full">
            <input
              type="text"
              defaultValue={title}
              className="tracking-wider w-full"
            />
          </p>
        </div>

        <figure className="h-12 overflow-hidden shrink-0">
          <img
            src={headerLogoUrl ?? "./images/表头-LOGO.png"}
            className="h-full w-auto"
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
    <div className="flex flex-col items-center w-full">
      <div className="my-6"></div>
      <h2 className="text-center text-2xl font-semibold w-full">
        <input
          type="text"
          defaultValue={heading}
          className="w-full text-center"
        />
      </h2>

      <div className="my-2"></div>

      <p className="w-[460px]">
        <textarea
          defaultValue={caption}
          className="w-full text-sm font-bold text-center h-[5em] resize-none"
        />
      </p>
    </div>
  );
}

function Footer() {
  const { address, phone, footerLogoUrl } = useStore($reportData);

  return (
    <footer className="bg-primary text-primary-foreground py-4 px-6">
      <section className="text-xs pl-6">
        <p className="my-1 flex items-center text-lg font-bold -ml-7">
          <TruckIcon className="mr-1 size-6" />
          <input
            type="text"
            defaultValue={"寄送货品说明"}
            className="bg-transparent w-full"
          />
        </p>
        <p className="my-1 flex items-center">
          <span className="mr-2 shrink-0 font-bold">收货地址</span>
          <input
            type="text"
            defaultValue={address}
            className="bg-transparent w-full"
          />
        </p>
        <p className="my-1 flex items-center">
          <span className="mr-2 shrink-0 font-bold">联系电话</span>
          <input
            type="text"
            defaultValue={phone}
            className="bg-transparent w-full"
          />
        </p>
        <div className="my-1 flex items-center">
          <p className="flex">
            <span className="mr-2 shrink-0 font-bold">寄件人称呼</span>
            <input
              type="text"
              defaultValue={"(你的名字)"}
              className="bg-transparent w-full"
            />
          </p>
          <p className="flex">
            <span className="mr-2 shrink-0 font-bold">寄件人联系方式</span>
            <input
              type="text"
              defaultValue={"(你的手机号码)"}
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
    <article className="w-full flex flex-col gap-y-1 px-6 [&>header>button]:hover:flex">
      <p className="text-center text-sm">{data.tip}</p>

      <header className="grid grid-cols-6 gap-1 relative">
        {data?.headings?.map((heading, index) => (
          <p
            key={index}
            className={cn(
              "h-8 text-sm",
              index === 0 ? "col-span-4 font-semibold" : "col-span-1"
            )}
          >
            <input
              type="text"
              defaultValue={heading}
              className={cn(
                "w-full h-full bg-primary",
                index === 0
                  ? "pl-4 text-secondary text-left"
                  : "text-primary-foreground text-center"
              )}
            />
          </p>
        ))}

        <Button
          size={"icon"}
          variant={"ghost"}
          className="absolute -right-11 -top-1 hidden"
          onClick={() => addTableRow(tableIndex)}
        >
          <ListPlusIcon className="size-4" />
        </Button>
      </header>

      {data?.rows?.map((row, index) => (
        <section className="grid grid-cols-6 gap-1" key={index}>
          <p className="col-span-4 text-sm font-semibold">
            <input
              type="text"
              defaultValue={row.name}
              className="w-full pl-4 text-left text-primary leading-8 border-b-2 border-primary"
            />
          </p>
          <p className="col h-8 text-sm">
            <input
              type="text"
              defaultValue={row.price}
              className="w-full text-center text-primary leading-8 border-b-2 border-primary"
            />
          </p>
          <p className="col h-8 text-sm">
            <input
              type="text"
              defaultValue={row.number}
              className="w-full text-center text-primary leading-8 border-b-2 border-primary"
            />
          </p>
        </section>
      ))}
    </article>
  );
}
