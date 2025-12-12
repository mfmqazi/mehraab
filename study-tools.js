// Study Tools JavaScript
const FLASHCARD_STORAGE = 'mbbs_flashcards';
const TIMER_STORAGE = 'mbbs_timer_stats';
const TEST_STORAGE = 'mbbs_test_results';

// ===== TOOL SWITCHING =====
function switchTool(toolName) {
    // Hide all tools
    document.querySelectorAll('.tool-container').forEach(tool => {
        tool.classList.remove('active');
    });

    // Remove active from all tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Show selected tool
    document.getElementById(toolName).classList.add('active');
    event.target.classList.add('active');
}

// ===== FLASHCARDS =====
let flashcards = [];
let currentCardIndex = 0;

function loadFlashcards() {
    const subject = document.getElementById('flashcardSubject').value;

    // Sample flashcards (in production, load from content files)
    flashcards = [
        {
            question: "What is the MONA protocol for acute MI?",
            answer: "Morphine (pain relief), Oxygen (if hypoxic), Nitrates (vasodilation), Aspirin (antiplatelet therapy)"
        },
        {
            question: "What are the absolute contraindications to thrombolysis?",
            answer: "Recent ischemic stroke (<3 months), Active bleeding, Intracranial pathology, Suspected aortic dissection"
        },
        {
            question: "What is the first-line treatment for HFrEF?",
            answer: "ACE-I/ARB + Beta-blocker + MRA (Spironolactone) + SGLT2 inhibitor + Diuretics as needed"
        },
        {
            question: "What is the GOLD classification for COPD?",
            answer: "Based on FEV1: Grade 1 (≥80%), Grade 2 (50-79%), Grade 3 (30-49%), Grade 4 (<30%)"
        },
        {
            question: "What is the triple therapy for H. pylori eradication?",
            answer: "PPI + Clarithromycin + Amoxicillin for 14 days"
        }
    ];

    currentCardIndex = 0;
    updateFlashcard();
}

function updateFlashcard() {
    if (flashcards.length === 0) {
        loadFlashcards();
        return;
    }

    const card = flashcards[currentCardIndex];
    document.getElementById('flashcardQuestion').textContent = card.question;
    document.getElementById('flashcardAnswer').textContent = card.answer;
    document.getElementById('cardCounter').textContent = `${currentCardIndex + 1} / ${flashcards.length}`;

    const progress = ((currentCardIndex + 1) / flashcards.length) * 100;
    document.getElementById('flashcardProgress').style.width = progress + '%';

    // Reset flip
    document.getElementById('flashcard').classList.remove('flipped');
}

function flipCard() {
    document.getElementById('flashcard').classList.toggle('flipped');
}

function nextCard() {
    if (currentCardIndex < flashcards.length - 1) {
        currentCardIndex++;
        updateFlashcard();
    }
}

function previousCard() {
    if (currentCardIndex > 0) {
        currentCardIndex--;
        updateFlashcard();
    }
}

function shuffleFlashcards() {
    flashcards = flashcards.sort(() => Math.random() - 0.5);
    currentCardIndex = 0;
    updateFlashcard();
}

function markCard(difficulty) {
    // Store card difficulty for spaced repetition
    const cardId = `${currentCardIndex}-${Date.now()}`;
    const stats = JSON.parse(localStorage.getItem(FLASHCARD_STORAGE) || '{}');
    stats[cardId] = { difficulty, timestamp: Date.now() };
    localStorage.setItem(FLASHCARD_STORAGE, JSON.stringify(stats));

    // Move to next card
    nextCard();
}

// ===== MOCK TEST =====
let testQuestions = [];
let currentQuestionIndex = 0;
let testAnswers = [];
let testStartTime = null;
let timerInterval = null;

function startMockTest() {
    const numQuestions = parseInt(document.getElementById('numQuestions').value);
    const timeLimit = parseInt(document.getElementById('timeLimit').value);

    // Generate sample questions (in production, load from content)
    testQuestions = generateSampleQuestions(numQuestions);
    testAnswers = new Array(numQuestions).fill(null);
    currentQuestionIndex = 0;
    testStartTime = Date.now();

    // Hide setup, show test
    document.getElementById('testSetup').style.display = 'none';
    document.getElementById('testInterface').style.display = 'block';

    // Start timer
    startTestTimer(timeLimit);

    // Load first question
    loadQuestion();
    generateQuestionPalette();
}

function generateSampleQuestions(count) {
    const sampleQuestions = [
        {
            question: "A 55-year-old male presents with crushing chest pain radiating to left arm. ECG shows ST elevation in leads II, III, aVF. What is the diagnosis?",
            options: ["Anterior MI", "Inferior MI", "Lateral MI", "Posterior MI"],
            correct: 1
        },
        {
            question: "Which medication reduces mortality in HFrEF?",
            options: ["Digoxin", "Furosemide", "Spironolactone", "Amlodipine"],
            correct: 2
        },
        {
            question: "First-line antihypertensive in diabetic nephropathy?",
            options: ["Amlodipine", "Atenolol", "Lisinopril", "HCTZ"],
            correct: 2
        }
    ];

    // Repeat to reach desired count
    const questions = [];
    for (let i = 0; i < count; i++) {
        questions.push({ ...sampleQuestions[i % sampleQuestions.length], id: i });
    }
    return questions;
}

function loadQuestion() {
    const question = testQuestions[currentQuestionIndex];
    document.getElementById('questionText').textContent = question.question;
    document.getElementById('currentQuestion').textContent = currentQuestionIndex + 1;
    document.getElementById('totalQuestions').textContent = testQuestions.length;

    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = question.options.map((option, index) => `
        <div class="option ${testAnswers[currentQuestionIndex] === index ? 'selected' : ''}" 
             onclick="selectOption(${index})">
            ${String.fromCharCode(65 + index)}. ${option}
        </div>
    `).join('');
}

function selectOption(optionIndex) {
    testAnswers[currentQuestionIndex] = optionIndex;
    loadQuestion();
    updateQuestionPalette();
}

function nextQuestion() {
    if (currentQuestionIndex < testQuestions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    }
}

function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
    }
}

function flagQuestion() {
    // Mark question as flagged
    testQuestions[currentQuestionIndex].flagged = !testQuestions[currentQuestionIndex].flagged;
    updateQuestionPalette();
}

function generateQuestionPalette() {
    const palette = document.getElementById('questionPalette');
    palette.innerHTML = testQuestions.map((q, index) => `
        <div class="palette-item ${testAnswers[index] !== null ? 'answered' : ''} ${q.flagged ? 'flagged' : ''}"
             onclick="jumpToQuestion(${index})">
            ${index + 1}
        </div>
    `).join('');
}

function updateQuestionPalette() {
    generateQuestionPalette();
}

function jumpToQuestion(index) {
    currentQuestionIndex = index;
    loadQuestion();
}

function startTestTimer(minutes) {
    let timeRemaining = minutes * 60;

    timerInterval = setInterval(() => {
        timeRemaining--;

        const mins = Math.floor(timeRemaining / 60);
        const secs = timeRemaining % 60;
        document.getElementById('testTimer').textContent =
            `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            submitTest();
        }
    }, 1000);
}

function submitTest() {
    clearInterval(timerInterval);

    // Calculate results
    let correct = 0;
    testQuestions.forEach((q, index) => {
        if (testAnswers[index] === q.correct) correct++;
    });

    const score = Math.round((correct / testQuestions.length) * 100);
    const timeTaken = Math.floor((Date.now() - testStartTime) / 1000);

    // Show results
    document.getElementById('testInterface').style.display = 'none';
    document.getElementById('testResults').style.display = 'block';

    // Animate score
    animateScore(score);

    document.getElementById('correctAnswers').textContent = correct;
    document.getElementById('incorrectAnswers').textContent = testQuestions.length - correct - testAnswers.filter(a => a === null).length;
    document.getElementById('unanswered').textContent = testAnswers.filter(a => a === null).length;
    document.getElementById('timeTaken').textContent = `${Math.floor(timeTaken / 60)}:${(timeTaken % 60).toString().padStart(2, '0')}`;

    // Save results
    saveTestResult({ score, correct, total: testQuestions.length, timeTaken });
}

function animateScore(targetScore) {
    const circle = document.getElementById('scoreCircle');
    const scoreValue = document.getElementById('scoreValue');
    const circumference = 2 * Math.PI * 90;
    const offset = circumference - (targetScore / 100) * circumference;

    let current = 0;
    const interval = setInterval(() => {
        current += 2;
        if (current >= targetScore) {
            current = targetScore;
            clearInterval(interval);
        }

        scoreValue.textContent = current + '%';
        const currentOffset = circumference - (current / 100) * circumference;
        circle.style.strokeDashoffset = currentOffset;
    }, 20);
}

function retakeTest() {
    document.getElementById('testResults').style.display = 'none';
    document.getElementById('testSetup').style.display = 'block';
}

function saveTestResult(result) {
    const results = JSON.parse(localStorage.getItem(TEST_STORAGE) || '[]');
    results.push({ ...result, timestamp: Date.now() });
    localStorage.setItem(TEST_STORAGE, JSON.stringify(results));
}

// ===== POMODORO TIMER =====
let pomodoroInterval = null;
let pomodoroTimeRemaining = 25 * 60;
let isBreak = false;
let pomodorosCompleted = 0;

function startTimer() {
    const focusDuration = parseInt(document.getElementById('focusDuration').value) * 60;
    pomodoroTimeRemaining = focusDuration;

    document.getElementById('startBtn').style.display = 'none';
    document.getElementById('pauseBtn').style.display = 'inline-block';

    pomodoroInterval = setInterval(() => {
        pomodoroTimeRemaining--;
        updateTimerDisplay();

        if (pomodoroTimeRemaining <= 0) {
            clearInterval(pomodoroInterval);
            timerComplete();
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(pomodoroInterval);
    document.getElementById('startBtn').style.display = 'inline-block';
    document.getElementById('pauseBtn').style.display = 'none';
}

function resetTimer() {
    clearInterval(pomodoroInterval);
    const focusDuration = parseInt(document.getElementById('focusDuration').value) * 60;
    pomodoroTimeRemaining = focusDuration;
    isBreak = false;
    updateTimerDisplay();
    document.getElementById('startBtn').style.display = 'inline-block';
    document.getElementById('pauseBtn').style.display = 'none';
}

function updateTimerDisplay() {
    const mins = Math.floor(pomodoroTimeRemaining / 60);
    const secs = pomodoroTimeRemaining % 60;
    document.getElementById('timerValue').textContent =
        `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

    // Update circle
    const totalTime = isBreak ?
        parseInt(document.getElementById('breakDuration').value) * 60 :
        parseInt(document.getElementById('focusDuration').value) * 60;
    const progress = 1 - (pomodoroTimeRemaining / totalTime);
    const circumference = 2 * Math.PI * 140;
    const offset = circumference * progress;
    document.getElementById('timerCircle').style.strokeDashoffset = circumference - offset;
}

function timerComplete() {
    if (!isBreak) {
        // Focus session complete
        pomodorosCompleted++;
        document.getElementById('pomodorosCompleted').textContent = pomodorosCompleted;

        // Start break
        isBreak = true;
        const breakDuration = pomodorosCompleted % 4 === 0 ?
            parseInt(document.getElementById('longBreakDuration').value) :
            parseInt(document.getElementById('breakDuration').value);
        pomodoroTimeRemaining = breakDuration * 60;
        document.getElementById('timerLabel').textContent = 'Break Time';

        alert('🎉 Focus session complete! Time for a break.');
    } else {
        // Break complete
        isBreak = false;
        pomodoroTimeRemaining = parseInt(document.getElementById('focusDuration').value) * 60;
        document.getElementById('timerLabel').textContent = 'Focus Time';

        alert('✅ Break complete! Ready for another focus session?');
    }

    updateTimerDisplay();
    updatePomodoroStats();
}

function updatePomodoroStats() {
    const stats = JSON.parse(localStorage.getItem(TIMER_STORAGE) || '{"pomodoros":0,"totalTime":0,"breaks":0}');
    stats.pomodoros = pomodorosCompleted;
    stats.totalTime += 25; // minutes
    stats.breaks = Math.floor(pomodorosCompleted);

    document.getElementById('pomodorosCompleted').textContent = stats.pomodoros;
    document.getElementById('totalStudyTime').textContent = `${Math.floor(stats.totalTime / 60)}h ${stats.totalTime % 60}m`;
    document.getElementById('breaksTaken').textContent = stats.breaks;

    localStorage.setItem(TIMER_STORAGE, JSON.stringify(stats));
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    loadFlashcards();
    console.log('📚 Study Tools Loaded');
});
