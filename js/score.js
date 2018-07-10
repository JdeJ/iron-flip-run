function Score(){
  this.score = 0;
  this.scoreSpan = document.querySelector('.score');
}

Score.prototype._run = function () {
  this.score++;
  this.scoreSpan.innerHTML = this.score;
}