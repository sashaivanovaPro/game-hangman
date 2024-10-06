import { hangmanWords } from "./modules/hangman.js"; // Words collection to guess
import { keyboardArr } from "./modules/keyboard.js"; // Letters collection

// Function that choose a guess word randomly from 0 to Words collection lenght - 1

let failureCount = 0; // quantity of not guessed letters
let successCount = 0; //quantity of correctly guessed letters
let randomWordNumber = null;
let description = null;
let correctWord = null;
let guessWord = null;

const getRandomWord = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  let randomIndex = Math.floor(Math.random() * (max - min) + min);
  return randomIndex;
};

// Function to render initial page with underlining instead of letters of randomly selected guess word

const initialState = () => {
  let remove = document.querySelector(".modal");
  if (remove) {
    body.removeChild(remove); // Remove modal window after previous game
  }

  randomWordNumber = getRandomWord(0, hangmanWords.length); // Choose a random word number

  correctWord = hangmanWords[randomWordNumber].word; // Choose a word to guess
  guessWord = correctWord.toUpperCase().split(""); // Transform word presentation
  console.log(correctWord); // Output the word to console to check the logic

  description = hangmanWords[randomWordNumber].description; // render a hint description
  hint.textContent = `Hint: ${description}`;

  while (word.firstChild) {
    word.removeChild(word.firstChild);
  }

  failureCount = 0;
  successCount = 0;

  progress.textContent = `Incorrect guess: ${failureCount}/6`; // render zero state of counter

  delighter(); // Initial color to clicked buttons (virtual keyboard)
  noHangman(); // Make hangman invisible
  wordRender("_"); // Initial word render with underlining
};

// Function to render guess word

const wordRender = (arg) => {
  guessWord.forEach((symbol) => {
    const cell = document.createElement("div");
    cell.classList.add("word__cell");
    cell.textContent = arg;
    word.append(cell);
  });
};

// Function to remove underlines with guessed letter

const letterRerender = (clickedLetter, arr) => {
  for (let i = 0; i < arr.length; i++) {
    word.childNodes[arr[i]].textContent = `${clickedLetter}`;
  }
};

// Create a virtual keyboard

const keyboard = document.createElement("div");
keyboard.classList.add("keyboard");

keyboardArr.forEach((letter) => {
  let button = document.createElement("button");
  button.classList.add("keyboard__button");
  button.textContent = `${letter.toLocaleUpperCase()}`;
  keyboard.append(button);
});

const keyboardButtons = keyboard.querySelectorAll(".keyboard__button");

// Change color of clicked button

const lighter = (button) => {
  button.classList.add("lighter");
};

// Function to return initial color to clicked buttons on virtual keyboard

const delighter = () => {
  const buttons = document.querySelectorAll(".keyboard__button");
  buttons.forEach((button) => {
    button.classList.remove("lighter");
  });
};

// Function to make hangman invisible

const noHangman = () => {
  const bodyParts = document.querySelectorAll(".hangman__part");
  bodyParts.forEach((part) => {
    part.classList.remove("visible");
    part.classList.add("invisible");
  });
};

// Function that checks clicked letter in a word (from virtual board)

const checkLetter = (event) => {
  let buttonTextContent = null; // initially letter is not defined

  if (event.key) {
    buttonTextContent = event.key.toUpperCase();
  } else {
    buttonTextContent = event.target.textContent;
  }
  if (event.target.classList.contains("lighter")) {
    return; // do nothing if letter is allready clicked
  }
  lighter(event.target); // makes clicked virtual keyboard letter grey

  let check = guessWord.includes(buttonTextContent); // checking presence of clicked letter in the word - true or false

  const indexes = []; // indexes of letter in the guess  word
  for (let i = 0; i < guessWord.length; i++) {
    if (guessWord[i] === buttonTextContent) {
      indexes.push(i);
    }
  }

  if (check) {
    // if letter is present - length parameter plus quantity of letters in the word, instead of
    // underlines appears letter and works a function to check if you are the winner
    successCount += indexes.length;
    successStepSound.play();
    letterRerender(buttonTextContent, indexes);
    winner(successCount);
  } else {
    // if letter is not present - number parameter adds one point, number of
    // uncorrect guesses adds one point and rerender it and works a function to check if you are the loser
    failureCount += 1;
    failStepSound.play();
    progress.textContent = `Incorrect guess: ${failureCount}/6`;
    renderHangman(failureCount);
    gameOver(failureCount);
  }
};

// Rendering a parts of a Hangman in correct order

const renderHangman = (number) => {
  if (!number) return;

  switch (number) {
    case 1:
      manHead.classList.add("visible");
      break;
    case 2:
      manBody.classList.add("visible");
      break;
    case 3:
      rightHand.classList.add("visible");
      break;
    case 4:
      leftHand.classList.add("visible");
      break;
    case 5:
      rightLeg.classList.add("visible");
      break;
    case 6:
      leftLeg.classList.add("visible");
      break;
    default:
      break;
  }
};

// Function to create a Modal Window in the end of the game (result: winner or loser)

const createModalWindow = (result, word) => {
  const modal = document.createElement("div");
  modal.classList.add("modal");

  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");

  const text = document.createElement("h2");
  text.textContent = `You are the ${result}!`;

  const correctWord = document.createElement("h3");
  correctWord.textContent = `The correct answer is "${word}".`;

  const modalButton = document.createElement("button");
  modalButton.classList.add("modal__button");
  modalButton.textContent = `Play again`;

  // When we click a modal button game starts one more time

  modalButton.addEventListener("click", () => {
    initialState();
    playAgainSound.play();
  });

  document.body.append(modal);
  modal.append(modalContent);
  modalContent.append(text, correctWord, modalButton);
};

// Function that checks if you’ve lost

const gameOver = (number) => {
  if (number < 6) {
    return;
  } else {
    createModalWindow("Loser", correctWord);
    loseGameSound.play();
  }
};

// Function that checks if you win

const winner = (length) => {
  if (correctWord.length !== length) {
    return;
  } else {
    createModalWindow("Winner", correctWord);
    winGameSound.play();
  }
};

// Event on Click for virtual keyboard that starts letter search in guessed word

keyboardButtons.forEach((button) => {
  button.addEventListener("click", checkLetter);
});

// Keyboard event

// document.addEventListener("keydown", (event) => {
//   const isLetter = /^[a-zA-Z]$/.test(event.key);
//   if (isLetter) {
//     checkLetter(event);
//   }
// });

// Audio effects for different events
const winGameSound = new Audio("sounds/win-game.wav");
const loseGameSound = new Audio("sounds/lose-game.wav");
const successStepSound = new Audio("sounds/success-sound.wav");
const failStepSound = new Audio("sounds/fail-sound.wav");
const playAgainSound = new Audio("sounds/play-again.wav");

document.body.append(bodyWrapper);
bodyWrapper.append(gallows, game);
gallows.append(gallowImgWrapper, gameName);
gallowImgWrapper.append(gallowImage);
gallowImage.append(gallowPng, hangman);

hangman.append(manHead, middlePart, legs);
middlePart.append(leftHand, manBody, rightHand);
legs.append(leftLeg, rightLeg);
game.append(gameWrapper);
gameWrapper.append(word, hint, progress, keyboard);

window.onload = () => {
  initialState();
};
