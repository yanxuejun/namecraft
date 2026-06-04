

## Deployment

### Cloudflare Pages

1. Push code to GitHub repository
2. Connect Cloudflare Pages to the GitHub repo
3. Build settings:
   - Build command: `npm run build`
   - Build output directory: `dist`
4. Add environment variables in Cloudflare Pages dashboard

### GitHub Setup

```bash
git remote add origin https://github.com/yanxuejun/XXX-headless.git
git branch -M main
git push -u origin main
```
