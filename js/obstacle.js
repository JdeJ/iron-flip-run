function Obstacle(canvas,ctx,obstaclePositionY){
  this.canvas = canvas;
  this.ctx = ctx;
  this.positionY = obstaclePositionY;
  this.positionX = 850;
  this.speed = 11;
}

Obstacle.prototype.draw = function (obstacle) {
  this.ctx.fillStyle = "#000";
    if(obstacle.positionY === "over"){
      this.ctx.fillRect(obstacle.positionX,this.canvas.height/2-45,30,30);
    }
    else{
      this.ctx.fillRect(obstacle.positionX,this.canvas.height/2+15,30,30);
    }
}