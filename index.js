import { hangmanWords } from "./modules/hangman.js";
import { keyboardArr } from "./modules/keyboard.js";

// Choose a guess word randomly from 0 to Words Array lenght - 1

const getRandomWord = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  let wordNumber = Math.floor(Math.random() * (max - min) + min);
  return wordNumber;
};

let number = 0; // quantity of not guessed letters
let length = 0; //quantity of correctly guessed letters
let wordNumber = null;
let description = null;
let correctWord = null;
let guessWord = null;

const body = document.querySelector("body");
// console.log(body);
// console.log(guessWord);

window.onload = () => {
  // console.log(correctWord);
  initialState();
  // wordRender("_");
};

//Function to rerender Word

// const renderWord = () => {};

// Function to render initial page

const initialState = () => {
  let remove = document.querySelector(".modal");
  if (remove) {
    body.removeChild(remove);
  }
  wordNumber = getRandomWord(0, hangmanWords.length);
  description = hangmanWords[wordNumber].description;
  correctWord = hangmanWords[wordNumber].word;
  guessWord = correctWord.toUpperCase().split("");
  console.log(correctWord);
  while (word.firstChild) {
    word.removeChild(word.firstChild);
  }
  number = 0;
  length = 0;
  progress.textContent = `Incorrect guess: ${number}/6`;
  delighter();
  noHangman();
  wordRender("_");
};

// Creating main HTML structure

const bodyWrapper = document.createElement("div");
bodyWrapper.classList.add("body-wrapper");

// Image section

const gallows = document.createElement("section");
gallows.classList.add("gallows");

const gallowImgWrapper = document.createElement("div");
gallowImgWrapper.classList.add("gallow-img__wrapper");

const gallowImage = document.createElement("div");
gallowImage.classList.add("gallow-image");

const gameName = document.createElement("h1");
gameName.classList.add("heading");
gameName.textContent = "HANGMAN GAME";

const gallowPng = document.createElement("img");
gallowPng.classList.add("gallow-png");
gallowPng.src = "./images/gallows.png";

// Hangman body parts
const hangman = document.createElement("div");
hangman.classList.add("hangman");

const manHead = document.createElement("img");
manHead.classList.add("head-png", "hangman__part");
manHead.src = "./images/head.png";
manHead.classList.add("invisible");

const middlePart = document.createElement("div");
middlePart.classList.add("middle-part");

const manBody = document.createElement("img");
manBody.classList.add("body-png", "hangman__part");
manBody.src = "./images/body.png";
manBody.classList.add("invisible");

const leftHand = document.createElement("img");
leftHand.classList.add("left-hand-png", "hangman__part");
leftHand.src = "./images/hand-one.png";
leftHand.classList.add("invisible");

const rightHand = document.createElement("img");
rightHand.classList.add("right-hand-png", "hangman__part");
rightHand.src = "./images/hand-two.png";
rightHand.classList.add("invisible");

const legs = document.createElement("div");
legs.classList.add("legs");

const leftLeg = document.createElement("img");
leftLeg.classList.add("left-leg-png", "hangman__part");
leftLeg.src = "./images/leg-one.png";
leftLeg.classList.add("invisible");

const rightLeg = document.createElement("img");
rightLeg.classList.add("right-leg-png", "hangman__part");
rightLeg.src = "./images/leg-two.png";
rightLeg.classList.add("invisible");

// Game section

const game = document.createElement("section");
game.classList.add("game");

const gameWrapper = document.createElement("div");
gameWrapper.classList.add("game-wrapper");

//Create a guess word section

const word = document.createElement("div");
word.classList.add("word");

const hint = document.createElement("p");
hint.classList.add("hint");
hint.textContent = `Hint: ${description}`;

const progress = document.createElement("p");
progress.classList.add("progress");
progress.textContent = `Incorrect guess: ${number}/6`;

const wordRender = (arg) => {
  guessWord.forEach((symbol) => {
    const cell = document.createElement("div");
    cell.classList.add("word__cell");
    cell.textContent = arg;
    word.append(cell);
  });
};

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

// Create initial color of clicked button

const delighter = () => {
  const buttons = document.querySelectorAll(".keyboard__button");
  buttons.forEach((button) => {
    button.classList.remove("lighter");
  });
};

// Make hangman invisible

const noHangman = () => {
  const bodyParts = document.querySelectorAll(".hangman__part");
  bodyParts.forEach((part) => {
    part.classList.remove("visible");
    part.classList.add("invisible");
  });
};

// Check letter in a word

const checkLetter = (event) => {
  const buttonText = event.target.textContent;
  if (event.target.classList.contains("lighter")) {
    return;
  }
  lighter(event.target);
  // console.log(buttonText);
  let check = guessWord.includes(buttonText);

  // return guessWord.includes(buttonText);
  const indexes = [];
  for (let i = 0; i < guessWord.length; i++) {
    if (guessWord[i] === buttonText) {
      indexes.push(i);
    }
  }
  if (check) {
    length += 1;
    // console.log(length);
    letterRerender(buttonText, indexes);
    winner(length);
  } else {
    number += 1;
    progress.textContent = `Incorrect guess: ${number}/6`;
    renderHangman(number);
    gameOver(number);
  }
};

// Rendering a Hangman

const renderHangman = (number) => {
  if (!number) {
    return;
  } else if (number === 1) {
    manHead.classList.add("visible");
  } else if (number === 2) {
    manBody.classList.add("visible");
  } else if (number === 3) {
    rightHand.classList.add("visible");
  } else if (number === 4) {
    leftHand.classList.add("visible");
  } else if (number === 5) {
    rightLeg.classList.add("visible");
  } else if (number === 6) {
    leftLeg.classList.add("visible");
  }
};

// Create Modal Window

const createModalWindow = (result, word) => {
  const modal = document.createElement("div");
  modal.classList.add("modal");
  // modal.classList.add("modal");

  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");

  const text = document.createElement("h2");
  text.textContent = `You are the ${result}!`;

  const correctWord = document.createElement("h3");
  correctWord.textContent = `The correct answer is "${word}".`;

  const modalButton = document.createElement("button");
  modalButton.classList.add("modal__button");
  modalButton.textContent = `Play again`;
  // When we click a modal button

  modalButton.addEventListener("click", () => {
    initialState();
  });

  document.body.append(modal);
  modal.append(modalContent);
  modalContent.append(text, correctWord, modalButton);
};

// Check if the Game is over

const gameOver = (number) => {
  if (number < 6) {
    return;
  } else {
    // console.log("Looser");
    createModalWindow("Looser", correctWord);
  }
};

// Check if you win

const winner = (length) => {
  if (correctWord.length !== length) {
    return;
  } else {
    // console.log("Looser");
    createModalWindow("Winner", correctWord);
  }
};

// Event on Click that start letter search

keyboardButtons.forEach((button) => {
  button.addEventListener("click", checkLetter);
});

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
