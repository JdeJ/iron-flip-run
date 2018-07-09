function Game(options){
  this.canvas = options.canvas;
  this.rows = options.rows;
  this.columns = options.columns;
  this.ctx = options.ctx;
  this.bgColor = options.bgColor;
  this.margin = 65;
  this.player = new Player();
  this.obstaclesArr = [];
  this.obstacleInterval = undefined;
  this.obstacle = options.obstacle;
  this.init();
}

Game.prototype._drawBackground = function () {
  //Draw background color
  for (var columnIndex = 0; columnIndex < this.columns; columnIndex++) {
    for (var rowIndex = 0; rowIndex < this.rows; rowIndex++) {
      this.ctx.fillStyle = this.bgColor;
      this.ctx.fillRect(columnIndex * 10, rowIndex * 10, 10, 10);
    }
  }
  //Draw fixed game line color
  for(var posX = 0; posX < this.canvas.width; posX+=40){
    this.ctx.fillStyle = "#000";
    this.ctx.fillRect(posX,this.canvas.height/2-20,40,40);
  }
}

Game.prototype._drawPlayer = function () {
  this.ctx.fillStyle = this.player.color;
  if(this.player.playerPosition === "over"){
    this.ctx.fillRect(200,this.canvas.height/7*2+15,40,40);
  }
  else{
    this.ctx.fillRect(200,this.canvas.height/7*4-5,40,40);
  }
}

Game.prototype._controlFlip = function () {
  document.onkeydown = function(){
    this.player.flip();
  }.bind(this);
}

Game.prototype._drawObstacles = function () {
  this.obstaclesArr.forEach(function(obstacle){
    this.ctx.fillStyle = "#000";
    if(obstacle.positionY === "over"){
      this.ctx.fillRect(obstacle.positionX,this.canvas.height/7*2+15,40,40);
    }
    else{
      this.ctx.fillRect(obstacle.positionX,this.canvas.height/7*4-5,40,40);
    }
  }.bind(this));
}
Game.prototype._moveObstacles = function () {
  this.obstaclesArr.forEach(function(obstacle){
    obstacle.positionX-=obstacle.speed;
  });
}
Game.prototype.createObstaclesInterval = function () {
    this.obstacleInterval = setInterval(this.createObstacle.bind(this),1000);
}

Game.prototype.createObstacle = function () {
  this.obstaclesArr.push(new Obstacle());
}

Game.prototype.removeObstacle = function () {
  this.obstaclesArr.forEach(function(obstacle){
    if(obstacle.positionX < 0){
      this.obstaclesArr.shift();
    }
  }.bind(this));
    
}

Game.prototype._doFrame = function () {
  this._drawBackground();
  this._drawPlayer();
  this._moveObstacles();
  this._drawObstacles();
  this.removeObstacle();
  this._controlFlip();

  this.intervalGame = window.requestAnimationFrame(this._doFrame.bind(this));
}

Game.prototype.init = function () {
  this.createObstaclesInterval();
  
  this.intervalGame = window.requestAnimationFrame(this._doFrame.bind(this));

}