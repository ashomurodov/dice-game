
"use strict";

const dice = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

// * SCORES
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");

// ^ CURRENT SCORES
const currentScore0El = document.getElementById("current--0");
const currentScore1El = document.getElementById("current--1");

// & PLAYERS
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");
console.log(player0);
console.log(player1);

let currentScore, scores, playerturn, playing;

function init() {
  currentScore = 0;
  scores = [0, 0];
  playerturn = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;

  dice.classList.add("hidden");
  player0.classList.remove("player--winner");
  player1.classList.remove("player--winner");
  player0.classList.add("player--active");
  player1.classList.remove("player--active");
}

init();

const switchPlayer = () => {
  currentScore = 0;
  document.getElementById(`current--${playerturn}`).textContent = currentScore;
  playerturn = playerturn === 0 ? 1 : 0;
  player0.classList.toggle("player--active");
  player1.classList.toggle("player--active");
};

const changeDiceImg = () => {
  if (playing) {
    // generate a random number
    const randomDice = Math.trunc(Math.random() * 6) + 1;

    // change the images using random numbers
    dice.classList.remove("hidden");
    dice.src = `dice-${randomDice}.png`;

    //   check for 1
    if (randomDice !== 1) {
      // add dice to current score
      currentScore += randomDice;
      document.getElementById(`current--${playerturn}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
};

// addEventListeners
btnRoll.addEventListener("click", changeDiceImg);

btnHold.addEventListener("click", () => {
  if (playing) {
    scores[playerturn] += currentScore;
    // document.getElementById(`current--${playerturn}`).textContent = currentScore;
    document.querySelector(`#score--${playerturn}`).textContent =
      scores[playerturn];

    if (scores[playerturn] >= 40) {
      // switchPlayer();
      playing = false;
      document
        .querySelector(`.player--${playerturn}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${playerturn}`)
        .classList.remove("player--active");
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", init);
