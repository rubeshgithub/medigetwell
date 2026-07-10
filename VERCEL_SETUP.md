# 🚀 Medigetwell — Vercel Deployment

## Status
- ✅ GitHub: https://github.com/rubeshgithub/medigetwell
- ✅ Database: Neon PostgreSQL
- ✅ Domain: medigetwell.com (ready to connect)

---

## Step 1: Complete GitHub Push

The code is being pushed to GitHub. Once complete:

```bash
# Verify push
cd C:\Projects\Medidepot
git log --oneline -1
# Should show your latest commit pushed to origin/main
```

---

## Step 2: Vercel Setup (5 minutes)

1. **Go to Vercel**: https://vercel.com
2. **Sign up/Login** with GitHub
3. **Import Project**:
   - Click "Add New" → "Project"
   - Select `rubeshgithub/medigetwell` repo
   - **Root Directory**: `apps/web` ← IMPORTANT
   - Click "Deploy"

### Add Environment Variables in Vercel Dashboard:

**Settings → Environment Variables** — Add these:

| Variable | Value |
|----------|-------|
| `DATABASE_URL` | `postgresql://neondb_owner:npg_Qy8cAHGZnMg3@ep-plain-bar-atmcdhgz-pooler.c-9.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require` |
| `NEXTAUTH_SECRET` | Generate: `openssl rand -base64 32` |
| `NEXTAUTH_URL` | `https://medigetwell.vercel.app` (or your domain after connecting) |

**Generate NEXTAUTH_SECRET**:
```bash
# Run in PowerShell
$bytes = [byte[]]::new(24)
$rng = [System.Security.Cryptography.RNGCryptoServiceProvider]::new()
$rng.GetBytes($bytes)
[Convert]::ToBase64String($bytes)
```

Result will look like: `Xt9K/mZ4bVpL...=`

---

## Step 3: Deploy

Once env vars are set in Vercel:
1. Click **"Deploy"** button
2. Wait for build (2-3 minutes)
3. Check build logs if issues

**First deploy URL**: `https://medigetwell.vercel.app`

---

## Step 4: Connect Custom Domain (Optional)

In Vercel Dashboard → **Settings → Domains**:

1. Add domain: `medigetwell.com`
2. Follow DNS setup:
   - Point nameservers OR
   - Add CNAME record to Vercel
3. Auto HTTPS certificate generated
4. Wait 24h for DNS propagation

Then update `NEXTAUTH_URL` to `https://medigetwell.com`

---

## Troubleshooting

### Build Fails: "DATABASE_URL not found"
✅ Check env variables are set in Vercel (not just local)

### 500 Error on App
✅ Check Vercel logs: **Deployments → Failed → View Logs**

### Database Connection Error
✅ Verify Neon connection string is correct
✅ Check Vercel IP is allowed in Neon settings

### "Module not found"
✅ Clear Vercel cache: **Settings → Git → Redeploy**

---

## Verification Checklist

Once deployed, test:

```
GET https://medigetwell.vercel.app/
  Should show: "Find a Healthcare Provider"

GET https://medigetwell.vercel.app/api/search?q=calgary
  Should return: JSON with clinic results

GET https://medigetwell.vercel.app/clinic/calgary-walk-in-clinic
  Should show: Clinic detail page with map
```

---

## Post-Launch

1. **Monitor**: Enable Vercel Analytics (free)
2. **Error Tracking**: Set up Sentry (optional)
3. **Backups**: Neon auto-backups enabled ✅
4. **SSL**: Auto-renewed ✅
5. **Scaling**: Auto-scales on demand ✅

---

## Quick Links

- Vercel Dashboard: https://vercel.com/dashboard
- Neon Console: https://console.neon.tech
- GitHub Repo: https://github.com/rubeshgithub/medigetwell
- Next.js Docs: https://nextjs.org/docs

---

**You're ready to deploy!** 🚀

Need help? Check build logs in Vercel dashboard.
