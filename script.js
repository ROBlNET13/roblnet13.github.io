function randomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const playingSounds = {};

function playSound(sound, loop, volume = 0.5) {
  let isDeleted = false;

  if (!playingSounds[sound]) {
    playingSounds[sound] = true;
    let audio = new Audio(sound);
    audio.volume = volume;
    audio.loop = loop;
    audio.onended = function () {
      if (isDeleted == false) {
        isDeleted = true;
        delete playingSounds[sound];
      }
    };
    audio.play().catch(() => {
      // pretty much just keeping this here cause it errors every time it plays if it doesnt have .catch blabla
      // delete playingSounds[sound];
    });
    setTimeout(function () {
      if (isDeleted === false && audio.loop === false) {
        isDeleted = true;
        delete playingSounds[sound];
      }
    }, 200);
  }
}

function closeFunnyStartPopup() {
  let thePopup = document.querySelector(".uibox");
  let theBlackThing = document.querySelector(".black-thing");
  let theWindowContent = document.querySelector(".window-content");
  thePopup.remove();
  theBlackThing.remove();
  theWindowContent.style.transform = "scale(1)";
  playSound("audio/smileOS2Startup.wav");
  playSound("audio/HumStart.ogg");
  const shopMusic = new Audio(`audio/shopmusic${randomInt(1, 4)}.wav`);
  shopMusic.loop = true;
  shopMusic.volume = 0.5;
  setTimeout(() => {
    shopMusic.play();
  }, 3000);
}

let possibleTips = [
  '<span style="color: #d93a39;">Dash</span>: Fully invincible, costs stamina<p><span style="color: #d93a39;">Slide</span>: Greater distance, no invincibility</p><p><span style="color: #d93a39;">Jump</span>: Quickly out of melee range, less control</p>',
  "This is an example of what can appear on here!<p>Reload the page to get another tip!</p>",
  "H a v e&nbsp;&nbsp;&nbsp;f u n .",
  "Crazy? I was crazy once.<p>They locked me in a room.</p><p>A rubber room.</p><p>A rubber room with rats.</p><p>And rats make me crazy.</p>",
  "👽",
  "undefined",
  "defined",
  "<img src='images/UIbox.png'> <p>box</p>",
  "Upgrade to Nocturnal now — boost your productivity with SmileSoft Copilot!",
  "<img src='images/ginger.webp'> <p>stupid</p>",
];

const preloadSounds = [
  "audio/smileOS2Startup.wav",
  "audio/HumStart.ogg"
]
window.addEventListener("load", (event) => {
  const tipElement = document.getElementById("tip-text");
  tipElement.innerHTML = possibleTips[randomInt(0, possibleTips.length - 1)];
  if (randomInt(0, 15) === 0) {
    document.querySelector("body > div > div > div.window-header > img").src = "images/ColonThreeIcon.png";
  }
  preloadSounds.forEach((sound) => {
    const audio = new Audio(sound);
    audio.load();
  });
});
