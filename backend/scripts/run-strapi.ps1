param(
  [Parameter(ValueFromRemainingArguments = $true)]
  [string[]]$Args
)

$root = Resolve-Path (Join-Path $PSScriptRoot "..")

$appData = Join-Path $root ".appdata"
$localAppData = Join-Path $root ".localappdata"

New-Item -ItemType Directory -Force -Path $appData, $localAppData | Out-Null

$env:APPDATA = $appData
$env:LOCALAPPDATA = $localAppData

$strapiCmd = Join-Path $root "node_modules\\.bin\\strapi.cmd"
& $strapiCmd @Args
exit $LASTEXITCODE

