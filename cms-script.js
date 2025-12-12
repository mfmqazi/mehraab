// CMS Script - Content Management System
const CMS_STORAGE_KEY = 'mbbs_cms_content';

// View Management
function showView(viewName) {
    // Hide all views
    document.querySelectorAll('.view').forEach(view => {
        view.classList.remove('active');
    });

    // Remove active from all nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });

    // Show selected view
    const viewId = viewName + 'View';
    const viewElement = document.getElementById(viewId);
    if (viewElement) {
        viewElement.classList.add('active');
    }

    // Update active nav item
    event.target.closest('.nav-item')?.classList.add('active');

    // Update header
    const titles = {
        dashboard: { title: 'Dashboard', subtitle: 'Manage your MBBS exam prep content' },
        content: { title: 'Content Library', subtitle: 'Browse and manage all study materials' },
        editor: { title: 'Content Editor', subtitle: 'Create and edit study content' },
        questions: { title: 'Question Bank', subtitle: 'Manage practice questions' },
        import: { title: 'Import/Export', subtitle: 'Transfer content data' },
        settings: { title: 'Settings', subtitle: 'Configure platform settings' }
    };

    if (titles[viewName]) {
        document.getElementById('viewTitle').textContent = titles[viewName].title;
        document.getElementById('viewSubtitle').textContent = titles[viewName].subtitle;
    }

    // Load view-specific data
    if (viewName === 'content') {
        loadContentLibrary();
    }
}

// Content Library
function loadContentLibrary() {
    const contentGrid = document.getElementById('contentGrid');
    const content = getStoredContent();

    if (content.length === 0) {
        contentGrid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-secondary);">
                <div style="font-size: 3rem; margin-bottom: 1rem;">📚</div>
                <h3>No content yet</h3>
                <p>Start by creating new content or importing existing materials</p>
                <button class="primary-button" onclick="showView('editor')" style="margin-top: 1rem;">
                    Create Content
                </button>
            </div>
        `;
        return;
    }

    contentGrid.innerHTML = content.map(item => `
        <div class="content-card" style="background: var(--bg-tertiary); padding: 1.5rem; border-radius: var(--radius-lg); border: 1px solid rgba(255, 255, 255, 0.05);">
            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem;">
                <span style="padding: 0.25rem 0.75rem; background: rgba(102, 126, 234, 0.2); border-radius: 50px; font-size: 0.75rem; color: var(--accent-purple);">
                    ${item.subject}
                </span>
                <span style="color: var(--text-muted); font-size: 0.875rem;">
                    ${new Date(item.createdAt).toLocaleDateString()}
                </span>
            </div>
            <h3 style="font-family: 'Outfit', sans-serif; margin-bottom: 0.5rem;">${item.topic}</h3>
            <p style="color: var(--text-secondary); font-size: 0.875rem; margin-bottom: 1rem;">${item.chapter}</p>
            <div style="display: flex; gap: 0.5rem; margin-bottom: 1rem;">
                <span style="font-size: 0.75rem; color: var(--text-muted);">
                    ${item.keyPoints?.length || 0} key points
                </span>
                <span style="color: var(--text-muted);">•</span>
                <span style="font-size: 0.75rem; color: var(--text-muted);">
                    ${item.practiceQuestions?.length || 0} questions
                </span>
            </div>
            <div style="display: flex; gap: 0.5rem;">
                <button class="secondary-button" onclick="editContent('${item.id}')" style="flex: 1; padding: 0.5rem;">
                    ✏️ Edit
                </button>
                <button class="secondary-button" onclick="deleteContent('${item.id}')" style="padding: 0.5rem;">
                    🗑️
                </button>
            </div>
        </div>
    `).join('');
}

function refreshContent() {
    loadContentLibrary();
}

// Editor Tabs
function switchTab(tabName) {
    // Remove active from all tabs
    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });

    // Activate selected tab
    event.target.classList.add('active');
    document.getElementById(tabName + 'Tab').classList.add('active');

    // Update preview if preview tab
    if (tabName === 'preview') {
        updatePreview();
    }
}

// Mnemonic Management
function addMnemonic() {
    const container = document.getElementById('mnemonicsContainer');
    const id = Date.now();

    const mnemonicHTML = `
        <div class="mnemonic-item" id="mnemonic-${id}" style="background: var(--bg-secondary); padding: 1rem; border-radius: var(--radius-md); margin-bottom: 1rem;">
            <div class="form-group">
                <label>Acronym</label>
                <input type="text" placeholder="e.g., MONA" class="mnemonic-acronym">
            </div>
            <div class="form-group">
                <label>Explanation</label>
                <textarea rows="2" placeholder="What does this mnemonic help remember?" class="mnemonic-explanation"></textarea>
            </div>
            <button class="secondary-button" onclick="removeMnemonic(${id})" style="padding: 0.5rem;">
                Remove
            </button>
        </div>
    `;

    container.insertAdjacentHTML('beforeend', mnemonicHTML);
}

function removeMnemonic(id) {
    document.getElementById(`mnemonic-${id}`)?.remove();
}

// Question Management
function addQuestion() {
    const container = document.getElementById('questionsContainer');
    const id = Date.now();

    const questionHTML = `
        <div class="question-item" id="question-${id}" style="background: var(--bg-secondary); padding: 1.5rem; border-radius: var(--radius-md); margin-bottom: 1rem;">
            <div class="form-group">
                <label>Question</label>
                <textarea rows="3" placeholder="Enter clinical scenario or question..." class="question-text"></textarea>
            </div>
            <div class="form-group">
                <label>Options</label>
                <input type="text" placeholder="Option A" class="question-option" style="margin-bottom: 0.5rem;">
                <input type="text" placeholder="Option B" class="question-option" style="margin-bottom: 0.5rem;">
                <input type="text" placeholder="Option C" class="question-option" style="margin-bottom: 0.5rem;">
                <input type="text" placeholder="Option D" class="question-option">
            </div>
            <div class="form-group">
                <label>Correct Answer</label>
                <select class="question-correct">
                    <option value="0">Option A</option>
                    <option value="1">Option B</option>
                    <option value="2">Option C</option>
                    <option value="3">Option D</option>
                </select>
            </div>
            <div class="form-group">
                <label>Explanation</label>
                <textarea rows="3" placeholder="Detailed explanation with reasoning..." class="question-explanation"></textarea>
            </div>
            <button class="secondary-button" onclick="removeQuestion(${id})" style="padding: 0.5rem;">
                Remove Question
            </button>
        </div>
    `;

    container.insertAdjacentHTML('beforeend', questionHTML);
}

function removeQuestion(id) {
    document.getElementById(`question-${id}`)?.remove();
}

// Content Preview
function updatePreview() {
    const subject = document.getElementById('editorSubject').value;
    const chapter = document.getElementById('editorChapter').value;
    const topic = document.getElementById('editorTopic').value;
    const keyPoints = document.getElementById('keyPointsEditor').value.split('\n').filter(p => p.trim());

    const previewHTML = `
        <div style="max-width: 800px;">
            <div style="margin-bottom: 2rem;">
                <span style="padding: 0.25rem 0.75rem; background: rgba(102, 126, 234, 0.2); border-radius: 50px; font-size: 0.875rem; color: var(--accent-purple);">
                    ${subject.toUpperCase()}
                </span>
            </div>
            <h2 style="font-family: 'Outfit', sans-serif; font-size: 2rem; margin-bottom: 0.5rem;">${topic || 'Untitled Topic'}</h2>
            <p style="color: var(--text-secondary); margin-bottom: 2rem;">${chapter || 'No chapter specified'}</p>
            
            ${keyPoints.length > 0 ? `
                <h3 style="font-family: 'Outfit', sans-serif; margin-bottom: 1rem;">Key Points</h3>
                <ul style="list-style: none; padding: 0;">
                    ${keyPoints.map(point => `
                        <li style="padding: 0.75rem; background: var(--bg-secondary); border-radius: var(--radius-md); margin-bottom: 0.5rem; padding-left: 2.5rem; position: relative;">
                            <span style="position: absolute; left: 1rem; color: var(--accent-purple);">•</span>
                            ${point}
                        </li>
                    `).join('')}
                </ul>
            ` : '<p style="color: var(--text-muted);">No key points added yet</p>'}
        </div>
    `;

    document.getElementById('contentPreview').innerHTML = previewHTML;
}

// Save and Publish
function saveDraft() {
    const content = collectEditorContent();
    content.status = 'draft';
    saveContent(content);
    alert('✅ Draft saved successfully!');
}

function publishContent() {
    const content = collectEditorContent();

    if (!content.topic || !content.chapter) {
        alert('❌ Please fill in topic and chapter before publishing');
        return;
    }

    content.status = 'published';
    saveContent(content);
    alert('🚀 Content published successfully!');
    showView('content');
}

function collectEditorContent() {
    const keyPoints = document.getElementById('keyPointsEditor').value
        .split('\n')
        .filter(p => p.trim())
        .map(p => p.trim());

    const mnemonics = {};
    document.querySelectorAll('.mnemonic-item').forEach(item => {
        const acronym = item.querySelector('.mnemonic-acronym').value;
        const explanation = item.querySelector('.mnemonic-explanation').value;
        if (acronym && explanation) {
            mnemonics[acronym] = explanation;
        }
    });

    const questions = [];
    document.querySelectorAll('.question-item').forEach(item => {
        const questionText = item.querySelector('.question-text').value;
        const options = Array.from(item.querySelectorAll('.question-option')).map(input => input.value);
        const correctAnswer = parseInt(item.querySelector('.question-correct').value);
        const explanation = item.querySelector('.question-explanation').value;

        if (questionText && options.every(o => o)) {
            questions.push({
                question: questionText,
                options: options,
                correctAnswer: correctAnswer,
                explanation: explanation
            });
        }
    });

    return {
        id: Date.now().toString(),
        subject: document.getElementById('editorSubject').value,
        chapter: document.getElementById('editorChapter').value,
        topic: document.getElementById('editorTopic').value,
        status: document.getElementById('editorStatus').value,
        keyPoints: keyPoints,
        mnemonics: Object.keys(mnemonics).length > 0 ? mnemonics : undefined,
        practiceQuestions: questions,
        createdAt: new Date().toISOString()
    };
}

// Storage Functions
function getStoredContent() {
    const stored = localStorage.getItem(CMS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
}

function saveContent(content) {
    const allContent = getStoredContent();
    const existingIndex = allContent.findIndex(c => c.id === content.id);

    if (existingIndex >= 0) {
        allContent[existingIndex] = content;
    } else {
        allContent.push(content);
    }

    localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(allContent));
}

function editContent(id) {
    const allContent = getStoredContent();
    const content = allContent.find(c => c.id === id);

    if (!content) return;

    // Switch to editor view
    showView('editor');

    // Populate editor
    document.getElementById('editorSubject').value = content.subject;
    document.getElementById('editorChapter').value = content.chapter;
    document.getElementById('editorTopic').value = content.topic;
    document.getElementById('editorStatus').value = content.status;
    document.getElementById('keyPointsEditor').value = content.keyPoints?.join('\n') || '';
}

function deleteContent(id) {
    if (!confirm('Are you sure you want to delete this content?')) return;

    const allContent = getStoredContent();
    const filtered = allContent.filter(c => c.id !== id);
    localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(filtered));
    loadContentLibrary();
}

// Import/Export
function exportContent() {
    const content = getStoredContent();
    const dataStr = JSON.stringify(content, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mbbs-content-export-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    alert('✅ Content exported successfully!');
}

// File upload
document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('fileInput');
    const uploadArea = document.getElementById('uploadArea');

    if (fileInput && uploadArea) {
        uploadArea.addEventListener('click', () => fileInput.click());

        fileInput.addEventListener('change', (e) => {
            const files = e.target.files;
            if (files.length > 0) {
                importFiles(files);
            }
        });

        // Drag and drop
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.style.borderColor = 'var(--accent-purple)';
        });

        uploadArea.addEventListener('dragleave', () => {
            uploadArea.style.borderColor = '';
        });

        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.style.borderColor = '';
            const files = e.dataTransfer.files;
            importFiles(files);
        });
    }
});

function importFiles(files) {
    Array.from(files).forEach(file => {
        if (file.type === 'application/json') {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const imported = JSON.parse(e.target.result);
                    const allContent = getStoredContent();

                    if (Array.isArray(imported)) {
                        imported.forEach(item => {
                            item.id = Date.now().toString() + Math.random();
                            allContent.push(item);
                        });
                    } else {
                        imported.id = Date.now().toString();
                        allContent.push(imported);
                    }

                    localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(allContent));
                    alert(`✅ Imported ${Array.isArray(imported) ? imported.length : 1} item(s)`);
                } catch (error) {
                    alert('❌ Error importing file: ' + error.message);
                }
            };
            reader.readAsText(file);
        }
    });
}

function showNotifications() {
    alert('🔔 Notifications:\n\n• New content published in Surgery\n• 5 new questions added\n• Content review pending');
}

function addKeyPoint() {
    const editor = document.getElementById('keyPointsEditor');
    editor.value += '\n• ';
    editor.focus();
}

console.log('📊 CMS System Loaded');
