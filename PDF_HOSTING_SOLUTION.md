# Vercel Deployment - PDF Hosting Solution

## ✅ Site Deployed to Vercel

**Current URL:** https://mehraab-b5jy262fp-musaddique-qazis-projects.vercel.app

**Target URL:** mehraab.vercel.app (needs to be configured in Vercel dashboard)

---

## ⚠️ PDF Hosting Issue

Both GitHub Pages and Vercel have limitations with large PDF files:

### The Problem:
- **GitHub Pages:** Doesn't resolve Git LFS files (serves pointer files instead)
- **Vercel:** Has a 100MB file size limit per file
- **Your PDFs:** Range from 65MB to 422MB

### Current Status:
- ✅ Website deployed to Vercel (HTML, CSS, JS all working)
- ❌ PDFs excluded from deployment (too large)
- ⚠️ PDF viewers will show "Missing PDF" error

---

## 🎯 Recommended Solutions

### Option 1: Use Cloudflare R2 (Best for Large Files)
**Free tier:** 10GB storage, no egress fees
**Steps:**
1. Create Cloudflare account
2. Set up R2 bucket
3. Upload PDFs to R2
4. Update PDF URLs in textbook HTML files
5. Enable public access

**Cost:** FREE for your use case

### Option 2: Use Google Drive + Direct Links
**Steps:**
1. Upload PDFs to Google Drive
2. Make them publicly accessible
3. Get direct download links
4. Update PDF URLs in HTML files

**Cost:** FREE (uses your Google Drive storage)

### Option 3: Use AWS S3
**Steps:**
1. Create S3 bucket
2. Upload PDFs
3. Enable public access
4. Use CloudFront for CDN
5. Update URLs

**Cost:** ~$1-2/month for your usage

### Option 4: Split Large PDFs
**Steps:**
1. Split Surgery PDF (422MB) into smaller parts
2. Modify viewer to load parts sequentially
3. Deploy to Vercel

**Pros:** Everything in one place
**Cons:** Complex implementation

---

## 📋 Quick Fix: Google Drive Method

This is the fastest solution to get your site working:

### Step 1: Upload PDFs to Google Drive
Upload these files:
- `dc-dutta-obstetrics.pdf` (103MB)
- `srb-surgery-6th.pdf` (422MB)
- `ghai-pediatrics-8th.pdf` (70MB)
- `medicine-archit-boloor.pdf` (80MB)
- `ophthalmology-khurana.pdf` (65MB)
- `ent-dhingra.pdf` (76MB)

### Step 2: Get Shareable Links
1. Right-click each PDF → Share
2. Change to "Anyone with the link"
3. Copy the link
4. Convert to direct download format:
   - From: `https://drive.google.com/file/d/FILE_ID/view?usp=sharing`
   - To: `https://drive.google.com/uc?export=download&id=FILE_ID`

### Step 3: Update HTML Files
Replace the `url` variable in each textbook HTML file:
```javascript
// Old
const url = 'content/dc-dutta-obstetrics.pdf';

// New
const url = 'https://drive.google.com/uc?export=download&id=YOUR_FILE_ID';
```

---

## 🔧 Files to Update

If using external hosting, update these files:
1. `textbook-dcdutta.html` - Line ~280
2. `textbook-srb.html` - Line ~280
3. `textbook-ghai.html` - Line ~280
4. `textbook-medicine.html` - Line ~280
5. `textbook-ophthalmology.html` - Line ~280
6. `textbook-ent.html` - Line ~280

---

## 🌐 Setting Up mehraab.vercel.app

To use the custom domain:

1. Go to https://vercel.com/dashboard
2. Select the "mehraab" project
3. Go to Settings → Domains
4. Add domain: `mehraab.vercel.app`
5. Vercel will automatically configure it

**Note:** `mehraab.vercel.app` is a Vercel subdomain and should work automatically once added.

---

## 📊 Current Deployment Status

### What's Working:
- ✅ Main website
- ✅ All HTML pages
- ✅ AI Content Generator
- ✅ Study Tools
- ✅ Navigation and UI
- ✅ PDF viewers (UI only)

### What Needs PDF Hosting:
- ⏳ DC Dutta textbook
- ⏳ SRB Surgery textbook
- ⏳ Ghai Pediatrics textbook
- ⏳ Medicine textbook
- ⏳ Ophthalmology textbook
- ⏳ ENT textbook

---

## 🚀 Next Steps

**Choose one of these paths:**

### Path A: Quick Fix (Google Drive)
1. Upload PDFs to Google Drive
2. Get direct download links
3. I'll update all HTML files with new URLs
4. Redeploy to Vercel
**Time:** 15 minutes

### Path B: Professional Solution (Cloudflare R2)
1. Create Cloudflare account
2. Set up R2 bucket
3. Upload PDFs
4. I'll update HTML files
5. Redeploy
**Time:** 30 minutes
**Cost:** FREE

### Path C: Keep Local Only
1. Use the site on localhost only
2. PDFs work perfectly locally
3. No deployment needed
**Time:** 0 minutes (already working)

---

**Which path would you like to take?**
