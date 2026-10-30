# Backup of Minecraft worlds from <instance>\saves into <instance>\backups
# Usage:  backup-world.bat            - back up all worlds
#         backup-world.bat "World"    - back up one world
# Keeps the last 10 backups per world (change with -Keep N).
param(
  [string]$World = "",
  [int]$Keep = 10
)
$ErrorActionPreference = "Stop"
Add-Type -AssemblyName System.IO.Compression.FileSystem

$root   = Split-Path -Parent $PSScriptRoot
$saves  = Join-Path $root "saves"
$outDir = Join-Path $root "backups"

if (-not (Test-Path -LiteralPath $saves)) { Write-Host "ERROR: saves folder not found: $saves"; exit 1 }
New-Item -ItemType Directory -Force -Path $outDir | Out-Null
$stamp = Get-Date -Format "yyyy-MM-dd_HH-mm"

if ($World -ne "") {
  $target = Join-Path $saves $World
  if (-not (Test-Path -LiteralPath $target)) { Write-Host "ERROR: world not found: $World"; exit 1 }
  $worlds = @(Get-Item -LiteralPath $target)
} else {
  $worlds = @(Get-ChildItem -LiteralPath $saves -Directory |
    Where-Object { Test-Path -LiteralPath (Join-Path $_.FullName "level.dat") })
}
if ($worlds.Count -eq 0) { Write-Host "No worlds found in $saves"; exit 1 }

foreach ($w in $worlds) {
  $name = $w.Name
  $tmp  = Join-Path ([System.IO.Path]::GetTempPath()) ("bs_backup_" + [guid]::NewGuid().ToString("N"))
  $copy = Join-Path $tmp $name
  New-Item -ItemType Directory -Force -Path $copy | Out-Null
  try {
    # session.lock is held by the running game, skip it. robocopy codes 0-7 mean success.
    & robocopy $w.FullName $copy /E /XF session.lock /NFL /NDL /NJH /NJS /NP | Out-Null
    if ($LASTEXITCODE -ge 8) { throw "robocopy failed for world $name (code $LASTEXITCODE)" }
    $zip = Join-Path $outDir ("{0}_{1}.zip" -f $name, $stamp)
    if (Test-Path -LiteralPath $zip) { Remove-Item -LiteralPath $zip -Force }
    [System.IO.Compression.ZipFile]::CreateFromDirectory($copy, $zip, [System.IO.Compression.CompressionLevel]::Optimal, $true)
    Write-Host "Backup created: $zip"
  } finally {
    Remove-Item -LiteralPath $tmp -Recurse -Force -ErrorAction SilentlyContinue
  }
  $pattern = '^' + [regex]::Escape($name) + '_\d{4}-\d{2}-\d{2}_\d{2}-\d{2}\.zip$'
  Get-ChildItem -LiteralPath $outDir -File |
    Where-Object { $_.Name -match $pattern } |
    Sort-Object LastWriteTime -Descending |
    Select-Object -Skip $Keep |
    ForEach-Object { Remove-Item -LiteralPath $_.FullName -Force; Write-Host "Old backup removed: $($_.Name)" }
}
