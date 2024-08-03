var Point = require("./Point");

function CircularObject(param) { // ua
  var {cGroup=63, cMask=63, damping=0.99, invMass=1, bCoef=0.5, radius=10, xgravity=0, ygravity=0, xspeed=0, yspeed=0, xpos=0, ypos=0} = (param||{});
  this.cGroup = cGroup; // v
  this.cMask = cMask; // h
  this.damping = damping; // Ca
  this.invMass = invMass; // aa
  this.bCoef = bCoef; // m
  this.radius = radius; // Z
  this.gravity = new Point(xgravity, ygravity); // oa
  this.speed = new Point(xspeed, yspeed); // D
  this.pos = new Point(xpos, ypos); // a
}

module.exports = CircularObject;