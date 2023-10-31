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
let color = document.querySelectorAll(".color");
// mode = 0 ->user1
//mode = 1 ->user2
// document.documentElement.style.cssText = "--user1color:";
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
let target = 0;
let sclr = 0;
let wincolor;
let selectcolor = function (c) {
  document.documentElement.style.cssText += `--user${target + 1}color:${
    window.getComputedStyle(c.target).backgroundColor
  }`;
  console.log(window.getComputedStyle(c.target).backgroundColor);
  // console.log(e.target);
};
color.forEach((c) => {
  c.addEventListener("click", selectcolor);
  // console.log(c);
});

players.forEach((e, i) => {
  e.addEventListener("click", () => {
    console.log(e.offsetLeft + e.offsetWidth / 2);
    usercolor.style.left = `${e.offsetLeft + e.offsetWidth / 2}px`;
    // usercolor.style.left = "50px";
    // console.log(e.offsetLeft);
    // e.offsetTop;
    if (i == 0) target = 0;
    else target = 1;
    console.log(target);
    usercolor.classList.toggle("hide");

    // if (usercolor.classList.contains("hide")) {
    //   color.forEach((c) => {
    //     c.removeEventListener("click", selectcolor(c, i));
    //   });
    // }
  });
});

let oplace = [];
let xplace = [];
let place = [];
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

let play = function () {
  cells.forEach((e, c) => {
    e.addEventListener("click", () => {
      console.log(document.documentElement.style.cssText);
      if (!place.includes(c)) {
        if (mode == 0) {
          addO(e, c);
        } else {
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
