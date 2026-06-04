# NameCraft

A modern baby names discovery website featuring 2026 trends, name meanings, creative spellings, and double-name generation.

## Features

- **2026 Trends Report** — Comprehensive analysis of baby naming trends
- **Name Meanings** — Detailed pages for popular names with origins, variants, and popularity charts
- **Spelling Studio** — Interactive tool to explore creative name spellings
- **Double Name Generator** — Generate and save double-name combinations
- **Regional Insights** — State-by-state naming preference data
- **SEO Optimized** — Structured data, Open Graph, and semantic HTML

## Tech Stack

- [Astro](https://astro.build/) — Static site generator
- [React](https://react.dev/) — Interactive components (islands)
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first styling
- [Cloudflare Pages](https://pages.cloudflare.com/) — Hosting & CDN

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

Pushes to `main` branch automatically deploy to Cloudflare Pages via GitHub Actions.

Required secrets:
- `CLOUDFLARE_API_TOKEN` — Cloudflare API token with Pages edit permission
- `CLOUDFLARE_ACCOUNT_ID` — Your Cloudflare account ID

## Project Structure

```
/
├── src/
│   ├── components/     # Astro + React components
│   ├── layouts/        # Page layouts with SEO
│   ├── pages/          # Route pages
│   ├── data/           # Name data and trends
│   └── styles/         # Global CSS
├── public/             # Static assets
└── .github/workflows/  # CI/CD
```

## License

MIT
