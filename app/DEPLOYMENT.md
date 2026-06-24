# Deployment Guide

This guide covers deploying the Fjall Group application to Vercel and other platforms.

## Prerequisites

- Node.js 20.x or higher
- MySQL database (for production)
- Kimi OAuth credentials
- Environment variables configured

## Vercel Deployment

### 1. Prepare Your Repository

Ensure your code is pushed to a Git repository (GitHub, GitLab, or Bitbucket).

```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

### 2. Connect to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your Git repository
4. Vercel will auto-detect the framework settings

### 3. Configure Environment Variables

In the Vercel dashboard, add the following environment variables:

**Required:**
- `APP_ID` - Your application ID
- `APP_SECRET` - Application secret for JWT signing
- `DATABASE_URL` - MySQL connection string (e.g., `mysql://user:pass@host:port/database`)
- `KIMI_AUTH_URL` - Kimi OAuth server URL
- `KIMI_OPEN_URL` - Kimi Open Platform URL
- `VITE_KIMI_AUTH_URL` - Kimi OAuth URL (exposed to browser)
- `VITE_APP_ID` - OAuth application ID (exposed to browser)

**Optional:**
- `OWNER_UNION_ID` - Union ID of admin user
- `NODE_ENV` - Set to `production` (usually auto-set by Vercel)

### 4. Build Settings

Vercel will automatically use the settings from `vercel.json`:

- **Build Command:** `npm run vercel-build`
- **Output Directory:** `dist/public`
- **Install Command:** `npm install`

### 5. Deploy

Click "Deploy" and Vercel will:
1. Install dependencies
2. Build the frontend (Vite)
3. Build the API serverless functions
4. Deploy to production

### 6. Database Setup

After first deployment, run database migrations:

```bash
# Install Vercel CLI
npm i -g vercel

# Pull environment variables
vercel env pull

# Run migrations locally (connected to production DB)
npm run db:push
```

**⚠️ Warning:** Be careful when running migrations against production databases.

## Docker Deployment

### Build and Run Locally

```bash
cd app
docker build -t fjall-group .
docker run -p 3000:3000 --env-file .env fjall-group
```

### Deploy to Container Registry

```bash
# Tag for your registry
docker tag fjall-group your-registry.com/fjall-group:latest

# Push to registry
docker push your-registry.com/fjall-group:latest
```

## Environment Configuration

### Development (.env.local)

```env
APP_ID=dev-app-id
APP_SECRET=dev-secret-key
DATABASE_URL=mysql://root:password@localhost:3306/fjall_dev
KIMI_AUTH_URL=https://auth.kimi.com
KIMI_OPEN_URL=https://open.kimi.com
VITE_KIMI_AUTH_URL=https://auth.kimi.com
VITE_APP_ID=dev-app-id
OWNER_UNION_ID=your-union-id
```

### Production

Use your hosting platform's environment variable management:
- **Vercel:** Project Settings → Environment Variables
- **Docker:** Pass via `--env-file` or orchestration secrets
- **Other platforms:** Follow platform-specific guides

## Database Migrations

### Generate Migration

```bash
npm run db:generate
```

### Apply Migration

```bash
npm run db:migrate
```

### Push Schema (Development)

```bash
npm run db:push
```

## Troubleshooting

### Build Fails

1. Check all environment variables are set
2. Verify Node.js version (20.x required)
3. Check build logs for specific errors
4. Ensure `DATABASE_URL` is accessible from build environment

### API Routes Not Working

1. Verify `vercel.json` configuration
2. Check API routes are in `/api` directory
3. Ensure serverless function size limits aren't exceeded
4. Check function logs in Vercel dashboard

### Database Connection Issues

1. Verify `DATABASE_URL` format: `mysql://user:pass@host:port/database`
2. Check database server allows connections from Vercel IPs
3. Ensure SSL/TLS settings match your database requirements
4. Test connection locally with same credentials

### OAuth Issues

1. Verify redirect URLs in Kimi OAuth settings
2. Check `KIMI_AUTH_URL` and `KIMI_OPEN_URL` are correct
3. Ensure `APP_ID` and `APP_SECRET` match OAuth app
4. Verify `VITE_KIMI_AUTH_URL` is accessible from browser

## Performance Optimization

### Frontend

- Images are optimized during build
- Videos should be compressed (H.264, ~10s loops recommended)
- Static assets are cached by CDN

### Backend

- Database queries use connection pooling
- API responses are cached where appropriate
- Serverless functions have 10s timeout (configurable in `vercel.json`)

### Database

- Add indexes for frequently queried columns
- Use connection pooling in production
- Consider read replicas for high traffic

## Monitoring

### Vercel Analytics

Enable in Project Settings → Analytics for:
- Page views
- Performance metrics
- Error tracking

### Custom Monitoring

Add your preferred monitoring service:
- Sentry for error tracking
- LogRocket for session replay
- DataDog for infrastructure monitoring

## Rollback

### Vercel

1. Go to Deployments tab
2. Find previous successful deployment
3. Click "..." → "Promote to Production"

### Docker

```bash
# Deploy previous version
docker pull your-registry.com/fjall-group:previous-tag
docker run -p 3000:3000 --env-file .env your-registry.com/fjall-group:previous-tag
```

## Security Checklist

- [ ] All environment variables are set and secure
- [ ] `APP_SECRET` is strong and unique
- [ ] Database credentials are not exposed
- [ ] OAuth redirect URLs are whitelisted
- [ ] CORS settings are configured properly
- [ ] Rate limiting is enabled for API routes
- [ ] SQL injection protection is in place (Drizzle ORM handles this)
- [ ] XSS protection is enabled
- [ ] HTTPS is enforced

## Support

For deployment issues:
1. Check Vercel deployment logs
2. Review function logs in dashboard
3. Test locally with production environment variables
4. Contact support if issues persist

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Drizzle ORM Docs](https://orm.drizzle.team/docs/overview)
- [Hono Documentation](https://hono.dev/)