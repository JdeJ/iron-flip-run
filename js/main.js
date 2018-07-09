var generalWrapper = document.getElementById('general-wrapper');
var startSection = document.createElement('section');
  startSection.setAttribute('id','game-wrapper-start');
  startSection.innerHTML = `<div class="container">
    <div class="start-screen-wrapper">
      <div class="content-wrapper">
          <h1>Iron Flip Run</h1>
          <button class="play-btn">Play</button>
      </div>
    </div>
  </div>`;
var gameSection = document.createElement('section');
gameSection.setAttribute('id','game-wrapper-game');
gameSection.innerHTML = `<div class="container">
  <div class="canvas-wrapper">
      <canvas id="game-board" width="768" height="320"></canvas>
  </div>
</div>`;
var gameOverSection = document.createElement('section');
gameOverSection.setAttribute('id','game-wrapper-gameover');
gameOverSection.innerHTML = `<div class="container">
  <div class="gameover-screen-wrapper">
    <div class="content-wrapper">
        <h1>Game over</h1>
        <button class="play-btn">Play again</button>
        <button class="back-to-start-btn">Go to start</button>
    </div>
  </div>
</div>`;
var playBtn = null;
var goToStartBtn = null;
var canvas = null;
var ctx = null;

function createStartScreen () {
  generalWrapper.prepend(startSection);
  playBtn = document.querySelector('.play-btn');
  playBtn.addEventListener('click',changeToGame);
}

//createStartScreen();
function createGameScreen () { 
  generalWrapper.prepend(gameSection);
  initGameCanvas();
}
function initGameCanvas () {
  canvas = document.getElementById('game-board');
  ctx = canvas.getContext('2d');
  setTimeout(gameOver,5000);
}

function createGameoverScreen () {
  generalWrapper.prepend(gameOverSection);
  playBtn = document.querySelector('.play-btn');
  goToStartBtn = document.querySelector('.back-to-start-btn');

  playBtn.addEventListener('click',changeToGame);
  goToStartBtn.addEventListener('click',changeToStart);
}

function clearContent () {
  generalWrapper.innerHTML = "";
}

function changeToGame () {
  clearContent();
  createGameScreen();
}

function changeToStart () {
  clearContent();
  createStartScreen();
}

function gameOver () {
  canvas = null;
  ctx = null;
  clearContent();
  createGameoverScreen();
}

window.onload = function() {
  createGameoverScreen();
};