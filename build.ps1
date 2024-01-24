$value = Get-Content $HOME\.tauri\huozhe-reporter.key

$env:TAURI_PRIVATE_KEY = $value

cargo tauri build --target x86_64-pc-windows-msvc