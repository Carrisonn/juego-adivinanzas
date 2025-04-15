import { riddlesSet1, riddlesSet2, riddlesSet3, riddlesSet4 } from "./riddles.js";
import { $userLifes, $userScore, $userTries, $riddle, $userInput, $containerGame, $form, $btnTutorial, userAnswerObj } from "./constants.js";


// States
const riddleSet = randomRiddleSet()
let userLives = 5;
let userScore = 0;
let userTries = 3;
let positionRiddle = 0; // determines the position of the riddle object in the current array(array of riddle objects are randomly selected)


// Functions
// generates a random number to return a random riddle set
function randomRiddleSet() {
  const arrayOfRiddleSets = [riddlesSet1, riddlesSet2, riddlesSet3, riddlesSet4];
  const randomPosition = Math.floor(Math.random() * arrayOfRiddleSets.length);
  const randomRiddleSet = arrayOfRiddleSets[randomPosition];
  return randomRiddleSet
}

// render the current state in the UI and reset the object and the form
function renderStatsAndRiddle() {
  $userLifes.textContent = userLives;
  $userTries.textContent = userTries;
  $userScore.textContent = userScore;
  $riddle.textContent = riddleSet[positionRiddle].riddle;
  userAnswerObj.userAnswer = '';
  $form.reset();
}

// pass the value of the input field to the userAnswerObj(constants.js)
function readValue(event) {
  userAnswerObj.userAnswer = event.target.value.trim().toLowerCase();
}

// check the user answer
function checkAnswer(event) {
  event.preventDefault();

  const { userAnswer } = userAnswerObj;
  if (userAnswer === '') return showNotification('El campo no puede estar vacío');
  if (userAnswer !== riddleSet[positionRiddle].answer) return userIncorrectAnswer();
  if (userAnswer === riddleSet[positionRiddle].answer) return userCorrectAnswer();
}

// increment the score, check the position of the actual riddle in the array, otherwise update the states and call the render function
function userCorrectAnswer() {
  userScore += 10;
  if (positionRiddle + 1 === riddleSet.length) return gameCompleted();
  userTries = 3;
  positionRiddle++;
  renderStatsAndRiddle();
}

// check if user has lives or tries, otherwise decreases the number of tries and call the render function
function userIncorrectAnswer() {
  if (userLives === 0 && userTries === 1) return gameOver();
  if (userTries === 1) return userHasNoTries();
  userTries--;
  showNotification('Respuesta Incorrecta');
  renderStatsAndRiddle();
}

// update the lives, check if the user is in the last riddle, otherwise update the states and call the render function
function userHasNoTries() {
  userLives--;
  if (positionRiddle + 1 === riddleSet.length) return gameCompleted();
  userTries = 3;
  positionRiddle++;
  renderStatsAndRiddle();
}

// render the game over interface
function gameOver() {
  $containerGame.setHTMLUnsafe(`
    <div class="game-finished-container">
      <h1>¡Game Over!</h1>
      <p>Has perdido, a continuación se te muestran tus estadísticas</p>
      <div class="user-stats stats-finished">
        <p class="p-user-score">Puntos Totales: ${userScore}</p>
        <p class="p-user-lives">Vidas Restantes: ${userLives}</p>
      </div>
      <button class="btn btn-restart" onclick="window.location.reload()">Volver a jugar</button>
    </div>
  `);
}

// render the game completed interface
function gameCompleted() {
  $containerGame.setHTMLUnsafe(`
    <div class="game-finished-container">
      <h1>¡Felicidades!</h1>
      <p>Has llegado al final del juego, a continuación se te muestran tus estadísticas</p>
      <div class="user-stats stats-finished">
        <p class="p-user-score">Puntos Totales: ${userScore}</p>
        <p class="p-user-lives">Vidas Restantes: ${userLives}</p>
      </div>
      <button class="btn btn-restart" onclick="window.location.reload()">Volver a jugar</button>
    </div>
  `);
}

// render the tutorial section in the UI
function renderTutorialSection() {
  const existTutorialSection = document.querySelector('.tutorial-section');
  if (existTutorialSection) return;

  const $tutorialSection = document.createElement('div');
  $tutorialSection.classList.add('tutorial-section');
  $tutorialSection.setHTMLUnsafe(`
    <p>
      Tienes <span>3 intentos</span> por cada adivinanza y <span>5 vidas</span> en total.
      Por cada respuesta <span class="tutorial-correct">correcta</span> obtendrás 10 puntos. Si tu respuesta
      es <span class="tutorial-incorrect">incorrecta</span>, se te restará un intento. Cuando te quedes sin 
      intentos, saltarás a la siguiente adivinanza para continuar tu progreso pero a cambio se te restará una vida.
      Si te quedas sin vidas, habrás perdido. ¡Cuidado con las tildes!
    </p>
  `);
  $containerGame.appendChild($tutorialSection);
}

// show a notification in the UI to provide feedback
function showNotification(message) {
  const existNotification = document.querySelector('.notification');
  if (existNotification) return;

  const notification = document.createElement('p');
  notification.classList.add('notification');
  notification.textContent = message;
  $form.appendChild(notification);
  setTimeout(() => notification.remove(), 3000);
}

// Game Init
window.addEventListener('load', () => $form.reset());
renderStatsAndRiddle(); // render the initial state
$btnTutorial.addEventListener('click', renderTutorialSection);
$userInput.addEventListener('input', readValue);
$form.addEventListener('submit', checkAnswer);