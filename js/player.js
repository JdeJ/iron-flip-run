function Player(canvas,ctx){
  this.canvas = canvas;
  this.ctx = ctx;
  this.color = "#fff";
  this.playerPositionY = "over";
  this.playerPositionX = 200;
  this.alpha = 1;
  this.intervalFade = undefined;
  this.score = new Score();
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
    this.ctx.fillRect(this.playerPositionX,this.canvas.height/2-45,30,30);
    this.ctx.fillStyle = '#fff';

    //this.ctx.fillRect(200,100,30,30);
    
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(this.playerPositionX,this.canvas.height/2-35,2,1);
    this.ctx.fillRect(this.playerPositionX+28,this.canvas.height/2-35,2,1)
    this.ctx.rect(this.playerPositionX+16,this.canvas.height/2-39,2,2);
    
    this.ctx.fillRect(this.playerPositionX+1,this.canvas.height/2-39,13,13);
    this.ctx.fillRect(this.playerPositionX+16,this.canvas.height/2-39,13,13);
    
    ctx.beginPath();
    this.ctx.strokeStyle = "#000";
    this.ctx.rect(this.playerPositionX+1,this.canvas.height/2-39,13,13);
    this.ctx.rect(this.playerPositionX+16,this.canvas.height/2-39,13,13)
    ctx.stroke();
  
    this.ctx.fillStyle = '#fff';
    this.ctx.fillRect(this.playerPositionX+2,this.canvas.height/2-38,11,11);
    this.ctx.fillRect(this.playerPositionX+17,this.canvas.height/2-38,11,11)
    this.ctx.fillStyle = "#000";
    this.ctx.fillRect(this.playerPositionX+6,this.canvas.height/2-34,3,3);
    this.ctx.fillRect(this.playerPositionX+21,this.canvas.height/2-34,3,3);
  }
  else{
    this.ctx.fillRect(this.playerPositionX,this.canvas.height/2+15,30,30);
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(this.playerPositionX,this.canvas.height/2+35,2,1);
    this.ctx.fillRect(this.playerPositionX+28,this.canvas.height/2+35,2,1)
    this.ctx.rect(this.playerPositionX+16,this.canvas.height/2+39,2,2);
    
    this.ctx.fillRect(this.playerPositionX+1,this.canvas.height/2+29,13,13);
    this.ctx.fillRect(this.playerPositionX+16,this.canvas.height/2+29,13,13);
    
    this.ctx.fillStyle = '#fff';
    this.ctx.fillRect(this.playerPositionX+2,this.canvas.height/2+30,11,11);
    this.ctx.fillRect(this.playerPositionX+17,this.canvas.height/2+30,11,11);

    ctx.beginPath();
    this.ctx.strokeStyle = "#000";
    this.ctx.rect(this.playerPositionX+1,this.canvas.height/2+29,13,13);
    this.ctx.rect(this.playerPositionX+16,this.canvas.height/2+29,13,13)
    ctx.stroke();

      
    this.ctx.fillStyle = "#000";
    this.ctx.fillRect(this.playerPositionX+6,this.canvas.height/2+34,3,3);
    this.ctx.fillRect(this.playerPositionX+21,this.canvas.height/2+34,3,3);
  }
}

Player.prototype.playerDivide = function (alpha) {

  this.ctx.globalAlpha = alpha;
  this.ctx.fillStyle = this.color;

  if(this.playerPositionY === "over"){
    this.ctx.fillRect(this.playerPositionX,this.this.canvas.height/2-45,14,14);
    this.ctx.fillRect(this.playerPositionX+21,this.canvas.height/7*2+15,19,19);
    this.ctx.fillRect(this.playerPositionX,this.canvas.height/7*2+15+21,19,19);
    this.ctx.fillRect(this.playerPositionX+21,this.canvas.height/7*2+15+21,19,19);
    this.ctx.fillRect(this.playerPositionX,this.canvas.height/2-45,30,30);

  }
  else{
    this.ctx.fillRect(this.playerPositionX,this.canvas.height/7*4-5,19,19);
    this.ctx.fillRect(this.playerPositionX+21,this.canvas.height/7*4-5,19,19);
    this.ctx.fillRect(this.playerPositionX,this.canvas.height/7*4-5+21,19,19);
    this.ctx.fillRect(this.playerPositionX+21,this.canvas.height/7*4-5+21,19,19);
  }
}

Player.prototype._destroyPlayer = function(){
  if(this.player.alpha <= 0){
    console.log('fade');
    clearInterval(this.intervalFade);
  }
  else{
    this.player.alpha -= 0.09;
    this._drawBackground();
    this._drawObstacles();
    this.player.playerDivide(this.player.alpha);
    this.player.intervalFade = window.requestAnimationFrame(this._destroyPlayer.bind(this));
  }
}