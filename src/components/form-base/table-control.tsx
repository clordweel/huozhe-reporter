import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { addTableCol, addTableRow } from "../first-report/store";
import {
  BetweenHorizonalEndIcon,
  BetweenVerticalEndIcon,
  BoltIcon,
} from "lucide-react";

export function TableControl({ tableIndex }: { tableIndex: number }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size={"icon"}
          variant={"ghost"}
          className="absolute -right-2 scale-75 -top-1 invisible data-[state='open']:visible"
        >
          <BoltIcon className="size-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => addTableRow(tableIndex)}>
          <BetweenHorizonalEndIcon className="size-4 mr-2" />
          <span>新增一行</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => addTableCol(tableIndex)}>
          <BetweenVerticalEndIcon className="size-4 mr-2" />
          <span>新增一列</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
