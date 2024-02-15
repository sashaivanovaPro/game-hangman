// Creating main HTML structure

const body = document.querySelector("body");

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

const progress = document.createElement("p");
progress.classList.add("progress");
