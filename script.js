// Subject data with detailed information
const subjectData = {
    medicine: {
        name: 'Medicine',
        author: 'Archith Boloor',
        color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        topics: [
            'Cardiology', 'Respiratory Medicine', 'Gastroenterology',
            'Nephrology', 'Endocrinology', 'Rheumatology',
            'Hematology', 'Infectious Diseases', 'Neurology',
            'Dermatology', 'Psychiatry', 'Emergency Medicine',
            'Clinical Pharmacology', 'Geriatrics', 'Palliative Care'
        ]
    },
    surgery: {
        name: 'Surgery',
        author: 'SRB',
        color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        topics: [
            'General Surgery', 'Trauma & Emergency', 'Surgical Oncology',
            'GI Surgery', 'Hepatobiliary Surgery', 'Vascular Surgery',
            'Urology', 'Orthopedics', 'Neurosurgery',
            'Plastic Surgery', 'Thoracic Surgery'
        ]
    },
    pediatrics: {
        name: 'Pediatrics',
        author: 'OP Ghai',
        color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        topics: [
            'Neonatology', 'Growth & Development', 'Nutrition',
            'Immunization', 'Infectious Diseases', 'Respiratory Disorders',
            'Cardiovascular Disorders', 'GI Disorders', 'Hematology',
            'Nephrology', 'Neurology', 'Endocrinology',
            'Genetic Disorders', 'Behavioral Pediatrics', 'Adolescent Health'
        ]
    },
    obgyn: {
        name: 'Obstetrics & Gynecology',
        author: 'DC Datta',
        color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        topics: [
            'Antenatal Care', 'High Risk Pregnancy', 'Labor & Delivery',
            'Postpartum Care', 'Medical Disorders in Pregnancy',
            'Gynecological Disorders', 'Menstrual Disorders', 'Infertility',
            'Contraception', 'Gynec Oncology', 'Urogynecology',
            'Reproductive Endocrinology', 'Pediatric Gynecology', 'Menopause'
        ]
    },
    ent: {
        name: 'ENT',
        author: 'PL Dhingra',
        color: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
        topics: [
            'Otology', 'Rhinology', 'Laryngology',
            'Head & Neck Surgery', 'Audiology', 'Vertigo & Balance',
            'Facial Plastics', 'Pediatric ENT', 'ENT Emergencies',
            'Sleep Disorders', 'Voice Disorders'
        ]
    },
    ophthalmology: {
        name: 'Ophthalmology',
        author: 'AK Khurana',
        color: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
        topics: [
            'Refraction & Contact Lenses', 'Cataract', 'Glaucoma',
            'Retinal Disorders', 'Uveitis', 'Corneal Disorders',
            'Ocular Trauma', 'Pediatric Ophthalmology', 'Neuro-ophthalmology',
            'Oculoplasty', 'Ocular Oncology', 'Low Vision'
        ]
    }
};

// Smooth scroll to sections
function scrollToSubjects() {
    const subjectsSection = document.getElementById('subjects');
    if (subjectsSection) {
        subjectsSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Open subject details
function openSubject(subjectKey) {
    const subject = subjectData[subjectKey];
    if (!subject) return;

    // Create a notification or alert
    const message = `
📚 ${subject.name}
Reference: ${subject.author}

Topics Covered:
${subject.topics.slice(0, 5).join('\n')}
...and ${subject.topics.length - 5} more topics!

This feature will open detailed study materials, notes, and practice questions for ${subject.name}.
    `;

    alert(message);

    // In a real application, this would navigate to a dedicated subject page
    console.log(`Opening ${subject.name} study materials...`);
}

// Show study plan modal
function showStudyPlan() {
    const modal = document.getElementById('studyPlanModal');
    if (modal) {
        modal.classList.add('active');

        // Set minimum exam date to tomorrow
        const examDateInput = document.getElementById('examDate');
        if (examDateInput) {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            examDateInput.min = tomorrow.toISOString().split('T')[0];
        }
    }
}

// Close modal
function closeModal() {
    const modal = document.getElementById('studyPlanModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    const modal = document.getElementById('studyPlanModal');
    if (e.target === modal) {
        closeModal();
    }
});

// Handle study plan form submission
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('studyPlanForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const examDate = document.getElementById('examDate').value;
            const studyHours = document.getElementById('studyHours').value;
            const priorityCheckboxes = document.querySelectorAll('input[name="priority"]:checked');

            // Validate priority subjects (max 3)
            if (priorityCheckboxes.length > 3) {
                alert('Please select a maximum of 3 priority subjects.');
                return;
            }

            if (priorityCheckboxes.length === 0) {
                alert('Please select at least one priority subject.');
                return;
            }

            const priorities = Array.from(priorityCheckboxes).map(cb => cb.value);

            // Calculate days until exam
            const today = new Date();
            const exam = new Date(examDate);
            const daysUntilExam = Math.ceil((exam - today) / (1000 * 60 * 60 * 24));

            if (daysUntilExam <= 0) {
                alert('Please select a future exam date.');
                return;
            }

            // Generate study plan
            const totalStudyHours = daysUntilExam * parseInt(studyHours);
            const hoursPerSubject = Math.floor(totalStudyHours / 6);

            let planMessage = `
🎯 Your Personalized Study Plan

📅 Exam Date: ${new Date(examDate).toLocaleDateString()}
⏰ Days Until Exam: ${daysUntilExam} days
📚 Daily Study Hours: ${studyHours} hours
⚡ Total Study Hours: ${totalStudyHours} hours

📊 Time Allocation per Subject:
${Object.keys(subjectData).map(key => {
                const subject = subjectData[key];
                const isPriority = priorities.includes(key);
                const hours = isPriority ? Math.floor(hoursPerSubject * 1.2) : hoursPerSubject;
                return `${isPriority ? '⭐ ' : ''}${subject.name}: ${hours} hours`;
            }).join('\n')}

Priority subjects (⭐) get 20% more study time.

💡 Recommended Schedule:
- Week 1-2: Cover all subjects (first reading)
- Week 3-4: Focus on priority subjects
- Week 5-6: Revision and practice questions
- Final Week: Quick revision and mock tests

Your study plan has been generated! Start your preparation journey today.
            `;

            alert(planMessage);
            closeModal();

            // In a real application, this would save the plan and redirect to a dashboard
            console.log('Study plan generated:', {
                examDate,
                studyHours,
                priorities,
                daysUntilExam,
                totalStudyHours
            });
        });
    }

    // Add animation on scroll for subject cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe subject cards
    const subjectCards = document.querySelectorAll('.subject-card');
    subjectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Observe feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Observe progress cards
    const progressCards = document.querySelectorAll('.progress-card');
    progressCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Animate progress bars when they come into view
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressFill = entry.target.querySelector('.progress-fill');
                if (progressFill) {
                    const width = progressFill.style.width;
                    progressFill.style.width = '0';
                    setTimeout(() => {
                        progressFill.style.width = width;
                    }, 300);
                }
                progressObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    progressCards.forEach(card => {
        progressObserver.observe(card);
    });

    // Add keyboard navigation for modal
    document.addEventListener('keydown', (e) => {
        const modal = document.getElementById('studyPlanModal');
        if (modal && modal.classList.contains('active') && e.key === 'Escape') {
            closeModal();
        }
    });

    // Limit priority subject selection to 3
    const priorityCheckboxes = document.querySelectorAll('input[name="priority"]');
    priorityCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const checkedCount = document.querySelectorAll('input[name="priority"]:checked').length;
            if (checkedCount > 3) {
                checkbox.checked = false;
                alert('You can select a maximum of 3 priority subjects.');
            }
        });
    });

    // Add smooth scroll behavior for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Add active state to navigation links based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Add parallax effect to hero background
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroBackground = document.querySelector('.hero-background');
        if (heroBackground && scrolled < window.innerHeight) {
            heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    console.log('🎓 MBBS Final Year Exam Prep Platform Loaded');
    console.log('📚 Subjects available:', Object.keys(subjectData).length);
    console.log('✨ Ready to help you ace your exams!');
});
