  
const shortid = require('shortid');
const ObjectClass = require('./object');
const Constants = require('./constants');


class Bomb extends ObjectClass {
    constructor(x, y) { //Removed Parent Id
        super(shortid(), x, y);
        //this.parentID = parentID;
        this.time = 0;
    }

    //Return true if bomb should explode
    update(dt) {
        this.time += dt;
        if(this.time > Constants.BOMB_FUSE_TIME) {
            return true;
        }
    }

    serializeForUpdate() {
        return {
          ...(super.serializeForUpdate()),
          time:this.time
        };
      }
}

module.exports = Bomb;