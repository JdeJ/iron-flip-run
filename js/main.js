var generalWrapper = document.getElementById('game-states');
var overlay = document.querySelector('.overlay');
var startSection = document.createElement('section');
  startSection.setAttribute('id','game-wrapper');
  startSection.innerHTML = `<div class="start-screen-wrapper">
    <div class="content-wrapper">
      <h1>Iron Flip Run</h1>
      <button class="play-btn">Play game</button>
    <footer class="start-screen-footer">
      <button class="btn highscore-btn">High Score</button>
    </footer>
    </div>
  </div>`;
var gameSection = document.createElement('section');
gameSection.setAttribute('id','game-wrapper');
gameSection.innerHTML = `<div class="overlay" id="overlay-triangle-up"></div>
<div class="overlay" id="overlay-triangle-down"></div><div class="container">
  <div class="canvas-wrapper">
      <span class="score"></span>
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
    <button class="btn highscore-btn">High Score</button>
  </footer>
</div>`;
var highscoreSection = document.createElement('section');
highscoreSection.setAttribute('id','high-score-section');
highscoreSection.innerHTML = `<div class="content-wrapper">
<h1>High Score</h1>
<ol class="high-score-list"></ol>
<footer class="game-over-footer">
  <button class="btn play-btn">Play again</button>
  <button class="btn back-to-start-btn">Go to start</button>
  <button class="btn close-btn">Close</button>
</footer>
</div>`;
var playBtn = null;
var goToStartBtn = null;
var highscoreBtn = null;
var closeBtn = null;
var canvas = null;
var ctx = null;
var game = null;

function createStartScreen () {
  generalWrapper.prepend(startSection);
  playBtn = document.querySelector('.play-btn');
  highscoreBtn = document.querySelector('.highscore-btn');
  playBtn.addEventListener('click',changeToGame);
  highscoreBtn.addEventListener('click',createHighScoreScreen);
}

//createStartScreen();
function createGameScreen () { 
  generalWrapper.prepend(gameSection);
  document.getElementById('overlay-triangle-up').classList.remove('move');
  document.getElementById('overlay-triangle-down').classList.remove('move');
  setTimeout(function(){
    document.getElementById('overlay-triangle-up').classList += ' move';
    document.getElementById('overlay-triangle-down').classList += ' move';
    initGame();
  },500);
  
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
  highscoreBtn = document.querySelector('.highscore-btn');

  playBtn.addEventListener('click',changeToGame);
  goToStartBtn.addEventListener('click',changeToStart);
  highscoreBtn.addEventListener('click',createHighScoreScreen);
}

function createHighScoreScreen(){
    generalWrapper.prepend(highscoreSection);
    playBtn = document.querySelector('.play-btn');
    goToStartBtn = document.querySelector('.back-to-start-btn');
    closeBtn = document.querySelector('.close-btn');
  
    playBtn.addEventListener('click',changeToGame);
    goToStartBtn.addEventListener('click',changeToStart);
    closeBtn.addEventListener('click',destroyHighScoreSection);

    var highScore = JSON.parse(localStorage.getItem("playerScore"));
    highScore.sort(function(a,b){
      return b.score - a.score;
    });

    printHighScore(highScore);
}

function printHighScore(highscore){
  var li,
      ul = document.querySelector('.high-score-list');
  
  for(var i = 0; i < 10; i++){
    li = document.createElement('li');
    li.innerHTML = `${highscore[i].score}`;
    ul.appendChild(li);
  }
}

function destroyHighScoreSection(){
  document.querySelector('.high-score-list').innerHTML = "";
  generalWrapper.removeChild(highscoreSection);
}

function clearContent () {
  // overlay.classList.toggle('fade-out');
  // setTimeout(function(){
  //   overlay.classList.toggle('fade-out');
  // },1000);
  if(document.querySelector('.high-score-list')){
    document.querySelector('.high-score-list').innerHTML = "";
  }
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