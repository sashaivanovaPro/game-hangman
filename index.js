import { hangmanWords } from "./modules/hangman.js";
import { keyboardArr } from "./modules/keyboard.js";

// Choose a guess word randomly from 0 to Words Array lenght - 1

const getRandomWord = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  let wordNumber = Math.floor(Math.random() * (max - min) + min);
  return wordNumber;
};

let number = 0;
let wordNumber = getRandomWord(0, hangmanWords.length);
const description = hangmanWords[wordNumber].description;
let guessWord = hangmanWords[wordNumber].word.toUpperCase().split("");
console.log(guessWord);

window.onload = () => {
  console.log(hangmanWords[wordNumber].word);
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
manHead.classList.add("head-png");
manHead.src = "./images/head.png";
manHead.classList.add("invisible");

const middlePart = document.createElement("div");
middlePart.classList.add("middle-part");
middlePart.classList.add("invisible");

const manBody = document.createElement("img");
manBody.classList.add("body-png");
manBody.src = "./images/body.png";
manBody.classList.add("invisible");

const leftHand = document.createElement("img");
leftHand.classList.add("left-hand-png");
leftHand.src = "./images/hand-one.png";
leftHand.classList.add("invisible");

const rightHand = document.createElement("img");
rightHand.classList.add("right-hand-png");
rightHand.src = "./images/hand-two.png";
rightHand.classList.add("invisible");

const legs = document.createElement("div");
legs.classList.add("legs");

const leftLeg = document.createElement("img");
leftLeg.classList.add("left-leg-png");
leftLeg.src = "./images/leg-one.png";
leftLeg.classList.add("invisible");

const rightLeg = document.createElement("img");
rightLeg.classList.add("right-leg-png");
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
    // cell.textContent = `${symbol.toUpperCase()}`;
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

// When we click a button

keyboardButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button) {
      lighter(button);
    } else {
      number += 1;
      progress.textContent = `Incorrect guess: ${number}/6`;
    }
  });
});

// Change color of clicked button

const lighter = (button) => {
  button.classList.add("lighter");
};

// Check letter in a word

const checkLetter = (event) => {
  const buttonText = event.target.textContent;
  console.log(buttonText);
  console.log(guessWord.includes(buttonText));
  // return guessWord.includes(buttonText);
  const indexes = [];
  for (let i = 0; i < guessWord.length; i++) {
    if (guessWord[i] === buttonText) {
      indexes.push(i);
    }
  }
  console.log(indexes);

  letterRerender(buttonText, indexes);
};

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
