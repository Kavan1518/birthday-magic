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

// --- UPDATED: Transition to Reasons (Music Keeps Playing) ---
function goToReasons() {
    // REMOVED: currentAudio.pause() so music continues
    nextSection('wish-section', 'reasons-section');
    initReasons(); 
}

function initReasons() {
    const stack = document.getElementById('reasons-stack');
    stack.innerHTML = '';
    currentReasonIndex = 0; 
    
    myReasons.forEach((reason, index) => {
        const card = document.createElement('div');
        card.className = 'reason-card';
        card.style.zIndex = myReasons.length - index;
        card.innerHTML = `<h4>${reason.title}</h4><p>${reason.desc}</p>`;
        stack.appendChild(card);
    });
}

// --- UPDATED: Next Reason with animation and confetti ---
function nextReason() {
    const cards = document.querySelectorAll('.reason-card');
    if (currentReasonIndex < cards.length) {
        // Apply swipe animation (Ensure .swiped is in your CSS)
        cards[currentReasonIndex].classList.add('swiped');
        
        // Burst of heart confetti
        confetti({
            particleCount: 40,
            spread: 60,
            origin: { x: 0.5, y: 0.8 },
            colors: ['#ff69b4', '#e91e63'],
            shapes: ['circle']
        });

        currentReasonIndex++;

        if (currentReasonIndex === cards.length) {
            const nextBtn = document.getElementById('reasons-next-btn');
            nextBtn.classList.remove('hidden');
            nextBtn.classList.add('animate-fade');
        }
    }
}

// --- Cake Cutting ---
function blowCandles() {
    const flames = document.querySelectorAll('.flame');
    const instruction = document.getElementById('cake-instruction');
    const nextBtn = document.getElementById('cake-next-btn');

    flames.forEach(f => {
        f.style.transition = "opacity 0.5s ease";
        f.style.opacity = "0";
    });

    instruction.innerHTML = "Wish granted! ✨";

    const end = Date.now() + (4 * 1000); 

    (function frame() {
        confetti({
            particleCount: 3,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#ff69b4', '#ffffff', '#ffd700']
        });
        confetti({
            particleCount: 3,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#ff69b4', '#ffffff', '#ffd700']
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());

    setTimeout(() => {
        nextBtn.classList.remove('hidden');
        nextBtn.classList.add('animate-fade');
    }, 2500);
}

// 6. LETTER LOGIC
function openLetter() {
    document.getElementById('envelope').classList.add('hidden');
    document.getElementById('letter-content').classList.remove('hidden');
    const text = "My dearest Aaruu ✨, today marks another year of your incredible existence. You bring so much joy and love into this world. You deserve all the magic today! ❤️";
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

// 7. MUSIC LOGIC
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

function goBackToMusic(currentId) {
    document.getElementById(currentId).classList.add('hidden');
    const musicSection = document.getElementById('wish-section');
    musicSection.classList.remove('hidden');
    musicSection.classList.add('animate-fade');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function restartExperience() { location.reload(); }

// INITIALIZE
createHearts();
setInterval(updateTimer, 1000);
updateTimer();
