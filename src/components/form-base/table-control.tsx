import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import {
  addTable,
  addTableCol,
  addTableRow,
  delTable,
} from "../first-report/store";
import {
  BetweenHorizonalEndIcon,
  BetweenVerticalEndIcon,
  BoltIcon,
  DeleteIcon,
  ListPlusIcon,
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
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => addTable(tableIndex)}>
          <ListPlusIcon className="size-4 mr-2" />
          <span>新增表格</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-destructive"
          onClick={() => delTable(tableIndex)}
        >
          <DeleteIcon className="size-4 mr-2" />
          <span>删除表格</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
