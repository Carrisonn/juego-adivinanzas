import { riddles } from "./riddles.js";
import { $userLifes, $userScore, $riddle, $userAnswer, $containerGame, $form, userAnswerObj } from "./constants.js";

window.addEventListener('load', () => $form.reset());

document.addEventListener("DOMContentLoaded", () => {
  showUserStatsAndRiddle();
  $userAnswer.addEventListener('input', readValue);
  $form.addEventListener('submit', checkAnswer);
});


// States
let userLifes = 5;
let userScore = 0;
let positionRiddle = 0;


// Functions
function showUserStatsAndRiddle() {
  $userLifes.textContent = userLifes;
  $userScore.textContent = userScore;
  $riddle.textContent = riddles[positionRiddle].riddle;
}

function readValue(event) {
  userAnswerObj.userAnswer = event.target.value.trim().toLowerCase();
}

function checkAnswer(event) {
  event.preventDefault();

  const { userAnswer } = userAnswerObj;
  if (userAnswer === '') return showNotification('El campo no puede estar vacío');

  if (userAnswer !== riddles[positionRiddle].answer) {
    userLifes--;
    showNotification('Respuesta Incorrecta');
    showUserStatsAndRiddle();
    userAnswerObj.userAnswer = '';
    $form.reset();
    return;
  }

  if (userAnswer === riddles[positionRiddle].answer) {
    userScore += 5;
    //if (positionRiddle === riddles.length)
    positionRiddle++;
    showUserStatsAndRiddle();
    userAnswerObj.userAnswer = '';
    $form.reset();
  }
}


function showNotification(message) {
  const notification = document.querySelector('.notification');

  if (!notification) {
    const notification = document.createElement('p');
    notification.classList.add('notification');
    notification.textContent = message;
    $containerGame.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
  }
}