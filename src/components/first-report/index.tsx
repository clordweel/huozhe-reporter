// import { useToSvg } from "@hugocxl/react-to-image";

import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

export function FirstReport({ className }: Props) {
  
  // ...

  const width = 400;

  return (
    <div
      className={cn("bg-white", className)}
      style={{ width: `${width}px`, minHeight: "2400px" }}
    >
      <Header />
    </div>
  );
}

function Header() {
  return (
    <header>
      <div>
        <p>2024</p>
        <p>无锡总部报价清单</p>
      </div>
      <figure></figure>
    </header>
  );
}
