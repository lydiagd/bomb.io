class Object {
  constructor(id, x, y, dir, speed) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.direction = dir;
    this.speed = speed;
  }

  // update(dt) {
  //   this.x += dt * this.speed * Math.sin(this.direction);
  //   this.y -= dt * this.speed * Math.cos(this.direction);
  // }

  update(obj) {
    this.x = obj.x;
    this.y = obj.y;
  }

  // distanceTo(object) {
  //   const dx = this.x - object.x;
  //   const dy = this.y - object.y;
  //   return Math.sqrt(dx * dx + dy * dy);
  // }

  setX(xVal) {
    //console.log("updated x by " + xVal);
    this.x += xVal;
  }

  setY(yVal) {
    //console.log("updated x by " + yVal);
    this.y += yVal;
  }


  serializeForUpdate() {
    //console.log("x:" + this.x + " y:" + this.y);
    return {
      id: this.id,
      x: this.x,
      y: this.y,
    };
  }
}

module.exports = Object;