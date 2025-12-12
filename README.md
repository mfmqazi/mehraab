# 🎓 MBBS Final Year Exam Prep Platform

A comprehensive, feature-rich exam preparation platform for MBBS final year students with AI-powered content generation, interactive study tools, and progress tracking.

## 📚 Features Overview

### 1. **Main Website** (`index.html`)
- ✨ Premium dark-themed UI with smooth animations
- 📖 6 core subjects with detailed information
- 📊 Progress tracking dashboard
- 📅 Personalized study plan generator
- 🎯 Subject-wise topic organization
- 📱 Fully responsive design

**Subjects Covered:**
- Medicine (Boloor)
- Surgery (SRB)
- Pediatrics (OP Ghai)
- Obstetrics & Gynecology (Datta)
- ENT (Dhingra)
- Ophthalmology (AK Khurana)

### 2. **AI Content Generator** (`content-generator.html`)
- 🤖 Powered by Google Gemini API
- 📝 Auto-generate study notes and key points
- ❓ Create practice questions with explanations
- 🧠 Generate mnemonics and memory aids
- 📦 Bulk content generation for entire subjects
- 💾 Download generated content as JSON
- 📊 Real-time statistics tracking

**How to Use:**
1. Get a free API key from [Google AI Studio](https://ai.google.dev)
2. Enter your API key and save
3. Select subject, chapter, and topic
4. Click "Generate Content"
5. Download or copy the generated JSON

### 3. **Content Management System** (`cms.html`)
- 📂 Organize all study materials
- ✏️ Rich content editor with preview
- ❓ Question bank management
- 📥 Import/Export functionality
- 📊 Dashboard with analytics
- 🔍 Search and filter content
- 💾 Local storage persistence

**Features:**
- Create and edit topics with key points
- Add mnemonics and clinical pearls
- Manage practice questions
- Track content completion
- Import/Export JSON files

### 4. **Study Tools** (`study-tools.html`)
- 🎴 **Flashcards**: Interactive spaced repetition
- 📝 **Mock Tests**: Timed practice exams
- ⏱️ **Pomodoro Timer**: Focused study sessions
- 📊 **Statistics**: Performance tracking

**Study Tools Details:**

#### Flashcards
- Subject and topic filtering
- Flip animation
- Confidence rating (Hard/Medium/Easy)
- Progress tracking
- Shuffle mode

#### Mock Tests
- Customizable question count
- Timed exams
- Subject selection
- Question palette
- Flag questions for review
- Detailed results with score animation
- Answer review mode

#### Pomodoro Timer
- Customizable focus/break durations
- Visual circular timer
- Session tracking
- Daily statistics
- Long break after 4 sessions

#### Statistics
- Subject-wise performance
- Weekly activity chart
- Total study time
- Questions attempted
- Average scores

## 🚀 Getting Started

### Quick Start
1. Open `index.html` in your browser to explore the main platform
2. Navigate to different sections using the menu
3. Create a personalized study plan
4. Track your progress

### Using AI Content Generator
1. Open `content-generator.html`
2. Get API key from [ai.google.dev](https://ai.google.dev)
3. Save your API key
4. Generate content for any subject/topic
5. Download and use in your studies

### Content Management
1. Open `cms.html`
2. Create new content or import existing
3. Edit topics with rich editor
4. Export content for backup

### Study Tools
1. Open `study-tools.html`
2. Choose your tool (Flashcards/Mock Test/Timer)
3. Start studying!

## 📁 Project Structure

```
interstellar-exoplanet/
├── index.html              # Main website
├── index.css               # Main website styles
├── script.js               # Main website functionality
├── content-generator.html  # AI content generator
├── content-generator.js    # Generator logic
├── cms.html                # Content management system
├── cms-styles.css          # CMS styles
├── cms-script.js           # CMS functionality
├── study-tools.html        # Study tools interface
├── study-tools.css         # Study tools styles
├── study-tools.js          # Study tools logic
├── content/
│   ├── medicine.json       # Sample Medicine content
│   └── medicine-complete.json  # Full Medicine content
├── CONTENT_GUIDE.md        # Content strategy guide
└── README.md               # This file
```

## 📖 Content Structure

All content is stored in JSON format:

```json
{
  "subject": "Medicine",
  "author": "Boloor",
  "chapters": [
    {
      "title": "Cardiology",
      "topics": [
        {
          "title": "Ischemic Heart Disease",
          "keyPoints": ["...", "..."],
          "mnemonics": {
            "MONA": "Morphine, Oxygen, Nitrates, Aspirin"
          },
          "clinicalPearls": ["...", "..."],
          "practiceQuestions": [
            {
              "question": "...",
              "options": ["A", "B", "C", "D"],
              "correctAnswer": 1,
              "explanation": "..."
            }
          ]
        }
      ]
    }
  ]
}
```

## 🎯 Content Sources

### Recommended Approach: Hybrid
1. **AI Generation**: Use content generator for initial framework
2. **Manual Review**: Medical students/experts review and enhance
3. **Continuous Updates**: Add exam-specific tips and recent patterns

### Content Options:
1. **AI-Generated** (Fast, needs review)
   - Use Gemini API to generate content
   - Review for medical accuracy
   - Add clinical context

2. **Manual Curation** (High quality, time-intensive)
   - Extract from textbooks
   - Add personal notes
   - Include exam tips

3. **Crowdsourced** (Community-driven)
   - Students contribute notes
   - Peer review system
   - Upvoting for quality

4. **Import Existing** (Quick start)
   - Import JSON files
   - Use CMS to organize
   - Enhance over time

## 🔧 Technical Details

### Technologies Used
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Styling**: Custom CSS with CSS Variables
- **Fonts**: Google Fonts (Inter, Outfit)
- **Storage**: LocalStorage for persistence
- **AI**: Google Gemini API (gemini-1.5-flash)

### Browser Compatibility
- Chrome/Edge: ✅ Fully supported
- Firefox: ✅ Fully supported
- Safari: ✅ Fully supported
- Mobile browsers: ✅ Responsive design

### No Dependencies
- Zero npm packages required
- No build process needed
- Just open HTML files in browser
- Works offline (except AI generation)

## 📊 Features Breakdown

### Main Platform Features
- ✅ 6 subject cards with gradients
- ✅ Study plan generator with calendar
- ✅ Progress tracking per subject
- ✅ Responsive navigation
- ✅ Smooth scroll animations
- ✅ Modal for study plan creation

### AI Generator Features
- ✅ Gemini API integration
- ✅ Single topic generation
- ✅ Bulk subject generation
- ✅ Customizable output
- ✅ Statistics tracking
- ✅ JSON download

### CMS Features
- ✅ Dashboard with stats
- ✅ Content library with search
- ✅ Rich text editor
- ✅ Question management
- ✅ Import/Export
- ✅ Preview mode

### Study Tools Features
- ✅ Flashcard system
- ✅ Mock test engine
- ✅ Pomodoro timer
- ✅ Performance analytics
- ✅ Progress tracking

## 🎨 Design Philosophy

### Visual Excellence
- Modern dark theme
- Vibrant gradient accents
- Smooth animations
- Glassmorphism effects
- Premium aesthetics

### User Experience
- Intuitive navigation
- Clear information hierarchy
- Responsive feedback
- Accessibility considerations
- Mobile-first approach

## 📝 Usage Examples

### Creating a Study Plan
1. Click "Create Study Plan" on homepage
2. Enter exam date
3. Set daily study hours
4. Select priority subjects (max 3)
5. Generate personalized schedule

### Generating Content
1. Open AI Content Generator
2. Select "Medicine" → "Cardiology"
3. Enter specific topic (e.g., "Myocardial Infarction")
4. Set number of questions: 5
5. Click "Generate Content"
6. Download JSON file

### Using Flashcards
1. Open Study Tools
2. Select "Flashcards" tab
3. Choose subject and topic
4. Click card to flip
5. Rate difficulty (Hard/Medium/Easy)
6. Progress automatically tracked

### Taking Mock Test
1. Open Study Tools → Mock Test
2. Select subjects to include
3. Set number of questions: 20
4. Set time limit: 30 minutes
5. Start test
6. Review results and answers

## 🔐 Data Privacy

- All data stored locally in browser
- No server-side storage
- API key stored in localStorage
- Export data anytime
- Clear data option available

## 🚀 Future Enhancements

### Planned Features
- [ ] Spaced repetition algorithm
- [ ] Video lectures integration
- [ ] Collaborative study groups
- [ ] Mobile app (PWA)
- [ ] Offline mode
- [ ] Cloud sync (optional)
- [ ] Advanced analytics
- [ ] Custom themes

### Content Expansion
- [ ] Complete all 6 subjects
- [ ] Add clinical cases
- [ ] Include diagrams
- [ ] Video explanations
- [ ] Previous year questions
- [ ] Mock exam series

## 🤝 Contributing

### How to Contribute Content
1. Use CMS to create content
2. Export as JSON
3. Share with community
4. Peer review process
5. Merge into main content

### Content Guidelines
- Accurate medical information
- Exam-focused content
- Clear explanations
- Referenced sources
- Clinical relevance

## 📞 Support

### Getting Help
- Check CONTENT_GUIDE.md for content strategy
- Review code comments for technical details
- Test in different browsers
- Clear localStorage if issues occur

### Common Issues
**Q: Content not saving?**
A: Check browser localStorage is enabled

**Q: AI generation failing?**
A: Verify API key is correct and has quota

**Q: Flashcards not loading?**
A: Ensure content JSON files are present

## 📄 License

This project is created for educational purposes for MBBS students.

## 🎓 Acknowledgments

- Reference textbooks: Boloor, SRB, OP Ghai, Datta, Dhingra, AK Khurana
- Google Gemini AI for content generation
- Medical students for feedback and testing

## 🌟 Key Highlights

✨ **4 Complete Applications in One Platform**
1. Main exam prep website
2. AI content generator
3. Content management system
4. Study tools suite

🎯 **All 4 Features Implemented:**
1. ✅ AI Content Generator
2. ✅ Content Management Interface
3. ✅ Complete Medicine Subject Content
4. ✅ Advanced Study Tools (Flashcards, Mock Tests, Timer)

🚀 **Ready to Use**
- No installation required
- No dependencies
- Works in any modern browser
- Fully functional offline (except AI generation)

---

**Built with ❤️ for MBBS Final Year Students**

*Good luck with your exams! 🎓*
