function Point(a, b) { // H
  this.x = a;
  this.y = b;
}
Point.prototype = {
  negate: function(){
    this.x = -this.x;
    this.y = -this.y;
  }
};

module.exports = Point;