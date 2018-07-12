function Sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
}

Sound.prototype._play = function () {
  this.sound.play();
}

Sound.prototype._stop = function () {
  this.sound.pause();
}
