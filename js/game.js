function Game(options){
  this.canvas = options.canvas;
  this.rows = options.rows;
  this.columns = options.columns;
  this.ctx = options.ctx;
  this.bgColor = options.bgColor;
  this.margin = 65;
  this.player = new Player(this.canvas,this.ctx);
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
Game.prototype._moveObstacles = function () {
  this.obstaclesArr.forEach(function(obstacle){
    obstacle.positionX-=obstacle.speed;
  });
}
Game.prototype._createObstaclesInterval = function () {
    this.obstacleInterval = setInterval(this._createObstacle.bind(this),400);
}

Game.prototype._createObstacle = function () {
  this.obstaclesArr.push(new Obstacle(this.canvas,this.ctx));
}

Game.prototype._removeObstacle = function () {
  this.obstaclesArr.forEach(function(obstacle){
    if(obstacle.positionX < 0){
      this.obstaclesArr.shift();
    }
  }.bind(this));
    
}

Game.prototype._doFrame = function () {
  this._drawBackground();
  this.player._drawPlayer();
  this._moveObstacles();
  this._drawObstacles();
  this._removeObstacle();
  this._controlFlip();

  this.intervalGame = window.requestAnimationFrame(this._doFrame.bind(this));
}

Game.prototype.init = function () {
  this._createObstaclesInterval();  
  this.intervalGame = window.requestAnimationFrame(this._doFrame.bind(this));
}


// Game.prototype.setInRotation = function () {
//   canvas.setAttribute('class','rotate-crazy');
//   // setTimeout(function(){
//   //   canvas.setAttribute('class','rotate-bw');
//   // },4000);
//   setTimeout(function (){
//     canvas.setAttribute('class','');
//   },10000);
// }
// Game.prototype.crazyMovement = function () {
//   setTimeout(this.setInRotation,5000);
// }