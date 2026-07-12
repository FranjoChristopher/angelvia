/**
 * Music Player
 * Handles audio playback with visual controls
 */

class MusicPlayer {
    constructor() {
        this.player = document.getElementById('music-player');
        this.playBtn = document.getElementById('music-play');
        this.prevBtn = document.getElementById('music-prev');
        this.nextBtn = document.getElementById('music-next');
        this.progressBar = document.getElementById('music-progress-bar');
        this.volumeSlider = document.getElementById('music-volume');
        this.titleEl = document.querySelector('.music-title');

        this.audio = null;
        this.isPlaying = false;
        this.playlist = [];
        this.currentTrack = 0;
        this.isUserInteractionEnabled = false;

        this.init();
    }

    init() {
        // Create audio element
        this.audio = new Audio();
        this.audio.loop = true;
        this.audio.volume = 0.5;

        this.bindEvents();
    }

    bindEvents() {
        // Play/Pause button
        if (this.playBtn) {
            this.playBtn.addEventListener('click', () => this.togglePlay());
        }

        // Previous/Next buttons
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prevTrack());
        }
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.nextTrack());
        }

        // Progress bar
        if (this.progressBar) {
            this.progressBar.addEventListener('input', (e) => {
                const time = (e.target.value / 100) * this.audio.duration;
                this.audio.currentTime = time;
            });
        }

        // Volume slider
        if (this.volumeSlider) {
            this.volumeSlider.addEventListener('input', (e) => {
                this.audio.volume = e.target.value / 100;
            });
        }

        // Audio events
        this.audio.addEventListener('timeupdate', () => this.updateProgress());
        this.audio.addEventListener('loadedmetadata', () => this.updateDuration());
        this.audio.addEventListener('ended', () => this.nextTrack());
        this.audio.addEventListener('error', () => {
            console.log('Audio error occurred');
        });
    }

    loadTrack(src, title = 'Our Song') {
        this.audio.src = src;
        if (this.titleEl) {
            this.titleEl.textContent = title;
        }
    }

    loadPlaylist(tracks) {
        // tracks should be array of { src, title }
        this.playlist = tracks;
        if (tracks.length > 0) {
            this.loadTrack(tracks[0].src, tracks[0].title);
        }
    }

    togglePlay() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }

    play() {
        if (!this.audio.src) {
            console.log('No audio source loaded');
            return;
        }

        this.audio.play()
            .then(() => {
                this.isPlaying = true;
                this.updatePlayButton();
                if (this.player) {
                    this.player.classList.add('visible');
                }
            })
            .catch((error) => {
                console.log('Playback failed:', error);
            });
    }

    pause() {
        this.audio.pause();
        this.isPlaying = false;
        this.updatePlayButton();
    }

    prevTrack() {
        if (this.playlist.length === 0) return;

        this.currentTrack = (this.currentTrack - 1 + this.playlist.length) % this.playlist.length;
        this.loadTrack(
            this.playlist[this.currentTrack].src,
            this.playlist[this.currentTrack].title
        );
        if (this.isPlaying) {
            this.play();
        }
    }

    nextTrack() {
        if (this.playlist.length === 0) return;

        this.currentTrack = (this.currentTrack + 1) % this.playlist.length;
        this.loadTrack(
            this.playlist[this.currentTrack].src,
            this.playlist[this.currentTrack].title
        );
        if (this.isPlaying) {
            this.play();
        }
    }

    updateProgress() {
        if (this.progressBar && this.audio.duration) {
            const progress = (this.audio.currentTime / this.audio.duration) * 100;
            this.progressBar.value = progress;
        }
    }

    updateDuration() {
        // Can be used to display duration
    }

    updatePlayButton() {
        if (this.playBtn) {
            this.playBtn.innerHTML = this.isPlaying ? '&#10074;&#10074;' : '&#9654;';
        }
    }

    setVolume(value) {
        this.audio.volume = Math.min(1, Math.max(0, value));
        if (this.volumeSlider) {
            this.volumeSlider.value = this.audio.volume * 100;
        }
    }

    show() {
        if (this.player) {
            this.player.classList.add('visible');
        }
    }

    hide() {
        if (this.player) {
            this.player.classList.remove('visible');
        }
    }

    // Auto-play after user interaction (required by browsers)
    enableAutoplay() {
        this.isUserInteractionEnabled = true;
    }
}

// Initialize music player
let musicPlayer;

function initMusicPlayer() {
    musicPlayer = new MusicPlayer();
}

function loadMusic(src, title) {
    if (musicPlayer) {
        musicPlayer.loadTrack(src, title);
    }
}

function playMusic() {
    if (musicPlayer) {
        musicPlayer.play();
    }
}

function pauseMusic() {
    if (musicPlayer) {
        musicPlayer.pause();
    }
}

function showMusicPlayer() {
    if (musicPlayer) {
        musicPlayer.show();
    }
}

function hideMusicPlayer() {
    if (musicPlayer) {
        musicPlayer.hide();
    }
}
