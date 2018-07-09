function Player(canvas,ctx){
  this.canvas = canvas;
  this.ctx = ctx;
  this.color = "#fff";
  this.playerPosition = "over";
}

Player.prototype.flip = function () {
  if(this.playerPosition === "over"){
    this.playerPosition = "under";
  }
  else{
    this.playerPosition = "over";
  }
}

Player.prototype._drawPlayer = function () {
  this.ctx.fillStyle = this.color;
  if(this.playerPosition === "over"){
    this.ctx.fillRect(200,this.canvas.height/7*2+15,40,40);
  }
  else{
    this.ctx.fillRect(200,this.canvas.height/7*4-5,40,40);
  }
}