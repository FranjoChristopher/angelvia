/**
 * Main Script - Birthday Website
 * Coordinates all components and handles main interactions
 */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initAllComponents();
});

function initAllComponents() {
    // Initialize individual components
    initGallery();
    initFlipbook();
    initMusicPlayer();
    initCountdown();

    // Main interactions
    initLandingScreen();
    initNavigation();
    initTypingAnimation();
    initScrollAnimations();
    initEnvelope();
    initReasonCards();
    initLoveNotes();
    initGiftBox();

    // Start floating hearts
    startHearts();

    // Create initial sparkles
    const sparklesContainer = document.getElementById('sparkles-container');
    if (sparklesContainer) {
        createSparkles(sparklesContainer, 20);
        setInterval(() => createSparkles(sparklesContainer, 10), 5000);
    }
}

/**
 * Landing Screen
 */
function initLandingScreen() {
    const landingScreen = document.getElementById('landing-screen');
    const openBtn = document.getElementById('open-surprise-btn');
    const mainContent = document.getElementById('main-content');
    const musicPlayer = document.getElementById('music-player');

    if (!openBtn) return;

    openBtn.addEventListener('click', () => {
        if (landingScreen) {
            landingScreen.classList.add('fade-out');

            setTimeout(() => {
                landingScreen.style.display = 'none';
                if (mainContent) {
                    mainContent.classList.remove('hidden');
                }

                if (musicPlayer) {
                    musicPlayer.classList.add('visible');
                }

                window.scrollTo(0, 0);

                triggerConfetti(50);
                burstHearts(20);

                const sparklesContainer = document.getElementById('sparkles-container');
                if (sparklesContainer) {
                    createStarSparkles(sparklesContainer);
                }
            }, 800);
        }
    });
}

/**
 * Navigation
 */
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });

    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener('click', () => {
            hamburgerBtn.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburgerBtn.classList.remove('active');
                navMenu.classList.remove('active');
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });
    }

    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - 200) {
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
}

/**
 * Typing Animation
 */
function initTypingAnimation() {
    const typingText = document.getElementById('typing-text');
    if (!typingText) return;

    const messages = [
        "I love you more every single day...",
        "You are my everything...",
        " Forever and always, my heart is yours...",
        "Every moment with you is a blessing...",
        "You make my heart smile..."
    ];

    let messageIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentMessage = messages[messageIndex];

        if (isDeleting) {
            typingText.textContent = currentMessage.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingText.textContent = currentMessage.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentMessage.length) {
            isDeleting = true;
            typingSpeed = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            messageIndex = (messageIndex + 1) % messages.length;
            typingSpeed = 500;
        }

        setTimeout(type, typingSpeed);
    }

    setTimeout(type, 1000);
}

/**
 * Scroll Animations using Intersection Observer
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-animate]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => {
        observer.observe(el);
    });

    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
    });

    const reasonCards = document.querySelectorAll('.reason-card');
    reasonCards.forEach((card, index) => {
        card.classList.add('animate');
        card.style.transitionDelay = `${index * 0.05}s`;
    });
}

/**
 * Birthday Letter Envelope
 */
function initEnvelope() {
    const envelope = document.getElementById('envelope');
    const letter = document.querySelector('.letter');
    if (!envelope) return;

    envelope.addEventListener('click', () => {
        if (!envelope.classList.contains('open')) {
            envelope.classList.add('open');

            setTimeout(() => {
                triggerConfetti(30);
                burstHearts(15);
            }, 500);
        }
    });

    if (letter) {
        letter.addEventListener('click', (e) => {
            if (envelope.classList.contains('open')) {
                e.stopPropagation();
                envelope.classList.remove('open');
            }
        });
    }
}

/**
 * Reason Cards (Flip Cards)
 */
function initReasonCards() {
    const cards = document.querySelectorAll('.reason-card');

    cards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');

            if (card.classList.contains('flipped')) {
                burstHearts(3);
            }
        });
    });
}

/**
 * Love Notes
 */
function initLoveNotes() {
    const noteText = document.getElementById('note-text');
    const newNoteBtn = document.getElementById('new-note-btn');
    const noteDisplay = document.getElementById('note-display');

    const loveNotes = [
        "You are the first and last thought in my heart every day.",
        "Your smile makes even the darkest days bright.",
        "I fall more in love with you each passing moment.",
        "You are my sunshine on cloudy days.",
        "With you, forever is not long enough.",
        "Your laugh is my favorite melody.",
        "I love the way you understand me without words.",
        "You make ordinary moments extraordinary.",
        "My heart skips a beat every time I see you.",
        "You are the best thing that ever happened to me.",
        "I cherish every moment we share together.",
        "You are the missing piece I never knew I needed.",
        "My love for you grows stronger every day.",
        "You are the reason I believe in soulmates.",
        "I love how you make everything better.",
        "You are my favorite notification.",
        "I love the way you care about everything.",
        "You have the most beautiful soul.",
        "I love getting lost in your eyes.",
        "You are my happy place.",
        "I love how you make me a better person.",
        "Your presence calms my soul.",
        "I love every little thing about you.",
        "You are my forever plus one.",
        "I love the way you see the world.",
        "You make my heart feel at home.",
        "I love how your hand fits perfectly in mine.",
        "You are the plot twist I always wanted.",
        "I love how you make me feel safe.",
        "You are my adventure partner for life.",
        "I love the sound of your voice.",
        "You make my heart skip a beat.",
        "I love how you make me smile without trying.",
        "You are the love I always dreamed of.",
        "I love how we can talk about anything.",
        "You make my world complete.",
        "I love the way you love me.",
        "You are my greatest adventure.",
        "I love how you bring out the best in me.",
        "You are my fairytale come true.",
        "I love how we can be ourselves together.",
        "You are my favorite hello and hardest goodbye.",
        "I love how you make every day special.",
        "You are the light that guides me home.",
        "I love how you understand my silence.",
        "You make my heart sing with joy.",
        "I love how you never give up on us.",
        "You are my soul's best friend.",
        "I love how you make life beautiful.",
        "You are my forever and always."
    ];

    if (!newNoteBtn || !noteText) return;

    newNoteBtn.addEventListener('click', () => {
        const randomIndex = Math.floor(Math.random() * loveNotes.length);
        const newNote = loveNotes[randomIndex];

        if (noteDisplay) {
            noteDisplay.style.transform = 'scale(0.95) rotateY(10deg)';
            noteDisplay.style.opacity = '0.7';
        }

        setTimeout(() => {
            noteText.textContent = newNote;
            if (noteDisplay) {
                noteDisplay.style.transform = 'scale(1) rotateY(0)';
                noteDisplay.style.opacity = '1';
            }

            const sparklesContainer = document.getElementById('sparkles-container');
            if (sparklesContainer) {
                createSparkles(sparklesContainer, 5);
            }
        }, 200);
    });
}

/**
 * Gift Box Surprise - Google Drive Version (WORKING)
 */
function initGiftBox() {
    const giftBox = document.getElementById('gift-box');
    const surpriseMessage = document.getElementById('surprise-message');
    const videoOverlay = document.getElementById('video-overlay');
    const closeVideoBtn = document.getElementById('close-video-btn');
    const giftHint = document.querySelector('.gift-hint');
    const loadingElement = document.getElementById('video-loading');
    const videoIframe = document.getElementById('surprise-video-iframe');
    let videoOpened = false;

    // ✅ CORRECT GOOGLE DRIVE URL - This works!
    const VIDEO_URL = 'https://drive.google.com/file/d/1Y9AAOztX2oMD4Cn7EYzDDb8Ih5rQ3v0w/preview';

    if (!giftBox || !videoOverlay) {
        console.error('Required elements not found!');
        return;
    }

    function resetGiftBox() {
        giftBox.classList.remove('open', 'shake');
        if (giftHint) giftHint.style.display = 'block';
        if (surpriseMessage) surpriseMessage.classList.add('hidden');
        videoOpened = false;
        console.log('Gift box reset complete');
    }

    function closeVideoWithReset() {
        if (!videoOverlay) return;
        console.log('Closing video...');
        
        if (videoIframe) {
            videoIframe.src = '';
            videoIframe.style.display = 'block';
        }
        
        if (loadingElement) {
            loadingElement.style.display = 'none';
            loadingElement.classList.remove('error');
            loadingElement.innerHTML = `
                <div class="spinner"></div>
                <p>Loading your surprise...</p>
            `;
        }
        
        videoOverlay.classList.remove('active');
        setTimeout(() => {
            videoOverlay.classList.add('hidden');
            resetGiftBox();
        }, 1200);
    }

    function openVideo() {
        if (!videoIframe) {
            console.error('Video iframe not found!');
            return;
        }

        console.log('Opening Google Drive video...');

        // Show loading
        if (loadingElement) {
            loadingElement.style.display = 'block';
            loadingElement.classList.remove('error');
            loadingElement.innerHTML = `
                <div class="spinner"></div>
                <p>Loading your surprise...</p>
            `;
        }

        // ✅ Build URL with autoplay parameter
        const videoUrl = VIDEO_URL + '?autoplay=1';
        
        console.log('Video URL:', videoUrl);
        
        // Set the iframe src
        videoIframe.src = videoUrl;

        // Make sure iframe is visible
        videoIframe.style.display = 'block';
        videoIframe.style.opacity = '1';
        videoIframe.style.zIndex = '1';
        videoIframe.style.position = 'absolute';
        videoIframe.style.top = '0';
        videoIframe.style.left = '0';
        videoIframe.style.width = '100%';
        videoIframe.style.height = '100%';

        // Show overlay with fade
        if (videoOverlay) {
            videoOverlay.classList.remove('hidden');
            void videoOverlay.offsetWidth;
            videoOverlay.classList.add('active');
            console.log('Video overlay activated');
        }

        // Hide loading after video loads
        setTimeout(() => {
            if (loadingElement) {
                loadingElement.style.display = 'none';
            }
        }, 4000);

        // Force reload to trigger autoplay and ensure visibility
        setTimeout(() => {
            if (videoIframe && videoIframe.src) {
                videoIframe.src = videoUrl;
                // Ensure iframe is visible after reload
                videoIframe.style.display = 'block';
                videoIframe.style.opacity = '1';
            }
        }, 500);

        // Additional check after 2 seconds
        setTimeout(() => {
            if (videoIframe) {
                videoIframe.style.display = 'block';
                videoIframe.style.opacity = '1';
            }
        }, 2000);
    }

    // Gift box click handler
    giftBox.addEventListener('click', () => {
        console.log('Gift box clicked!');
        
        if (videoOpened) {
            console.log('Video already opened, ignoring click');
            return;
        }
        videoOpened = true;

        // Shake animation
        giftBox.classList.add('shake');

        setTimeout(() => {
            // Open gift
            giftBox.classList.remove('shake');
            giftBox.classList.add('open');

            // Hide hint
            if (giftHint) {
                giftHint.style.display = 'none';
            }

            // Show surprise message briefly
            if (surpriseMessage) {
                surpriseMessage.classList.remove('hidden');
            }

            // Celebration effects
            if (typeof triggerConfetti === 'function') {
                triggerConfetti(150);
            }
            if (typeof createBalloons === 'function') {
                createBalloons(15);
            }
            if (typeof burstHearts === 'function') {
                burstHearts(40);
            }

            console.log('Gift opened, waiting 3 seconds for video...');

            // Show video after 3 seconds
            setTimeout(() => {
                // Hide surprise message
                if (surpriseMessage) {
                    surpriseMessage.classList.add('hidden');
                }

                // Open video
                openVideo();

                // Additional fireworks
                setTimeout(() => {
                    if (typeof createFireworks === 'function') {
                        createFireworks(30, 40);
                    }
                }, 500);
                setTimeout(() => {
                    if (typeof createFireworks === 'function') {
                        createFireworks(70, 30);
                    }
                }, 1000);

            }, 3000);

        }, 500);
    });

    // Close video button
    if (closeVideoBtn && videoOverlay) {
        closeVideoBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            console.log('Close button clicked');
            closeVideoWithReset();
        });
    }

    // Click on overlay background to close
    if (videoOverlay) {
        videoOverlay.addEventListener('click', (e) => {
            if (e.target === videoOverlay || e.target === loadingElement) {
                console.log('Overlay background clicked');
                closeVideoWithReset();
            }
        });
    }

    // Escape key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && videoOverlay && !videoOverlay.classList.contains('hidden')) {
            console.log('Escape key pressed');
            closeVideoWithReset();
        }
    });

    // Audio toggle functionality
    const audioToggleBtn = document.getElementById('audio-toggle-btn');
    const audioIcon = document.getElementById('audio-icon');
    let isMuted = false;
    
    if (audioToggleBtn && audioIcon) {
        audioToggleBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            isMuted = !isMuted;
            
            if (isMuted) {
                audioIcon.textContent = '🔇';
                audioToggleBtn.style.background = 'rgba(0, 0, 0, 0.6)';
                audioToggleBtn.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            } else {
                audioIcon.textContent = '🔊';
                audioToggleBtn.style.background = 'rgba(255, 215, 0, 0.3)';
                audioToggleBtn.style.borderColor = 'gold';
            }
        });
    }
}

/**
 * Close video helper function (kept for compatibility)
 */
function closeVideo(videoOverlay, surpriseVideo) {
    if (!videoOverlay) return;

    if (surpriseVideo) {
        surpriseVideo.pause();
    }

    videoOverlay.classList.remove('active');

    setTimeout(() => {
        videoOverlay.classList.add('hidden');
        if (surpriseVideo) {
            surpriseVideo.currentTime = 0;
        }
    }, 1200);
}

/**
 * Smooth Scroll for anchor links
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

/**
 * Helper: Check if element is in viewport
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Preload images (lazy loading helper)
 */
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Call lazy load
lazyLoadImages();