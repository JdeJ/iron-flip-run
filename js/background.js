function Background(ctx,canvas){
  this.canvasWidth = canvas.width;
  this.ctx = ctx;
  this.bgImage = new Image();
  this.backgroundChoices = ["./images/background-blue.png","./images/background-green.png","./images/background-yellow.png","./images/background-orange.png","./images/background-fux.png","./images/background-red.png"];
  this.bgImage.src = this.getRandomImage();
  this.speed = 2;
  this.y = 0;
  this.x = 0;
}

Background.prototype._draw = function () {
  this.x -= this.speed;
  this.ctx.drawImage(this.bgImage, this.x, this.y);
  this.ctx.drawImage(this.bgImage, this.x+this.canvasWidth-3, this.y);

  if (this.x <= -this.canvasWidth){
    this.x = 0;
  }
}

Background.prototype.getRandomImage = function () {
  var randomNum = Math.floor(Math.random() * this.backgroundChoices.length);
  return this.backgroundChoices[randomNum];
}

