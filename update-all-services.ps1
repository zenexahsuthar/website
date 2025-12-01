# Update all service pages with ultimate footer and dark mode

$servicePages = @(
    "services/data-entry-and-document-indexing.html",
    "services/chart-abstraction-and-risk-adjustment-support.html",
    "services/claims-management-and-coding-support.html",
    "services/eligibility-and-benefits-verification.html",
    "services/medical-record-retrieval-and-management.html"
)

foreach ($page in $servicePages) {
    Write-Host "Updating $page..."
    
    $content = Get-Content $page -Raw
    
    # Add dark mode script after title
    $content = $content -replace '(<title>.*?</title>\s*)', "`$1`n  <script>`n    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {`n      document.documentElement.classList.add('dark')`n    } else {`n      document.documentElement.classList.remove('dark')`n    }`n  </script>`n  "
    
    # Add enhanced-features.js after aos.js
    $content = $content -replace '(<script src="../assets/lib/aos/dist/aos.js"></script>)', "`$1`n  <script src=`"../assets/js/enhanced-features.js`" defer></script>"
    
    # Update footer load
    $content = $content -replace '(\$\("#footer"\)\.load\("\.\./)footer\.html("\);)', '$1footer-ultimate.html$2'
    
    # Add live chat and newsletter after footer load
    $content = $content -replace '(\$\("#footer"\)\.load\("\.\.\/footer-ultimate\.html"\);)', "`$1`n      `$(`"#live-chat`").load(`"../components/live-chat-widget.html`");`n      `$(`"#newsletter`").load(`"../components/newsletter-popup.html`");"
    
    # Add placeholders before </body>
    $content = $content -replace '(</body>)', "  <div id=`"live-chat`"></div>`n  <div id=`"newsletter`"></div>`n`$1"
    
    Set-Content $page $content -NoNewline
    Write-Host "✓ Updated $page"
}

Write-Host "`n✅ All service pages updated!"
