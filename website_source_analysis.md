# Website Source Analysis Report

**Generated on:** 2025-11-26

## Overview
This report enumerates all files in the `website` repository, classifies them by type, describes their purpose, outlines key dependencies, and assigns an importance rating (Critical, High, Medium, Low). The goal is to provide a clear understanding of each file’s role in the final website.

## File Inventory

| File Path | Type | Purpose / Role | Key Dependencies | Importance | Notes |
|---|---|---|---|---|---|
| `index.html` | HTML | Home page entry point | Loads `header.html`, `footer.html`, `assets/css/style.css`, `assets/js/tailwind.min.js`, AOS library | Critical | Main landing page, includes hero section and navigation. |
| `about-us.html` | HTML | About page | Loads shared header/footer, CSS, JS | High | Provides company information. |
| `contact-us.html` | HTML | Contact page | Loads shared header/footer, CSS, JS | High | Contains contact form and map. |
| `services/*.html` | HTML | Service detail pages | Load shared header/footer, CSS, JS, service‑specific images | High | Each service page describes a product offering. |
| `header.html` | HTML (partial) | Site header/navigation bar | References CSS/JS for dropdowns | Critical | Included on every page via jQuery `.load()`. |
| `footer.html` | HTML (partial) | Site footer with links | References CSS/JS | Critical | Included on every page via jQuery `.load()`. |
| `assets/css/style.css` (implicit via Tailwind CDN) | CSS | Global styling, custom classes, animations | None | Critical | Defines design system, colors, typography. |
| `assets/js/tailwind.min.js` | JavaScript | Tailwind utility loader (CDN fallback) | None | Medium | Provides Tailwind utilities when CDN unavailable. |
| `assets/lib/aos/dist/aos.css` | CSS | Animate‑On‑Scroll library stylesheet | None | Medium | Enables scroll‑based animations. |
| `assets/lib/aos/dist/aos.js` | JavaScript | Animate‑On‑Scroll library script | None | Medium | Initializes AOS (`AOS.init()`). |
| `assets/img/*.avif/jpg/png` | Images | Visual assets for hero, services, icons | None | Medium | Used throughout pages for UI/UX. |
| `assets/*.svg` | Vector Graphics | Icons and logos | None | Medium | Used in header/footer and service cards. |
| `assets/hero_bg.jpeg` | Image | Hero background | None | High | Background of the main hero section. |
| `assets/partner-icon.svg` etc. | SVG | Decorative icons | None | Low | Cosmetic, not essential for functionality. |
| `assets/logo.png`, `logo_main.png`, `logo_white.png` | Images | Brand logos | None | High | Displayed in header/footer. |
| `assets/doc.png` | Image | Documentation icon | None | Low | Used in a few informational sections. |
| `assets/Services-1.jpg` | Image | Service illustration | None | Medium | Shown on services overview. |
| `assets/oncology-standard.svg` | SVG | Oncology service icon | None | Medium | Visual element for a specific service. |
| `assets/partners-icon.svg` | SVG | Partner section icon | None | Low | Decorative. |
| `assets/patients-icon.svg` | SVG | Patient section icon | None | Low | Decorative. |
| `assets/serivce-3.jpg` | Image | Service illustration (typo in filename) | None | Medium | Used in a banner section. |
| `assets/img/aobut.avif` | Image | About‑Us image | None | Medium | Shown on About page. |
| `assets/img/icon.ico` | Icon | Favicon | None | High | Browser tab icon. |
| `assets/lib/aos/README.md` etc. | Documentation | Library docs and tests | N/A | Low | Helpful for developers, not required at runtime. |
| `*.md` files in `assets/lib/aos/` | Documentation | License, changelog, etc. | N/A | Low | Legal and reference information. |
| `legal-disclaimers.html`, `privacy-policy.html`, `terms-and-conditions.html` | HTML | Legal pages | Load shared header/footer, CSS, JS | High | Required for compliance. |
| `compliance-statement.html` | HTML | Compliance information | Load shared header/footer, CSS, JS | High | Important for regulatory compliance. |
| `services/provider-outreach.html` etc. | HTML | Service detail pages | Load shared header/footer, CSS, JS, images | High | Part of services catalog. |

## Dependency Map (High‑Level)
- **HTML pages** → `header.html` + `footer.html` (via jQuery `.load()`)
- **Header/Footer** → `assets/css/style.css` (via Tailwind CDN) + `assets/js/tailwind.min.js`
- **Pages using animations** → AOS library (`assets/lib/aos/dist/aos.css` & `.js`)
- **Images & Icons** → referenced directly in HTML/CSS via relative paths.

## Importance Summary
- **Critical**: `index.html`, `header.html`, `footer.html`, main CSS/JS, brand logos, legal pages.
- **High**: All service pages, about/contact pages, hero background, main images.
- **Medium**: AOS library, additional images/icons, supplemental CSS/JS.
- **Low**: Documentation files, test files, unused directories.

## Recommendations
1. **Consolidate CSS** – Move custom Tailwind configuration into a local `style.css` for easier theming.
2. **Minify Assets** – Reduce image sizes where possible (e.g., compress JPEGs, convert PNGs to WebP).
3. **Remove Unused Files** – Delete empty `assets/js/` and any duplicate icons.
4. **Update Paths** – Ensure all `<link>` and `<script>` tags use relative paths that match the repository structure.
5. **Add Build Step** – Consider a simple build script (e.g., using Vite) to bundle CSS/JS for production.

---
*This report was generated automatically based on the repository contents and a high‑level analysis of file roles.*
