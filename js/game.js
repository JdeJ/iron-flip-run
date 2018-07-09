function Game(options){
  this.canvas = options.canvas;
  this.rows = options.rows;
  this.columns = options.columns;
  this.ctx = options.ctx;
  this.bgColor = options.bgColor;
  this.margin = 100;
  this.player = options.player;
}

Game.prototype.drawBackground = function () {
  //Draw background color
  for (var columnIndex = 0; columnIndex < this.columns; columnIndex++) {
    for (var rowIndex = 0; rowIndex < this.rows; rowIndex++) {
      this.ctx.fillStyle = this.bgColor;
      this.ctx.fillRect(columnIndex * 10, rowIndex * 10, 10, 10);
    }
  }
  //Draw fixed game line color
  for(var posX = 0; posX < this.canvas.width; posX+=50){
    this.ctx.fillStyle = "#000";
    this.ctx.fillRect(posX,this.canvas.height/2-25,50,50);
  }
}
Game.prototype.drawPlayer = function () {
  this.ctx.fillStyle = this.player.color;
  this.ctx.fillRect(200,this.canvas.height/7*2,50,50);
}
Game.prototype.init = function () {
  console.log(this.canvas.width);
  this.drawBackground();
  this.drawPlayer();
}