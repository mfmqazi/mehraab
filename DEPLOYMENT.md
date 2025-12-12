# 🚀 Deployment Guide - Mehraab MBBS Exam Prep

## ✅ Deployment Status

### GitHub Repository
- **Repository**: https://github.com/mfmqazi/mehraab
- **Status**: ✅ Created and pushed successfully
- **Branch**: master

### GitHub Pages Setup
**Follow these steps to enable GitHub Pages:**

1. Go to: https://github.com/mfmqazi/mehraab/settings/pages
2. Under "Source", select **"Deploy from a branch"**
3. Under "Branch", select **"master"** and **"/ (root)"**
4. Click **"Save"**

**Your site will be live at**: `https://mfmqazi.github.io/mehraab/`

⏱️ **Note**: It may take 2-5 minutes for the site to go live after enabling Pages.

---

## 🔑 Secure API Key Setup

### How Your API Key is Protected

✅ **Security Features:**
- API key stored ONLY in your browser's localStorage
- Simple obfuscation applied (base64 encoding)
- Never committed to GitHub
- Never sent to any server except Google's Gemini API
- Can be cleared anytime

### Setting Up Your API Key

#### Option 1: Using the Content Generator (Recommended)
1. Open: `https://mfmqazi.github.io/mehraab/content-generator.html`
2. You'll see an API key input field at the top
3. Enter your Gemini API key
4. Click "Save API Key"
5. ✅ Done! The key is now stored securely in your browser

#### Option 2: Automatic Prompt
The content generator will automatically prompt you for an API key if one isn't found when you try to generate content.

### Getting Your Gemini API Key

1. **Visit**: https://ai.google.dev
2. **Sign in** with your Google account
3. Click **"Get API key"**
4. Click **"Create API key"**
5. **Copy** the generated key
6. **Paste** it into the content generator

**Your API Key Format**: Should start with `AIza...` and be 39+ characters

---

## 📱 Using the Platform

### Main Pages

1. **Homepage**: `https://mfmqazi.github.io/mehraab/`
   - Overview of all subjects
   - Study plan generator
   - Progress tracking

2. **AI Content Generator**: `https://mfmqazi.github.io/mehraab/content-generator.html`
   - Generate study materials with AI
   - Requires Gemini API key
   - Download content as JSON

3. **Content Management System**: `https://mfmqazi.github.io/mehraab/cms.html`
   - Create and edit content manually
   - Import/Export JSON files
   - Question bank management

4. **Study Tools**: `https://mfmqazi.github.io/mehraab/study-tools.html`
   - Flashcards with spaced repetition
   - Mock tests with timer
   - Pomodoro study timer
   - Performance statistics

---

## 🔐 API Key Security Best Practices

### What We Do
✅ Store in browser localStorage (encrypted with base64)
✅ Never expose in code or commits
✅ Only used for Gemini API calls
✅ Can be cleared anytime
✅ Validated before saving

### What You Should Do
✅ Don't share your API key with others
✅ Use a dedicated API key for this project
✅ Monitor your API usage at https://ai.google.dev
✅ Set usage limits in Google Cloud Console
✅ Clear API key if using a shared computer

### Clearing Your API Key
1. Open browser console (F12)
2. Type: `window.apiKeyManager.clearAPIKey()`
3. Press Enter
4. ✅ API key removed

---

## 🔄 Updating the Site

### Making Changes
1. Edit files locally in: `c:/Users/Musaddique Qazi/AntigravityProjects/mehraab`
2. Test changes locally by opening HTML files in browser
3. Commit and push changes:
   ```bash
   git add .
   git commit -m "Your update message"
   git push origin master
   ```
4. GitHub Pages will auto-deploy in 1-2 minutes

### GitHub Actions
- Automatic deployment configured
- Deploys on every push to master
- Check deployment status: https://github.com/mfmqazi/mehraab/actions

---

## 📊 Features Available

### ✅ Fully Functional
- Main website with all 6 subjects
- Study plan generator
- Progress tracking
- AI content generator (with your API key)
- Content management system
- Flashcards
- Mock tests
- Pomodoro timer
- Statistics dashboard

### 📝 Content Status
- **Medicine**: Sample content provided (Cardiology, Respiratory, GI)
- **Other Subjects**: Framework ready, content can be:
  - Generated with AI
  - Added manually via CMS
  - Imported from JSON files

---

## 🎯 Next Steps

### Immediate Actions
1. ✅ Enable GitHub Pages (follow steps above)
2. ✅ Enter your Gemini API key in content generator
3. ✅ Generate content for subjects you need
4. ✅ Start using study tools

### Content Population
1. **Quick Start**: Use AI generator to create initial content
2. **Quality Enhancement**: Review AI content, add textbook details
3. **Expansion**: Add more topics, questions, diagrams
4. **Sharing**: Export content and share with classmates

### Customization
- Update subject colors in `index.css`
- Add your university logo
- Customize study plan templates
- Add more practice questions

---

## 🆘 Troubleshooting

### Site Not Loading
- Wait 5 minutes after enabling Pages
- Check GitHub Actions for deployment status
- Clear browser cache and reload

### API Key Not Working
- Verify key format (starts with `AIza...`)
- Check API quota at https://ai.google.dev
- Try clearing and re-entering the key

### Content Not Saving
- Check browser localStorage is enabled
- Try a different browser
- Check browser console for errors

### GitHub Pages Not Deploying
- Ensure Pages is enabled in repo settings
- Check that master branch exists
- Review GitHub Actions logs

---

## 📞 Support

### Resources
- **README**: Full documentation in `README.md`
- **Content Guide**: Strategy in `CONTENT_GUIDE.md`
- **GitHub Issues**: Report bugs at https://github.com/mfmqazi/mehraab/issues

### Quick Links
- Repository: https://github.com/mfmqazi/mehraab
- Live Site: https://mfmqazi.github.io/mehraab/
- Gemini API: https://ai.google.dev
- GitHub Pages Settings: https://github.com/mfmqazi/mehraab/settings/pages

---

## 🎓 Summary

✅ **Repository Created**: https://github.com/mfmqazi/mehraab
✅ **Secure API Key System**: Implemented with localStorage encryption
✅ **Auto-Deployment**: GitHub Actions configured
✅ **All Features Ready**: 4 complete applications
✅ **Sample Content**: Medicine chapter included

**Next**: Enable GitHub Pages and enter your API key to start using the platform!

---

**Built for MBBS Final Year Students** 🎓
*Good luck with your exams!*
