# Medigetwell Deployment Guide

## Phase 4: Production Deployment

### Prerequisites
- [ ] GitHub account with repo access
- [ ] Vercel account (free tier OK)
- [ ] Production PostgreSQL database
- [ ] NextAuth secret key

### Deployment Steps

#### 1. **Push to GitHub**
```bash
# From project root
git remote add origin https://github.com/YOUR_USERNAME/medigetwell.git
git branch -M main
git push -u origin main
```

#### 2. **Create Vercel Project**
1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Select "Next.js" framework
4. Set root directory: `apps/web`
5. Add environment variables:
   - `DATABASE_URL`: Your production PostgreSQL connection string
   - `NEXTAUTH_SECRET`: Generate with `openssl rand -base64 32`
   - `NEXTAUTH_URL`: Your production domain (e.g., https://medigetwell.com)

#### 3. **Database Setup**
You can use:
- **Neon** (PostgreSQL as a service) - Free tier available
- **Railway** (PostgreSQL hosting)
- **AWS RDS** (managed PostgreSQL)
- **PlanetScale** (MySQL alternative)

Example Neon setup:
```bash
# Get connection string from Neon dashboard
# Add to Vercel project settings as DATABASE_URL
postgresql://user:password@ep-xxx.us-east-1.neon.tech/medigetwell
```

#### 4. **Run Database Migrations**
```bash
# Install Vercel CLI
npm i -g vercel

# Connect to your Vercel project
vercel link

# Deploy
vercel deploy --prod
```

#### 5. **Domain Configuration**
1. In Vercel dashboard, go to Settings → Domains
2. Add your custom domain (e.g., medigetwell.com)
3. Update DNS records to point to Vercel

#### 6. **Post-Deployment Verification**
- [ ] Homepage loads at https://yourdomain.com
- [ ] All pages accessible
- [ ] Search API works
- [ ] Reviews API works
- [ ] Database queries work
- [ ] No 500 errors

### Production Checklist

- [ ] Environment variables set in Vercel
- [ ] Database migrated and seeded
- [ ] NextAuth configured for production
- [ ] Google Maps API key added (optional)
- [ ] Analytics configured (optional)
- [ ] Error monitoring (Sentry, LogRocket)
- [ ] Performance monitoring (Vercel Analytics)

### Troubleshooting

**Issue**: Database connection timeout
- Check DATABASE_URL is correct
- Verify database is accessible from Vercel IPs
- Ensure connection pooling enabled for PostgreSQL

**Issue**: NextAuth errors
- Verify NEXTAUTH_SECRET is set
- Check NEXTAUTH_URL matches your domain
- Clear cookies and test again

**Issue**: Builds fail
- Check `vercel logs` for error details
- Verify all dependencies installed
- Check for missing environment variables

### Rollback
If something breaks, you can revert to previous deployment from Vercel dashboard.

### Post-Launch

1. **Monitor**: Set up error tracking (Sentry, LogRocket)
2. **Analytics**: Enable Google Analytics 4
3. **Backups**: Enable database backups
4. **SSL**: Verify HTTPS certificate auto-renewed
5. **Updates**: Plan regular security updates

---

## Current Status

✅ All features built and tested locally
✅ Ready for production deployment
✅ Database schema complete
✅ API endpoints working
✅ Frontend fully functional

**Next**: Follow deployment steps above and let me know when you have:
1. GitHub repo set up
2. Vercel account created
3. Production database ready

Then I can guide you through the actual deployment!
