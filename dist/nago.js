var nago = (() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // src/Point.js
  var require_Point = __commonJS({
    "src/Point.js"(exports, module) {
      function Point(x, y) {
        this.x = x;
        this.y = y;
      }
      module.exports = Point;
    }
  });

  // src/DotObject.js
  var require_DotObject = __commonJS({
    "src/DotObject.js"(exports, module) {
      var Point = require_Point();
      function DotObject(param) {
        var { cGroup = 32, cMask = 63, bCoef = 1, xpos = 0, ypos = 0 } = param || {};
        this.cGroup = cGroup;
        this.cMask = cMask;
        this.bCoef = bCoef;
        this.pos = new Point(xpos, ypos);
      }
      module.exports = DotObject;
    }
  });

  // src/FiniteArcObject.js
  var require_FiniteArcObject = __commonJS({
    "src/FiniteArcObject.js"(exports, module) {
      var Point = require_Point();
      var minSegmentCurvature = 0.17435839227423353;
      var maxSegmentCurvature = 5.934119456780721;
      var degreeToRadians = 0.017453292519943295;
      var radiansToDegreeTimes2 = 114.59155902616465;
      function FiniteArcObject(param) {
        var { cGroup = 32, cMask = 63, bCoef = 1, bias = 0, p0 = null, p1 = null } = param || {};
        this.normal = null;
        this.p1NormalDir = null;
        this.p0NormalDir = null;
        this.arcRadius = 0;
        this.arcCenter = null;
        this.p0 = p0;
        this.p1 = p1;
        this.bias = bias;
        this.bCoef = bCoef;
        this.cMask = cMask;
        this.cGroup = cGroup;
        this.curveF = Infinity;
      }
      FiniteArcObject.prototype = {
        setCurveDegrees: function(curve) {
          curve *= degreeToRadians;
          if (curve < 0) {
            curve = -curve;
            var b = this.p0;
            this.p0 = this.p1;
            this.p1 = b;
            this.bias = -this.bias;
          }
          if (curve > minSegmentCurvature && curve < maxSegmentCurvature)
            this.curveF = 1 / Math.tan(curve / 2);
        },
        getCurveDegrees: function() {
          return 0 == 0 * this.curveF ? radiansToDegreeTimes2 * Math.atan(1 / this.curveF) : 0;
        },
        calculateNormals: function() {
          if (0 == 0 * this.curveF) {
            var a = this.p1.pos, b = this.p0.pos, c = 0.5 * (a.x - b.x), a = 0.5 * (a.y - b.y), b = this.p0.pos, d = this.curveF;
            this.arcCenter = new Point(b.x + c - a * d, b.y + a + c * d);
            a = this.p0.pos;
            b = this.arcCenter;
            c = a.x - b.x;
            a = a.y - b.y;
            this.arcRadius = Math.sqrt(c * c + a * a);
            this.p0NormalDir = new Point(-a, c);
            this.p1NormalDir = new Point(this.p1.pos.y - this.arcCenter.y, this.arcCenter.x - this.p1.pos.x);
            if (this.curveF <= 0) {
              a = c = this.p0NormalDir;
              c.x = -a.x;
              c.y = -a.y;
              a = c = this.p1NormalDir;
              c.x = -a.x;
              c.y = -a.y;
            }
          } else {
            a = this.p0.pos;
            b = this.p1.pos;
            c = a.x - b.x;
            a = b.y - a.y;
            b = Math.sqrt(a * a + c * c);
            this.normal = new Point(a / b, c / b);
          }
        }
      };
      module.exports = FiniteArcObject;
    }
  });

  // src/InfiniteLinearObject.js
  var require_InfiniteLinearObject = __commonJS({
    "src/InfiniteLinearObject.js"(exports, module) {
      var Point = require_Point();
      function InfiniteLinearObject(param) {
        var { cGroup = 32, cMask = 63, bCoef = 1, dist = 0, xnormal = 0, ynormal = 0 } = param || {};
        this.cGroup = cGroup;
        this.cMask = cMask;
        this.bCoef = bCoef;
        this.dist = dist;
        this.normal = new Point(xnormal, ynormal);
      }
      module.exports = InfiniteLinearObject;
    }
  });

  // src/FiniteLinearSensor.js
  var require_FiniteLinearSensor = __commonJS({
    "src/FiniteLinearSensor.js"(exports, module) {
      var Point = require_Point();
      function FiniteLinearSensor(param) {
        var { p0x = 0, p0y = 0, p1x = 0, p1y = 0 } = param || {};
        this.p1 = new Point(p1x, p1y);
        this.p0 = new Point(p0x, p0y);
      }
      FiniteLinearSensor.prototype = {
        advance: function(oldPos, newPos) {
          var f = this.p0, g = this.p1, k = newPos.x - oldPos.x, l = newPos.y - oldPos.y;
          if (l * (f.x - oldPos.x) - k * (f.y - oldPos.y) > 0 == l * (g.x - oldPos.x) - k * (g.y - oldPos.y) > 0)
            return false;
          k = g.x - f.x;
          g = g.y - f.y;
          return g * (oldPos.x - f.x) - k * (oldPos.y - f.y) > 0 != g * (newPos.x - f.x) - k * (newPos.y - f.y) > 0;
        }
      };
      module.exports = FiniteLinearSensor;
    }
  });

  // src/CircularObject.js
  var require_CircularObject = __commonJS({
    "src/CircularObject.js"(exports, module) {
      var Point = require_Point();
      function CircularObject(param) {
        var { cGroup = 63, cMask = 63, damping = 0.99, invMass = 1, bCoef = 0.5, radius = 10, xgravity = 0, ygravity = 0, xspeed = 0, yspeed = 0, xpos = 0, ypos = 0 } = param || {};
        this.cGroup = cGroup;
        this.cMask = cMask;
        this.damping = damping;
        this.invMass = invMass;
        this.bCoef = bCoef;
        this.radius = radius;
        this.gravity = new Point(xgravity, ygravity);
        this.speed = new Point(xspeed, yspeed);
        this.pos = new Point(xpos, ypos);
      }
      module.exports = CircularObject;
    }
  });

  // src/DistanceConstraint.js
  var require_DistanceConstraint = __commonJS({
    "src/DistanceConstraint.js"(exports, module) {
      function DistanceConstraint(param) {
        var { strength = Infinity, maxLength = 100, minLength = 100, d1 = 0, d0 = 0 } = param || {};
        this.strength = strength;
        this.maxLength = maxLength;
        this.minLength = minLength;
        this.d1 = d1;
        this.d0 = d0;
      }
      module.exports = DistanceConstraint;
    }
  });

  // src/MoveableCircularObject.js
  var require_MoveableCircularObject = __commonJS({
    "src/MoveableCircularObject.js"(exports, module) {
      var CircularObject = require_CircularObject();
      function MoveableCircularObject(param) {
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
        addVelocity: function(xc, yc) {
          var h = this.speed;
          h.x += xc;
          h.y += yc;
        },
        applyForce: function(force, xc, yc) {
          var h = this.speed, l = this.invMass;
          h.x += force * xc * l;
          h.y += force * yc * l;
        },
        isMoving: function() {
          var h = this.speed;
          return h.x * h.x + h.y * h.y > 0;
        }
      };
      module.exports = MoveableCircularObject;
    }
  });

  // src/World.js
  var require_World = __commonJS({
    "src/World.js"(exports, module) {
      function World() {
        this.moveableCircularObjects = [];
        this.dotObjects = [];
        this.infiniteLinearObjects = [];
        this.finiteArcObjects = [];
        this.distanceConstraints = [];
        this.finiteLinearSensors = [];
      }
      World.prototype = {
        advance: function(time, callbacks) {
          for (var b = 0, c = this.moveableCircularObjects; b < c.length; b++) {
            var d = c[b], e = d.pos, f = d.pos, g = d.speed;
            e.x = f.x + time * g.x;
            e.y = f.y + time * g.y;
            f = e = d.speed;
            g = d.gravity;
            d = d.damping;
            e.x = d * (f.x + g.x);
            e.y = d * (f.y + g.y);
          }
          for (var a = 0, b = this.moveableCircularObjects.length; a < b; a++) {
            c = this.moveableCircularObjects[a];
            for (d = a + 1; d < b; d++) {
              f = this.moveableCircularObjects[d];
              if (!(f.cMask & c.cGroup) || !(f.cGroup & c.cMask))
                continue;
              var t = c.pos, z = f.pos, x = t.x - z.x, t = t.y - z.y, e = f.radius + c.radius, y = x * x + t * t;
              if (!(y > 0 && y <= e * e))
                continue;
              var oldA = f;
              var y = Math.sqrt(y), x = x / y, t = t / y, z = c.invMass / (c.invMass + f.invMass), e = e - y, y = e * z, g = c.pos, k = c.pos;
              g.x = k.x + x * y;
              g.y = k.y + t * y;
              k = g = f.pos;
              e -= y;
              g.x = k.x - x * e;
              g.y = k.y - t * e;
              e = c.speed;
              y = f.speed;
              e = x * (e.x - y.x) + t * (e.y - y.y);
              if (!(e < 0))
                continue;
              e *= c.bCoef * f.bCoef + 1;
              z *= e;
              g = y = c.speed;
              y.x = g.x - x * z;
              y.y = g.y - t * z;
              f = y = f.speed;
              z = e - z;
              y.x = f.x + x * z;
              y.y = f.y + t * z;
              callbacks?._CDD_ && callbacks?._CDD_(a, c.playerId, d, oldA.playerId);
            }
            if (c.invMass == 0)
              continue;
            for (d = 0, e = this.infiniteLinearObjects; d < e.length; d++) {
              f = e[d];
              if (!(f.cMask & c.cGroup) || !(f.cGroup & c.cMask))
                continue;
              var g = f.normal, k = c.pos, g = f.dist - (g.x * k.x + g.y * k.y) + c.radius;
              if (!(g > 0))
                continue;
              var l = k = c.pos, h = f.normal;
              k.x = l.x + g * h.x;
              k.y = l.y + g * h.y;
              g = c.speed;
              k = f.normal;
              g = g.x * k.x + g.y * k.y;
              if (!(g < 0))
                continue;
              g *= c.bCoef * f.bCoef + 1;
              l = k = c.speed;
              f = f.normal;
              k.x = l.x - g * f.x;
              k.y = l.y - g * f.y;
              callbacks?._CDP_ && callbacks?._CDP_(a, c.playerId, d);
            }
            for (d = 0, e = this.finiteArcObjects; d < e.length; d++) {
              f = e[d];
              if (!(f.cMask & c.cGroup) || !(f.cGroup & c.cMask))
                continue;
              var s, y, z;
              if (0 * f.curveF != 0) {
                s = f.p0.pos;
                var t = f.p1.pos;
                y = t.x - s.x;
                var x = t.y - s.y, g = c.pos;
                z = g.x - t.x;
                t = g.y - t.y;
                g = c.pos;
                if (y * (g.x - s.x) + x * (g.y - s.y) <= 0 || z * y + t * x >= 0)
                  continue;
                y = f.normal;
                s = y.x;
                y = y.y;
                z = s * z + y * t;
              } else {
                y = f.arcCenter;
                z = c.pos;
                s = z.x - y.x;
                y = z.y - y.y;
                z = f.p0NormalDir;
                t = f.p1NormalDir;
                if ((s * z.x + y * z.y > 0 && s * t.x + y * t.y > 0) == f.curveF <= 0)
                  continue;
                t = Math.sqrt(s * s + y * y);
                if (t == 0)
                  continue;
                z = t - f.arcRadius;
                s /= t;
                y /= t;
              }
              t = f.bias;
              if (t == 0) {
                if (z < 0) {
                  z = -z;
                  s = -s;
                  y = -y;
                }
              } else if (t < 0) {
                t = -t;
                z = -z;
                s = -s;
                y = -y;
                if (z < -t)
                  continue;
              }
              if (c.radius <= z)
                continue;
              z = c.radius - z;
              x = t = c.pos;
              t.x = x.x + s * z;
              t.y = x.y + y * z;
              z = c.speed;
              z = s * z.x + y * z.y;
              if (z < 0) {
                z *= c.bCoef * f.bCoef + 1;
                t = f = c.speed;
                f.x = t.x - s * z;
                f.y = t.y - y * z;
                callbacks?._CDS_ && callbacks?._CDS_(a, c.playerId, d);
              }
            }
            for (d = 0, e = this.dotObjects; d < e.length; d++) {
              f = e[d];
              if (!(f.cMask & c.cGroup) || !(f.cGroup & c.cMask))
                continue;
              k = c.pos;
              l = f.pos;
              g = k.x - l.x;
              k = k.y - l.y;
              l = g * g + k * k;
              if (!(l > 0 && l <= c.radius * c.radius))
                continue;
              var l = Math.sqrt(l), g = g / l, k = k / l, l = c.radius - l, m = h = c.pos;
              h.x = m.x + g * l;
              h.y = m.y + k * l;
              l = c.speed;
              l = g * l.x + k * l.y;
              if (!(l < 0)) {
                callbacks?._CDV_ && callbacks?._CDV_(a, c.playerId, d, false);
                continue;
              }
              l *= c.bCoef * f.bCoef + 1;
              h = f = c.speed;
              f.x = h.x - g * l;
              f.y = h.y - k * l;
              callbacks?._CDV_ && callbacks?._CDV_(a, c.playerId, d, true);
            }
          }
          for (a = 0; a < 2; a++)
            for (b = 0, c = this.distanceConstraints; b < c.length; b++) {
              var t = c[b], x = this.moveableCircularObjects, y = x[t.d0];
              x = x[t.d1];
              if (!x || !y)
                continue;
              var z = y.pos, d = x.pos, e = z.x - d.x, z = z.y - d.y, f = Math.sqrt(e * e + z * z);
              if (f <= 0)
                continue;
              e /= f;
              z /= f;
              d = y.invMass / (y.invMass + x.invMass);
              if (isNaN(d))
                d = 0.5;
              var g, k;
              if (t.minLength >= t.maxLength) {
                g = t.minLength;
                k = 0;
              } else if (f <= t.minLength) {
                g = t.minLength;
                k = 1;
              } else if (f >= t.maxLength) {
                g = t.maxLength;
                k = -1;
              } else
                continue;
              f = g - f;
              if (0 == 0 * t.strength) {
                d = t.strength * f * 0.5;
                e *= d;
                z *= d;
                k = d = y.speed;
                y = y.invMass;
                d.x = k.x + e * y;
                d.y = k.y + z * y;
                d = y = x.speed;
                x = x.invMass;
                y.x = d.x - e * x;
                y.y = d.y - z * x;
                callbacks?._MJ_ && callbacks?._MJ_(b, false, true);
              } else {
                g = f * d;
                var l = y.pos, h = y.pos;
                l.x = h.x + e * g * 0.5;
                l.y = h.y + z * g * 0.5;
                h = l = x.pos;
                f -= g;
                l.x = h.x - e * f * 0.5;
                l.y = h.y - z * f * 0.5;
                f = y.speed;
                g = x.speed;
                f = e * (f.x - g.x) + z * (f.y - g.y);
                var sc = f * k <= 0;
                if (sc) {
                  d *= f;
                  y = k = y.speed;
                  k.x = y.x - e * d;
                  k.y = y.y - z * d;
                  x = y = x.speed;
                  d = f - d;
                  y.x = x.x + e * d;
                  y.y = x.y + z * d;
                }
                callbacks?._MJ_ && callbacks?._MJ_(b, true, sc);
              }
            }
        },
        addMoveableCircularObject: function(obj) {
          this.moveableCircularObjects.push(obj);
        },
        removeMoveableCircularObject: function(obj) {
          var idx = this.moveableCircularObjects.indexOf(obj);
          if (idx < 0)
            return;
          this.moveableCircularObjects.splice(idx, 1);
        }
      };
      module.exports = World;
    }
  });

  // src/index.js
  var require_src = __commonJS({
    "src/index.js"(exports, module) {
      module.exports = {
        Point: require_Point(),
        DotObject: require_DotObject(),
        FiniteArcObject: require_FiniteArcObject(),
        InfiniteLinearObject: require_InfiniteLinearObject(),
        FiniteLinearSensor: require_FiniteLinearSensor(),
        CircularObject: require_CircularObject(),
        DistanceConstraint: require_DistanceConstraint(),
        MoveableCircularObject: require_MoveableCircularObject(),
        World: require_World()
      };
    }
  });
  return require_src();
})();
