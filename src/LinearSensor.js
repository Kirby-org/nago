var Point = require("./Point");

function LinearSensor(param) { // sb
  var {p0x=0, p0y=0, p1x=0, p1y=0} = (param||{});
  this.p1 = new Point(p1x, p1y); // ca
  this.p0 = new Point(p0x, p0y); // W
}
LinearSensor.prototype = {
  check: function({x:x1, y:y1}, {x:x2, y:y2}) { // C
    var { p0: {x: p0x, y: p0y}, p1: {x: p1x, y: p1y} } = this;
    var dx = x2-x1, dy = y2-y1;
    if ((dy*(p0x-x1)-dx*(p0y-y1)>0)==(dy*(p1x-x1)-dx*(p1y-y1)>0))
      return false;
    dx = p1x-p0x;
    dy = p1y-p0y;
    return (dy*(x1-p0x)-dx*(y1-p0y)>0)!=(dy*(x2-p0x)-dx*(y2-p0y)>0);
  }
};

module.exports = LinearSensor;