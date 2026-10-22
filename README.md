# Eduardo Cabanillas — Cybersecurity Portfolio v3

An original, fully static cybersecurity portfolio with a dark emerald/SOC-terminal aesthetic, subtle ambient motion, interactive case-study workflows, and a print-friendly résumé. **No dependencies, frameworks, build tools, paid hosting, or accounts are required to run it locally.**

## Preview locally

1. Extract the entire ZIP.
2. Open `index.html` in your browser.
3. Explore the interactive story, project filters and the three detailed case-study pages.
4. On the résumé page, click **Print / Save PDF** to save a PDF from your browser's print dialog.

## Publish on GitHub Pages

1. Create a GitHub repository, ideally `YOUR_USERNAME.github.io` if you want the site at your username domain.
2. Upload all files *inside* this folder to the repository root (`index.html`, `site.css`, `site.js`, `assets`, and the other HTML files).
3. In GitHub repository **Settings → Pages**, choose **Deploy from a branch**, `main`, `/(root)`.
4. Visit `https://YOUR_USERNAME.github.io/` after GitHub finishes deployment. For other repository names, the address also includes `/repository-name/`.

Official instructions: https://docs.github.com/en/pages/quickstart

## Pages

- `index.html` — polished homepage, animated silver shield, interactive terminal, project filters, education, experience, certifications, and contact.
- `project-phishing.html` — WGU capstone simulated phishing/Elastic SIEM investigation.
- `project-forensics.html` — academic Windows 11 investigation using Autopsy.
- `project-pentest.html` — controlled penetration testing and vulnerability labs.
- `resume.html` — print-ready résumé with browser-based PDF export.
- `site.css` — shared design system, animation, layouts, responsive breakpoints, print styles.
- `site.js` — progressive scroll indicator, mobile navigation, accessible case-study workflow tabs, terminal selections, project filters, ambient stars, reduced-motion settings.
- `assets/shield.svg` and `assets/favicon.svg` — custom scalable vector illustrations.

## Content integrity and privacy

All case studies identify academic simulations or authorized training labs, rather than claiming professional production incident response. No fake log screenshots, fake projects, fake incident metrics, or fabricated proficiency scores were added. The sample terminal illustration on the homepage is decorative.


## Easy edits

- Your homepage name, intro and links: `index.html`
- Investigation descriptions: `project-*.html`
- Colors: top of `site.css`
- Terminal story options: `site.js` (`stories` object)
- Certifications and experience: `index.html` and `resume.html`

The website is built entirely with relative paths and can be hosted at a domain root or a repository subpath.
