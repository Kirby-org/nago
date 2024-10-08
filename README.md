[![GitHub package.json version](https://img.shields.io/github/package-json/v/Kirby-org/nago?style=flat-square)](https://github.com/Kirby-org/nago) [![NPM Version](https://img.shields.io/npm/v/nago.js?style=flat-square)](https://www.npmjs.com/package/nago.js) [![NPM Monthly Downloads](https://img.shields.io/npm/dm/nago.js?style=flat-square)](https://npmjs.org/package/nago.js)

[![License](https://img.shields.io/github/license/Kirby-org/nago?style=flat-square)](LICENSE) [![Last Commit](https://img.shields.io/github/last-commit/Kirby-org/nago?style=flat-square)](https://github.com/Kirby-org/nago/commits/) ![Language Most Used](https://img.shields.io/github/languages/top/Kirby-org/nago?style=flat-square) ![Repository Size](https://img.shields.io/github/repo-size/Kirby-org/nago?style=flat-square)

[![Forks](https://img.shields.io/github/forks/Kirby-org/nago?style=social)](https://github.com/Kirby-org/nago/network/members) [![Stars](https://img.shields.io/github/stars/Kirby-org/nago?style=social)](https://github.com/Kirby-org/nago/stargazers) [![Watches](https://img.shields.io/github/watchers/Kirby-org/nago?style=social)](https://github.com/Kirby-org/nago/watchers)

# nago

This is the official repository for the nago Physics Engine. (https://github.com/Kirby-org/nago)

This is a 2d physics engine that has been recovered from minified Haxball(https://www.haxball.com) codes, and is currently the original physics engine for this game. Use at your own risk.

## Building

- Use `npm run-script build` to build/minify the engine.

The outputs will be in `dist` folder, and can directly be used inside browsers or node.js.

## Installing

### Installing for node.js:

To install the package, you can use `npm install nago.js` and then import the library using `var nago = require("nago.js");`.

### Installing for a browser environment:

You can import the `./dist/nago.min.js` file directly by adding this script tag into your main html file: `<script src="https://cdn.jsdelivr.net/gh/Kirby-org/nago@latest/dist/nago.min.js"></script>`. It will add a `nago` object that contains all of the contents of this library.

## Usage

For starters, here is a simple example usage:

```js
var { World, Vertex, MoveableDisc, Segment } = require("nago.js");
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
```

### Point

This defines a point or a vector that has a 2d coordinate.

#### constructor({x, y})
  - `x`: The x-coordinate of the point/vector.
  - `y`: The y-coordinate of the point/vector.

#### Properties
  - `x`: The x-coordinate of the point/vector.
  - `y`: The y-coordinate of the point/vector.

### World

This creates a physical world. All collision logic is handled here.

#### constructor()
  - no parameters

#### Properties
  - `vertices`: An array that contains all vertices.
  - `segments`: An array that contains all segments.
  - `planes`: An array that contains all planes.
  - `discs`: An array that contains all discs.
  - `joints`: An array that contains all joints.

#### Functions
  - `advance(time: float32, callbacks?: object): void`: Advances the physics engine `time` ticks. `callbacks` may include `onCollisionDvD(discId1: int32, playerId1: int32, discId2: int32, playerId2: int32)`(Collision Disc vs Disc), `onCollisionDvP(discId1: int32, playerId1: int32, planeId: int32)`(Collision Disc vs Plane), `onCollisionDvS(discId1: int32, playerId1: int32, segmentId: int32)`(Collision Disc vs Segment), `onCollisionDvV(discId1: int32, playerId1: int32, vertexId: int32, modifiedSpeed: boolean)`(Collision Disc vs Vertex) and `onModifyJ(jointId: int32, modifiedPosition: boolean, modifiedSpeed: boolean)`(Modified Joint).
  - `addDisc(obj: MoveableDisc): void`: Adds the given moveable disc(`obj`) into the world's relevant array.
  - `removeDisc(obj: MoveableDisc): void`: Removes the moveable disc(`obj`) from the world's relevant array.

#### You will have to add some physical objects into your new `World` object to observe the effects. Currently, the available types of objects are as follows:

### Vertex

These static objects can collide with `MoveableDisc`s.

To create a `Vertex`, you can do this:

```js
var vertex = new nago.Vertex();
```

You will have to add it to a `World` object for it to have any effect. You can do that with this:

```js
world.vertices.push(vertex);
```

#### constructor({cGroup=32, cMask=63, bCoef=1, xpos=0, ypos=0})
  - `cGroup`: The collision group of the object.
  - `cMask`: The collision mask of the object.
  - `bCoef`: The bouncing coefficient of the object.
  - `xpos`: The x-coordinate of the object.
  - `ypos`: The y-coordinate of the object.

#### Properties
  - `cGroup`: The collision group of the object. (`int32`)
  - `cMask`: The collision mask of the object. (`int32`)
  - `bCoef`: The bouncing coefficient of the object. (`float`)
  - `pos`: The position of the object. (`Point`)

### Segment

This is a static object that connects two `Vertex`es with a collideable arc, and can collide with `MoveableDisc`s.

To create a `Segment`, you can do this:

```js
var segment = new nago.Segment();
```

You will have to add it to a `World` object for it to have any effect. You can do that with this:

```js
world.segments.push(segment);
```

#### constructor({cGroup=32, cMask=63, bCoef=1, bias=0, v0=null, v1=null})
  - `cGroup`: The collision group of the object.
  - `cMask`: The collision mask of the object.
  - `bCoef`: The bouncing coefficient of the object.
  - `bias`: The bias coefficient of the object.
  - `v0`: The first `Vertex` to connect.
  - `v1`: The second `Vertex` to connect.

#### Properties
  - `cGroup`: The collision group of the object. (`int32`)
  - `cMask`: The collision mask of the object. (`int32`)
  - `bCoef`: The bouncing coefficient of the object. (`float`)
  - `bias`: The bias coefficient of the object. (`float`)
  - `v0`: The first `Vertex` to connect. (`Vertex`)
  - `v1`: The second `Vertex` to connect. (`Vertex`)
  - `normal`: The auto-calculated normal direction of the object. If the object is curved, this will be `null`. (`Point`)
  - `v0Normal`: The auto-calculated normal direction of the object's tangent line at `v0`. If the object is not curved, this will be `null`. (`Point`)
  - `v1Normal`: The auto-calculated normal direction of the object's tangent line at `v1`. If the object is not curved, this will be `null`. (`Point`)
  - `arcRadius`: The auto-calculated radius of the arc. If the object is not curved, this will be `null`. (`float`)
  - `arcCenter`: The auto-calculated center of the arc. If the object is not curved, this will be `null`. (`Point`)
  - `curveF`: The auto-calculated curve value of the arc in radians. If the object is not curved, this will be `Infinity`. (`float`)

#### Functions
  - `getCurveDegrees()`: Returns the real curve value of the arc in degrees.
  - `setCurveDegrees(curve)`: Sets the real curve value of the arc in degrees. You also have to run `calculateNormals()` after running this.
  - `calculateNormals()`: Calculates the normals and arc values for collisions.

### LinearSensor

These metaphysical "object"s can NOT collide with `MoveableDisc`s. They only have a function inside to sense if a `MoveableDisc` has passed a finite line.

To create a `LinearSensor`, you can do this:

```js
var sensorObject = new nago.LinearSensor();
```

#### constructor({p0x=0, p0y=0, p1x=0, p1y=0})
  - `p0x`: The x coordinate of the first point. (`float`)
  - `p0y`: The y coordinate of the first point. (`float`)
  - `p1x`: The x coordinate of the second point. (`float`)
  - `p1y`: The y coordinate of the second point. (`float`)

#### Properties
  - `p0`: The first point of the finite line. (`Point`)
  - `p1`: The second point of the finite line. (`Point`)

#### Functions
  - `check(oldPos, newPos): boolean`: Returns `true` if the `newPos` and `oldPos` are on different sides of this sensor, possibly implying that the object has just passed this finite line.

You do NOT have to add it to a `World` object for it to have an effect.

### Plane

These static objects in the shape of an infinite line can collide with `MoveableDisc`s.

To create a `Plane`, you can do this:

```js
var plane = new nago.Plane();
```

You will have to add it to a `World` object for it to have any effect. You can do that with this:

```js
world.planes.push(plane);
```

#### constructor({cGroup=32, cMask=63, bCoef=1, dist=0, xnormal=0, ynormal=0})
  - `cGroup`: The collision group of the object.
  - `cMask`: The collision mask of the object.
  - `bCoef`: The bouncing coefficient of the object.
  - `dist`: The distance of the object to the origin.
  - `xnormal`: The x-component of the object's normal.
  - `ynormal`: The y-component of the object's normal.

#### Properties
  - `cGroup`: The collision group of the object. (`int32`)
  - `cMask`: The collision mask of the object. (`int32`)
  - `bCoef`: The bouncing coefficient of the object. (`float`)
  - `dist`: The distance of the object to the origin. (`float`)
  - `normal`: The normal of the object. (`Point`)

### Disc

These static objects in the shape of a disc can NOT collide with anything because this class is not meant to be used inside the physics engine itself. They can only be used for the representation of discs while generating custom "map"s etc.

To create a `Disc`, you can do this:

```js
var disc = new nago.Disc();
```

#### constructor({cGroup=63, cMask=63, damping=0.99, invMass=1, bCoef=0.5, radius=10, xgravity=0, ygravity=0, xspeed=0, yspeed=0, xpos=0, ypos=0})
  - `cGroup`: The collision group of the object.
  - `cMask`: The collision mask of the object.
  - `damping`: The damping coefficient of the object.
  - `invMass`: 1/Mass of the object.
  - `bCoef`: The bouncing coefficient of the object.
  - `radius`: The radius of the circular object.
  - `xgravity`: The x-component of the object's gravity.
  - `ygravity`: The y-component of the object's gravity.
  - `xspeed`: The x-component of the object's speed.
  - `yspeed`: The y-component of the object's speed.
  - `xpos`: The x-component of the object's position.
  - `ypos`: The y-component of the object's position.

#### Properties
  - `cGroup`: The collision group of the object. (`int32`)
  - `cMask`: The collision mask of the object. (`int32`)
  - `damping`: The damping coefficient of the object. (`float`)
  - `invMass`: 1/Mass of the object. (`float`)
  - `bCoef`: The bouncing coefficient of the object. (`float`)
  - `radius`: The radius of the object. (`float`)
  - `pos`: The position gravity of the object. (`Point`)
  - `speed`: The speed of the object. (`Point`)
  - `gravity`: The gravity of the object. (`Point`)

### MoveableDisc

These moveable objects in the shape of a disc can collide with everything except sensors and joints. They are currently the only moveable objects in this physics engine.

To create a `MoveableDisc`, you can do this:

```js
var disc = new nago.MoveableDisc();
```

You will have to add it to a `World` object for it to have any effect. You can do that with this:

```js
world.discs.push(disc);
```

#### constructor({cGroup=63, cMask=63, damping=0.99, invMass=1, bCoef=0.5, radius=10, xgravity=0, ygravity=0, xspeed=0, yspeed=0, xpos=0, ypos=0})

Same as `Disc`.

#### Properties

Same as `Disc`.

#### Functions

- `addVelocity(xc: float, yc: float): void`: Adds the given `xc`, `yc` values to the object's current velocity vector. Used to move players while pressing keys inside Haxball.
- `applyForce(force: float, xc: float, yc: float): void`: Applies the given `force` to the object by changing the velocity vector depending on the object's `invMass` value. Used twice to apply force to both player and ball in the opposite directions while kicking the ball.
- `isMoving(): boolean`: Returns `true` if the object has a non-zero velocity.

### Joint

These metaphysical objects in the shape of a finite line can NOT collide with `MoveableDisc`s. They are distance constraints to bind the `MoveableDisc`s together and restrict their movements.

To create a `Joint`, you can do this:

```js
var joint = new nago.Joint();
```

You will have to add it to a `World` object for it to have any effect. You can do that with this:

```js
world.joints.push(joint);
```

#### constructor({strength=Infinity, minLength=100, maxLength=100, d0=0, d1=0})
  - `strength`: The strength of the joint. (`float`)
  - `minLength`: The minimum distance between the circular objects. (`float`)
  - `maxLength`: The maximum distance between the circular objects. (`float`)
  - `d0`: The index of the first circular object to connect. (`int32`)
  - `d1`: The index of the second circular object to connect. (`int32`)

#### Properties
  - `strength`: The strength of the joint. (`float`)
  - `minLength`: The minimum distance between the circular objects. (`float`)
  - `maxLength`: The maximum distance between the circular objects. (`float`)
  - `d0`: The index of the first circular object to connect. (`int32`)
  - `d1`: The index of the second circular object to connect. (`int32`)
