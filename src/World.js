function World() { // Fa
  this.moveableCircularObjects=[]; // F
  this.dotObjects=[]; // J
  this.infiniteLinearObjects=[]; // qa
  this.finiteArcObjects=[]; // U
  this.distanceConstraints=[]; // pb
  this.finiteLinearSensors=[]; // tc
}
World.prototype = {
  advance: function(time, callbacks) { // C
    for (var b = 0, c = this.moveableCircularObjects; b<c.length; b++) {
      var d = c[b], e = d.pos, f = d.pos, g = d.speed;
      e.x = f.x+time*g.x;
      e.y = f.y+time*g.y;
      f = e = d.speed;
      g = d.gravity;
      d = d.damping;
      e.x = d*(f.x+g.x);
      e.y = d*(f.y+g.y);
    }
    for (var a = 0, b = this.moveableCircularObjects.length; a<b; a++) {
      c = this.moveableCircularObjects[a];
      for (d = a+1; d<b; d++){
        f = this.moveableCircularObjects[d];
        if (!(f.cMask&c.cGroup) || !(f.cGroup&c.cMask))
          continue;
        // ----- c.Pn(a, d, f, callbacks); -----
        var t = c.pos, z = f.pos, x = t.x-z.x, t = t.y-z.y, e = f.radius+c.radius, y = x*x+t*t;
        if (!(y>0 && y<=e*e))
          continue;
        var oldA = f; // oldA
        var y = Math.sqrt(y), x = x/y, t = t/y, z = c.invMass/(c.invMass+f.invMass), e = e-y, y = e*z, g = c.pos, k = c.pos;
        g.x = k.x+x*y;
        g.y = k.y+t*y;
        k = g = f.pos;
        e -= y;
        g.x = k.x-x*e;
        g.y = k.y-t*e;
        e = c.speed;
        y = f.speed;
        e = x*(e.x-y.x)+t*(e.y-y.y);
        if (!(e < 0))
          continue;
        e *= c.bCoef*f.bCoef+1;
        z *= e;
        g = y = c.speed;
        y.x = g.x-x*z;
        y.y = g.y-t*z;
        f = y = f.speed;
        z = e-z;
        y.x = f.x+x*z;
        y.y = f.y+t*z;
        callbacks?._CDD_ && callbacks?._CDD_(a, c.playerId, d, oldA.playerId);
        // ----- -----
      }
      if (c.invMass==0)
        continue;
      for (d = 0, e = this.infiniteLinearObjects; d<e.length; d++){
        f = e[d];
        if (!(f.cMask&c.cGroup) || !(f.cGroup&c.cMask))
          continue;
        var g = f.normal, k = c.pos, g = f.dist-(g.x*k.x+g.y*k.y)+c.radius; // error??? it looks like it should be c.radius*c.radius at a minimum.
        if (!(g>0))
          continue;
        var l = k = c.pos, h = f.normal;
        k.x = l.x+g*h.x;
        k.y = l.y+g*h.y;
        g = c.speed;
        k = f.normal;
        g = g.x*k.x+g.y*k.y;
        if (!(g<0))
          continue;
        g *= c.bCoef*f.bCoef+1;
        l = k = c.speed;
        f = f.normal;
        k.x = l.x-g*f.x;
        k.y = l.y-g*f.y;
        callbacks?._CDP_ && callbacks?._CDP_(a, c.playerId, d); // discId, discPlayerId, planeId
      }
      for (d = 0, e = this.finiteArcObjects; d<e.length; d++){
        f = e[d];
        if (!(f.cMask & c.cGroup) || !(f.cGroup & c.cMask))
          continue;
        // ----- c.Qn(f, a, d, callbacks); -----
        var s, y, z;
        if (0*f.curveF!=0) {
          s = f.p0.pos;
          var t = f.p1.pos;
          y = t.x-s.x;
          var x = t.y-s.y, g = c.pos;
          z = g.x-t.x;
          t = g.y-t.y;
          g = c.pos;
          if (y*(g.x-s.x)+x*(g.y-s.y)<=0 || z*y+t*x>=0)
            continue;
          y = f.normal;
          s = y.x;
          y = y.y;
          z = s*z+y*t;
        }
        else {
          y = f.arcCenter;
          z = c.pos;
          s = z.x-y.x;
          y = z.y-y.y;
          z = f.p0NormalDir;
          t = f.p1NormalDir;
          if ((s*z.x+y*z.y>0 && s*t.x+y*t.y>0) == f.curveF<=0)
            continue;
          t = Math.sqrt(s*s+y*y);
          if (t==0)
            continue;
          z = t-f.arcRadius;
          s /= t;
          y /= t;
        }
        t = f.bias;
        if (t==0){
          if (z<0){
            z = -z;
            s = -s;
            y = -y;
          }
        }
        else if (t<0){
          t = -t;
          z = -z;
          s = -s;
          y = -y;
          if (z<-t)
            continue;
        }
        if (c.radius<=z)
          continue;
        z = c.radius-z;
        x = t = c.pos;
        t.x = x.x+s*z;
        t.y = x.y+y*z;
        z = c.speed;
        z = s*z.x+y*z.y;
        if (z<0){
          z *= c.bCoef*f.bCoef+1;
          t = f = c.speed;
          f.x = t.x-s*z;
          f.y = t.y-y*z;
          callbacks?._CDS_ && callbacks?._CDS_(a, c.playerId, d); // discId, discPlayerId, segmentId (FIX)
        }
        // ----- -----
      }
      for (d = 0, e = this.dotObjects; d<e.length; d++){
        f = e[d];
        if (!(f.cMask & c.cGroup) || !(f.cGroup & c.cMask))
          continue;
        k = c.pos;
        l = f.pos;
        g = k.x-l.x;
        k = k.y-l.y;
        l = g*g+k*k;
        if (!(l>0 && l<=c.radius*c.radius))
          continue;
        var l = Math.sqrt(l), g = g/l, k = k/l, l = c.radius-l, m = (h = c.pos);
        h.x = m.x+g*l;
        h.y = m.y+k*l;
        l = c.speed;
        l = g*l.x+k*l.y;
        if (!(l<0)){
          callbacks?._CDV_ && callbacks?._CDV_(a, c.playerId, d, false); // discId, discPlayerId, vertexId, modifiedSpeed (FIX)
          continue;
        }
        l *= c.bCoef*f.bCoef+1;
        h = f = c.speed;
        f.x = h.x-g*l;
        f.y = h.y-k*l;
        callbacks?._CDV_ && callbacks?._CDV_(a, c.playerId, d, true); // discId, discPlayerId, vertexId, modifiedSpeed (FIX)
      }
    }
    for (a = 0; a<2; a++)
      for (b = 0, c = this.distanceConstraints; b<c.length; b++){
        // ----- c[b].advance(this.moveableCircularObjects); -----
        var t = c[b], x = this.moveableCircularObjects, y = x[t.d0];
        x = x[t.d1];
        if (!x || !y)
          continue;
        var z = y.pos, d = x.pos, e = z.x-d.x, z = z.y-d.y, f = Math.sqrt(e*e+z*z);
        if (f <= 0)
          continue;
        e /= f; // cos
        z /= f; // sin
        d = y.invMass/(y.invMass+x.invMass);
        if (isNaN(d)) // (d!=d)
          d = 0.5;
        var g, k;
        if (t.minLength>=t.maxLength) {
          g = t.minLength;
          k = 0;
        }
        else if (f<=t.minLength) {
          g = t.minLength;
          k = 1;
        }
        else if (f>=t.maxLength) {
          g = t.maxLength;
          k = -1;
        }
        else
          continue;
        f = g-f;
        if (0 == 0*t.strength){ // !isInfinity(t.strength) && !isNaN(t.strength)
          d = t.strength*f*0.5;
          e *= d;
          z *= d;
          k = d = y.speed;
          y = y.invMass;
          d.x = k.x+e*y;
          d.y = k.y+z*y;
          d = y = x.speed;
          x = x.invMass;
          y.x = d.x-e*x;
          y.y = d.y-z*x;
          callbacks?._MJ_ && callbacks?._MJ_(b, false, true); // jointId, modifiedPosition, modifiedSpeed
        }
        else {
          g = f*d;
          var l = y.pos, h = y.pos;
          l.x = h.x+e*g*0.5;
          l.y = h.y+z*g*0.5;
          h = l = x.pos;
          f -= g;
          l.x = h.x-e*f*0.5;
          l.y = h.y-z*f*0.5;
          f = y.speed;
          g = x.speed;
          f = e*(f.x-g.x)+z*(f.y-g.y);
          var sc = f*k<=0;
          if (sc){
            d *= f;
            y = k = y.speed;
            k.x = y.x-e*d;
            k.y = y.y-z*d;
            x = y = x.speed;
            d = f-d;
            y.x = x.x+e*d;
            y.y = x.y+z*d;
          }
          callbacks?._MJ_ && callbacks?._MJ_(b, true, sc); // jointId, modifiedPosition, modifiedSpeed
        }
        // ----- -----
      }
  },
  addMoveableCircularObject: function(obj) {
    this.moveableCircularObjects.push(obj);
  },
  removeMoveableCircularObject: function(obj) {
    var idx = this.moveableCircularObjects.indexOf(obj);
    if (idx<0)
      return;
    this.moveableCircularObjects.splice(idx, 1);
  }
}

module.exports = World;