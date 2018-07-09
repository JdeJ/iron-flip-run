function Player(){
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