# Manual Deployment Script for ToolSprout
# Bypasses 'gh-pages' package to avoid ENAMETOOLONG errors on Windows

Write-Host "Building project..." -ForegroundColor Green
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed!" -ForegroundColor Red
    exit
}

Write-Host "Navigating to dist folder..." -ForegroundColor Green
cd dist

Write-Host "Initializing temporary git repo..." -ForegroundColor Green
git init
git checkout -b gh-pages
git add -A
git commit -m "deploy"

Write-Host "Pushing to GitHub..." -ForegroundColor Green
# Force push to the gh-pages branch of your repo
git push -f https://github.com/Plasmaa/ToolSprout.git gh-pages

Write-Host "Deployment complete!" -ForegroundColor Green
cd ..
