var generalWrapper = document.getElementById('game-states');
var overlay = document.querySelector('.overlay');
var startSection = document.createElement('section');
  startSection.setAttribute('id','game-wrapper');
  startSection.innerHTML = `<div class="start-screen-wrapper">
    <div class="content-wrapper">
        <h1>Iron Flip Run</h1>
        <button class="play-btn">Play</button>
    </div>
  </div>`;
var gameSection = document.createElement('section');
gameSection.setAttribute('id','game-wrapper');
gameSection.innerHTML = `<div class="container">
  <div class="canvas-wrapper">
      <canvas id="game-board" width="850" height="350"></canvas>
  </div>
</div>`;
var gameOverSection = document.createElement('section');
gameOverSection.setAttribute('id','game-over-section');
gameOverSection.innerHTML = `<div class="content-wrapper">
  <h1>Game over</h1>
  <footer class="game-over-footer">
    <button class="btn play-btn">Play again</button>
    <button class="btn back-to-start-btn">Go to start</button>
  </footer>
</div>`;
var playBtn = null;
var goToStartBtn = null;
var canvas = null;
var ctx = null;
var game = null;

function createStartScreen () {
  generalWrapper.prepend(startSection);
  playBtn = document.querySelector('.play-btn');
  playBtn.addEventListener('click',changeToGame);
}

//createStartScreen();
function createGameScreen () { 
  generalWrapper.prepend(gameSection);
  initGame();
}
function initGame () {
  canvas = document.getElementById('game-board');
  ctx = canvas.getContext('2d');
  options = {
    canvas : canvas,
    rows: canvas.height / 7,
    columns: canvas.width / 10,
    ctx: ctx,
    bgColor : '#00ffcc',
    obstacle : new Obstacle(),
  }
  game = new Game(options);
}

function createGameoverScreen () {
  generalWrapper.prepend(gameOverSection);
  playBtn = document.querySelector('.play-btn');
  goToStartBtn = document.querySelector('.back-to-start-btn');

  playBtn.addEventListener('click',changeToGame);
  goToStartBtn.addEventListener('click',changeToStart);
}

function clearContent () {
  // overlay.classList.toggle('fade-out');
  // setTimeout(function(){
  //   overlay.classList.toggle('fade-out');
  // },1000);
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
  createGameoverScreen();
}

window.onload = function() {
  //overlay.classList.toggle('fade-out');
  createStartScreen();
};