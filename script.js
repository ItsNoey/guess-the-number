'use strict';

const displayMessage = message =>
  (document.querySelector('.message').textContent = message);

const displayScore = score =>
  (document.querySelector('.score').textContent = score);

const displayNum = num => (document.querySelector('.number').textContent = num);

//Grab value from the input when the 'check' button is clicked
const checkGuess = document
  .querySelector('.check')
  .addEventListener('click', function () {
    const myGuess = Number(document.querySelector('.guess').value);
    checkNums(myGuess, secretNum);
  });

//Get a random number
let secretNum = Math.trunc(Math.random() * 20) + 1;

//Reset the input value
const resetInput = () => (document.querySelector('.guess').value = '');

let score = 20;
let highscore = 0;

//Logic for the game
const checkNums = (checkGuess, secretNum) => {
  //1. Check if there is any guess
  if (!checkGuess) {
    displayMessage('⛔️ No number ⛔️');
    //2. Condition for when the guess is correct
  } else if (checkGuess === secretNum) {
    displayMessage('🎊 Correct guess!!! 🎊');
    displayNum(secretNum);
    document.querySelector('.number').style.width = '20rem';
    document.querySelector('body').style.backgroundColor = '#55a630';
    //2.1 If the guess is correct, keep the score and remain the highest score
    if (score > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = score;
    }
    //3. Condition for when the guess is wrong and either too high or too low
  } else if (checkGuess !== secretNum) {
    //3.1 If the player guesses wrong, the score to keep decreasing by one each time
    //3.2 The score is only to keep counting when it is above 1 because if the score is only above 0, the player can still play one more time
    if (score > 1) {
      displayMessage(
        checkGuess > secretNum ? '🔺 Too high 🔺' : '🔻 Too low 🔻'
      );
      //3.1 If the player guesses wrong, the score to keep decreasing by one each time
      score--;
      displayScore(score);
      //3.3 Game is finished and player is lost after the score is at 0
    } else {
      displayMessage('🫣 You lost! Restart the game! 🫣');
      displayScore(0);
      resetInput();
    }
  }
};

//Function: Reset the game
const resetGame = function () {
  document.querySelector('.again').addEventListener('click', function () {
    secretNum = Math.trunc(Math.random() * 20) + 1;
    score = 20;
    displayScore(score);
    displayNum('?');
    displayMessage('Start guessing...');
    resetInput();
    document.querySelector('body').style.backgroundColor = '#222';
    document.querySelector('.number').style.width = '15rem';
  });
};
resetGame();
