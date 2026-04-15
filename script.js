const playingSounds = {};

function playSound(sound, loop) {
  let isDeleted = false;

  if (!playingSounds[sound]) {
    playingSounds[sound] = true;
    let audio = new Audio(sound);
    audio.volume = 0.5
    audio.loop = loop;
    audio.onended = function () {
      if (isDeleted == false) {
        isDeleted = true;
        delete playingSounds[sound];
      }
    };
    audio.play().catch(() => {
      // delete playingSounds[sound];
    });
    setTimeout(function () {
      if (isDeleted == false && audio.loop == false) {
        isDeleted = true;
        delete playingSounds[sound];
      }
    }, 200);
  }
}

let possibleTips = [
  '<span style="color: #d93a39;">Dash</span>: Fully invincible, costs stamina<p><span style="color: #d93a39;">Slide</span>: Greater distance, no invincibility<p><span style="color: #d93a39;">Jump</span>: Quickly out of melee range, less control',
  "This is an example of what can appear on here!<p>Reload the page to get another tip!",
  "H a v e&nbsp;&nbsp;&nbsp;f u n .",
  "Crazy? I was crazy once.<p>They locked me in a room.<p>A rubber room.<p>A rubber room with rats.<p>And rats make me crazy.",
  "👽",
];

window.addEventListener("load", (event) => {
  const tipElement = document.getElementById("tip-text");
  tipElement.innerHTML = possibleTips[Math.floor(Math.random() * possibleTips.length)];
});
