var Point = require("./Point");

function FiniteLinearSensor(param) { // sb
  var {p0x=0, p0y=0, p1x=0, p1y=0} = (param||{});
  this.p1 = new Point(p1x, p1y); // ca
  this.p0 = new Point(p0x, p0y); // W
}
FiniteLinearSensor.prototype = {
  advance: function(oldPos, newPos) { // C
    var f = this.p0, g = this.p1, k = newPos.x-oldPos.x, l = newPos.y-oldPos.y;
    if (((l*(f.x-oldPos.x)-k*(f.y-oldPos.y))>0 == (l*(g.x-oldPos.x)-k*(g.y-oldPos.y)>0)))
      return false;
    k = g.x-f.x;
    g = g.y-f.y;
    return (g*(oldPos.x-f.x)-k*(oldPos.y-f.y)>0) != (g*(newPos.x-f.x)-k*(newPos.y-f.y)>0);
  }
}

module.exports = FiniteLinearSensor;