/**
 * Digital Memory Book / Flipbook
 * Page-turning animation with touch support
 */

class Flipbook {
    constructor() {
        this.bookPages = document.querySelectorAll('.book-page');
        this.prevBtn = document.getElementById('book-prev');
        this.nextBtn = document.getElementById('book-next');
        this.pageNum = document.getElementById('book-page-num');
        this.container = document.querySelector('.book-container');

        this.currentPage = 0;
        this.totalPages = this.bookPages.length;
        this.isAnimating = false;
        this.touchStartX = 0;
        this.touchStartY = 0;

        this.init();
    }

    init() {
        if (!this.bookPages.length) return;

        this.showPage(0);
        this.bindEvents();
    }

    bindEvents() {
        // Button navigation
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prevPage());
        }
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.nextPage());
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prevPage();
            if (e.key === 'ArrowRight') this.nextPage();
        });

        // Touch swipe for mobile
        if (this.container) {
            this.container.addEventListener('touchstart', (e) => {
                this.touchStartX = e.changedTouches[0].screenX;
                this.touchStartY = e.changedTouches[0].screenY;
            }, { passive: true });

            this.container.addEventListener('touchend', (e) => {
                const touchEndX = e.changedTouches[0].screenX;
                const touchEndY = e.changedTouches[0].screenY;
                const diffX = this.touchStartX - touchEndX;
                const diffY = Math.abs(this.touchStartY - touchEndY);

                // Only handle horizontal swipes
                if (Math.abs(diffX) > 50 && diffY < 50) {
                    if (diffX > 0) {
                        this.nextPage();
                    } else {
                        this.prevPage();
                    }
                }
            }, { passive: true });
        }

        // Mouse drag for desktop
        let mouseStartX = 0;
        let isDragging = false;

        if (this.container) {
            this.container.addEventListener('mousedown', (e) => {
                mouseStartX = e.clientX;
                isDragging = true;
            });

            document.addEventListener('mouseup', (e) => {
                if (!isDragging) return;
                isDragging = false;

                const diff = mouseStartX - e.clientX;
                if (Math.abs(diff) > 50) {
                    if (diff > 0) {
                        this.nextPage();
                    } else {
                        this.prevPage();
                    }
                }
            });
        }
    }

    showPage(index) {
        if (this.isAnimating) return;
        if (index < 0 || index >= this.totalPages) return;

        this.isAnimating = true;

        // Hide all pages first
        this.bookPages.forEach((page, i) => {
            page.classList.remove('active', 'prev');

            if (i < index) {
                page.classList.add('prev');
            } else if (i === index) {
                page.classList.add('active');
            }
        });

        this.currentPage = index;
        this.updatePageNumber();

        setTimeout(() => {
            this.isAnimating = false;
        }, 600);
    }

    prevPage() {
        if (this.currentPage > 0) {
            this.showPage(this.currentPage - 1);
        }
    }

    nextPage() {
        if (this.currentPage < this.totalPages - 1) {
            this.showPage(this.currentPage + 1);
        }
    }

    goToPage(index) {
        this.showPage(index);
    }

    updatePageNumber() {
        if (this.pageNum) {
            this.pageNum.textContent = `${this.currentPage + 1} / ${this.totalPages}`;
        }
    }

    // Set image for a specific page
    setPageImage(pageIndex, imageSrc) {
        const page = this.bookPages[pageIndex];
        if (!page) return;

        const placeholder = page.querySelector('.page-image-placeholder');
        if (placeholder) {
            placeholder.innerHTML = '';
            const img = document.createElement('img');
            img.src = imageSrc;
            img.style.cssText = 'width: 100%; height: 100%; object-fit: cover; border-radius: 8px;';
            placeholder.appendChild(img);
        }
    }

    // Set caption for a specific page
    setPageCaption(pageIndex, caption) {
        const page = this.bookPages[pageIndex];
        if (!page) return;

        const captionEl = page.querySelector('.page-caption');
        if (captionEl) {
            captionEl.textContent = caption;
        }
    }

    // Set text for a specific page
    setPageText(pageIndex, text) {
        const page = this.bookPages[pageIndex];
        if (!page) return;

        const textEl = page.querySelector('.page-text');
        if (textEl) {
            textEl.textContent = text;
        }
    }
}

// Initialize flipbook
let flipbook;

function initFlipbook() {
    flipbook = new Flipbook();
}

function setBookPageImage(pageIndex, imageSrc) {
    if (flipbook) {
        flipbook.setPageImage(pageIndex, imageSrc);
    }
}

function setBookPageCaption(pageIndex, caption) {
    if (flipbook) {
        flipbook.setPageCaption(pageIndex, caption);
    }
}

function setBookPageText(pageIndex, text) {
    if (flipbook) {
        flipbook.setPageText(pageIndex, text);
    }
}

function goToBookPage(pageIndex) {
    if (flipbook) {
        flipbook.goToPage(pageIndex);
    }
}
