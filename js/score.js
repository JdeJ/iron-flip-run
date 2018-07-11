function Score(){
  this.score = 0;
  this.scoreSpan = document.querySelector('.score');
  this.highScoreSpan = document.querySelector('.high-score');
  this.playerScore = JSON.parse(localStorage.getItem("playerScore") || "[]");
  this.playerInitials = undefined;
}

Score.prototype._run = function () {
  this.score++;
  this.scoreSpan.innerHTML = this.score;
}

Score.prototype._saveScore = function (score) {
    //var playerInitials = prompt('Give me some initials');
    this.playerScore.push({name: this.playerInitials, score: score});
    localStorage.setItem("playerScore", JSON.stringify(this.playerScore));
}