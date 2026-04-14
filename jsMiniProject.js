// ToDo app

// let input = document.querySelector("input");
// let button = document.querySelector("button");
// let ul = document.querySelector("ul");

// button.addEventListener("click", function () {
//   let item = document.createElement("li");
//   item.innerText = input.value;
//   ul.appendChild(item);
//   input.value = "";

//   let delBtn = document.createElement("button");
//   delBtn.innerText = "delete";
//   delBtn.classList.add("delete");
//   item.appendChild(delBtn);
// });

// ul.addEventListener("click", function (event) {
//   if (event.target.nodeName == "BUTTON") {
//     let listItem = event.target.parentElement;
//     listItem.remove();
//     console.log("delete");
//   }
// });

//******************************************************************* */

//Simon says game

let gameSeq = [];
let userSeq = [];
let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
  if (started == false) {
    console.log("game is started");
    started = true;

    levelUp();
  }
});

function gameFlash(btn) {
  btn.classList.add("gameFlash");
  setTimeout(function () {
    btn.classList.remove("gameFlash");
  }, 250);
}

function userFlash(btn) {
  btn.classList.add("userFlash");
  setTimeout(function () {
    btn.classList.remove("userFlash");
  }, 250);
}

function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;

  let randIdx = Math.floor(Math.random() * 3);
  let randColor = btns[randIdx];
  let randBtn = document.querySelector(`.${randColor}`); //accessing button

  gameSeq.push(randColor);
  console.log(gameSeq);

  gameFlash(randBtn);
}

function checkAns(idx) {
  //   let idx = level - 1;
  if (userSeq[idx] == gameSeq[idx]) {
    if (userSeq.length == gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    h2.innerHTML = `Game over ! <b>Your score was ${level} </b> <br>  Press any key to start.`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(() => {
      document.querySelector("body").style.backgroundColor = "white";
    }, 150);
    reset();
  }
}

function btnPress() {
  console.log(this);
  let btn = this;

  userColor = btn.getAttribute("id");
  userSeq.push(userColor);
  userFlash(btn);
  checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}
