// ========== EPISODE MANAGER  ==========
let i = 0;
const episodes = [
  "Episode 1: Who am i?",
  "Episode 2: The Learning Journey", 
  "Episode 3: Skills",
  "Episode 4: Achievement signals ",
  "Episode 5: Project Cinema",
  "Episode 6: Connect with me "
];

// Safe function to update progress bars
function updateProgressBars(activeIndex) {
  for (let j = 1; j <= episodes.length; j++) {
    const bar = document.getElementById("e" + j);
    if (bar) {  // Check if element exists
      bar.style.width = j === activeIndex ? "100%" : "0%";
    }
  }
}

function updateEpisode() {
  const currentEpElement = document.getElementById("currentEp");
  if (currentEpElement) {
    currentEpElement.innerText = episodes[i];
  }
  updateProgressBars(i + 1);
}

function playPodcast() {
  i = 0;
  updateEpisode();
}

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
  updateEpisode();  // DRY principle - reuse existing function
}

// ========== SINGLE SCROLL OBSERVER  ==========
//  One observer instead of 4 scroll listeners

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
    
    // 1. Handle Subtitle Lines Animation
    if (target.classList.contains('sub-title')) {
      document.querySelectorAll(".line").forEach((el, idx) => {
        if (!el.classList.contains("show")) {
          setTimeout(() => {
            el.classList.add("show");
          }, idx * 800);
        }
      });
      scrollObserver.unobserve(target);
    }
    
    // 2. Handle Reveal Elements Animation
    if (target.classList.contains('reveal-section')) {
      document.querySelectorAll(".reveal").forEach((el, idx) => {
     
        setTimeout(() => {
        
          el.classList.add("show");
        }, idx * 200);
      
      });
      scrollObserver.unobserve(target);
    }
    
    // 3. Handle Tech Section Animation
    if (target.classList.contains('tech-section')) {
      document.querySelectorAll(".level").forEach(el => {
        el.classList.add("animate");
      });
      scrollObserver.unobserve(target);
    }
    
    // 4. Handle Certificate Section Animation
    if (target.classList.contains('cert-section')) {

      const certs = target.querySelectorAll(".cert");
      certs.forEach((el, idx) => {
        if (!el.classList.contains("show")) {
          setTimeout(() => {
            el.classList.add("show");
          }, idx * 600);
        }
      });
      scrollObserver.unobserve(target);
    }
  });
}, observerOptions);

// Observe all sections when DOM loads
document.addEventListener("DOMContentLoaded", () => {
  // Observe subtitle section
  const subTitle = document.querySelector(".sub-title");
  if (subTitle) scrollObserver.observe(subTitle);
  
  // Observe reveal section
  const revealSection = document.querySelector(".reveal-section");
  if (revealSection) scrollObserver.observe(revealSection);
  
  // Observe tech section
  const techSection = document.querySelector(".tech-section");
  if (techSection) scrollObserver.observe(techSection);
  
  // Observe cert section
  const certSection = document.querySelector(".cert-section");
  if (certSection) scrollObserver.observe(certSection);
  

});

// ========== STORY PLAYER  ==========
let isPlaying = false;

function startListening(btn) {
  const wave = document.querySelector(".wave");
  const player = document.getElementById("playerBox");
  const audio = document.getElementById("podcastAudio");
  
  if (!player) return;  
  
  player.classList.remove("hidden");

  if (!isPlaying) {
    if (wave) wave.classList.add("active");
    if (audio) audio.play();
    btn.innerHTML = `<i class="ri-pause-fill"></i> Pause The Story`;
    isPlaying = true;

  } else {
    if (wave) wave.classList.remove("active");
    if (audio) audio.pause();
    btn.innerHTML = `<i class="ri-play-fill"></i> Start Listening`;
    isPlaying = false;
  }
}


// Set initial progress bar state
document.addEventListener("DOMContentLoaded", () => {
  updateEpisode();  // Initialize first episode
});





const movies = [
  {
    title: "GLOBAL TIME SYSTEM",
    story: "A world where time zones confuse everyone… until one app changed everything. Built to solve real-world scheduling chaos across countries."
  },
  {
    title: "PODCAST PORTFOLIO",
    story: "Instead of a normal portfolio, I designed a cinematic storytelling experience where every section feels like an episode in a movie universe."
  }
];

function openTrailer(index){
  const player = document.getElementById("cinemaPlayer");

  document.getElementById("movieTitle").innerText = movies[index].title;
  document.getElementById("movieStory").innerText = movies[index].story;

  player.classList.remove("hidden");

  // cinematic feel scroll lock
  document.body.style.overflow = "hidden";
}

function closeTrailer(){
  document.getElementById("cinemaPlayer").classList.add("hidden");
  document.body.style.overflow = "auto";
}



// ---------------------------------contact----------------------------------




function sendMessage(event){
  event.preventDefault();

  const name = document.getElementById("name").value;

  alert(` Message Sent Successfully!\n\nThanks ${name}, I'll get back to you soon!`);

  // reset form
  document.querySelector(".contact-form").reset();
}
















// -----------------------------navbar-----------------------------



var tablinks = document.getElementsByClassName('tab-links')
var tabcontents = document.getElementsByClassName('tab-contents')

function opentab(tabName){
    for(var tablink of tablinks){
        tablink.classList.remove('active-link')
    }
    for(var tabcontent of tabcontents){
        tabcontent.classList.remove('active-tab')
    }
    event.currentTarget.classList.add('active-link')
    document.getElementById(tabName).classList.add('active-tab')
}





var sidemenu = document.getElementById('sidemenu')
function openmenu(){
    sidemenu.style.right = '0'
}
function closemenu(){
    sidemenu.style.right = '-200px'
}
