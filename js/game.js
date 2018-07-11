function Game(options){
  this.canvas = options.canvas;
  this.rows = options.rows;
  this.columns = options.columns;
  this.ctx = options.ctx;
  this.bgColor = options.bgColor;
  this.margin = 100;
  this.player = new Player(this.canvas,this.ctx);
  this.background = new Background(this.ctx,this.canvas);
  this.obstaclesArr = [];
  this.obstacleInterval = undefined;
  this.obstacle = options.obstacle;
  this.collitionDetected = false;
  this.obstacleIntervalNum = 350;
  this.highScore = localStorage.getItem('highestScore');
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
  this.ctx.globalAlpha = 1;
  this.obstaclesArr.forEach(function(obstacle){
    obstacle.draw(obstacle);
    this._obstacleCollidesWithPlayer(obstacle,this.player);
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
    obstacle.positionX-=obstacle.speed;
  }.bind(this));
}
Game.prototype._createObstaclesInterval = function () {
    this.obstacleInterval = setInterval(this._createObstacle.bind(this),this.obstacleIntervalNum);
}

Game.prototype._createObstacle = function () {
  var obstaclePositionY = this._setPositionY();
  console.log(obstaclePositionY);
  this.obstaclesArr.push(new Obstacle(this.canvas,this.ctx,obstaclePositionY));
}

Game.prototype._removeObstacle = function () {
  this.obstaclesArr.forEach(function(obstacle){
    if(obstacle.positionX < 0){
      this.obstaclesArr.shift();
    }
  }.bind(this));
}

Game.prototype._obstacleCollidesWithPlayer = function(obstacle,player){
  if(obstacle.positionX === player.playerPositionX && obstacle.positionY === player.playerPositionY){    
    this.collitionDetected = true;
  }
}

Game.prototype.stop = function () {
  if (this.obstacleInterval) {
    clearInterval(this.obstacleInterval)
    this.obstacleInterval = undefined;
  }
  document.onkeydown = null;
  this.player.score._saveScore(this.player.score.score);
}



Game.prototype._doFrame = function () {
  this.background._draw();
  this._drawBackground();
  this.player._drawPlayer();
  this._moveObstacles();
  this._drawObstacles();
  this._removeObstacle();
  this._controlFlip();
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
  this._createObstaclesInterval();
  this.crazyMovement();

  this._doFrame();
}


Game.prototype.setInRotation = function () {
  this.canvas.setAttribute('class','rotate-crazy');
  // setTimeout(function(){
  //   canvas.setAttribute('class','rotate-bw');
  // },4000);
}
Game.prototype.crazyMovement = function () {
  setTimeout(this.setInRotation,5000);
}