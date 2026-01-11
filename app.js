window.addEventListener("load", () => {
  document.querySelector(".loading").classList.add("hidden");
});

const sounds = {
  red: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"),
  green: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"),
  yellow: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"),
  blue: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"),
  wrong: new Audio("sounds/wrong.mp3"),
};

function playSound(color) {
  sounds[color].currentTime = 0;
  sounds[color].play();
}

let gameSeq = [];
let userSeq = [];
let btnColor = ["red", "green", "yellow", "blue"];
let reset_btn = document.querySelector("#reset-btn");

let isStarted = false;
let level = 0;

document.addEventListener("keypress", (e) => {
  if (!isStarted && e.code == "KeyS") {
    isStarted = true;
    setTimeout(() => reset_btn.classList.remove("hidden"), 1000);

    setTimeout(levelUp, 1000);
  }
});

function btnflash(color) {
  let btn = document.querySelector(`.${color}`);

  let flashClass = `${color}-flash`;
  btn.classList.add(flashClass);

  playSound(color);

  setTimeout(() => {
    btn.classList.remove(flashClass);
  }, 300);
}

let h2 = document.querySelector("h2");
function levelUp() {
  userSeq = [];

  level++;
  h2.innerText = `Level ${level}`;

  let rIdx = Math.floor(Math.random() * 4); //random index
  let rColor = btnColor[rIdx]; //random color
  let rbtn = document.querySelector(`.${rColor}`); //random btn

  gameSeq.push(rColor);

  for (let i = 0; i < gameSeq.length; i++) {
    setTimeout(() => btnflash(gameSeq[i]), i * 600);
  }
}

function checkAns() {
  let idx = userSeq.length - 1;

  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length == gameSeq.length) {
      setTimeout(levelUp, 1500);
    }
  } else {
    playSound("wrong");
    h2.innerHTML = `Game Over! Your Score is <b>${level}</b> </br> Press key S to start`;
    reset();
  }
}

function btnPress() {
  if (!isStarted) return;

  let btn = this;
  let userBtn = btn.classList[1];
  userSeq.push(userBtn);
  btnflash(userBtn);
  checkAns();
}

let btns = document.querySelectorAll(".game-btn");
btns.forEach((btn) => {
  btn.addEventListener("click", btnPress);
});

reset_btn.addEventListener("click", () => {
  reset();
  reset_btn.classList.add("hidden");
  h2.innerText = "Game Reset! Press key S to start";
  playSound("wrong");
});

function reset() {
  isStarted = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
  reset_btn.classList.add("hidden");
}
