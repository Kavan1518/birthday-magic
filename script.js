// --- CONFIGURATION ---
const birthdayDate = new Date(2026, 0, 28, 0, 0, 0); 
const adminPass = "151809"; 

let currentAudio = null;
let cardsFlippedSet = new Set();
const totalCards = 2;

const myReasons = [
    { title: "Your Smile ✨", desc: "It has the power to brighten my darkest days instantly." },
    { title: "Your Kindness 🌸", desc: "The way you care for everyone around you is so beautiful." },
    { title: "Our Long Talks 📞", desc: "Distance doesn't matter when I'm hearing your voice." },
    { title: "Your Support 🤝", desc: "Thank you for always believing in me, even when I don't." },
    { title: "Just You ❤️", desc: "Because you are perfectly, wonderfully yourself." }
];

let currentReasonIndex = 0;

function openLetter() {
    requestAnimationFrame(() => {
        document.getElementById('envelope').classList.add('hidden');
        document.getElementById('letter-content').classList.remove('hidden');
    });

    const text = "My dearest Aaruu ✨, today marks another year of your incredible existence. You bring so much joy and love into this world. You deserve all the magic today! ❤️";
    let i = 0;

    document.getElementById("typewriter-text").innerHTML = "";

    function type() {
        if (i < text.length) {
            document.getElementById("typewriter-text").innerHTML += text.charAt(i++);
            setTimeout(type, 50);
        } else {
            document.getElementById("letter-btn").classList.remove("hidden");
        }
    }
    type();
}


// 1. COUNTDOWN TIMER LOGIC
function updateTimer() {
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const istNow = new Date(utc + (3600000 * 5.5));
    const diff = birthdayDate - istNow;

    if (diff <= 0) {
        document.getElementById("unlock-btn-container").classList.remove("hidden");
        document.getElementById("countdown-timer").classList.add("hidden");
        return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = d.toString().padStart(2, '0');
    document.getElementById("hours").innerText = h.toString().padStart(2, '0');
    document.getElementById("mins").innerText = m.toString().padStart(2, '0');
    document.getElementById("secs").innerText = s.toString().padStart(2, '0');
}

// 2. ADMIN BYPASS
function showAdminPrompt() {
    const code = prompt("Enter Admin Passcode to bypass timer:");
    if (code === adminPass) {
        nextSection('lockscreen-section', 'intro-section');
    } else if (code !== null) {
        alert("Wrong code! Nice try.");
    }
}

// 3. CORE NAVIGATION
function nextSection(currentId, nextId) {
    document.getElementById(currentId).classList.add('hidden');
    const next = document.getElementById(nextId);
    next.classList.remove('hidden');

    if (nextId === 'wish-section') {
        const centerVid = document.querySelector('.disk-center-video');
        if (centerVid && centerVid.readyState >= 2) {
            centerVid.play().catch(()=>{});
        }
    }
}

// 4. FLOATING HEARTS
function createHearts() {
    const bg = document.getElementById('bg-hearts');
    const symbols = ['❤️', '💖', '✨', '🌸', '💕'];

    setInterval(() => {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = symbols[Math.floor(Math.random() * symbols.length)];
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.fontSize = (Math.random() * 20 + 15) + "px";
        bg.appendChild(heart);
        setTimeout(() => heart.remove(), 6000);
    }, 500);
}

// 5. SPARKLES
document.addEventListener('touchstart', (e) => {
    for (let i = 0; i < 6; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = e.touches[0].pageX + 'px';
        sparkle.style.top = e.touches[0].pageY + 'px';
        sparkle.style.setProperty('--mx', (Math.random() - 0.5) * 120 + 'px');
        sparkle.style.setProperty('--my', (Math.random() - 0.5) * 120 + 'px');
        document.body.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 800);
    }
});

// --- MUSIC NAVIGATION ---
function goToReasons() {
    nextSection('wish-section', 'reasons-section');
    initReasons(); 
}

function goBackToMusic(currentId) {
    document.getElementById(currentId).classList.add('hidden');
    const musicSection = document.getElementById('wish-section');
    musicSection.classList.remove('hidden');
    musicSection.classList.add('animate-fade');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// --- SAFE MUSIC PLAY LOGIC ---
function playSong(index, name) {
    const audio = document.getElementById('audio' + index);
    const disk = document.getElementById('vinyl-disk');
    const songItems = document.querySelectorAll('.song-item');

    if (currentAudio === audio && !audio.paused) {
        audio.pause();
        disk.classList.remove('spinning');
        return;
    }

    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }

    currentAudio = audio;

    audio.oncanplaythrough = () => {
        audio.play();
        disk.classList.add('spinning');
        document.getElementById('now-playing').innerText = "Playing: " + name;
    };

    songItems.forEach(item => item.classList.remove('active-song'));
    songItems[index].classList.add('active-song');
}

// --- SMART PRELOADER (IMAGES + AUDIO + VIDEO) ---
function preloadAssets() {
    const assets = [
        "a1.jpeg","a2.jpeg","a4.jpeg","a7.jpeg",
        "p1.png","p2.png",
        "g1.jpeg","g2.jpeg","g3.jpeg","g4.jpeg","g5.jpeg",
        "g6.jpeg","g7.jpeg","g8.jpeg","g9.jpeg","g10.jpeg"
    ];

    assets.forEach(src => {
        const img = new Image();
        img.src = src;
    });

    // preload audio
    for (let i = 0; i < 4; i++) {
        const audio = document.getElementById('audio' + i);
        if (audio) audio.load();
    }

    // preload video
    const vid = document.querySelector('.disk-center-video');
    if (vid && !vid.src) {
        vid.src = "a6.mp4";
        vid.load();
    }
}

// --- MEMORY FILM STRIP GALLERY ---
const galleryPhotos = [
    "g1.jpeg","g2.jpeg","g3.jpeg","g4.jpeg","g5.jpeg",
    "g6.jpeg","g7.jpeg","g8.jpeg","g9.jpeg","g10.jpeg"
];

function initGallery() {
    const strip = document.getElementById('film-strip');
    const main = document.getElementById('film-main');

    strip.innerHTML = '';
    main.src = galleryPhotos[0];

    galleryPhotos.forEach((src, i) => {
        const thumb = document.createElement('div');
        thumb.className = 'film-thumb';
        thumb.style.backgroundImage = `url(${src})`;

        if (i === 0) thumb.classList.add('active');

        thumb.onclick = () => {
            document.querySelectorAll('.film-thumb').forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
            main.src = src;
        };

        strip.appendChild(thumb);
    });
}

// --- INITIALIZE (CORRECT ORDER) ---
window.addEventListener('load', () => {
    createHearts();
    updateTimer();
    setInterval(updateTimer, 1000);

    // preload everything silently after first paint
    setTimeout(preloadAssets, 1200);
});

