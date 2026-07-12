/**
 * Birthday Countdown Timer
 * Displays countdown to the birthday date
 */

class BirthdayCountdown {
    constructor() {
        this.daysEl = document.getElementById('countdown-days');
        this.hoursEl = document.getElementById('countdown-hours');
        this.minutesEl = document.getElementById('countdown-minutes');
        this.secondsEl = document.getElementById('countdown-seconds');
        this.countdownDisplay = document.getElementById('countdown-display');
        this.birthdayMessage = document.getElementById('birthday-message');

        this.birthdayDate = null;
        this.intervalId = null;
        this.hasReachedBirthday = false;

        this.init();
    }

    init() {
        // Default: set birthday to today (will trigger celebration)
        // You can customize this by calling setBirthday()
        this.setBirthday(new Date());
    }

    setBirthday(date) {
        if (typeof date === 'string') {
            this.birthdayDate = new Date(date);
        } else {
            this.birthdayDate = date;
        }

        // Set to start of the birthday day
        this.birthdayDate.setHours(0, 0, 0, 0);

        // Clear existing interval
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }

        // Start countdown
        this.updateCountdown();
        this.intervalId = setInterval(() => this.updateCountdown(), 1000);
    }

    updateCountdown() {
        const now = new Date();
        const diff = this.birthdayDate - now;

        if (diff <= 0) {
            this.celebrateBirthday();
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        this.updateDisplay(days, hours, minutes, seconds);
    }

    updateDisplay(days, hours, minutes, seconds) {
        if (this.daysEl) {
            this.daysEl.textContent = String(days).padStart(2, '0');
        }
        if (this.hoursEl) {
            this.hoursEl.textContent = String(hours).padStart(2, '0');
        }
        if (this.minutesEl) {
            this.minutesEl.textContent = String(minutes).padStart(2, '0');
        }
        if (this.secondsEl) {
            this.secondsEl.textContent = String(seconds).padStart(2, '0');
        }
    }

    celebrateBirthday() {
        if (this.hasReachedBirthday) return;
        this.hasReachedBirthday = true;

        if (this.countdownDisplay) {
            this.countdownDisplay.classList.add('hidden');
        }
        if (this.birthdayMessage) {
            this.birthdayMessage.classList.remove('hidden');
        }

        // Clear interval
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }

        // Trigger celebration effects
        if (typeof triggerConfetti === 'function') {
            triggerConfetti(150);
        }
        if (typeof createBalloons === 'function') {
            createBalloons(15);
        }
        if (typeof burstHearts === 'function') {
            burstHearts(30);
        }
    }

    setBirthdayFromAge(age, month, day) {
        const now = new Date();
        const year = now.getFullYear();
        let birthdayYear = year;

        // If birthday has passed this year, set for next year
        const birthdayThisYear = new Date(year, month - 1, day);
        if (birthdayThisYear < now) {
            birthdayYear = year + 1;
        }

        this.setBirthday(new Date(birthdayYear, month - 1, day));
    }

    // Get remaining time as object
    getRemainingTime() {
        const now = new Date();
        const diff = this.birthdayDate - now;

        if (diff <= 0) {
            return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }

        return {
            days: Math.floor(diff / (1000 * 60 * 60 * 24)),
            hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((diff % (1000 * 60)) / 1000)
        };
    }
}

// Initialize countdown
let countdown;

function initCountdown() {
    countdown = new BirthdayCountdown();
}

function setBirthdayDate(date) {
    if (countdown) {
        countdown.setBirthday(date);
    }
}

function setBirthdayFromAge(age, month, day) {
    if (countdown) {
        countdown.setBirthdayFromAge(age, month, day);
    }
}
