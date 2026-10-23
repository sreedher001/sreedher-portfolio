# SEO & Digital Marketing Portfolio

A creative, responsive personal portfolio built with plain HTML, CSS, and JavaScript. Designed for GitHub Pages and easy customization.

## Files
- `index.html` — page content, SEO metadata, Open Graph tags, and Person structured data
- `styles.css` — responsive styling and visual design
- `script.js` — mobile navigation, current year, and subtle reveal effects
- `assets/favicon.svg` — browser icon
- `assets/og-cover.svg` — social sharing preview image (replace with a PNG/JPG if preferred)

## Before publishing
Search the project for these placeholders and replace them:
- `Your Name` / `YOURNAME`
- `YOUR.EMAIL@example.com`
- `YOUR-LINKEDIN`
- `YOUR-USERNAME.github.io`
- Company names, role dates, and experience details
- Project results and metrics — only publish verified, client-approved results

The campaign snapshot (8,746 impressions, 146 clicks, and 1 tracked conversion) is included as a historical illustrative example. Confirm the dates, attribution, and permission to publish before using it publicly. Otherwise replace the values with approved results.

## Run locally
Open `index.html` in a browser. For a local development server, use VS Code's Live Server extension or run:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Publish with GitHub Pages
1. Sign in to GitHub and create a repository named `YOUR-USERNAME.github.io` for a user site, or any repository name for a project site.
2. Upload all files and folders from this project. Keep `index.html` at the repository root.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**.
5. Choose branch `main` and folder `/ (root)`, then click **Save**.
6. Wait for GitHub Pages to publish. Your user-site URL is `https://YOUR-USERNAME.github.io/`. For a project site, the URL usually includes the repository name.
7. Update the canonical/share URLs and JSON-LD URL in `index.html` to match the final live URL.
8. Test the website on mobile and desktop. Check all links, email, LinkedIn, and resume links.

## SEO launch checklist
- Use your real name and a clear page title/description.
- Update Open Graph title, description, image, and URL.
- Replace the Person JSON-LD placeholders with accurate public information.
- Add a custom domain if you have one, then update all URLs.
- Add the website to Google Search Console and verify ownership.
- Submit a sitemap only if you add one. For a single-page portfolio, a small `sitemap.xml` is optional but useful.
- Use descriptive alt text for any real project images you add.
- Compress images and use WebP where practical.
- Do not publish confidential client data, private account information, or unapproved results.

## Add a resume
Put your resume PDF in the project root as `resume.pdf`, then add a link such as:
`<a href="resume.pdf" download>Download résumé</a>`

## License
Use and adapt this starter for your own portfolio. Replace all placeholder identity and project information before publishing.
