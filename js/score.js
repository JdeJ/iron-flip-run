function Score(){
  this.score = 0;
  this.scoreSpan = document.querySelector('.score');
  this.highScoreSpan = document.querySelector('.high-score');
  this.playerScore = JSON.parse(localStorage.getItem("playerScore") || "[]");
  this.playerInitials = "Ironhacker";
}

Score.prototype._run = function () {
  this.score++;
  this.scoreSpan.innerHTML = this.score;
}

Score.prototype._saveScore = function (score) {
  if(!localStorage.getItem('highestScore')){
    localStorage.setItem('highestScore',score);
  }

  if(localStorage.getItem('highestScore')){
      if(score > localStorage.getItem('highestScore')){
        localStorage.setItem('highestScore',score);
      }
    }
    this.playerScore.push({name: this.playerInitials, score: score});
    localStorage.setItem("playerScore", JSON.stringify(this.playerScore));
}