import { riddles } from "./riddles";

document.addEventListener("DOMContentLoaded", () => {
  showRiddle();
  //checkAnswer();
});

let userLifes = 3;
let userTrys = 0;

function showRiddle() {
  document.querySelector('.riddle').textContent = riddles[0].riddle;
}

//function checkAnswer() {
//
//}