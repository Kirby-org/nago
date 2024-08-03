function DistanceConstraint(param) { // nb
  var {strength=Infinity, maxLength=100, minLength=100, d1=0, d0=0} = (param||{});
  this.strength = strength; // ne
  this.maxLength = maxLength; // ec
  this.minLength = minLength; // Hb
  this.d1 = d1; // Zd
  this.d0 = d0; // Yd
}
/*
DistanceConstraint.prototype = {
  advance: function(a) { // C
    var b = a[this.d0];
    a = a[this.d1];
    if (!a || !b)
      return;
    var c = b.pos, d = a.pos, e = c.x-d.x, c = c.y-d.y, f = Math.sqrt(e*e+c*c);
    if (f <= 0)
      return;
    e /= f;
    c /= f;
    d = b.invMass/(b.invMass+a.invMass);
    if (isNaN(d)) // (d!=d)
      d = 0.5;
    var g, k;
    if (this.minLength>=this.maxLength) {
      g = this.minLength;
      k = 0;
    }
    else if (f<=this.minLength) {
      g = this.minLength;
      k = 1;
    }
    else if (f>=this.maxLength) {
      g = this.maxLength;
      k = -1;
    }
    else
      return;
    f = g-f;
    if (0 == 0*this.strength){ // !isInfinity(this.strength) && !isNaN(this.strength)
      d = this.strength*f*0.5;
      e *= d;
      c *= d;
      k = d = b.speed;
      b = b.invMass;
      d.x = k.x+e*b;
      d.y = k.y+c*b;
      d = b = a.speed;
      a = a.invMass;
      b.x = d.x-e*a;
      b.y = d.y-c*a;
    }
    else {
      g = f*d;
      var l = b.pos, h = b.pos;
      l.x = h.x+e*g*0.5;
      l.y = h.y+c*g*0.5;
      h = l = a.pos;
      f -= g;
      l.x = h.x-e*f*0.5;
      l.y = h.y-c*f*0.5;
      f = b.speed;
      g = a.speed;
      f = e*(f.x-g.x)+c*(f.y-g.y);
      if (f*k<=0){
        d *= f;
        b = k = b.speed;
        k.x = b.x-e*d;
        k.y = b.y-c*d;
        a = b = a.speed;
        d = f-d;
        b.x = a.x+e*d;
        b.y = a.y+c*d;
      }
    }
  }
}
*/

module.exports = DistanceConstraint;