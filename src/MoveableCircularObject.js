var CircularObject = require("./CircularObject");

function MoveableCircularObject(param) { // ca
  CircularObject.apply(this, [param]);
}
MoveableCircularObject.prototype = {
  /*
  Pn: function(id1, id2, a, callbacks) {
    var b = this.pos, c = a.pos, d = b.x-c.x, b = b.y-c.y, e = a.radius+this.radius, f = d*d+b*b;
    if (!(f>0 && f<=e*e))
      return;
    var oldA = a; // oldA
    var f = Math.sqrt(f), d = d/f, b = b/f, c = this.invMass/(this.invMass+a.invMass), e = e-f, f = e*c, g = this.pos, k = this.pos;
    g.x = k.x+d*f;
    g.y = k.y+b*f;
    k = g = a.pos;
    e -= f;
    g.x = k.x-d*e;
    g.y = k.y-b*e;
    e = this.speed;
    f = a.speed;
    e = d*(e.x-f.x)+b*(e.y-f.y);
    if (!(e < 0))
      return;
    e *= this.bCoef*a.bCoef+1;
    c *= e;
    g = f = this.speed;
    f.x = g.x-d*c;
    f.y = g.y-b*c;
    a = f = a.speed;
    c = e-c;
    f.x = a.x+d*c;
    f.y = a.y+b*c;
    callbacks._CDD_ && callbacks._CDD_(id1, this.playerId, id2, oldA.playerId);
  },
  Qn: function(a, id1, id2, callbacks) {
    var b, c, d;
    if (0*a.curveF!=0) {
      b = a.p0.pos;
      var e = a.p1.pos;
      c = e.x-b.x;
      var f = e.y-b.y, g = this.pos;
      d = g.x-e.x;
      e = g.y-e.y;
      g = this.pos;
      if (c*(g.x-b.x)+f*(g.y-b.y)<=0 || d*c+e*f>=0)
        return;
      c = a.normal;
      b = c.x;
      c = c.y;
      d = b*d+c*e;
    }
    else {
      c = a.arcCenter;
      d = this.pos;
      b = d.x-c.x;
      c = d.y-c.y;
      d = a.p0NormalDir;
      e = a.p1NormalDir;
      if ((b*d.x+c*d.y>0 && b*e.x+c*e.y>0) == a.curveF<=0)
        return;
      e = Math.sqrt(b*b+c*c);
      if (e==0)
        return;
      d = e-a.arcRadius;
      b /= e;
      c /= e;
    }
    e = a.bias;
    if (e==0){
      if (d<0){
        d = -d;
        b = -b;
        c = -c;
      }
    }
    else if (e<0){
      e = -e;
      d = -d;
      b = -b;
      c = -c;
      if (d<-e)
        return;
    }
    if (this.radius<=d)
      return;
    d = this.radius-d;
    f = e = this.pos;
    e.x = f.x+b*d;
    e.y = f.y+c*d;
    d = this.speed;
    d = b*d.x+c*d.y;
    if (d<0){
      d *= this.bCoef*a.bCoef+1;
      e = a = this.speed;
      a.x = e.x-b*d;
      a.y = e.y-c*d;
      callbacks._CDS_ && callbacks._CDS_(id1, this.playerId, id2); // discId, discPlayerId, segmentId (FIX)
    }
  },
  */
  addVelocity: function(xc, yc){ // xc: dist_x/dist, yc: dist_y/dist
    var h = this.speed;
    h.x += xc;
    h.y += yc;
  },
  applyForce: function(force, xc, yc){ // xc: dist_x/dist, yc: dist_y/dist
    var h = this.speed, l = this.invMass;
    h.x += force*xc*l;
    h.y += force*yc*l;
  },
  isMoving: function(){
    var h = this.speed;
    return h.x*h.x+h.y*h.y>0;
  }
};

module.exports = MoveableCircularObject;