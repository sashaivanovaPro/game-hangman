console.log("Hello hangman!");
import { hangmanWords } from "./hangman.js";

// Creating main HTML structure

const description = hangmanWords[1].description;

const number = 0;

const bodyWrapper = document.createElement("div");
bodyWrapper.classList.add("body-wrapper");

// Image section

const gallows = document.createElement("section");
gallows.classList.add("gallows");

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

const manBody = document.createElement("img");
manBody.classList.add("body-png");
manBody.src = "./images/body.png";

const leftHand = document.createElement("img");
leftHand.classList.add("left-hand-png");
leftHand.src = "./images/hand-one.png";

const rightHand = document.createElement("img");
rightHand.classList.add("right-hand-png");
rightHand.src = "./images/hand-two.png";

const leftLeg = document.createElement("img");
leftLeg.classList.add("left-leg-png");
leftLeg.src = "./images/leg-one.png";

const rightLeg = document.createElement("img");
rightLeg.classList.add("right-leg-png");
rightLeg.src = "./images/leg-two.png";

// Game section

const game = document.createElement("section");
game.classList.add("game");

const gameWrapper = document.createElement("div");
gameWrapper.classList.add("game-wrapper");

const word = document.createElement("div");
word.classList.add("word");

const hint = document.createElement("p");
hint.classList.add("hint");
hint.textContent = `Hint: ${description}`;

const progress = document.createElement("p");
progress.classList.add("progress");
progress.textContent = `Incorrect guess: ${number}/6`;

const keyboard = document.createElement("div");
keyboard.classList.add("keyboard");

document.body.append(bodyWrapper);
bodyWrapper.append(gallows, game);
gallows.append(gallowImage, hangman, gameName);
gallowImage.append(gallowPng);

hangman.append(manHead, manBody, leftHand, rightHand, leftLeg, rightLeg);
game.append(gameWrapper);
gameWrapper.append(word, hint, progress, keyboard);
