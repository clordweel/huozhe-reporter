// import { useToSvg } from "@hugocxl/react-to-image";

import { cn } from "@/lib/utils";
import PaperPrimitive from "../paper-primitive";
import { useStore } from "@nanostores/react";
import { $paperWdith } from "@/lib/store";
import { TruckIcon } from "lucide-react";

interface Props {
  className?: string;
}

export function FirstReport({ className }: Props) {
  const paperWidth = useStore($paperWdith);

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

      <div className="mt-8 w-[520px] mx-auto flex flex-col items-center">
        <OrderTable />
        <div className="my-6"></div>
        <OrderTable />
      </div>

      <div className="my-auto h-12"></div>

      <Footer />
    </PaperPrimitive>
  );
}

function Header() {
  return (
    <header className="px-4 pt-3">
      <div className="flex justify-between items-end border-b-2 border-primary">
        <div className="w-full">
          <p className="text-sm font-bold text-primary -mb-1">
            <input type="text" defaultValue={"2024 一季度"} />
          </p>
          <p className="text-xl font-extrabold text-primary w-full">
            <input
              type="text"
              defaultValue={"无锡总部报价清单"}
              className="tracking-wider w-full"
            />
          </p>
        </div>

        <figure className="h-12 overflow-hidden shrink-0">
          <img src="/表头-LOGO.png" className="h-full w-auto" alt="" />
        </figure>
      </div>
    </header>
  );
}

function Intro() {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="my-6"></div>
      <h2 className="text-center text-2xl font-semibold w-full">
        <input
          type="text"
          defaultValue={"报单联系 17165259999 (微信同号)"}
          className="w-full text-center"
        />
      </h2>

      <div className="my-2"></div>

      <p className="w-[460px]">
        <textarea
          defaultValue={
            "2024-01-22 起，名品收购报价（增加杭州分部，所有分部只接上门面交现结，一手交钱，一手交货，不允许寄存、邮寄）"
          }
          className="w-full text-sm font-bold text-center h-[5em] resize-none"
        />
      </p>
    </div>
  );
}

function Footer() {
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
            defaultValue={
              "江苏省无锡市  新吴区珠江路 2 号  市政办公楼 3 楼  货者网•名品寄卖"
            }
            className="bg-transparent w-full"
          />
        </p>
        <p className="my-1 flex items-center">
          <span className="mr-2 shrink-0 font-bold">联系电话</span>
          <input
            type="text"
            defaultValue={"寄送货品说明"}
            className="bg-transparent w-full"
          />
        </p>
        <p className="my-1 flex items-center">
          <div className="flex">
            <span className="mr-2 shrink-0 font-bold">寄件人称呼</span>
            <input
              type="text"
              defaultValue={"(你的名字)"}
              className="bg-transparent w-full"
            />
          </div>
          <div className="flex">
            <span className="mr-2 shrink-0 font-bold">寄件人联系方式</span>
            <input
              type="text"
              defaultValue={"(你的手机号码)"}
              className="bg-transparent w-full"
            />
          </div>
        </p>
      </section>

      <figure className="flex justify-center mt-10 mb-8">
        <img src="/页脚-LOGO.png" className="h-14 w-auto" alt="" />
      </figure>
    </footer>
  );
}

function OrderTable() {
  return (
    <article className="w-full flex flex-col gap-y-1">
      <header className="grid grid-cols-6 gap-1">
        <p className="col-span-4 h-8 text-sm font-semibold">
          <input
            type="text"
            defaultValue={"文娱手办"}
            className="w-full h-full pl-4 text-left text-secondary bg-primary"
          />
        </p>
        <p className="col-span-1 h-8 text-sm">
          <input
            type="text"
            defaultValue={"收购单价"}
            className="w-full h-full text-center text-primary-foreground bg-primary"
          />
        </p>
        <p className="col-span-1 h-8 text-sm">
          <input
            type="text"
            defaultValue={"需求总数"}
            className="w-full h-full text-center text-primary-foreground bg-primary"
          />
        </p>
      </header>

      <section className="grid grid-cols-6 gap-1">
        <p className="col-span-4 text-sm font-semibold">
          <input
            type="text"
            defaultValue={"葫芦娃盲盒"}
            className="w-full pl-4 text-left text-primary leading-8 border-b-2 border-primary"
          />
        </p>
        <p className="col h-8 text-sm">
          <input
            type="text"
            defaultValue={"2789￥"}
            className="w-full text-center text-primary leading-8 border-b-2 border-primary"
          />
        </p>
        <p className="col h-8 text-sm">
          <input
            type="text"
            defaultValue={"200个"}
            className="w-full text-center text-primary leading-8 border-b-2 border-primary"
          />
        </p>
      </section>
    </article>
  );
}
