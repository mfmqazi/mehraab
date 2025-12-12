// AI Content Generator for MBBS Exam Prep
// Uses Google Gemini API to generate study materials

const STORAGE_KEY = 'mbbs_gemini_api_key';
const STATS_KEY = 'mbbs_generator_stats';

// Subject configurations
const subjectConfig = {
    medicine: {
        name: 'Medicine',
        author: 'Archith Boloor',
        chapters: [
            'Cardiology', 'Respiratory Medicine', 'Gastroenterology',
            'Nephrology', 'Endocrinology', 'Rheumatology',
            'Hematology', 'Infectious Diseases', 'Neurology',
            'Dermatology', 'Psychiatry', 'Emergency Medicine'
        ]
    },
    surgery: {
        name: 'Surgery',
        author: 'SRB',
        chapters: [
            'General Surgery', 'Trauma & Emergency', 'Surgical Oncology',
            'GI Surgery', 'Hepatobiliary Surgery', 'Vascular Surgery',
            'Urology', 'Orthopedics', 'Neurosurgery'
        ]
    },
    pediatrics: {
        name: 'Pediatrics',
        author: 'OP Ghai',
        chapters: [
            'Neonatology', 'Growth & Development', 'Nutrition',
            'Immunization', 'Infectious Diseases', 'Respiratory Disorders',
            'Cardiovascular Disorders', 'GI Disorders', 'Hematology'
        ]
    },
    obgyn: {
        name: 'Obstetrics & Gynecology',
        author: 'DC Datta',
        chapters: [
            'Antenatal Care', 'High Risk Pregnancy', 'Labor & Delivery',
            'Postpartum Care', 'Gynecological Disorders', 'Menstrual Disorders',
            'Infertility', 'Contraception', 'Gynec Oncology'
        ]
    },
    ent: {
        name: 'ENT',
        author: 'PL Dhingra',
        chapters: [
            'Otology', 'Rhinology', 'Laryngology',
            'Head & Neck Surgery', 'Audiology', 'Vertigo & Balance',
            'Pediatric ENT', 'ENT Emergencies'
        ]
    },
    ophthalmology: {
        name: 'Ophthalmology',
        author: 'AK Khurana',
        chapters: [
            'Refraction & Contact Lenses', 'Cataract', 'Glaucoma',
            'Retinal Disorders', 'Uveitis', 'Corneal Disorders',
            'Ocular Trauma', 'Pediatric Ophthalmology', 'Neuro-ophthalmology'
        ]
    }
};

// Load stats from localStorage
function loadStats() {
    const stats = localStorage.getItem(STATS_KEY);
    if (stats) {
        const parsed = JSON.parse(stats);
        document.getElementById('topicsGenerated').textContent = parsed.topics || 0;
        document.getElementById('questionsGenerated').textContent = parsed.questions || 0;
        document.getElementById('mnemonicsGenerated').textContent = parsed.mnemonics || 0;
        document.getElementById('filesCreated').textContent = parsed.files || 0;
    }
}

// Update stats
function updateStats(topics = 0, questions = 0, mnemonics = 0, files = 0) {
    const current = JSON.parse(localStorage.getItem(STATS_KEY) || '{"topics":0,"questions":0,"mnemonics":0,"files":0}');
    current.topics += topics;
    current.questions += questions;
    current.mnemonics += mnemonics;
    current.files += files;
    localStorage.setItem(STATS_KEY, JSON.stringify(current));
    loadStats();
}

// Save API key using secure manager
function saveAPIKey() {
    const apiKey = document.getElementById('apiKey').value.trim();
    if (!apiKey) {
        showError('Please enter a valid API key');
        return;
    }

    if (!window.apiKeyManager.validateAPIKey(apiKey)) {
        showError('Invalid API key format. Gemini API keys should be at least 20 characters.');
        return;
    }

    try {
        window.apiKeyManager.setAPIKey(apiKey);
        showSuccess('API key saved securely! ✅');
        document.getElementById('apiKey').value = '';
        document.getElementById('apiKey').placeholder = 'API Key saved ✓';
    } catch (error) {
        showError('Error saving API key: ' + error.message);
    }
}

// Load API key using secure manager
function getAPIKey() {
    return window.apiKeyManager.getAPIKey();
}

// Update chapters dropdown based on subject
function updateChapters() {
    const subject = document.getElementById('subject').value;
    const chapterSelect = document.getElementById('chapter');
    const chapters = subjectConfig[subject].chapters;

    chapterSelect.innerHTML = chapters.map(ch =>
        `<option value="${ch.toLowerCase().replace(/\s+/g, '-')}">${ch}</option>`
    ).join('');
}

// Generate content using Gemini API
async function generateContent() {
    const apiKey = getApiKey();
    if (!apiKey) {
        showError('Please save your Gemini API key first');
        return;
    }

    const subject = document.getElementById('subject').value;
    const chapter = document.getElementById('chapter').value;
    const specificTopic = document.getElementById('specificTopic').value;
    const numQuestions = parseInt(document.getElementById('numQuestions').value);
    const includeMnemonics = document.getElementById('includeMnemonics').checked;
    const includeClinicalPearls = document.getElementById('includeClinicalPearls').checked;

    const subjectInfo = subjectConfig[subject];
    const chapterName = document.getElementById('chapter').options[document.getElementById('chapter').selectedIndex].text;
    const topicName = specificTopic || chapterName;

    showLoading(true);
    setOutput('Generating content...');

    try {
        const prompt = createPrompt(subjectInfo, chapterName, topicName, numQuestions, includeMnemonics, includeClinicalPearls);
        const content = await callGeminiAPI(apiKey, prompt);

        // Parse and format the response
        const formattedContent = formatContent(content, subjectInfo, chapterName, topicName);

        setOutput(JSON.stringify(formattedContent, null, 2));

        // Update stats
        const mnemonicsCount = formattedContent.mnemonics ? Object.keys(formattedContent.mnemonics).length : 0;
        updateStats(1, numQuestions, mnemonicsCount, 0);

        showSuccess(`Content generated successfully for ${topicName}!`);
    } catch (error) {
        showError(`Error: ${error.message}`);
        setOutput(JSON.stringify({ error: error.message }, null, 2));
    } finally {
        showLoading(false);
    }
}

// Create prompt for Gemini
function createPrompt(subjectInfo, chapter, topic, numQuestions, includeMnemonics, includeClinicalPearls) {
    return `You are an expert medical educator creating study materials for MBBS final year students.

Subject: ${subjectInfo.name}
Reference Textbook: ${subjectInfo.author}
Chapter: ${chapter}
Topic: ${topic}

Create comprehensive study content in JSON format with the following structure:

{
  "topic": "${topic}",
  "keyPoints": [
    "List 7-10 high-yield key points covering definition, etiology, pathophysiology, clinical features, diagnosis, and management",
    "Each point should be concise but complete",
    "Focus on exam-relevant information"
  ],
  ${includeMnemonics ? `"mnemonics": {
    "ACRONYM1": "Explanation of what the mnemonic helps remember",
    "ACRONYM2": "Another helpful mnemonic"
  },` : ''}
  ${includeClinicalPearls ? `"clinicalPearls": [
    "Important clinical tips",
    "Common exam questions",
    "Differential diagnosis points"
  ],` : ''}
  "practiceQuestions": [
    {
      "question": "Clinical scenario-based MCQ question",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": 0,
      "explanation": "Detailed explanation with reasoning"
    }
    // Include ${numQuestions} questions total
  ]
}

Guidelines:
- Make questions clinically relevant and exam-oriented
- Include case-based scenarios
- Explanations should teach concepts, not just state answers
- Use standard medical terminology
- Focus on high-yield topics for final year MBBS

Return ONLY valid JSON, no additional text.`;
}

// Call Gemini API
async function callGeminiAPI(apiKey, prompt) {
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            contents: [{
                parts: [{
                    text: prompt
                }]
            }],
            generationConfig: {
                temperature: 0.7,
                topK: 40,
                topP: 0.95,
                maxOutputTokens: 8192,
            }
        })
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'API request failed');
    }

    const data = await response.json();
    const text = data.candidates[0].content.parts[0].text;

    // Extract JSON from response (remove markdown code blocks if present)
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
        throw new Error('No valid JSON found in response');
    }

    return JSON.parse(jsonMatch[0]);
}

// Format content
function formatContent(content, subjectInfo, chapter, topic) {
    return {
        subject: subjectInfo.name,
        author: subjectInfo.author,
        chapter: chapter,
        topic: topic,
        generatedAt: new Date().toISOString(),
        ...content
    };
}

// Bulk generate content for entire subject
async function generateBulk() {
    const apiKey = getApiKey();
    if (!apiKey) {
        showError('Please save your Gemini API key first');
        return;
    }

    const subject = document.getElementById('subject').value;
    const subjectInfo = subjectConfig[subject];

    if (!confirm(`This will generate content for all ${subjectInfo.chapters.length} chapters in ${subjectInfo.name}. This may take several minutes and use significant API quota. Continue?`)) {
        return;
    }

    showLoading(true);
    const results = [];
    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < subjectInfo.chapters.length; i++) {
        const chapter = subjectInfo.chapters[i];
        setOutput(`Generating ${i + 1}/${subjectInfo.chapters.length}: ${chapter}...`);

        try {
            const prompt = createPrompt(subjectInfo, chapter, chapter, 5, true, true);
            const content = await callGeminiAPI(apiKey, prompt);
            const formatted = formatContent(content, subjectInfo, chapter, chapter);
            results.push(formatted);
            successCount++;
            updateStats(1, 5, 2, 0);

            // Add delay to avoid rate limiting
            await new Promise(resolve => setTimeout(resolve, 2000));
        } catch (error) {
            console.error(`Error generating ${chapter}:`, error);
            errorCount++;
        }
    }

    const finalOutput = {
        subject: subjectInfo.name,
        author: subjectInfo.author,
        totalChapters: subjectInfo.chapters.length,
        generatedChapters: successCount,
        chapters: results,
        generatedAt: new Date().toISOString()
    };

    setOutput(JSON.stringify(finalOutput, null, 2));
    updateStats(0, 0, 0, 1);
    showLoading(false);
    showSuccess(`Bulk generation complete! ${successCount} chapters generated, ${errorCount} errors.`);
}

// Copy to clipboard
function copyToClipboard() {
    const output = document.getElementById('output').textContent;
    navigator.clipboard.writeText(output).then(() => {
        showSuccess('Copied to clipboard!');
    }).catch(err => {
        showError('Failed to copy: ' + err.message);
    });
}

// Download JSON
function downloadJSON() {
    const output = document.getElementById('output').textContent;
    const subject = document.getElementById('subject').value;
    const chapter = document.getElementById('chapter').value;

    const blob = new Blob([output], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${subject}-${chapter}-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    updateStats(0, 0, 0, 1);
    showSuccess('File downloaded!');
}

// UI Helper functions
function showLoading(show) {
    document.getElementById('loading').classList.toggle('active', show);
}

function setOutput(text) {
    document.getElementById('output').textContent = text;
}

function showSuccess(message) {
    const el = document.getElementById('successMessage');
    el.textContent = message;
    el.classList.add('active');
    setTimeout(() => el.classList.remove('active'), 5000);
}

function showError(message) {
    const el = document.getElementById('errorMessage');
    el.textContent = message;
    el.classList.add('active');
    setTimeout(() => el.classList.remove('active'), 5000);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadStats();
    updateChapters();

    // Check if API key exists
    if (getApiKey()) {
        document.getElementById('apiKey').placeholder = 'API Key saved ✓';
    }

    console.log('🤖 AI Content Generator Ready');
});
