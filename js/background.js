function Background(ctx){
  this.canvaWidth = 750;
  this.canvasHeight = 350;
  this.ctx = ctx;
  this.bgImage = new Image();
  this.bgImage.src = "file:///Users/AnnaF/Ironhack/proyects/iron-flip-run/images/background-game.jpg";
  this.speed = 2;
  this.y = 0;
  this.x = 50;
}

Background.prototype._draw = function () {
  this.x -= this.speed;
  console.log(this.x);
  this.ctx.drawImage(this.bgImage, this.x, this.y);
  this.ctx.drawImage(this.bgImage, this.x+1052, this.y);

  if (this.x <= -this.canvaWidth){
    this.x = 0;
  }
}

Background.prototype._move = function () {

}