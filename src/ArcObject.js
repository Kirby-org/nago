var Point = require("./Point");

const minSegmentCurvature = 0.17435839227423353; // ~= 9.99 degrees * pi/180.
const maxSegmentCurvature = 5.934119456780721; // ~= 340 degrees * pi/180.
const degreeToRadians = 0.017453292519943295; // ~= pi/180.
const radiansToDegreeTimes2 = 114.59155902616465; // ~= 360/pi.

function ArcObject(param) { // E
  var {cGroup=32, cMask=63, bCoef=1, bias=0, p0=null, p1=null} = (param||{});
  this.normal = null; // wa
  this.p1NormalDir = null; // Ig
  this.p0NormalDir = null; // Hg
  this.arcRadius = 0; // Yj
  this.arcCenter = null; // Xd
  this.p0 = p0; // W
  this.p1 = p1; // ca
  this.bias = bias; // Cc
  this.bCoef = bCoef; // m
  this.cMask = cMask; // h
  this.cGroup = cGroup; // v
  this.curveF = Infinity; // vb
}
ArcObject.prototype = {
  setCurveDegrees: function(curve) { // Oc
    curve *= degreeToRadians;
    if (curve<0) {
      curve = -curve;
      var b = this.p0;
      this.p0 = this.p1;
      this.p1 = b;
      this.bias = -this.bias;
    }
    if (curve>minSegmentCurvature && curve<maxSegmentCurvature)
      this.curveF = 1/Math.tan(curve/2);
  },
  getCurveDegrees: function() { // Co
    return (0==0*this.curveF) ? (radiansToDegreeTimes2*Math.atan(1/this.curveF)) : 0;
  },
  calculateNormals: function() { // he
    if (0==0*this.curveF) {
      var a = this.p1.pos, b = this.p0.pos, c = 0.5*(a.x-b.x), a = 0.5*(a.y-b.y), b = this.p0.pos, d = this.curveF;
      this.arcCenter = new Point(b.x+c-a*d, b.y+a+c*d);
      a = this.p0.pos;
      b = this.arcCenter;
      c = a.x - b.x;
      a = a.y - b.y;
      this.arcRadius = Math.sqrt(c*c+a*a);
      this.p0NormalDir = new Point(-a, c);
      this.p1NormalDir = new Point(this.p1.pos.y-this.arcCenter.y, this.arcCenter.x-this.p1.pos.x);
      if (this.curveF<=0){
        a = c = this.p0NormalDir;
        c.x = -a.x;
        c.y = -a.y;
        a = c = this.p1NormalDir;
        c.x = -a.x;
        c.y = -a.y;
      }
    }
    else {
      a = this.p0.pos;
      b = this.p1.pos;
      c = a.x-b.x;
      a = b.y-a.y;
      b = Math.sqrt(a*a+c*c);
      this.normal = new Point(a/b, c/b);
    }
  }
}

module.exports = ArcObject;