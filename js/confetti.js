/**
 * Confetti Animation
 * Creates colorful confetti effects for celebrations
 */

class Confetti {
    constructor() {
        this.container = document.getElementById('confetti-container');
        this.colors = ['#FFC0CB', '#B76E79', '#E8919C', '#D4AF37', '#E6E6FA', '#C8A2C8', '#FFFFFF'];
        this.shapes = ['square', 'circle', 'triangle'];
        this.isRunning = false;
    }

    burst(count = 100) {
        if (this.isRunning) return;
        this.isRunning = true;

        const fragment = document.createDocumentFragment();

        for (let i = 0; i < count; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti-piece';

            const color = this.colors[Math.floor(Math.random() * this.colors.length)];
            const shape = this.shapes[Math.floor(Math.random() * this.shapes.length)];
            const size = Math.random() * 10 + 5;
            const left = Math.random() * 100;
            const duration = Math.random() * 3 + 2;
            const delay = Math.random() * 0.5;
            const rotation = Math.random() * 720;

            confetti.style.cssText = `
                position: fixed;
                left: ${left}%;
                top: -${size + 10}px;
                width: ${size}px;
                height: ${size}px;
                background: ${color};
                border-radius: ${shape === 'circle' ? '50%' : shape === 'triangle' ? '0' : '2px'};
                ${shape === 'triangle' ? 'clip-path: polygon(50% 0%, 0% 100%, 100% 100%);' : ''}
                animation: confettiFall ${duration}s linear ${delay}s forwards;
                transform: rotate(${rotation}deg);
            `;

            fragment.appendChild(confetti);
        }

        this.container.appendChild(fragment);

        setTimeout(() => {
            this.container.innerHTML = '';
            this.isRunning = false;
        }, 4000);
    }

    cannon(count = 50, x = 50) {
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti-piece';

                const color = this.colors[Math.floor(Math.random() * this.colors.length)];
                const size = Math.random() * 8 + 4;
                const duration = Math.random() * 2 + 1.5;
                const angle = (Math.random() * 120 - 60) * (Math.PI / 180);
                const velocity = Math.random() * 200 + 100;
                const endLeft = x + Math.cos(angle) * velocity / 10;

                confetti.style.cssText = `
                    position: fixed;
                    left: ${x}%;
                    bottom: 50%;
                    width: ${size}px;
                    height: ${size}px;
                    background: ${color};
                    border-radius: 2px;
                    animation: none;
                    transition: all ${duration}s ease-out;
                `;

                this.container.appendChild(confetti);

                requestAnimationFrame(() => {
                    confetti.style.transform = `translate(${Math.cos(angle) * velocity}px, ${-Math.sin(angle) * velocity}px) rotate(${Math.random() * 720}deg)`;
                    confetti.style.opacity = '0';
                });

                setTimeout(() => {
                    confetti.remove();
                }, duration * 1000);
            }, i * 10);
        }
    }

    shower(count = 50) {
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti-piece';

                const color = this.colors[Math.floor(Math.random() * this.colors.length)];
                const size = Math.random() * 8 + 5;
                const left = Math.random() * 100;
                const duration = Math.random() * 3 + 2;

                confetti.style.cssText = `
                    position: fixed;
                    left: ${left}%;
                    top: -${size + 10}px;
                    width: ${size}px;
                    height: ${size}px;
                    background: ${color};
                    border-radius: 2px;
                    animation: confettiFall ${duration}s linear forwards;
                `;

                this.container.appendChild(confetti);

                confetti.addEventListener('animationend', () => {
                    confetti.remove();
                });
            }, i * 50);
        }
    }
}

const confetti = new Confetti();

function triggerConfetti(count = 100) {
    confetti.burst(count);
}

function triggerConfettiCannon(count, x) {
    confetti.cannon(count, x);
}

function triggerConfettiShower(count) {
    confetti.shower(count);
}

/**
 * Balloon Animation
 */
function createBalloons(count = 10) {
    const container = document.getElementById('balloons-container');
    const colors = ['#FFC0CB', '#B76E79', '#E8919C', '#D4AF37', '#E6E6FA', '#C8A2C8'];

    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const balloon = document.createElement('div');
            balloon.className = 'balloon';
            balloon.style.cssText = `
                left: ${Math.random() * 90 + 5}%;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                animation-duration: ${Math.random() * 3 + 4}s;
                animation-delay: ${Math.random() * 0.5}s;
            `;

            container.appendChild(balloon);

            setTimeout(() => {
                balloon.remove();
            }, 8000);
        }, i * 200);
    }
}

/**
 * Fireworks Animation
 */
function createFireworks(x = 50, y = 50) {
    const container = document.getElementById('confetti-container');
    const colors = ['#FFC0CB', '#B76E79', '#D4AF37', '#E6E6FA', '#FFFFFF'];
    const particles = 30;

    for (let i = 0; i < particles; i++) {
        const particle = document.createElement('div');
        particle.className = 'firework-particle';

        const color = colors[Math.floor(Math.random() * colors.length)];
        const angle = (i / particles) * Math.PI * 2;
        const velocity = Math.random() * 100 + 50;
        const size = Math.random() * 4 + 2;
        const duration = Math.random() * 1 + 0.5;

        particle.style.cssText = `
            position: fixed;
            left: ${x}%;
            top: ${y}%;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            border-radius: 50%;
            transform: translate(-50%, -50%);
            animation: none;
            transition: all ${duration}s ease-out;
        `;

        container.appendChild(particle);

        requestAnimationFrame(() => {
            particle.style.transform = `translate(
                calc(-50% + ${Math.cos(angle) * velocity}px),
                calc(-50% + ${Math.sin(angle) * velocity}px)
            )`;
            particle.style.opacity = '0';
        });

        setTimeout(() => {
            particle.remove();
        }, duration * 1000);
    }
}
