function Point(a, b){
  this.x = a;
  this.y = b;
}
Point.prototype = {
  negate: function(){}
};

function Vertex({cGroup=32, cMask=63, bCoef=1, xpos=0, ypos=0}) {
  this.cGroup = 32;
  this.cMask = 63;
  this.bCoef = 1;
  this.pos = new Point(0, 0);
  this.xpos = 0;//
  this.ypos = 0;//
}

function Segment({cGroup=32, cMask=63, bCoef=1, bias=0, v0=null, v1=null}) {
  this.normal = null;
  this.v1Normal = null;
  this.v0Normal = null;
  this.arcRadius = 0;
  this.arcCenter = null;
  this.v0 = null;
  this.v1 = null;
  this.bias = 0;
  this.bCoef = 1;
  this.cMask = 63;
  this.cGroup = 32;
  this.curveF = 0;
}
Segment.prototype = {
  setCurveDegrees: function(){},
  getCurveDegrees: function(){},
  calculateNormals: function(){}
};

function Plane({cGroup=32, cMask=63, bCoef=1, dist=0, xnormal=0, ynormal=0}) {
  this.cGroup = 32;
  this.cMask = 63;
  this.bCoef = 1;
  this.dist = 0;
  this.normal = new Point(0, 0);
  this.xnormal = 0;//
  this.ynormal = 0;//
}

function LinearSensor({p0x=0, p0y=0, p1x=0, p1y=0}) {
  this.p1 = new Point(0, 0);
  this.p0 = new Point(0, 0);
  this.p0x = 0;//
  this.p0y = 0;//
  this.p1x = 0;//
  this.p1y = 0;//
}
LinearSensor.prototype = {
  check: function(p1, p2){}
};

function Disc({cGroup=63, cMask=63, damping=0.99, invMass=1, bCoef=0.5, radius=10, xgravity=0, ygravity=0, xspeed=0, yspeed=0, xpos=0, ypos=0}) {
  this.cGroup = 63;
  this.cMask = 63;
  this.damping = 0.99;
  this.invMass = 1;
  this.bCoef = 0.5;
  this.radius = 10;
  this.gravity = new Point(0, 0);
  this.speed = new Point(0, 0);
  this.pos = new Point(0, 0);
  this.xgravity = 0;//
  this.ygravity = 0;//
  this.xspeed = 0;//
  this.yspeed = 0;//
  this.xpos = 0;//
  this.ypos = 0;//
}

function Joint({strength=Infinity, maxLength=100, minLength=100, d1=0, d0=0}) {
  this.strength = 1/0;
  this.maxLength = 100;
  this.minLength = 100;
  this.d1 = 0;
  this.d0 = 0;
}

function MoveableDisc({cGroup=63, cMask=63, damping=0.99, invMass=1, bCoef=0.5, radius=10, xgravity=0, ygravity=0, xspeed=0, yspeed=0, xpos=0, ypos=0}) {
  this.cGroup = 63;
  this.cMask = 63;
  this.damping = 0.99;
  this.invMass = 1;
  this.bCoef = 0.5;
  this.radius = 10;
  this.gravity = new Point(0, 0);
  this.speed = new Point(0, 0);
  this.pos = new Point(0, 0);
  this.xgravity = 0;//
  this.ygravity = 0;//
  this.xspeed = 0;//
  this.yspeed = 0;//
  this.xpos = 0;//
  this.ypos = 0;//
}
MoveableDisc.prototype = {
  applyForce: function(force, xc, yc){},
  addVelocity: function(xc, yc){},
  isMoving: function(){}
};

var callbacks = { onCollisionDvD: 1, onCollisionDvP: 1, onCollisionDvS: 1, onCollisionDvV: 1, onModifyJ: 1 };

function World() {
  this.discs = [];
  this.vertices = [];
  this.planes = [];
  this.segments = [];
  this.joints = [];
}
World.prototype = {
  advance: function(time, callbacks){},
  addDisc: function(obj){},
  removeDisc: function(obj){}
};