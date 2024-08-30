var { Point, Vertex, Segment, Plane, LinearSensor, Disc, Joint, MoveableDisc, World } = require("../src/index.js"); // or require("../dist/nago.min.js");

var world = new World();
var v0 = new Vertex({xpos: -10, ypos: 30});
var v1 = new Vertex({xpos: 10, ypos: 30});
world.vertices.push(v0);
world.vertices.push(v1);
var arc = new Segment({v0, v1});
arc.calculateNormals(); // you must run this function whenever you update this arc object.
world.segments.push(arc);
var disc = new MoveableDisc({xpos: 0, ypos: 0, radius: 5, xspeed: 0.1, yspeed: 2});
world.discs.push(disc);
// you may do this part inside a timeout, interval or requestanimationframe etc callback.
for (var i=0;i<50;i++){
  // you may render the physical world on screen here any way you like.
  // for illustration, we will only log some example values.
  console.log(disc.pos.x, disc.pos.y, disc.speed.x, disc.speed.y);
  world.advance(1);
}
