const cat = document.getElementById("cat");
function setMood(mood) {
  cat.removeAttribute("data-mood");
  if (mood) cat.setAttribute("data-mood", mood);
}

// Step Navigation with Custom Moods per Step
function nextStep(id) {
  document.querySelectorAll(".step").forEach((s) => s.classList.remove("active"));
  document.getElementById("step" + id).classList.add("active");

  // Reset transform
  const catSvg = cat.querySelector("svg");
  catSvg.style.transform = "none";

  // Mood Mapping
  if (id === 2) {
    setMood("cute"); // Smiling eyes
    catSvg.style.transform = "rotate(-5deg)";
  } else if (id === 3) {
    setMood("love"); // Heart bubble
  } else if (id === 4) {
    setMood("shocked"); // Wide eyes because "you are my world"
  } else if (id === 5) {
    setMood("cute"); // Laugh/smile -> simple cute
    catSvg.style.transform = "translateY(5px)";
  } else if (id === 6) {
    setMood("shocked"); // A bit serious/nervous (reusing shocked for wide eyes)
    catSvg.style.transform = "none";
  } else if (id === 7) {
    setMood("default"); // Earnest
    catSvg.style.transform = "translateY(8px)"; // Peeking up
  } else {
    setMood(""); // Default happy/normal
  }
}

// No Button Dodge Logic
const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
let noCount = 0;
const noTexts = ["No? ", "Are you sure?", "Please? ", "Don't do this!", "Think again!", "Heartbreaker! ","Tomato"," Buffalo"];

function dodgeBtn(e) {
  if (e.type === "touchstart") e.preventDefault();

  const margin = 20;
  const maxX = window.innerWidth - noBtn.offsetWidth - margin;
  const maxY = window.innerHeight - noBtn.offsetHeight - margin;

  const randomX = Math.max(margin, Math.random() * maxX);
  const randomY = Math.max(margin, Math.random() * maxY);

  noBtn.style.position = "fixed";
  noBtn.style.left = randomX + "px";
  noBtn.style.top = randomY + "px";

  noBtn.innerText = noTexts[noCount % noTexts.length];
  noCount++;

  setMood("sad");
  setTimeout(() => setMood(""), 1500);
}

["mouseover", "touchstart", "click"].forEach((evt) => noBtn.addEventListener(evt, dodgeBtn));

// Success
function acceptLove() {
  nextStep(8);
  setMood("excited"); // Dancing
  setMood("love"); // Also hearts
  // Combine via CSS? Just use Excited which has dance, and logic add hearts
  cat.setAttribute("data-mood", "love"); // Keep love hearts
  cat.querySelector("svg").style.animation = "dance 0.6s infinite alternate";

  yesBtn.style.transform = "scale(1)";
  startSparkles();
  for (let i = 0; i < 15; i++) createFloatingEmoji(true);
}

// Background
function createFloatingEmoji(isInstant = false) {
  const emojis = ["❤️", "", "🎊", "😍", "✨", "", "",  ""];
  const el = document.createElement("div");
  el.innerText = emojis[Math.floor(Math.random() * emojis.length)];
  el.classList.add("floating-emoji");
  el.style.left = Math.random() * 100 + "vw";

  const duration = Math.random() * 5 + 5;
  el.style.animationDuration = duration + "s";
  el.style.fontSize = Math.random() * 20 + 20 + "px";

  if (isInstant) {
    el.style.animationDelay = -(Math.random() * duration) + "s";
    el.style.opacity = 0.6;
  }

  document.body.appendChild(el);
  setTimeout(() => el.remove(), duration * 1000);
}

setInterval(() => createFloatingEmoji(false), 600);
for (let i = 0; i < 15; i++) createFloatingEmoji(true);

// Sparkles
function startSparkles() {
  const colors = ["#ff4d6d", "#ffb3c1", "#ffffff", "#ffd700"];
  for (let i = 0; i < 80; i++) {
    setTimeout(() => {
      const spark = document.createElement("div");
      spark.classList.add("sparkle");
      spark.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      spark.style.left = Math.random() * 100 + "vw";
      spark.style.animationDuration = Math.random() * 2 + 3 + "s";
      document.body.appendChild(spark);
      setTimeout(() => spark.remove(), 5000);
    }, Math.random() * 300);
  }
}
