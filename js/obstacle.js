function Obstacle(canvas,ctx,obstaclePositionY){
  this.canvas = canvas;
  this.ctx = ctx;
  this.positionY = obstaclePositionY;
  this.positionX = 800;
  this.speed = 10;
}

Obstacle.prototype.draw = function (obstacle) {
  this.ctx.fillStyle = "#000";
    if(obstacle.positionY === "over"){
      this.ctx.fillRect(obstacle.positionX,this.canvas.height/7*2+15,40,40);
    }
    else{
      this.ctx.fillRect(obstacle.positionX,this.canvas.height/7*4-5,40,40);
    }
}