function Player(canvas,ctx){
  this.canvas = canvas;
  this.ctx = ctx;
  this.color = "#fff";
  this.playerPositionY = "over";
  this.playerPositionX = 200;
}

Player.prototype.flip = function () {
  if(this.playerPositionY === "over"){
    this.playerPositionY = "under";
  }
  else{
    this.playerPositionY = "over";
  }
}

Player.prototype._drawPlayer = function () {
  this.ctx.fillStyle = this.color;
  if(this.playerPositionY === "over"){
    this.ctx.fillRect(this.playerPositionX,this.canvas.height/7*2+15,40,40);
  }
  else{
    this.ctx.fillRect(this.playerPositionX,this.canvas.height/7*4-5,40,40);
  }
}