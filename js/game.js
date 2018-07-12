function Game(options){
  this.canvas = options.canvas;
  this.rows = options.rows;
  this.columns = options.columns;
  this.ctx = options.ctx;
  this.bgColor = options.bgColor;
  this.gameAudio = new Sound("./audio/scweinsteiger-game-mix-1.mp3");
  this.gameOverAudio = new Sound("./audio/dead.mp3");
  this.margin = 100;
  this.player = new Player(this.canvas,this.ctx);
  this.background = new Background(this.ctx,this.canvas);
  this.obstaclesArr = [];
  this.obstacleInterval = undefined;
  this.obstacle = options.obstacle;
  this.collitionDetected = false;
  this.highScore = undefined;
  this.highScoreMessage = document.querySelector('.high-score-message');
  this.speedInterval = undefined;
  this.counter = {
    over: 0,
    under : 0,
  }
  this.init();
}

Game.prototype._drawBackground = function () {
  //Draw background color
  // this.ctx.globalAlpha = 1;
  // for (var columnIndex = 0; columnIndex < this.columns; columnIndex++) {
  //   for (var rowIndex = 0; rowIndex < this.rows; rowIndex++) {
  //     this.ctx.fillStyle = this.bgColor;
  //     this.ctx.fillRect(columnIndex * 10, rowIndex * 10, 10, 10);
  //   }
  // }
  //Draw fixed game line color
    this.ctx.fillStyle = "#000";
    this.ctx.fillRect(0,this.canvas.height/2-15,this.canvas.width,30);
}

Game.prototype._controlFlip = function () {
  document.onkeydown = function(){
    this.player.flip();
  }.bind(this);
}

Game.prototype._drawObstacles = function () {
  this.obstaclesArr.forEach(function(obstacle){
    obstacle.draw(obstacle);
  }.bind(this));
}

Game.prototype.changePosition = function (obstacle) {
    if(obstacle.positionY === "under"){
      obstacle.positionY = "over";
    }
    else{
      obstacle.positionY = "under";
    }
}

Game.prototype._setPositionY = function () {
  var positionY = this._setRandomPosition();
  if(this.obstaclesArr.length > 1){
    var lastItem = this.obstaclesArr[this.obstaclesArr.length-1];

    if(lastItem.positionY === "over"){
      this.counter.over++;
    }
    else{
      this.counter.over = 0;
      this.counter.under++;
    }
    if(this.counter.over === 3){
      positionY = "under";
      this.counter.over = 0;
    }
    else if(this.counter.under === 3){
      positionY = "over";
      this.counter.under = 0;
    }
    else{
      positionY = this._setRandomPosition();
    }
  }
  return positionY;
}

Game.prototype._setRandomPosition = function () {
  var positionOptions = ["over","under"];
  var randomNum = Math.floor(Math.random() * positionOptions.length);
  return positionOptions[randomNum];
}

Game.prototype._moveObstacles = function () {
  this.obstaclesArr.forEach(function(obstacle){
    obstacle.positionX -= obstacle.speed;
  }.bind(this));
}
Game.prototype._createObstaclesInterval = function () {
    this.obstacleInterval = setInterval(this._createObstacle.bind(this),350);
}

Game.prototype._createObstacle = function () {
  var obstaclePositionY = this._setPositionY();
  this.obstaclesArr.push(new Obstacle(this.canvas,this.ctx,obstaclePositionY));
}

Game.prototype._removeObstacle = function () {
  this.obstaclesArr.forEach(function(obstacle){
    if(obstacle.positionX < 75){
      this.obstaclesArr.shift();
    }
  }.bind(this));
}

Game.prototype._obstacleCollidesWithPlayer = function(){
  
  this.obstaclesArr.forEach(function(obstacle){
    console.log("o " + obstacle.positionX, "p " + this.player.playerPositionX+30);
    if(obstacle.positionX < this.player.playerPositionX+30 && obstacle.positionX > this.player.playerPositionX && obstacle.positionY === this.player.playerPositionY){
      console.log("COLISION");
      this.collitionDetected = true;
    }
  }.bind(this));
}

Game.prototype._getHighScore = function () {
  if(localStorage.getItem('highestScore')){
    this.highScore = localStorage.getItem('highestScore');
  }
}

Game.prototype._compareScore = function () {
  if(this.highScore && this.player.score.score > this.highScore){
    this.highScoreMessage.innerHTML = "New High Score!!!";
    if(!this.highScoreMessage.classList.contains('active')){
      this.highScoreMessage.classList.add('active');
    }
  }
}
Game.prototype._changeSpeed = function (speed) {
  this.obstaclesArr.forEach(function(obstacle){
    obstacle.speed = speed;
  }.bind(this));
}

Game.prototype._checkBreakPoints = function () {
  switch (this.player.score.score) {
    case 1154:
      this.background._change();
      break;
    case 1723:
      this.background._strobe();
      break;
      case 1850:
        this.speedInterval = setInterval(function(){
        this._changeSpeed(7);
      }.bind(this),100);
      break;
       case 2053:
      this.background._clearStrobe();
      clearInterval(this.speedInterval);
      this.speedInterval = setInterval(function(){
        this._changeSpeed(15);
      }.bind(this),100);
      break;
    default:
      break;
  }
}

Game.prototype.stop = function () {
  document.getElementsByTagName('body')[0].style.cursor = 'default';
  this.gameOverAudio._play();
  this.gameAudio._stop();
  this.background._clearStrobe();
  this.canvas.classList.remove('rotate-crazy');
  this.highScoreMessage.classList.remove('active');
  this.highScoreMessage.innerHTML = "";
  if (this.obstacleInterval) {
    clearInterval(this.obstacleInterval)
    this.obstacleInterval = undefined;
  }
  document.onkeydown = null;
  this.player.score._saveScore(this.player.score.score);
}

Game.prototype._doFrame = function () {
  if(this.obstaclesArr.length){
    this._obstacleCollidesWithPlayer();
  }
  this.background._draw();
  this._drawBackground();
  this.player._drawPlayer();
  this._drawObstacles();
  this._removeObstacle();
  this._moveObstacles();
  this._controlFlip();
  this._compareScore();
  this._checkBreakPoints();
  this.player.score._run();
  if(this.collitionDetected){
    //this._destroyPlayer()
    this.stop();
    gameOver();
  }
  else{
    window.requestAnimationFrame(this._doFrame.bind(this));
  }
}

Game.prototype.init = function () {
  document.getElementsByTagName('body')[0].style.cursor= 'none';
  this.gameAudio._play();
  this._createObstaclesInterval();
  this.crazyMovement();
  this._getHighScore();
  this._doFrame();
}


Game.prototype.setInRotation = function () {
  if(this.canvas){
    this.canvas.setAttribute('class','rotate-crazy');
  }
}
Game.prototype.crazyMovement = function () {
  setTimeout(this.setInRotation,5000);
}