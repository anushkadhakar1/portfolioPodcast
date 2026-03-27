// ========== EPISODE MANAGER ==========
let i = 0;
let isPlaying = false;

const episodes = [
  "Click here to change episodes",
  "Episode 1: Who am i?",
  "Episode 2: The Learning Journey", 
  "Episode 3: Skills",
  "Episode 4: Achievement signals",
  "Episode 5: Project Cinema",
  "Episode 6: Connect with me"
];

const audioFiles = [
  "./story.mp3",
  "./ep1.mp3",
  "./ep2.mp3",
  "./ep3.mp3",
  "./ep4.mp3",
  "./ep5.mp3",
  "./ep6.mp3"
];

const sections = [
  "home",
  "about",
  "journey",
  "skill",
  "certificates",
  "projects",
  "contact"
];

// ========== UPDATE PROGRESS ==========
function updateProgressBars(activeIndex) {
  for (let j = 1; j <= episodes.length; j++) {
    const bar = document.getElementById("e" + j);
    if (bar) {
      bar.style.width = j === activeIndex ? "100%" : "0%";
    }
  }
}

// ========== MAIN UPDATE ==========
function updateEpisode() {
  const currentEp = document.getElementById("currentEp");
  const audio = document.getElementById("podcastAudio");
  const wave = document.querySelector(".wave");

  // update text
  if (currentEp) currentEp.innerText = episodes[i];

  // update audio
  audio.src = audioFiles[i];

  // play only if started
  if (isPlaying) {
    audio.play();
    if (wave) wave.classList.add("active");
  }

  updateProgressBars(i + 1);

  // scroll sync
  const target = document.getElementById(sections[i]);
  if (target) {
    const yOffset = -80;
    const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({
      top: y,
      behavior: "smooth"
    });
  }
}

// ========== CONTROLS ==========
function nextEpisode() {
  if (i < episodes.length - 1) {
    i++;
    updateEpisode();
  }
}

function prevEpisode() {
  if (i > 0) {
    i--;
    updateEpisode();
  }
}

function resetPodcast() {
  i = 0;
  updateEpisode();
}

// ========== START / PAUSE ==========
function startListening(btn) {
  const audio = document.getElementById("podcastAudio");
  const wave = document.querySelector(".wave");
  const player = document.getElementById("playerBox");
  const title = document.querySelector(".player h3");

  if (!player) return;

  player.classList.remove("hidden");

  if (!audio.src) {
    audio.src = audioFiles[0];
  }

  if (!isPlaying) {
    audio.play();
    wave.classList.add("active");
    title.style.display = "block";
    btn.innerHTML = `<i class="ri-pause-fill"></i> Pause The Story`;
    isPlaying = true;
  } else {
    audio.pause();
    wave.classList.remove("active");
    title.style.display = "none";
    btn.innerHTML = `<i class="ri-play-fill"></i> Start Listening`;
    isPlaying = false;
  }
}

// ========== CLICK EPISODE ==========
function selectEpisode(index) {
  if (index < 1 || index > 6) return;

  i = index;

  const audio = document.getElementById("podcastAudio");
  const wave = document.querySelector(".wave");

  audio.src = audioFiles[index];

  // IMPORTANT FIX
  if (isPlaying) {
    audio.play();
    wave.classList.add("active");
  }

  document.getElementById("currentEp").innerText = episodes[index];

  document.getElementById(sections[index]).scrollIntoView({
    behavior: "smooth"
  });

  updateProgressBars(index + 1);
}

// ========== AUTO NEXT ==========
document.addEventListener("DOMContentLoaded", () => {

  const audio = document.getElementById("podcastAudio");

  audio.addEventListener("ended", () => {
    if (i < episodes.length - 1 && isPlaying) {
      i++;
      updateEpisode();
    }
  });

});

// ========== SCROLL ANIMATIONS ==========
const observerOptions = {
  threshold: 0.2,
  rootMargin: "0px 0px -50px 0px"
};

const animatedElements = new Set();

const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const target = entry.target;

    if (animatedElements.has(target)) return;
    animatedElements.add(target);

    if (target.classList.contains('sub-title')) {
      document.querySelectorAll(".line").forEach((el, idx) => {
        setTimeout(() => el.classList.add("show"), idx * 800);
      });
      scrollObserver.unobserve(target);
    }

    if (target.classList.contains('reveal-section')) {
      document.querySelectorAll(".reveal").forEach((el, idx) => {
        setTimeout(() => el.classList.add("show"), idx * 200);
      });
      scrollObserver.unobserve(target);
    }

    if (target.classList.contains('tech-section')) {
      document.querySelectorAll(".level").forEach(el => {
        el.classList.add("animate");
      });
      scrollObserver.unobserve(target);
    }

    if (target.classList.contains('cert-section')) {
      target.querySelectorAll(".cert").forEach((el, idx) => {
        setTimeout(() => el.classList.add("show"), idx * 600);
      });
      scrollObserver.unobserve(target);
    }
  });
}, observerOptions);

// observe sections
document.addEventListener("DOMContentLoaded", () => {
  const elements = [
    ".sub-title",
    ".reveal-section",
    ".tech-section",
    ".cert-section"
  ];

  elements.forEach(selector => {
    const el = document.querySelector(selector);
    if (el) scrollObserver.observe(el);
  });
});

// ========== MOVIE ==========
const movies = [
  {
    title: "GLOBAL TIME SYSTEM",
    story: "A world where time zones confuse everyone… until one app changed everything."
  },
  {
    title: "PODCAST PORTFOLIO",
    story: "A cinematic storytelling portfolio experience."
  },
  {
    title: "TO-DO LIST",
    story: "A smart and minimal To-Do List application."
  }
];

function openTrailer(index){
  const player = document.getElementById("cinemaPlayer");

  document.getElementById("movieTitle").innerText = movies[index].title;
  document.getElementById("movieStory").innerText = movies[index].story;

  player.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeTrailer(){
  document.getElementById("cinemaPlayer").classList.add("hidden");
  document.body.style.overflow = "auto";
}

// ========== CONTACT ==========
function sendMessage(event){
  event.preventDefault();

  const name = document.getElementById("name").value;

  alert(`Message Sent Successfully!\n\nThanks ${name}!`);

  document.querySelector(".contact-form").reset();
}

// ========== NAVBAR ==========
var sidemenu = document.getElementById('sidemenu');

function openmenu(){
  sidemenu.style.right = '0';
}

function closemenu(){
  sidemenu.style.right = '-200px';
}
