import { riddles } from "./riddles.js";
import { $userLifes, $userScore, $userTries, $riddle, $userInput, $containerGame, $form, userAnswerObj } from "./constants.js";

window.addEventListener('load', () => $form.reset());

document.addEventListener("DOMContentLoaded", () => {
  showUserStatsAndRiddle(); // render the initial state
  $userInput.addEventListener('input', readValue);
  $form.addEventListener('submit', checkAnswer);
});


// States
let userLives = 5;
let userScore = 0;
let userTries = 3;
let positionRiddle = 0; // position of the riddle object in the array


// Functions
function showUserStatsAndRiddle() { // render the current state in the UI
  $userLifes.textContent = userLives;
  $userTries.textContent = userTries;
  $userScore.textContent = userScore;
  $riddle.textContent = riddles[positionRiddle].riddle;
}

function readValue(event) { // pass the value of the input field to the userAnswerObj(constants.js)
  userAnswerObj.userAnswer = event.target.value.trim().toLowerCase();
}

function checkAnswer(event) { // check the user answer
  event.preventDefault();

  const { userAnswer } = userAnswerObj;
  if (userAnswer === '') return showNotification('El campo no puede estar vacío');

  if (userAnswer !== riddles[positionRiddle].answer) {
    if (userLives === 0) return gameOver();
    return userIncorrectAnswer();
  }

  if (userAnswer === riddles[positionRiddle].answer) {
    if (positionRiddle + 1 === riddles.length) return gameCompleted();
    return userCorrectAnswer();
  }
}

function userCorrectAnswer() { // update the states and call the render function
  userScore += 5;
  positionRiddle++;
  userTries = 3;
  showUserStatsAndRiddle();
  userAnswerObj.userAnswer = '';
  $form.reset();
}

function userIncorrectAnswer() {  // check the number of tries 
  if (userTries === 1) return nextRiddle();
  userTries--;
  showNotification('Respuesta Incorrecta');
  showUserStatsAndRiddle();
  userAnswerObj.userAnswer = '';
  $form.reset();
}

function nextRiddle() { // update the states and call the render function
  userLives--;
  positionRiddle++;
  userTries = 3;
  showUserStatsAndRiddle();
  userAnswerObj.userAnswer = '';
  $form.reset();
}

function gameOver() { // render the game over interface
  $containerGame.innerHTML = `
    <div class="game-finished-container">
      <h1>¡Game Over!</h1>
      <p>Has perdido, a continuación se te muestran tus estadísticas</p>
      <div class="user-stats stats-finished">
        <p class="p-user-score">Puntos Totales: ${userScore}</p>
        <p class="p-user-lives">Vidas Restantes: ${userLives}</p>
      </div>
      <button class="btn btn-restart" onclick="window.location.reload()">Volver a intentarlo</button>
    </div>
  `;
}

function gameCompleted() { // render the game completed interface
  userScore += 5;
  $containerGame.innerHTML = `
    <div class="game-finished-container">
      <h1>¡Felicidades!</h1>
      <p>Has adivinado todas las respuestas, a continuación se te muestran tus estadísticas</p>
      <div class="user-stats stats-finished">
        <p class="p-user-score">Puntos Totales: ${userScore}</p>
        <p class="p-user-lives">Vidas Restantes: ${userLives}</p>
      </div>
      <button class="btn btn-restart" onclick="window.location.reload()">Volver a jugar</button>
    </div>
  `;
}

function showNotification(message) { // show a notification in the UI to provide feedback
  const notification = document.querySelector('.notification');
  if (!notification) {
    const notification = document.createElement('p');
    notification.classList.add('notification');
    notification.textContent = message;
    $containerGame.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
  }
}