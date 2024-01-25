import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  $installAppLoading,
  $remoteVersion,
  $updateContent,
  $updateDialogOpened,
  installAppUpdate,
} from "@/store";
import { useStore } from "@nanostores/react";
import { Button } from "../ui/button";
import { Loader2Icon } from "lucide-react";

export default function UpdateDialog() {
  const opened = useStore($updateDialogOpened);
  const loading = useStore($installAppLoading);

  const version = useStore($remoteVersion);
  const content = useStore($updateContent);

  return (
    <AlertDialog open={opened} onOpenChange={(v) => $updateDialogOpened.set(v)}>
      <AlertDialogContent className="w-96">
        <AlertDialogHeader>
          <AlertDialogTitle>版本更新</AlertDialogTitle>
          <AlertDialogDescription>
            发现新版本 V{version ?? "0.0.0"}，是否现在安装？
          </AlertDialogDescription>
          <AlertDialogDescription>
            更新内容：{content || "..."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>下次一定</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              size={"sm"}
              className="space-x-2 ml-2 w-24"
              onClick={(ev) => {
                ev.preventDefault();
                installAppUpdate();
              }}
              disabled={loading}
            >
              {loading ? (
                <Loader2Icon className="size-4 animate-spin" />
              ) : (
                <span>安装更新</span>
              )}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
