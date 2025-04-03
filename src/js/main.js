import { riddles } from "./riddles.js";

document.addEventListener("DOMContentLoaded", () => {
  showUserStatsAndRiddle();
  //checkAnswer();
});


// States
let userLifes = 5;
let userScore = 0;
let positionRiddle = 0;


// Functions
function showUserStatsAndRiddle() {
  document.querySelector('.span-user-lives').textContent = userLifes;
  document.querySelector('.span-user-score').textContent = userScore;
  document.querySelector('.riddle').textContent = riddles[positionRiddle].riddle;
}

//function checkAnswer() {
//
//}