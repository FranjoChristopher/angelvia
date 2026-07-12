/**
 * Photo Gallery with Lightbox
 * Handles gallery display and fullscreen lightbox functionality
 */

class Gallery {
    constructor() {
        this.gallery = document.getElementById('gallery-grid');
        this.lightbox = document.getElementById('lightbox');
        this.lightboxImg = document.getElementById('lightbox-img');
        this.closeBtn = document.querySelector('.lightbox-close');
        this.prevBtn = document.querySelector('.lightbox-prev');
        this.nextBtn = document.querySelector('.lightbox-next');

        this.items = [];
        this.currentIndex = 0;
        this.isOpen = false;
        this.touchStartX = 0;
        this.touchEndX = 0;

        this.init();
    }

    init() {
        if (!this.gallery) return;

        this.items = Array.from(this.gallery.querySelectorAll('.gallery-item'));
        this.bindEvents();
    }

    bindEvents() {
        // Click on gallery items
        this.items.forEach((item, index) => {
            item.addEventListener('click', () => this.open(index));
        });

        // Lightbox controls
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => this.close());
        }
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prev());
        }
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.next());
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!this.isOpen) return;
            if (e.key === 'Escape') this.close();
            if (e.key === 'ArrowLeft') this.prev();
            if (e.key === 'ArrowRight') this.next();
        });

        // Click outside to close
        if (this.lightbox) {
            this.lightbox.addEventListener('click', (e) => {
                if (e.target === this.lightbox) {
                    this.close();
                }
            });
        }

        // Touch swipe for mobile
        if (this.lightbox) {
            this.lightbox.addEventListener('touchstart', (e) => {
                this.touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });

            this.lightbox.addEventListener('touchend', (e) => {
                this.touchEndX = e.changedTouches[0].screenX;
                this.handleSwipe();
            }, { passive: true });
        }
    }

    handleSwipe() {
        const swipeThreshold = 50;
        const diff = this.touchStartX - this.touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                this.next();
            } else {
                this.prev();
            }
        }
    }

    open(index) {
        this.currentIndex = index;
        this.isOpen = true;
        this.updateImage();
        if (this.lightbox) {
            this.lightbox.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }
    }

    close() {
        this.isOpen = false;
        if (this.lightbox) {
            this.lightbox.classList.add('hidden');
            document.body.style.overflow = '';
        }
    }

    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
        this.updateImage();
    }

    next() {
        this.currentIndex = (this.currentIndex + 1) % this.items.length;
        this.updateImage();
    }

    updateImage() {
        const item = this.items[this.currentIndex];
        if (!item) return;

        const img = item.querySelector('img');
        const placeholder = item.querySelector('.gallery-placeholder');

        if (img && this.lightboxImg) {
            this.lightboxImg.src = img.src;
            this.lightboxImg.alt = img.alt || 'Gallery image';
        } else if (placeholder && this.lightboxImg) {
            // Show placeholder content
            this.lightboxImg.src = '';
            this.lightboxImg.alt = placeholder.querySelector('p')?.textContent || '';
        }
    }

    addImage(src, alt = '') {
        if (!this.gallery) return;

        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.setAttribute('data-animate', 'zoom');

        const img = document.createElement('img');
        img.src = src;
        img.alt = alt;
        img.loading = 'lazy';

        item.appendChild(img);
        this.gallery.appendChild(item);
        this.items.push(item);

        // Rebind events
        item.addEventListener('click', () => this.open(this.items.length - 1));

        // Trigger animation
        requestAnimationFrame(() => {
            item.classList.add('animate');
        });
    }
}

// Initialize gallery
let gallery;

function initGallery() {
    gallery = new Gallery();
}

function addGalleryImage(src, alt) {
    if (gallery) {
        gallery.addImage(src, alt);
    }
}
