let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

updateScoreElement();

function pickComputerMove () {
  const randomNum = Math.random();
  let computerMove = '';

  if (randomNum >= 0 && randomNum < 1/3) {
    computerMove = 'rock';
  } else if (randomNum >= 1/3 && randomNum < 2/3) {
    computerMove = 'paper';
  }else if (randomNum >= 2/3 && randomNum < 1) {
    computerMove = 'scissors';
  }

  return computerMove;
}

let isAutoPlaying = false;
let intervalId;

function autoPlay(){
  if(!isAutoPlaying){
    intervalId = setInterval(function(){
      const playerMove = pickComputerMove();
      playGame(playerMove);
    },1000);
    isAutoPlaying = true;
  }
  else{
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
}

function playGame (playerMove) {
  const computerMove = pickComputerMove();

  let result = '';

  if (playerMove === 'scissors') {
    if(computerMove === 'rock'){
      result = 'You lost.';
    } else if (computerMove === 'paper') {
      result = 'You Won.';
    } else if (computerMove === 'scissors') {
      result = 'Tie.';
    }
  } else if (playerMove === 'paper') {
    if(computerMove === 'rock'){
      result = 'You won.';
    } else if (computerMove === 'paper') {
      result = 'Tie.';
    } else if (computerMove === 'scissors') {
      result = 'You lost.';
    }
  } else {
    if(computerMove === 'rock'){
    result = 'Tie.';
    } else if (computerMove === 'paper') {
      result = 'You lost.';
    } else if (computerMove === 'scissors') {
      result = 'You won.';
    }
  }

  if(result === 'You won.')
    score.wins++;
  else if(result === 'You lost.')
    score.losses++;
  else
    score.ties++;

  localStorage.setItem('score',JSON.stringify(score));

  updateScoreElement();

  document.querySelector('.js-result').innerHTML = result;

  document.querySelector('.js-moves').innerHTML = `You picked <img class="move-icon-score" src="Images/${playerMove}-emoji.png"> and Computer picked <img class="move-icon-score" src="Images/${computerMove}-emoji.png">`;
}

function updateScoreElement(){
  document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses} Ties: ${score.ties}`;
}
