const PASSWORD = "12345";

/* UNLOCK */
function unlock() {
  if (passwordInput.value === PASSWORD) {
    lockScreen.style.display = "none";
    mainContent.classList.remove("hidden");

    loadTheme();
    loadEntries();
    loadAffirmations();
  } else {
    error.innerText = "wrong password";
  }
}

/* TABS */
function showTab(id) {
  document.querySelectorAll(".tab").forEach(t => t.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}

/* THEME */
function setTheme(t) {
  document.body.className = t;
  localStorage.setItem("theme", t);
}

function loadTheme() {
  document.body.className = localStorage.getItem("theme") || "pink";
}

/* JOURNAL */
function saveJournal() {
  const text = journalEntry.value.trim();
  if (!text) return;

  const entries = JSON.parse(localStorage.getItem("entries") || "[]");
  entries.push({ text, time: new Date().toLocaleString() });

  localStorage.setItem("entries", JSON.stringify(entries));
  journalEntry.value = "";
  loadEntries();
}

function loadEntries() {
  const container = entriesDiv = document.getElementById("entries");
  container.innerHTML = "";

  const entries = JSON.parse(localStorage.getItem("entries") || "[]").slice(-10).reverse();

  entries.forEach(e => {
    const div = document.createElement("div");
    div.textContent = e.time + " — " + e.text;
    container.appendChild(div);
  });
}

/* DIARY */
let locked = true;
function toggleDiary() {
  locked = !locked;
  diaryEntry.classList.toggle("blur", locked);
}

/* MIRROR */
function mirror() {
  const msgs = ["you’re enough","be gentle with yourself","you’re growing"];
  const text = msgs[Math.floor(Math.random()*msgs.length)];

  mirrorText.textContent = "";
  let i = 0;

  const int = setInterval(()=>{
    mirrorText.textContent += text[i];
    i++;
    if(i>=text.length) clearInterval(int);
  },40);
}

/* AFFIRM */
function addAffirmation() {
  const text = affirmInput.value.trim();
  if (!text) return;

  const list = JSON.parse(localStorage.getItem("affirmations") || "[]");
  list.push(text);

  localStorage.setItem("affirmations", JSON.stringify(list));
  affirmInput.value = "";
  loadAffirmations();
}

function loadAffirmations() {
  const container = document.getElementById("affirmList");
  container.innerHTML = "";

  const list = JSON.parse(localStorage.getItem("affirmations") || "[]").slice(-10);

  list.forEach(a => {
    const div = document.createElement("div");
    div.className = "affirmCard";
    div.textContent = "💗 " + a;
    container.appendChild(div);
  });
}

function randomAffirmation() {
  const list = JSON.parse(localStorage.getItem("affirmations") || "[]");
  if (!list.length) return;

  const random = list[Math.floor(Math.random()*list.length)];
  randomAffirmBox.textContent = "✨ " + random;
}

/* MUSIC */
const songs = [
  {name:"dreamy", src:"song1.mp3"},
  {name:"soft night", src:"song2.mp3"}
];

let index = 0;

function playSong() {
  music.src = songs[index].src;
  music.play();
  songName.textContent = songs[index].name;
}

function toggleMusic() {
  if (music.paused) playSong();
  else music.pause();
}

function nextSong() {
  index = (index+1)%songs.length;
  playSong();
}

function prevSong() {
  index = (index-1+songs.length)%songs.length;
  playSong();
}

/* SPARKLE OPTIMIZED */
let last = 0;
document.addEventListener("mousemove", e=>{
  if(Date.now()-last<80) return;
  last = Date.now();

  const s = document.createElement("div");
  s.className="sparkle";
  s.style.left=e.pageX+"px";
  s.style.top=e.pageY+"px";

  document.body.appendChild(s);
  setTimeout(()=>s.remove(),400);
});

/* PARTICLES */
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

function resize(){
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}
resize();
addEventListener("resize",resize);

let parts = Array.from({length:25},()=>({
  x:Math.random()*canvas.width,
  y:Math.random()*canvas.height,
  r:Math.random()*1.5
}));

function anim(){
  ctx.clearRect(0,0,canvas.width,canvas.height);

  parts.forEach(p=>{
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fill();

    p.y+=0.2;
    if(p.y>canvas.height) p.y=0;
  });

  requestAnimationFrame(anim);
}
anim();
