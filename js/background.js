function Background(ctx,canvas){
  this.canvasWidth = canvas.width;
  this.ctx = ctx;
  this.bgImage = new Image();
  this.bgImage.src = "./images/background-blue.png";
  this.speed = 2;
  this.y = 0;
  this.x = 0;
}

Background.prototype._draw = function () {
  this.x -= this.speed;
  console.log(this.canvasWidth);
  this.ctx.drawImage(this.bgImage, this.x, this.y);
  this.ctx.drawImage(this.bgImage, this.x+this.canvasWidth-3, this.y);

  if (this.x <= -this.canvasWidth){
    this.x = 0;
  }
}

Background.prototype._move = function () {

}