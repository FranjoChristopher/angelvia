/**
 * Floating Hearts Animation
 * Creates continuously floating hearts across the screen
 */

class HeartsAnimation {
    constructor() {
        this.container = document.getElementById('hearts-container');
        this.hearts = ['&#10084;', '&#10083;', '&#10082;'];
        this.colors = ['#B76E79', '#E8919C', '#FFC0CB', '#D4AF37'];
        this.maxHearts = 15;
        this.heartCount = 0;
        this.isRunning = false;
    }

    start() {
        if (this.isRunning) return;
        this.isRunning = true;
        this.createHeart();
    }

    stop() {
        this.isRunning = false;
    }

    createHeart() {
        if (!this.isRunning) return;
        if (this.heartCount >= this.maxHearts) {
            setTimeout(() => this.createHeart(), 1000);
            return;
        }

        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.innerHTML = this.hearts[Math.floor(Math.random() * this.hearts.length)];

        const size = Math.random() * 20 + 15;
        const left = Math.random() * 100;
        const duration = Math.random() * 5 + 8;
        const color = this.colors[Math.floor(Math.random() * this.colors.length)];
        const delay = Math.random() * 2;

        heart.style.cssText = `
            font-size: ${size}px;
            left: ${left}%;
            color: ${color};
            animation-duration: ${duration}s;
            animation-delay: ${delay}s;
        `;

        this.container.appendChild(heart);
        this.heartCount++;

        heart.addEventListener('animationend', () => {
            heart.remove();
            this.heartCount--;
        });

        setTimeout(() => this.createHeart(), Math.random() * 2000 + 1000);
    }

    burst(count = 20) {
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.className = 'floating-heart';
                heart.innerHTML = this.hearts[Math.floor(Math.random() * this.hearts.length)];

                const size = Math.random() * 30 + 20;
                const left = Math.random() * 100;
                const duration = Math.random() * 3 + 4;
                const color = this.colors[Math.floor(Math.random() * this.colors.length)];

                heart.style.cssText = `
                    font-size: ${size}px;
                    left: ${left}%;
                    color: ${color};
                    animation-duration: ${duration}s;
                    animation-delay: 0s;
                `;

                this.container.appendChild(heart);

                heart.addEventListener('animationend', () => {
                    heart.remove();
                });
            }, i * 50);
        }
    }
}

const heartsAnimation = new HeartsAnimation();

function startHearts() {
    heartsAnimation.start();
}

function burstHearts(count) {
    heartsAnimation.burst(count);
}

function createSparkles(container, count = 30) {
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';

            const size = Math.random() * 6 + 4;
            const top = Math.random() * 100;
            const left = Math.random() * 100;
            const duration = Math.random() * 1 + 1;

            sparkle.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                top: ${top}%;
                left: ${left}%;
                animation-duration: ${duration}s;
            `;

            container.appendChild(sparkle);

            sparkle.addEventListener('animationend', () => {
                sparkle.remove();
            });
        }, i * 30);
    }
}

function createStarSparkles(container) {
    const sparkleSVG = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6 4.4 2.3 7.2L12 16.6l-6.3 4.4 2.3-7.2-6-4.4h7.6z"/></svg>`;

    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const star = document.createElement('div');
            star.className = 'sparkle-particle';
            star.innerHTML = sparkleSVG;

            const size = Math.random() * 15 + 10;
            const top = Math.random() * 100;
            const left = Math.random() * 100;
            const duration = Math.random() * 2 + 1;

            star.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                top: ${top}%;
                left: ${left}%;
                animation-duration: ${duration}s;
                color: #D4AF37;
            `;

            container.appendChild(star);

            setTimeout(() => {
                star.remove();
            }, (duration + 0.5) * 1000);
        }, i * 100);
    }
}
