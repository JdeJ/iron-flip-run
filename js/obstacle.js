function Obstacle(){
  this.positionY = this.randomPosition();
  this.positionX = 700;
  this.intervalId = undefined;
  this.speed = 5;
}

Obstacle.prototype.randomPosition = function () {
  var positionOptions = ["over","under"];
  var randomNum = Math.floor(Math.random() * positionOptions.length);
  return positionOptions[randomNum];
}

// Obstacle.prototype.move = function () {
//   if(!this.intervalId){
//     this.intervalId = setInterval(this._moveObstacles.bind(this),100);
//   }
// }

// Obstacle.prototype.start = function () {
//   this.move();
// }