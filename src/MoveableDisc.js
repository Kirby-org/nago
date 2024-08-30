var Disc = require("./Disc");

function MoveableDisc(param) { // ca
  Disc.apply(this, [param]);
}
MoveableDisc.prototype = {
  applyForce: function(force, xc, yc){ // xc: dist_x/dist, yc: dist_y/dist
    var { speed, invMass } = this;
    speed.x += force*xc*invMass;
    speed.y += force*yc*invMass;
  },
  addVelocity: function(xc, yc){ // xc: dist_x/dist, yc: dist_y/dist
    var { speed } = this;
    speed.x += xc;
    speed.y += yc;
  },
  isMoving: function(){
    var { x, y } = this.speed;
    return x*x+y*y>0;
  }
};

module.exports = MoveableDisc;