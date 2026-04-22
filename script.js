function randomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const playingSounds = {};

function playSound(sound, loop = false, volume = 0.5, cooldownEnabled = true) {
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
      if (cooldownEnabled === true && isDeleted === false && audio.loop === false) {
        isDeleted = true;
        delete playingSounds[sound];
      }
    }, 150);
  }
}

function closeBootPopup() {
  playSound('audio/smileOSclick' + randomInt(1, 3) + '.wav', false, 0.1)

  let thePopup = document.getElementById("boot-popup");
  let theWindowContent = document.querySelector(".window-content");

  thePopup.remove();
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

let currentRightWindow = "totd"
let currentPage = "main"

function windowChildren(parent, whatToDo) {
  parent.childNodes.forEach((child) => {
    if (child.nodeType === 1 && child.classList.contains("window")) {
      if (whatToDo == "open") {
        child.classList.add("open");
      } else if (whatToDo === "hide") {
        child.classList.remove("open");
      }
    };
  });
}

function changeWindowOrPage(desiredRightWindow, desiredPage) {
  playSound('audio/smileOSclick' + randomInt(1, 3) + '.wav', false, 0.2)

  let theWindow = document.getElementById(desiredRightWindow + "-window");
  let thePage = document.getElementById(desiredPage + "-page");

  let previousPage = document.getElementById(currentPage + "-page");
  let previousWindow = document.getElementById(currentRightWindow + "-window");

  console.log(desiredRightWindow, desiredPage)

  if (desiredRightWindow) {
    if (theWindow && (currentRightWindow !== desiredRightWindow)) {
      if (previousWindow) {
        previousWindow.classList.remove("open");
      }
      currentRightWindow = desiredRightWindow;
      theWindow.classList.add("open");
    } else if (desiredRightWindow === "none") {
      if (previousWindow) {
        previousWindow.classList.remove("open");
      }
      currentRightWindow = "none";
    }
  }

  if (desiredPage) {
    if (thePage && (currentPage !== desiredPage)) {
      if (previousPage) {
        previousPage.style = "display: none;";
        windowChildren(previousPage, "hide")
      };
      currentPage = desiredPage;
      thePage.style = "display: block;"
      windowChildren(thePage, "open")
    } else if (desiredPage === "none") {
      if (previousPage) {
        previousPage.style = "display: none;";
        windowChildren(previousPage, "hide")
      };
      currentPage = "none";
    }
  }
}

let possibleTips = [
  '<span style="color: #d93a39;">Dash</span>: Fully invincible, costs stamina<p><span style="color: #d93a39;">Slide</span>: Greater distance, no invincibility</p><p><span style="color: #d93a39;">Jump</span>: Quickly out of melee range, less control</p>',
  "This is an example of what can appear on here!<p>Reload the page to get another tip!</p>",
  "H a v e&nbsp;&nbsp;&nbsp;f u n .",
  "Crazy? I was crazy once.<p>They locked me in a room.</p><p>A rubber room.</p><p>A rubber room with rats.</p><p>And rats make me crazy.</p>",
  "<img src='images/AlienEmoji.png' style='width: 16px; height: 16px;'>",
  "undefined",
  "defined",
  "<img src='images/UIbox.png'> <p>box</p>",
  "Upgrade to Nocturnal now — boost your productivity with SmileSoft Copilot!",
  "<img src='images/ginger.webp'> <p>stupid</p>",
  "Hello World!",
  "Goodbye World!",

];

const preloadSounds = [
  "audio/smileOS2Startup.wav",
  "audio/HumStart.ogg",
  "audio/smileOSclick1.wav",
  "audio/smileOSclick2.wav",
  "audio/smileOSclick3.wav",
];
window.addEventListener("load", (event) => {
  const tipElement = document.getElementById("tip-text");
  tipElement.innerHTML = possibleTips[randomInt(0, possibleTips.length - 1)];
  if (randomInt(0, 15) === 0) {
    document.querySelector("body > div > div > div.window-header > img").src =
      "images/ColonThreeIcon.png";
  }
  preloadSounds.forEach((sound) => {
    const audio = new Audio(sound);
    audio.load();
  });
});
