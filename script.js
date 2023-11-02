// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
// import {
//   getDatabase,
//   get,
//   set,
//   push,
//   child,
//   ref,
//   update,
// } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js";

// const firebaseConfig = {
//   apiKey: "AIzaSyCqYc489BFVBfdwvzDOH_Gl4ao5uun0w7I",
//   authDomain: "taskmanager-586a2.firebaseapp.com",
//   databaseURL: "https://taskmanager-586a2-default-rtdb.firebaseio.com",
//   projectId: "taskmanager-586a2",
//   storageBucket: "taskmanager-586a2.appspot.com",
//   messagingSenderId: "229613138113",
//   appId: "1:229613138113:web:9118d3c05ba4d547cf2440",
// };
// const app = initializeApp(firebaseConfig);
// let db = getDatabase(app);

// set(ref(db, "match/"), {
//   oplacedb: [1, 3, 4],
//   xplacedb: [6, 7, 5],
//   placedb: [9, 8, 7],
// });

// update(ref(db, "match/"), {
//   oplacedb: oplace,
//   xplacedb: xplace,
//   placedb: place,
// });
// Main
let cells = document.querySelectorAll(".cell");
let wintext = document.querySelector(".container-text");
let overlay = document.querySelector(".overlay");
let container = document.querySelector(".container");
let mode = 0;
let root = document.querySelector(":root");
let players = document.querySelectorAll(".user");
let usercolor = document.querySelector(".user-color");
let user1color = document.querySelector(".user1-color");
let user2color = document.querySelector(".user2-color");
let color1 = document.querySelectorAll(".user1-color .color");
let color2 = document.querySelectorAll(".user2-color .color");
let user1detailscolor = document.querySelector(".user1details");
let user2detailscolor = document.querySelector(".user2details");
let color1details = document.querySelectorAll(".user1details .color");
let color2details = document.querySelectorAll(".user2details .color");
let startbtn = document.querySelector(".start-btn");
let autoplaytoggle = document.querySelector(".autoplaytoggle");
let autoplayindicator = document.querySelector(".indicator");
// mode = 0 ->user1
//mode = 1 ->user2
// document.documentElement.style.cssText = "--user1color:";

let makegame = function () {
  console.log("hello");
  document.querySelector(".start-details").style.display = "none";
};
startbtn.addEventListener("click", makegame);
// makegame();
let wins = [
  [1, 2, 3],
  [3, 6, 9],
  [1, 4, 7],
  [7, 8, 9],
  [1, 5, 9],
  [3, 5, 7],
  [2, 5, 8],
  [4, 5, 6],
];

console.log();
// user color set

// Position color box
players[0].addEventListener("click", () => {
  user1color.style.left = `${
    players[0].offsetLeft + players[0].offsetWidth / 2
  }px`;
  console.log(user1color.offsetLeft);
  user1color.classList.toggle("hide");
});

players[1].addEventListener("click", () => {
  user2color.style.left = `${
    players[1].offsetLeft + players[1].offsetWidth / 2
  }px`;
  user2color.classList.toggle("hide");
});

color1.forEach((e) => {
  e.addEventListener("click", (c) => {
    selectcolor(c, 1);
  });
});
color2.forEach((e) => {
  e.addEventListener("click", (c) => {
    selectcolor(c, 2);
  });
});
color1details.forEach((e) => {
  e.addEventListener("click", (c) => {
    selectcolor(c, 1);
  });
});
color2details.forEach((e) => {
  e.addEventListener("click", (c) => {
    selectcolor(c, 2);
  });
});

let target = 0;
let sclr = 0;
let wincolor;
let selectcolor = function (c, target) {
  document.documentElement.style.cssText += `--user${target}color:${
    window.getComputedStyle(c.target).backgroundColor
  }`;
  // console.log(c);
  let tempcolors = Array.from(c.target.parentElement.children);
  //  = Array.from(htmlCollection);
  console.log(tempcolors);
  tempcolors.forEach((e) => {
    e.classList.remove("colorselected");
  });

  c.target.classList.add("colorselected");

  let tempusercolor = document.querySelector(`.user${target}-color`);
  tempusercolor.classList.add("hide");
  console.log(window.getComputedStyle(c.target).backgroundColor);
  console.log(c);
};

// Autoplay toggle

autoplaytoggle.addEventListener("click", () => {
  if (autoplaytoggle.classList.contains("active")) {
    autoplay = false;
    autoplaytoggle.classList.remove("active");
  } else {
    autoplay = true;
    autoplaytoggle.classList.add("active");
  }
});
let oplace = [];
let xplace = [];
let place = [];
let autoplay = true;
let restart = function () {
  location.reload();
  overlay.classList.remove("show");
  mode = 0;
  // mode = 0 ->user1
  //mode = 1 ->user2
  wins = [
    [1, 2, 3],
    [3, 6, 9],
    [1, 4, 7],
    [7, 8, 9],
    [1, 5, 9],
    [3, 5, 7],
    [2, 5, 8],
    [4, 5, 6],
  ];
  oplace = [];
  xplace = [];
  place = [];
  cells.forEach((e) => {
    e.textContent = "";
  });
};

let addO = function (e, c) {
  e.style.color = "#fff";
  e.textContent = "O";
  oplace.push(c + 1);
  place.push(c);

  wins.forEach((w) => {
    let ocnt = 0;
    for (let i = 0; i < w.length; i++) {
      if (oplace.includes(w[i])) {
        ocnt++;
      }
      if (ocnt == 3) {
        console.log("O'Wins");
        wintext.textContent = "O'Wins";
        wincolor = window.getComputedStyle(players[0]).backgroundColor;
        document.documentElement.style.cssText = `--wincolor:${wincolor}`;
        overlay.classList.toggle("show");
        break;
      }
    }
  });
  mode = 1;
  players[1].classList.toggle("cp");
  players[0].classList.toggle("cp");
  container.classList.remove("active-p1");
  container.classList.add("active-p2");
};

let addX = function (e, c) {
  e.textContent = "X";
  xplace.push(c + 1);
  place.push(c);

  wins.forEach((w) => {
    let xcnt = 0;
    for (let i = 0; i < w.length; i++) {
      if (xplace.includes(w[i])) {
        xcnt++;
      }
      if (xcnt == 3) {
        wintext.textContent = "X'Wins";
        console.log("X'Wins");
        wincolor = window.getComputedStyle(players[1]).backgroundColor;
        document.documentElement.style.cssText = `--wincolor:${wincolor}`;
        overlay.classList.toggle("show");
        break;
      }
    }
  });
  mode = 0;
  players[0].classList.toggle("cp");
  players[1].classList.toggle("cp");
  container.classList.remove("active-p2");
  container.classList.add("active-p1");
};
function getRandomNumber() {
  let randomNumber;
  do {
    randomNumber = Math.floor(Math.random() * 9);
  } while (place.includes(randomNumber));
  return randomNumber;
}
let computerplay = function () {
  let random = getRandomNumber();
  let autoplayelement = document.querySelectorAll(".cell");
  console.log(autoplayelement[random], random);
  addX(autoplayelement[random], random);
};

let play = function () {
  cells.forEach((e, c) => {
    e.addEventListener("click", () => {
      console.log(document.documentElement.style.cssText);
      if (!place.includes(c)) {
        if (mode == 0) {
          addO(e, c);
          if (autoplay) setTimeout(computerplay, 500);
        } else {
          if (!autoplay) addX(e, c);
        }
        if (place.length === 9) {
          wintext.textContent = "TIE";
          overlay.classList.toggle("show");
          console.log("TIE");
          // wincolor = window.getComputedStyle(players[1]).backgroundColor;
          // document.documentElement.style.cssText = `--wincolor:${wincolor}`;
        }
      }
    });
  });
};

document.querySelector(".restart-btn").addEventListener("click", restart);
play();
