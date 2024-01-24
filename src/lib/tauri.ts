import { open } from "@tauri-apps/api/dialog";
import { convertFileSrc } from "@tauri-apps/api/tauri";

export async function tauriSelectImage() {
  const selected = (await open({
    multiple: false,
    filters: [
      {
        name: "Images",
        extensions: ["png", "webp", "jpg", "jpeg"],
      },
    ],
  })) as string | null;

  return selected && convertFileSrc(selected);
}
