import { exit } from "@tauri-apps/api/process";
import { emit } from "@tauri-apps/api/event";
import {
  BugIcon,
  FileCode2Icon,
  FileInputIcon,
  LogOutIcon,
  MenuIcon,
  RocketIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "../ui/input";
import { exportJSON, importJSON } from "@/store";
import { useCallback } from "react";
import { Label } from "../ui/label";

export function Menu() {
  const importPaper = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    async (file) => {
      importJSON(await file.target.files?.[0].text());
    },
    []
  );
  const exportPaper = useCallback(() => {
    exportJSON();
  }, []);

  return (
    <>
      <Input
        id={"__import_data_file"}
        type="file"
        className="hidden"
        multiple={false}
        onInput={importPaper}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size={"icon"} variant="outline">
            <MenuIcon />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-56 ml-5">
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <FileInputIcon className="mr-2 h-4 w-4" />
              <Label
                htmlFor="__import_data_file"
                className="absolute left-8 top-0 right-0 bottom-0 flex items-center"
              >
                <span>导入配置</span>
              </Label>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={exportPaper}>
              <FileCode2Icon className="mr-2 h-4 w-4" />
              <span>导出配置</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuItem asChild>
            <a
              href="https://github.com/clordweel/huozhe-reporter/issues"
              target="_blank"
            >
              <BugIcon className="mr-2 h-4 w-4" />
              <span>反馈 Issue</span>
            </a>
          </DropdownMenuItem>

          {window.__TAURI__ && (
            <>
              <DropdownMenuItem onClick={() => emit("tauri://update")}>
                <RocketIcon className="mr-2 h-4 w-4" />
                <span>检查更新</span>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                className="text-destructive"
                onClick={() => exit(1)}
              >
                <LogOutIcon className="mr-2 h-4 w-4" />
                <span>退出</span>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
