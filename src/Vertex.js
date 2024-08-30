var Point = require("./Point");

function Vertex(param) { // B
  var {cGroup=32, cMask=63, bCoef=1, xpos=0, ypos=0} = (param||{});
  this.cGroup = cGroup; // v
  this.cMask = cMask; // h
  this.bCoef = bCoef; // m
  this.pos = new Point(xpos, ypos); // a
}

module.exports = Vertex;