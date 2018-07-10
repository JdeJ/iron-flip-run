function Score(){
  this.score = 0;
}

Score.prototype._run = function () {
  this.score++;
}