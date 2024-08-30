var Point = require("./Point");

function Plane(param) { // L
  var {cGroup=32, cMask=63, bCoef=1, dist=0, xnormal=0, ynormal=0} = (param||{});
  this.cGroup = cGroup; // v
  this.cMask = cMask; // h
  this.bCoef = bCoef; // m
  this.dist = dist; // Ua
  this.normal = new Point(xnormal, ynormal); // wa
}

module.exports = Plane;