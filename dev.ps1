# Launch the Nzali portfolio dev server (adds Node.js to PATH on Windows).
$nodeDir = "C:\Program Files\nodejs"
if (Test-Path $nodeDir) {
  $env:Path = "$nodeDir;$env:Path"
} else {
  Write-Error "Node.js not found at $nodeDir. Install from https://nodejs.org and try again."
  exit 1
}

Set-Location $PSScriptRoot

if (-not (Test-Path "node_modules")) {
  Write-Host "Installing dependencies..."
  npm install
  if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
}

Write-Host "Starting dev server at http://localhost:3005"
npm run dev:3005
