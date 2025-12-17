// --- CONFIGURATION ---
// SET BIRTHDAY DATE HERE (Year, Month Index 0-11, Day, Hour, Minute)
// Note: January is 0, December is 11.
const birthdayDate = new Date(2026, 0, 28, 0, 0, 0); // Dec 25, 2025 00:00:00
const adminPass = "151809"; // Your secret bypass code

let currentAudio = null;
let cardsFlippedSet = new Set();
const totalCards = 2;

// 1. COUNTDOWN TIMER LOGIC (Forces IST)
function updateTimer() {
    const now = new Date();
    
    // Convert current time to IST offset (UTC+5.5)
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
        if (centerVid) centerVid.play().catch(e => console.log("iPhone Autoplay block handled"));
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

// 5. SPARKLES (iOS Optimized)
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

// 6. LETTER LOGIC
function openLetter() {
    document.getElementById('envelope').classList.add('hidden');
    document.getElementById('letter-content').classList.remove('hidden');
    const text = "My dearest Anuradha, today marks another year of your incredible existence. You bring so much joy and love into this world. You deserve all the magic today! ❤️";
    let i = 0;
    function type() {
        if (i < text.length) {
            document.getElementById("typewriter-text").innerHTML += text.charAt(i);
            i++;
            setTimeout(type, 50);
        } else {
            document.getElementById("letter-btn").classList.remove("hidden");
        }
    }
    type();
}

// 7. MUSIC LOGIC (Required for iPhone User Interaction)
function playSong(index, name) {
    const audio = document.getElementById('audio' + index);
    const disk = document.getElementById('vinyl-disk');
    const songItems = document.querySelectorAll('.song-item');
    
    if (currentAudio === audio && !audio.paused) {
        audio.pause();
        disk.classList.remove('spinning');
    } else {
        if (currentAudio) { currentAudio.pause(); currentAudio.currentTime = 0; }
        currentAudio = audio;
        audio.play().catch(e => alert("Please interact with the page to play music."));
        disk.classList.add('spinning');
        document.getElementById('now-playing').innerText = "Playing: " + name;
        songItems.forEach(item => item.classList.remove('active-song'));
        songItems[index].classList.add('active-song');
    }
}

// 8. CARD LOGIC
function flipCard(card) {
    card.classList.toggle('flipped');
    const cardIndex = Array.from(document.querySelectorAll('.wish-card')).indexOf(card);
    cardsFlippedSet.add(cardIndex);
    if (cardsFlippedSet.size >= totalCards) document.getElementById('final-btn').classList.remove('hidden');
}

function celebrate() {
    confetti({ particleCount: 160, spread: 80, origin: { y: 0.6 } });
    nextSection('cards-section', 'final-section');
}

function restartExperience() { location.reload(); }

// INITIALIZE
createHearts();
setInterval(updateTimer, 1000);
updateTimer();