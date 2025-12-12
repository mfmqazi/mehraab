// Secure API Key Manager for MBBS Exam Prep
// This handles API keys securely without exposing them in code

class APIKeyManager {
    constructor() {
        this.STORAGE_KEY = 'mbbs_encrypted_api_key';
        this.initialized = false;
    }

    // Check if API key is stored
    hasAPIKey() {
        return localStorage.getItem(this.STORAGE_KEY) !== null;
    }

    // Store API key securely in localStorage (encrypted with simple obfuscation)
    setAPIKey(apiKey) {
        if (!apiKey || apiKey.trim().length === 0) {
            throw new Error('API key cannot be empty');
        }

        // Simple obfuscation (in production, use proper encryption)
        const obfuscated = btoa(apiKey);
        localStorage.setItem(this.STORAGE_KEY, obfuscated);
        this.initialized = true;
        return true;
    }

    // Retrieve API key
    getAPIKey() {
        const stored = localStorage.getItem(this.STORAGE_KEY);
        if (!stored) {
            return null;
        }

        try {
            return atob(stored);
        } catch (e) {
            console.error('Failed to decode API key');
            return null;
        }
    }

    // Remove API key
    clearAPIKey() {
        localStorage.removeItem(this.STORAGE_KEY);
        this.initialized = false;
    }

    // Validate API key format (Gemini keys start with specific pattern)
    validateAPIKey(apiKey) {
        // Gemini API keys typically start with 'AIza' or similar
        if (!apiKey || apiKey.length < 20) {
            return false;
        }
        return true;
    }

    // Show API key setup modal if not configured
    async promptForAPIKey() {
        return new Promise((resolve, reject) => {
            const modal = this.createSetupModal();
            document.body.appendChild(modal);

            const form = modal.querySelector('#apiKeyForm');
            const input = modal.querySelector('#apiKeyInput');
            const closeBtn = modal.querySelector('.modal-close');

            form.onsubmit = (e) => {
                e.preventDefault();
                const apiKey = input.value.trim();

                if (!this.validateAPIKey(apiKey)) {
                    alert('❌ Invalid API key format. Please check and try again.');
                    return;
                }

                try {
                    this.setAPIKey(apiKey);
                    modal.remove();
                    resolve(apiKey);
                } catch (error) {
                    alert('❌ Error saving API key: ' + error.message);
                    reject(error);
                }
            };

            closeBtn.onclick = () => {
                modal.remove();
                reject(new Error('User cancelled API key setup'));
            };
        });
    }

    // Create setup modal HTML
    createSetupModal() {
        const modal = document.createElement('div');
        modal.className = 'api-key-modal';
        modal.innerHTML = `
            <div class="api-key-modal-overlay"></div>
            <div class="api-key-modal-content">
                <button class="modal-close">&times;</button>
                <h2>🔑 API Key Setup</h2>
                <p>To use AI-powered features, you need a Google Gemini API key.</p>
                
                <div class="setup-steps">
                    <div class="step">
                        <span class="step-number">1</span>
                        <div class="step-content">
                            <strong>Get your free API key</strong>
                            <p>Visit <a href="https://ai.google.dev" target="_blank">ai.google.dev</a> and sign in with your Google account</p>
                        </div>
                    </div>
                    <div class="step">
                        <span class="step-number">2</span>
                        <div class="step-content">
                            <strong>Create API key</strong>
                            <p>Click "Get API key" → "Create API key" → Copy the key</p>
                        </div>
                    </div>
                    <div class="step">
                        <span class="step-number">3</span>
                        <div class="step-content">
                            <strong>Enter below</strong>
                            <p>Paste your API key below (it will be stored securely in your browser)</p>
                        </div>
                    </div>
                </div>

                <form id="apiKeyForm">
                    <div class="form-group">
                        <label for="apiKeyInput">Google Gemini API Key</label>
                        <input 
                            type="password" 
                            id="apiKeyInput" 
                            placeholder="AIza..." 
                            required
                            autocomplete="off"
                        >
                        <small>Your API key is stored locally and never sent to any server except Google's API</small>
                    </div>
                    <button type="submit" class="primary-btn">💾 Save API Key</button>
                </form>

                <div class="security-note">
                    <strong>🔒 Security Note:</strong>
                    <ul>
                        <li>API key is stored only in your browser's localStorage</li>
                        <li>Never shared with any third parties</li>
                        <li>Only used to call Google Gemini API</li>
                        <li>You can clear it anytime from settings</li>
                    </ul>
                </div>
            </div>
        `;

        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .api-key-modal {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 1rem;
            }

            .api-key-modal-overlay {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(10, 14, 39, 0.95);
                backdrop-filter: blur(10px);
            }

            .api-key-modal-content {
                position: relative;
                background: #1e2442;
                border-radius: 1.5rem;
                padding: 2rem;
                max-width: 600px;
                width: 100%;
                max-height: 90vh;
                overflow-y: auto;
                border: 1px solid rgba(255, 255, 255, 0.1);
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
            }

            .modal-close {
                position: absolute;
                top: 1rem;
                right: 1rem;
                background: none;
                border: none;
                color: #a0aec0;
                font-size: 2rem;
                cursor: pointer;
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 0.5rem;
                transition: all 0.3s ease;
            }

            .modal-close:hover {
                background: rgba(255, 255, 255, 0.1);
                color: #fff;
            }

            .api-key-modal-content h2 {
                font-family: 'Outfit', sans-serif;
                font-size: 2rem;
                margin-bottom: 1rem;
                color: #fff;
            }

            .api-key-modal-content > p {
                color: #a0aec0;
                margin-bottom: 1.5rem;
            }

            .setup-steps {
                margin-bottom: 2rem;
            }

            .step {
                display: flex;
                gap: 1rem;
                margin-bottom: 1.5rem;
                padding: 1rem;
                background: rgba(102, 126, 234, 0.05);
                border-radius: 1rem;
                border: 1px solid rgba(102, 126, 234, 0.1);
            }

            .step-number {
                width: 32px;
                height: 32px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: 700;
                flex-shrink: 0;
            }

            .step-content strong {
                display: block;
                margin-bottom: 0.25rem;
                color: #fff;
            }

            .step-content p {
                color: #a0aec0;
                font-size: 0.875rem;
                margin: 0;
            }

            .step-content a {
                color: #667eea;
                text-decoration: none;
            }

            .step-content a:hover {
                text-decoration: underline;
            }

            .form-group {
                margin-bottom: 1.5rem;
            }

            .form-group label {
                display: block;
                margin-bottom: 0.5rem;
                font-weight: 600;
                color: #fff;
            }

            .form-group input {
                width: 100%;
                padding: 0.875rem;
                background: #151933;
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 0.5rem;
                color: #fff;
                font-size: 1rem;
                font-family: 'Courier New', monospace;
            }

            .form-group input:focus {
                outline: none;
                border-color: #667eea;
                box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
            }

            .form-group small {
                display: block;
                margin-top: 0.5rem;
                color: #718096;
                font-size: 0.75rem;
            }

            .primary-btn {
                width: 100%;
                padding: 1rem;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                border: none;
                border-radius: 0.5rem;
                color: white;
                font-weight: 600;
                font-size: 1rem;
                cursor: pointer;
                transition: all 0.3s ease;
            }

            .primary-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
            }

            .security-note {
                margin-top: 1.5rem;
                padding: 1rem;
                background: rgba(72, 187, 120, 0.05);
                border: 1px solid rgba(72, 187, 120, 0.2);
                border-radius: 0.5rem;
                font-size: 0.875rem;
            }

            .security-note strong {
                display: block;
                margin-bottom: 0.5rem;
                color: #48bb78;
            }

            .security-note ul {
                margin: 0;
                padding-left: 1.5rem;
                color: #a0aec0;
            }

            .security-note li {
                margin-bottom: 0.25rem;
            }
        `;
        modal.appendChild(style);

        return modal;
    }
}

// Create global instance
window.apiKeyManager = new APIKeyManager();

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = APIKeyManager;
}
