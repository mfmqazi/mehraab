# Quick Deploy Script for Mehraab Platform
# Run this to deploy to Vercel

Write-Host "🚀 Deploying Mehraab to Vercel..." -ForegroundColor Cyan
Write-Host ""

# Check if Vercel CLI is installed
$vercelInstalled = Get-Command vercel -ErrorAction SilentlyContinue

if (-not $vercelInstalled) {
    Write-Host "📦 Vercel CLI not found. Installing..." -ForegroundColor Yellow
    npm install -g vercel
}

Write-Host "✅ Vercel CLI ready" -ForegroundColor Green
Write-Host ""

# Deploy to Vercel
Write-Host "🌐 Deploying to Vercel..." -ForegroundColor Cyan
vercel --prod

Write-Host ""
Write-Host "✨ Deployment complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Next steps:" -ForegroundColor Yellow
Write-Host "1. Add your Gemini API key as environment variable:"
Write-Host "   vercel env add GEMINI_API_KEY" -ForegroundColor White
Write-Host ""
Write-Host "2. Redeploy to apply the API key:"
Write-Host "   vercel --prod" -ForegroundColor White
Write-Host ""
Write-Host "3. Test your API endpoint:"
Write-Host "   Visit: https://mehraab.vercel.app/api/generate" -ForegroundColor White
Write-Host ""
Write-Host "4. Your site is live at:"
Write-Host "   https://mfmqazi.github.io/mehraab/" -ForegroundColor Cyan
Write-Host ""
Write-Host "📖 For detailed instructions, see VERCEL_DEPLOY.md" -ForegroundColor Gray
