# Iron flip run

The purpose of the game is to avoid obstacles and reach the highest possible score.

The game screen is a line with moving square obstacles.

The player is represented by a block that flips side of the game line every time a click event is detected.
The player can use any key to switch side.

The game is over when a collition is detected between the player and an obstacle.

Extra: As the game goes on, the screen changes colors and sometimes the whole canvas starts to rotate.

* * *

## MVP
### Technique
Html5 __Canvas__ and Vanilla __Javascript__

### Game states
* __Start Screen__

  * Title
  * Play button

* __Game Screen__

  * Canvas

* __Game Over Screen__

  * Play again button
  * Go to start screen button

### Game
* Create line
* Create player on line
* Move player
  * Click on any button to move player over or under the line.
* Create obstacles
* Check collision
* If collision -> Game Over -> Show Game Over Screen

* * *

## BACK LOG
### Score
* Run counter and store score on game over
### High score
* Create High Score Screen
* Show latest score on Start Screen
* Add high score button to Start Screen
### Music
* Add background music to game
* Add music on and off to Start screen to see latest highest score.
### Player colors
* Create Color Screen
  * Let user choose color of player with color buttons
* Add Choose color button to Start Screen
* Change color of player when playing

### Levels
* Check score and move to level

* * *

## Data structure

__main.js__

````
createStartScreen(id);
createGameScreen(id);
createGameOverScreen(id);

destroyStartScreen();
destroyGameScreen();
destroyGameOverScreen();

Game.init();

````
__Game.js__

````
function Game(options){};
Game.drawBoard();
Game.drawPlayer();
Game.generateObstacles();
Game.gameOver();
Game.init();

garbageCollector;
````

__Player.js__

````
function Player(){};
Player.move();
````


__Obstacle.js__

````
function Obstacle(){
  this.width;
  this.height;
};
moveForward();
````

## Links
[Iron flip run Trello Board](https://trello.com/b/jvP5IE61/iron-flip-run)
