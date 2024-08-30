function World(){ // Fa
  this.discs = []; // F
  this.vertices = []; // J
  this.planes = []; // qa
  this.segments = []; // U
  this.joints = []; // pb
}
World.prototype = {
  advance: function(time, callbacks){ // C
    var d,e,f,g,k,l;
    var { discs, planes, segments, vertices, joints } = this;
    discs.forEach(({pos, speed, gravity, damping})=>{
      var { x, y } = speed;
      pos.x += time*x;
      pos.y += time*y;
      speed.x = damping*(x+gravity.x);
      speed.y = damping*(y+gravity.y);
    });
    discs.forEach((c, a)=>{
      var {bCoef, radius, cMask, cGroup, invMass, pos, speed} = c;
      for (d = a+1; d<discs.length; d++){
        f = discs[d];
        if ((f.cMask&cGroup)==0 || (f.cGroup&cMask)==0)
          continue;
        var {pos: pos2, speed: speed2} = f;
        var dd = pos.x-pos2.x;
        var b = pos.y-pos2.y;
        var ff = dd*dd+b*b, e = f.radius+radius;
        if (!(ff>0 && ff<=e*e))
          continue;
        ff = Math.sqrt(ff);
        dd = dd/ff;
        b = b/ff;
        var cc = invMass/(invMass+f.invMass);
        e = e-ff;
        ff = e*cc;
        pos.x += dd*ff;
        pos.y += b*ff;
        e -= ff;
        pos2.x -= dd*e;
        pos2.y -= b*e;
        e = dd*(speed.x-speed2.x)+b*(speed.y-speed2.y);
        if (!(e<0))
          continue;
        e *= bCoef*f.bCoef+1;
        cc *= e;
        speed.x -= dd*cc;
        speed.y -= b*cc;
        cc = e-cc;
        speed2.x += dd*cc;
        speed2.y += b*cc;
        callbacks?.onCollisionDvD?.(a, c, d, f);
      }
      if (invMass==0)
        return;
      planes.forEach((f, d)=>{
        if ((f.cMask&cGroup)==0 || (f.cGroup&cMask)==0)
          return;
        var { normal: {x, y} } = f;
        g = f.dist-(x*pos.x+y*pos.y)+radius;
        if (!(g>0))
          return;
        pos.x += x*g;
        pos.y += y*g;
        g = speed.x*x+speed.y*y;
        if (g<0){
          g *= bCoef*f.bCoef+1;
          speed.x -= g*x;
          speed.y -= g*y;
          callbacks?.onCollisionDvP?.(a, c, d); // discId, discPlayerId, planeId
        }
      });
      segments.forEach((f, d)=>{
        if ((f.cMask&cGroup)==0 || (f.cGroup&cMask)==0)
          return;
        var b, cc, dd;
        var {x, y} = pos;
        if (isFinite(f.curveF)){
          cc = f.arcCenter;
          b = x-cc.x;
          cc = y-cc.y;
          dd = f.v0Normal;
          e = f.v1Normal;
          if ((0<dd.x*b+dd.y*cc && 0<e.x*b+e.y*cc) == 0>=f.curveF)
            return;
          e = Math.sqrt(b*b+cc*cc);
          if (e==0)
            return;
          dd = e-f.arcRadius;
          b /= e;
          cc /= e;
        }
        else{
          var {x:x0, y:y0} = f.v0.pos;
          var {x:x1, y:y1} = f.v1.pos;
          cc = x1-x0;
          var ff = y1-y0;
          dd = x-x1;
          e = y-y1;
          if ((x-x0)*cc+(y-y0)*ff<=0 || dd*cc+e*ff>=0)
            return;
          cc = f.normal;
          b = cc.x;
          cc = cc.y;
          dd = b*dd+cc*e;
        }
        e = f.bias;
        if (e==0){
          if (dd<0){
            dd = -dd;
            b = -b;
            cc = -cc;
          }
        }
        else{
          if (e<0){
            e = -e;
            dd = -dd;
            b = -b;
            cc = -cc;
          }
          if (dd<-e)
            return;
        }
        if (dd >= radius)
          return;
        dd = radius-dd;
        pos.x += b*dd;
        pos.y += cc*dd;
        dd = b*speed.x+cc*speed.y;
        if (dd<0){
          dd *= bCoef*f.bCoef+1;
          speed.x -= b*dd;
          speed.y -= cc*dd;
          callbacks?.onCollisionDvS?.(a, c, d); // discId, discPlayerId, segmentId
        }
      });
      var sqrRadius = radius*radius;
      vertices.forEach((f, d)=>{
        if ((f.cMask&cGroup)==0 || (f.cGroup&cMask)==0)
          return;
        g = pos.x-f.pos.x;
        k = pos.y-f.pos.y;
        l = g*g+k*k;
        if (!(l>0 && l<=sqrRadius))
          return;
        l = Math.sqrt(l),
        g = g/l,
        k = k/l,
        l = radius-l,
        pos.x += g*l;
        pos.y += k*l;
        l = g*speed.x+k*speed.y;
        var less = l<0;
        if (less){
          l *= bCoef*f.bCoef+1;
          speed.x -= g*l;
          speed.y -= k*l;
        }
        callbacks?.onCollisionDvV?.(a, c, d, less); // discId, discPlayerId, vertexId, modifiedSpeed
      });
    });
    for (var mm=0; mm<2; mm++)
      joints.forEach(({d0, d1, strength, minLength, maxLength}, nn)=>{
        var b = discs[d0], zz = discs[d1];
        if (!b || !zz)
          return;
        var {pos: pos0, speed: speed0, invMass: invMass0} = b;
        var {pos: pos1, speed: speed1, invMass: invMass1} = zz;
        e = pos0.x-pos1.x;
        var _c = pos0.y-pos1.y;
        f = Math.sqrt(e*e+_c*_c);
        if (f<=0)
          return;
        e /= f;
        _c /= f;
        d = invMass0/(invMass0+invMass1);
        if (d != d)
          d = 0.5;
        if (minLength >= maxLength){
          g = minLength;
          k = 0;
        }
        else if (f <= minLength){
          g = minLength;
          k = 1;
        }
        else if (f >= maxLength){
          g = maxLength;
          k = -1;
        }
        else
          return;
        f = g - f;
        if (isFinite(strength)){
          d = strength*f*0.5;
          e *= d;
          _c *= d;
          speed0.x += e*invMass0;
          speed0.y += _c*invMass0;
          speed1.x -= e*invMass1;
          speed1.y -= _c*invMass1;
          callbacks?.onModifyJ?.(nn, false, true); // jointId, modifiedPosition, modifiedSpeed
        }
        else{
          g = f*d;
          pos0.x += e*g*0.5;
          pos0.y += _c*g*0.5;
          f -= g;
          pos1.x -= e*f*0.5;
          pos1.y -= _c*f*0.5;
          f = e*(speed0.x-speed1.x)+_c*(speed0.y-speed1.y);
          var t = (k*f<=0);
          if (t){
            d *= f;
            speed0.x -= e*d;
            speed0.y -= _c*d;
            d = f - d;
            speed1.x += e*d;
            speed1.y += _c*d;
          }
          callbacks?.onModifyJ?.(nn, true, t); // jointId, modifiedPosition, modifiedSpeed
        }
      });
  },
  addDisc: function(obj){
    this.discs.push(obj);
  },
  removeDisc: function(obj){
    var idx = this.discs.indexOf(obj);
    if (idx<0)
      return;
    this.discs.splice(idx, 1);
  }
};

module.exports = World;