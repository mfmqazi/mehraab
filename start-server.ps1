#!/usr/bin/env pwsh
# Simple local web server for testing the MBBS Exam Prep site

Write-Host "🚀 Starting local web server..." -ForegroundColor Cyan
Write-Host ""

# Check if Python is available
try {
    $pythonVersion = python --version 2>&1
    Write-Host "✓ Found Python: $pythonVersion" -ForegroundColor Green
    
    # Start Python HTTP server
    Write-Host ""
    Write-Host "📡 Server starting on http://localhost:8000" -ForegroundColor Yellow
    Write-Host "📚 Open your browser and navigate to:" -ForegroundColor Yellow
    Write-Host "   - Main page: http://localhost:8000/index.html" -ForegroundColor White
    Write-Host "   - DC Dutta: http://localhost:8000/textbook-dcdutta.html" -ForegroundColor White
    Write-Host "   - SRB Surgery: http://localhost:8000/textbook-srb.html" -ForegroundColor White
    Write-Host "   - Ghai Pediatrics: http://localhost:8000/textbook-ghai.html" -ForegroundColor White
    Write-Host ""
    Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Red
    Write-Host ""
    
    python -m http.server 8000
}
catch {
    Write-Host "❌ Error: Python not found" -ForegroundColor Red
    Write-Host "Please install Python from https://www.python.org/" -ForegroundColor Yellow
    exit 1
}
