function Obstacle(canvas,ctx){
  this.canvas = canvas;
  this.ctx = ctx;
  this.positionY = this.randomPosition();
  this.positionX = 700;
  this.intervalId = undefined;
  this.speed = 10;
}

Obstacle.prototype.randomPosition = function () {
  var positionOptions = ["over","under"];
  var randomNum = Math.floor(Math.random() * positionOptions.length);
  return positionOptions[randomNum];
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
// Obstacle.prototype.move = function () {
//   if(!this.intervalId){
//     this.intervalId = setInterval(this._moveObstacles.bind(this),100);
//   }
// }

// Obstacle.prototype.start = function () {
//   this.move();
// }