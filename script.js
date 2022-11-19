'use strict';

//Grab the body to change the background color
let body = document.querySelector('body');

//Grab the 'check' button
const getGuess = document.querySelector('.check');

//Function: Compare the numbers and get the value of the 'guess' after the button is clicked
getGuess.addEventListener('click', function () {
  //Grab the value from the guess input
  //'myGuess presents no value (0) when it is in the global scope.
  const myGuess = Number(document.querySelector('.guess').value);
  checkNums(myGuess, myNum);
});

//Grab the message to change it accordingly (REFACTORED)
const showMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

//Get random a random number from 1 - 20
let myNum = Math.trunc(Math.random() * 20) + 1;
console.log(myNum);

//Grab the box that will reveal the number
let revealBox = document.querySelector('.number');

//Get the 'score' element to count the score (REFACTORED)
const tellScore = function (score) {
  document.querySelector('.score').textContent = score;
};

let score = 20;
let highScore = 0;

//Logic for the game
const checkNums = function (guess, secretNum) {
  //Check to see if there is any input
  if (!guess) {
    //Display result
    showMessage('🤡 No number!');
    //Condition for winning
  } else if (guess === secretNum) {
    showMessage('🥳 Correct!');
    //Change background color
    body.style.backgroundColor = '#f8ad9d';
    //Shoe the secret number
    revealBox.textContent = myNum;
    //Expand the width of the box
    revealBox.style.width = '20rem';

    //Keep the winning high score. Change the value of the 'Highscore' to the current highest score, if applicable
    if (score > highScore) {
      highScore = score;
      document.querySelector('.highscore').textContent = highScore;
    }
    //Condition for when the player guesses wrong
  } else if (guess !== secretNum) {
    //Only run these if the 'score' is still higher than zero
    if (score > 1) {
      //If the player'guess is too how, the 'message' will hint according and vice versa
      showMessage(guess > secretNum ? '🔺 Too high!' : '🔻 Too low!');
      //The score decreases when the player guesses wrong
      score--;
      //Update the score as the guess continues to be wrong but the score is still above 0
      tellScore(score);
      //When the score the is below 0 runs the code below
    } else {
      showMessage('🫣 You lost the game!');
      //score--;
      tellScore(0);
    }
  }
};

//Reset the game
const resetButton = document
  .querySelector('.again')
  .addEventListener('click', function () {
    myNum = Math.trunc(Math.random() * 20) + 1;
    score = 20;
    tellScore(score);
    document.querySelector('.guess').value = '';
    showMessage('Start guessing...');
    body.style.backgroundColor = '#222';

    revealBox.textContent = '?';
    revealBox.style.width = '15rem';
  });
