# 🚀 Vercel Deployment Guide - Secure API Proxy

## Overview

Your MBBS Exam Prep platform now uses a **secure backend proxy** to protect your Gemini API key. This means:
- ✅ API key stored securely on Vercel servers
- ✅ All users can generate content without their own API keys
- ✅ You control and monitor all API usage
- ✅ No risk of key exposure in client-side code

---

## Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

Or use without installing:
```bash
npx vercel
```

---

## Step 2: Deploy to Vercel

### From Your Project Directory:

```bash
cd "c:/Users/Musaddique Qazi/AntigravityProjects/mehraab"
vercel
```

### Follow the Prompts:

1. **Set up and deploy?** → Yes
2. **Which scope?** → Your Vercel account
3. **Link to existing project?** → No
4. **Project name?** → mehraab (or press Enter)
5. **Directory?** → ./ (press Enter)
6. **Override settings?** → No

Vercel will deploy and give you a URL like: `https://mehraab.vercel.app`

---

## Step 3: Add Your API Key as Environment Variable

### Option A: Via Vercel Dashboard (Recommended)

1. Go to: https://vercel.com/dashboard
2. Click on your **mehraab** project
3. Go to **Settings** → **Environment Variables**
4. Add new variable:
   - **Name**: `GEMINI_API_KEY`
   - **Value**: Your Gemini API key (starts with AIza...)
   - **Environment**: Production, Preview, Development (select all)
5. Click **Save**

### Option B: Via CLI

```bash
vercel env add GEMINI_API_KEY
```

Then paste your API key when prompted.

---

## Step 4: Redeploy with Environment Variable

```bash
vercel --prod
```

This redeploys with your API key configured.

---

## Step 5: Update API Endpoint (if needed)

The code is already configured to use `https://mehraab.vercel.app/api/generate`

If your Vercel URL is different, update `api-config.js`:

```javascript
BACKEND_URL: 'https://your-actual-url.vercel.app/api/generate',
```

---

## Step 6: Test the Setup

### Test the API Endpoint:

```bash
curl -X POST https://mehraab.vercel.app/api/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt": "What is the MONA protocol for MI?"}'
```

You should get a JSON response with generated content.

### Test from the Website:

1. Visit: https://mfmqazi.github.io/mehraab/content-generator.html
2. Select a subject and topic
3. Click "Generate Content"
4. Content should generate without needing to enter an API key!

---

## Architecture

```
┌─────────────────┐
│  User Browser   │
│  (GitHub Pages) │
└────────┬────────┘
         │
         │ HTTPS Request
         │ (No API key exposed)
         ▼
┌─────────────────┐
│ Vercel Function │
│  /api/generate  │
│                 │
│  🔐 API Key     │
│  (Secure)       │
└────────┬────────┘
         │
         │ Gemini API Call
         │ (with secret key)
         ▼
┌─────────────────┐
│  Google Gemini  │
│      API        │
└─────────────────┘
```

---

## Security Features

✅ **API Key Protection**
- Stored as environment variable on Vercel
- Never exposed in client-side code
- Not in GitHub repository

✅ **CORS Configuration**
- Allows requests from your GitHub Pages domain
- Can be restricted to specific origins

✅ **Rate Limiting** (Optional - can add)
- Control API usage per user
- Prevent abuse

✅ **Usage Monitoring**
- View API calls in Vercel dashboard
- Monitor costs and usage

---

## Cost Considerations

### Vercel Free Tier:
- ✅ 100GB bandwidth/month
- ✅ 100GB-hours serverless function execution
- ✅ Unlimited API requests (within limits)

### Gemini API Free Tier:
- ✅ 15 requests per minute
- ✅ 1 million tokens per day
- ✅ 1,500 requests per day

**For a class of 50 students:**
- Each generates 5 topics = 250 API calls
- Well within free tier limits!

---

## Monitoring Usage

### Vercel Dashboard:
1. Go to https://vercel.com/dashboard
2. Click your project
3. View **Analytics** tab
4. See function invocations and bandwidth

### Gemini API Usage:
1. Go to https://ai.google.dev
2. View your API key usage
3. Monitor quota consumption

---

## Troubleshooting

### "API key not configured on server"
- Make sure you added `GEMINI_API_KEY` environment variable
- Redeploy after adding: `vercel --prod`

### CORS Errors
- Check that the API endpoint URL is correct
- Verify CORS headers in `api/generate.js`

### Function Timeout
- Vercel free tier has 10s timeout
- Most requests complete in 2-5s
- If timeout occurs, reduce `maxTokens` in request

### Rate Limiting
- Gemini free tier: 15 RPM
- Add delays between bulk generations
- Consider upgrading if needed

---

## Alternative: GitHub Pages Only (No Backend)

If you prefer not to use Vercel, you can:

1. **Pre-generate all content** using AI
2. **Commit JSON files** to repository
3. **Users browse** pre-made content
4. **No API calls** from client

This is simpler but less flexible.

---

## Next Steps

1. ✅ Deploy to Vercel
2. ✅ Add API key as environment variable
3. ✅ Test the endpoint
4. ✅ Update GitHub Pages
5. ✅ Share with students!

---

## Quick Deploy Commands

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd "c:/Users/Musaddique Qazi/AntigravityProjects/mehraab"
vercel

# Add API key
vercel env add GEMINI_API_KEY

# Deploy to production
vercel --prod

# Test
curl -X POST https://mehraab.vercel.app/api/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Test"}'
```

---

## Support

- **Vercel Docs**: https://vercel.com/docs
- **Gemini API**: https://ai.google.dev/docs
- **Your Project**: https://github.com/mfmqazi/mehraab

---

**Your API key is now secure! Students can use the platform without exposing your key.** 🔐✨
