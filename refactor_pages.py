import os
import re

directories = [
    r"c:\Users\prajwal.bedavatti\Documents\GitHub\website\services",
    r"c:\Users\prajwal.bedavatti\Documents\GitHub\website\resources"
]

head_template = """<!DOCTYPE html>
<html lang="en" class="scroll-smooth">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{title}</title>
  <meta name="description" content="{description}">
  
  <!-- Open Graph Tags -->
  <meta property="og:title" content="{title}">
  <meta property="og:description" content="{description}">
  <meta property="og:image" content="https://zenexainfotech.com/assets/img/zenexa-asset.png">
  <meta property="og:url" content="https://zenexainfotech.com/{relative_path}">
  <meta property="og:type" content="website">

  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="icon" type="image/x-icon" href="../assets/img/icon.ico">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
  <link
    href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
    rel="stylesheet">
  <link href="../assets/lib/aos/dist/aos.css" rel="stylesheet">
  <script src="../assets/lib/aos/dist/aos.js"></script>
  
  <!-- Custom Styles -->
  <link href="../assets/css/style.css" rel="stylesheet">

  <!-- Enhanced Features -->
  <script src="../assets/js/enhanced-features.js" defer></script>
  
  <!-- Main App Logic & Components -->
  <script src="../assets/js/main.js" defer></script>
  <script src="../assets/js/components.js" defer></script>
</head>
"""

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Extract Title
    title_match = re.search(r'<title>(.*?)</title>', content, re.IGNORECASE)
    title = title_match.group(1) if title_match else "Zenexa Infotech"

    # Extract Description
    desc_match = re.search(r'<meta name="description"\s+content="(.*?)"', content, re.IGNORECASE | re.DOTALL)
    if not desc_match:
        desc_match = re.search(r'content="(.*?)"\s+name="description"', content, re.IGNORECASE | re.DOTALL)
    
    description = desc_match.group(1).replace('\n', ' ').strip() if desc_match else "Zenexa Infotech Healthcare Solutions"

    # Determine relative path for OG URL
    rel_path = filepath.split('website\\')[-1].replace('\\', '/')

    # Construct new head
    new_head = head_template.format(title=title, description=description, relative_path=rel_path)

    # Find start of body
    body_start_match = re.search(r'<body.*?>', content, re.IGNORECASE)
    if not body_start_match:
        print(f"Skipping {filepath}: No body tag found")
        return

    body_start_idx = body_start_match.end()
    
    # Extract existing body content (excluding the old scripts at the end if possible)
    # We will assume everything after <body> is body content, but we need to strip out the old scripts.
    
    # Strategy: Get everything from <body> to </html>
    body_content_raw = content[body_start_idx:]
    
    # Remove </body> and </html>
    body_content_raw = re.sub(r'</body>\s*</html>', '', body_content_raw, flags=re.IGNORECASE).strip()

    # Remove old inline scripts and styles that might be in the body or at the end
    # Specifically looking for the tailwind config, AOS init, and jquery load calls which were usually in <head> but sometimes leaked or were at bottom
    # In the files we saw, they were in <head>, so replacing <head> handles most of it.
    # However, we need to ensure we don't duplicate the component placeholders if they are already there, 
    # OR if they were dynamically loaded, we need to ensure the DIVs exist.
    
    # In the files viewed, <div id="header"></div> exists.
    # We need to ensure <div id="footer"></div>, <div id="live-chat"></div>, <div id="newsletter"></div> exist.
    # And remove any inline <script> tags that might be at the end of body.
    
    # Remove all <script> tags from body content to be safe (since we moved logic to main.js/components.js)
    # But be careful not to remove structural scripts if any (unlikely for this site).
    # The user wants to "refactor", so removing inline JS is good.
    
    body_content_cleaned = re.sub(r'<script\b[^>]*>.*?</script>', '', body_content_raw, flags=re.IGNORECASE | re.DOTALL)
    
    # Remove <div id="header"></div> etc if we are going to re-add them, or just ensure they are there.
    # Actually, the template expects them. Let's just ensure they are present.
    # If the file already has them, great. If not, we might need to add them.
    # But wait, the `components.js` script looks for them.
    
    # Let's just clean up the body content and wrap it.
    
    # Check if header div exists
    if '<div id="header">' not in body_content_cleaned:
        body_content_cleaned = '<div id="header"></div>\n' + body_content_cleaned
        
    # Check for footer and other components at the end
    components_to_ensure = [
        '<div id="footer"></div>',
        '<div id="live-chat"></div>',
        '<div id="newsletter"></div>'
    ]
    
    for comp in components_to_ensure:
        if comp not in body_content_cleaned:
             body_content_cleaned += f'\n{comp}'

    # Reconstruct full HTML
    new_html = f"{new_head}\n<body class=\"bg-slate-50 text-slate-800 overflow-x-hidden selection:bg-teal-200 selection:text-teal-900\">\n{body_content_cleaned}\n</body>\n</html>"
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_html)
    
    print(f"Processed {filepath}")

for d in directories:
    if os.path.exists(d):
        for filename in os.listdir(d):
            if filename.endswith(".html"):
                process_file(os.path.join(d, filename))
