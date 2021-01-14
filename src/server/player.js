const ObjectClass = require('./object');
const Constants = require('./constants');

class Player extends ObjectClass {
  constructor(id, username, x, y) {
    super(id, x, y);
    this.username = username;
    //this.score = 0;
    this.direction = 'down';
    this.idle = true;
    this.speed = Constants.PLAYER_SPEED;
    console.log("Player was created at " + x + " " + y);
    console.log(this.toString());
  }

  setDirection(dir) {
    this.direction = dir;
  }

  setIdle(idle) {
    
    this.idle = idle;
  }
 
  update(dt) {
    //super.update(dt);
    //console.log(this.toString());
    //console.log("Player was updated from " + this.getX() + " " + this.getY());
    // Update score
    //this.score += dt * Constants.SCORE_PER_SECOND;

    if(!this.idle) {
      if(this.direction == 'down') {
        this.setY(this.getY() + dt * this.speed);
      }
      else if (this.direction == 'up') {
        this.setY(this.getY() - dt * this.speed);
      }
      else if (this.direction == 'right') {
        this.setX(this.getX() + dt * this.speed);
      }
      else if (this.direction == 'left') {
        this.setX(this.getX() - dt * this.speed);
      }
      else {
        console.log('Error, direction is unknown value of ' + this.direction);
      }
      
    }



    // Make sure the player stays in bounds
    this.x = Math.max(0, Math.min(Constants.MAP_SIZE, this.x));
    this.y = Math.max(0, Math.min(Constants.MAP_SIZE, this.y));

    //console.log("Player was updated to " + this.getX() + " " + this.getY());
    return null;
  }


  serializeForUpdate() {
    return {
      ...(super.serializeForUpdate()),
      // x: this.x,
      // y: this.y,
    };
  }

  toString() {
    return super.toString();
  }
}

module.exports = Player;