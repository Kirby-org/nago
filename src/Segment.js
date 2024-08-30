var Point = require("./Point");

const minSegmentCurvature = 0.17435839227423353; // ~= 9.99 degrees * pi/180.
const maxSegmentCurvature = 5.934119456780721; // ~= 340 degrees * pi/180.
const degreeToRadians = 0.017453292519943295; // ~= pi/180.
const radiansToDegreeTimes2 = 114.59155902616465; // ~= 360/pi.

function Segment(param) { // E
  var {cGroup=32, cMask=63, bCoef=1, bias=0, v0=null, v1=null} = (param||{});
  this.normal = null; // wa
  this.v1Normal = null; // Ig
  this.v0Normal = null; // Hg
  this.arcRadius = 0; // Yj
  this.arcCenter = null; // Xd
  this.v0 = v0; // W
  this.v1 = v1; // ca
  this.bias = bias; // Cc
  this.bCoef = bCoef; // m
  this.cMask = cMask; // h
  this.cGroup = cGroup; // v
  this.curveF = Infinity; // vb
}
Segment.prototype = {
  setCurveDegrees: function(angle){ // Oc
    angle *= degreeToRadians;
    if (angle<0){
      angle = -angle;
      var b = this.v0;
      this.v0 = this.v1;
      this.v1 = b;
      this.bias = -this.bias;
    }
    if (angle>minSegmentCurvature&&angle<maxSegmentCurvature)
      this.curveF = 1/Math.tan(angle/2);
  },
  getCurveDegrees: function(){ // Co
    return isFinite(this.curveF) ? radiansToDegreeTimes2*Math.atan(1/this.curveF) : 0;
  },
  calculateNormals: function(){ // he
    var { curveF, v1: {pos: p1}, v0: {pos: p0} } = this, cx, cy, dx, dy;
    if (isFinite(curveF)){
      dx = 0.5*(p1.x-p0.x); dy = 0.5*(p1.y-p0.y);
      cx = p0.x+dx-dy*curveF; cy = p0.y+dy+dx*curveF;
      dx = p0.x-cx; dy = p0.y-cy;
      this.arcRadius = Math.sqrt(dx*dx+dy*dy);
      this.v0Normal = new Point(cy-p0.y, p0.x-cx);
      this.v1Normal = new Point(p1.y-cy, cx-p1.x);
      if (curveF<=0){
        this.v0Normal.negate();
        this.v1Normal.negate();
      }
      this.arcCenter = new Point(cx, cy);
    }
    else{
      dx = p0.x-p1.x;
      dy = p0.y-p1.y;
      cy = Math.sqrt(dy*dy+dx*dx);
      this.normal = new Point(-dy/cy, dx/cy);
    }
  }
};

module.exports = Segment;