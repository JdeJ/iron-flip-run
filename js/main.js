var body = document.getElementsByTagName('body')[0];

function createStartScreen(){
  var startSection = document.createElement('section');
  startSection.setAttribute('id','game-wrapper-start');
  startSection.innerHTML = `<div class="container">
  <div class="start-screen-wrapper">
    <div class="content-wrapper">
        <h1>Iron Flip Run</h1>
        <a href="#" class="play-btn">Play</a>
    </div>
  </div>
</div>`;
      
  body.prepend(startSection);
}

createStartScreen();
