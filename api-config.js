// API Configuration
// This determines whether to use backend proxy or client-side API key

const API_CONFIG = {
    // Set to true to use Vercel backend proxy (recommended for production)
    // Set to false to use client-side API key (for local development)
    USE_BACKEND_PROXY: true,

    // Your Vercel deployment URL (update after deploying)
    BACKEND_URL: 'https://mehraab-g6hgrw8gz-musaddique-qazis-projects.vercel.app/api/generate',

    // Fallback to GitHub Pages URL if Vercel URL not set
    get API_ENDPOINT() {
        // Auto-detect if running on GitHub Pages
        if (window.location.hostname.includes('github.io')) {
            return 'https://mehraab.vercel.app/api/generate';
        }
        return this.BACKEND_URL;
    }
};

// Call Gemini API (via backend proxy or direct)
async function callGeminiAPI(apiKey, prompt) {
    if (API_CONFIG.USE_BACKEND_PROXY) {
        // Use backend proxy (API key stored securely on server)
        return await callViaBackend(prompt);
    } else {
        // Use client-side API key (for local development)
        return await callDirectAPI(apiKey, prompt);
    }
}

// Call via Vercel backend proxy
async function callViaBackend(prompt) {
    try {
        const response = await fetch(API_CONFIG.API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prompt: prompt,
                temperature: 0.7,
                maxTokens: 8192
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || error.error || 'Backend API request failed');
        }

        const data = await response.json();

        if (!data.success) {
            throw new Error('Backend returned unsuccessful response');
        }

        // Extract JSON from response text
        const jsonMatch = data.text.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            throw new Error('No valid JSON found in response');
        }

        return JSON.parse(jsonMatch[0]);

    } catch (error) {
        console.error('Backend API Error:', error);
        throw new Error(`Backend API error: ${error.message}`);
    }
}

// Call Gemini API directly (client-side)
async function callDirectAPI(apiKey, prompt) {
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

    // Extract JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
        throw new Error('No valid JSON found in response');
    }

    return JSON.parse(jsonMatch[0]);
}

// Export for use in content-generator.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { callGeminiAPI, API_CONFIG };
}
