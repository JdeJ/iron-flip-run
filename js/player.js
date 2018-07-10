function Player(canvas,ctx){
  this.canvas = canvas;
  this.ctx = ctx;
  this.color = "#fff";
  this.playerPositionY = "over";
  this.playerPositionX = 200;
  this.alpha = 1;
  this.intervalFade = undefined;
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

Player.prototype.playerDivide = function (alpha) {

  this.ctx.globalAlpha = alpha;
  this.ctx.fillStyle = this.color;


  if(this.playerPositionY === "over"){
    this.ctx.fillRect(this.playerPositionX,this.canvas.height/7*2+15,19,19);
    this.ctx.fillRect(this.playerPositionX+21,this.canvas.height/7*2+15,19,19);
    this.ctx.fillRect(this.playerPositionX,this.canvas.height/7*2+15+21,19,19);
    this.ctx.fillRect(this.playerPositionX+21,this.canvas.height/7*2+15+21,19,19);
  }
  else{
    this.ctx.fillRect(this.playerPositionX,this.canvas.height/7*4-5,19,19);
    this.ctx.fillRect(this.playerPositionX+21,this.canvas.height/7*4-5,19,19);
    this.ctx.fillRect(this.playerPositionX,this.canvas.height/7*4-5+21,19,19);
    this.ctx.fillRect(this.playerPositionX+21,this.canvas.height/7*4-5+21,19,19);
  }
}