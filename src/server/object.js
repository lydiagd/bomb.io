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

  distanceTo(object) {
    const dx = this.x - object.x;
    const dy = this.y - object.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  setX(xVal) {
    this.x = xVal;
  }

  setY(yVal) {
  this.y = yVal;
  }


  serializeForUpdate() {
    return {
      id: this.id,
      x: this.x,
      y: this.y,
    };
  }
}

module.exports = Object;