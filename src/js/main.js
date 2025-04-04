import { riddles } from "./riddles.js";
import { $userLifes, $userScore, $riddle, $userInput, $containerGame, $form, userAnswerObj } from "./constants.js";

window.addEventListener('load', () => $form.reset());

document.addEventListener("DOMContentLoaded", () => {
  showUserStatsAndRiddle();
  $userInput.addEventListener('input', readValue);
  $form.addEventListener('submit', checkAnswer);
});


// States
let userLives = 5;
let userScore = 0;
let positionRiddle = 0; // position of the riddle in the array


// Functions
function showUserStatsAndRiddle() {
  $userLifes.textContent = userLives;
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
    userLives--;
    showNotification('Respuesta Incorrecta');
    showUserStatsAndRiddle();
    userAnswerObj.userAnswer = '';
    $form.reset();
    return;
  }

  if (userAnswer === riddles[positionRiddle].answer) {
    if (positionRiddle + 1 === riddles.length) return gameFinished();
    userScore += 5;
    positionRiddle++;
    showUserStatsAndRiddle();
    userAnswerObj.userAnswer = '';
    $form.reset();
  }
}

function gameFinished() {
  userScore += 5;
  $containerGame.innerHTML = `
    <div class="game-finished-container">
      <h1 class="win-title">¡Felicidades!</h1>
      <p>Has adivinado todas las respuestas, a continuación se te muestran tus estadísticas</p>
      <div class="user-stats stats-finished">
        <p class="p-user-score">Puntos Totales: ${userScore}</p>
        <p class="p-user-lives">Vidas Restantes: ${userLives}</p>
      </div>
      <button class="btn btn-restart" onclick="window.location.reload()">Volver a jugar</button>
    </div>
  `;
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