[![GitHub package.json version](https://img.shields.io/github/package-json/cGroup/Kirby-org/nago?style=flat-square)](https://github.com/Kirby-org/nago) [![NPM Version](https://img.shields.io/npm/cGroup/nago.js?style=flat-square)](https://www.npmjs.com/package/nago.js) [![NPM Monthly Downloads](https://img.shields.io/npm/dm/nago.js?style=flat-square)](https://npmjs.org/package/nago.js)

[![License](https://img.shields.io/github/license/Kirby-org/nago?style=flat-square)](LICENSE) [![Last Commit](https://img.shields.io/github/last-commit/Kirby-org/nago?style=flat-square)](https://github.com/Kirby-org/nago/commits/) ![Language Most Used](https://img.shields.io/github/languages/top/Kirby-org/nago?style=flat-square) ![Repository Size](https://img.shields.io/github/repo-size/Kirby-org/nago?style=flat-square)

[![Forks](https://img.shields.io/github/forks/Kirby-org/nago?style=social)](https://github.com/Kirby-org/nago/network/members) [![Stars](https://img.shields.io/github/stars/Kirby-org/nago?style=social)](https://github.com/Kirby-org/nago/stargazers) [![Watches](https://img.shields.io/github/watchers/Kirby-org/nago?style=social)](https://github.com/Kirby-org/nago/watchers)

# nago

This is the official repository for the nago Physics Engine. (https://github.com/Kirby-org/nago)

This physics engine has been recovered from minified Haxball(https://www.haxball.com) codes, and is currently the original physics engine for this game. Use at your own risk.

## Building

- Use `npm run-script esbuild-noMinify` to build the engine without minification. 
- Use `npm run-script esbuild` to build the engine with minification.

The outputs are in `dist` folder, and can directly be used inside browsers.

The `mangle-cache.json` file is also maintained for now to keep the variable names stable and same as the Haxball game, in order to be able to replace and test the physics engine inside the Haxball game. If you want to mangle the names randomly, you may delete the file, and/or change the `esbuild` script to not include the `mangle-cache` and/or `mangle-props` options.

## Installing

### Installing for node.js:

To install the package, you can use `npm install nago`. You can then use `var nago = require("nago");` to have your physics engine ready to use.

### Installing for a browser environment:

You can import the `./dist/nago.min.js` file directly by adding this script tag into your main html file: `<script src="https://cdn.jsdelivr.net/gh/Kirby-org/nago@latest/dist/nago.min.js"></script>`. It will add a `nago` object that contains all of the contents of this library.

## Usage

For starters, here is a simple example usage:

```js
var { World, DotObject, MoveableCircularObject, FiniteArcObject } = require("nago");
var world = new World();
var v1 = new DotObject({xpos: -10, ypos: 30});
var v2 = new DotObject({xpos: 10, ypos: 30});
world.dotObjects.push(v1);
world.dotObjects.push(v2);
world.finiteArcObjects.push(new FiniteArcObject(p0: v1, p1: v2));
var disc = new MoveableCircularObject({xpos: 0, ypos: 0, radius: 5, xspeed: 1, yspeed: 2});
world.moveableCircularObjects.push(disc);
// you may do this part inside a timeout, interval or requestanimationframe etc callback.
for (var i=0;i<20;i++){
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
  - `dotObjects`: An array that contains the dot objects. (vertices)
  - `finiteArcObjects`: An array that contains the finite arc objects. (segments)
  - `finiteLinearSensors`: An array that contains the finite linear sensors. (goals)
  - `infiniteLinearObjects`: An array that contains the infinite linear objects. (planes)
  - `moveableCircularObjects`: An array that contains the moveable circular objects. (discs)
  - `distanceConstraints`: An array that contains the distance constraints. (joints)

#### Functions
  - `advance(time, callbacks)`: Advances the physics engine `time` seconds. `callbacks` may include `_CDD_(discId1, playerId1, discId2, playerId2)`(Collision Disc vs Disc), `_CDP_(discId1, playerId1, planeId)`(Collision Disc vs Plane), `_CDS_(discId1, playerId1, segmentId)`(Collision Disc vs Segment), `_CDV_(discId1, playerId1, vertexId, modifiedSpeed)`((Collision Disc vs Vertex)) and `_MJ_(jointId, modifiedPosition, modifiedSpeed)`(Modified Joint).
  - `addMoveableCircularObject(obj)`: Adds the given moveable circular object(`obj`) into the world's relevant array.
  - `removeMoveableCircularObject(obj)`: Removes the moveable circular object(`obj`) from the world's relevant array.

#### You will have to add some physical objects into your new `World` object to observe the effects. Currently, the available types of objects are as follows:

### DotObject

This is synonymous to a "vertex" in Haxball stadiums, and can collide with discs (aka `MoveableCircularObject`s). They are not able to move.

To create a `DotObject`, you can do this:

```js
var dotObject = new nago.DotObject();
```

You will have to add it to a `World` object for it to have any effect. You can do that with this:

```js
world.dotObjects.push(dotObject);
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

### FiniteArcObject

This is an object that connects two `DotObject`s with a collideable arc. This is synonymous to a "segment" in Haxball stadiums, and can collide with discs (aka `MoveableCircularObject`s). They are not able to move.

To create a `FiniteArcObject`, you can do this:

```js
var arcObject = new nago.FiniteArcObject();
```

You will have to add it to a `World` object for it to have any effect. You can do that with this:

```js
world.finiteArcObjects.push(arcObject);
```

#### constructor({cGroup=32, cMask=63, bCoef=1, bias=0, p0=null, p1=null})
  - `cGroup`: The collision group of the object.
  - `cMask`: The collision mask of the object.
  - `bCoef`: The bouncing coefficient of the object.
  - `bias`: The bias coefficient of the object.
  - `p0`: The first `DotObject` to connect.
  - `p1`: The second `DotObject` to connect.

#### Properties
  - `cGroup`: The collision group of the object. (`int32`)
  - `cMask`: The collision mask of the object. (`int32`)
  - `bCoef`: The bouncing coefficient of the object. (`float`)
  - `bias`: The bias coefficient of the object. (`float`)
  - `p0`: The first `DotObject` to connect. (`DotObject`)
  - `p1`: The second `DotObject` to connect. (`DotObject`)
  - `normal`: The auto-calculated normal direction of the object. If the object is curved, this will be `null`. (`Point`)
  - `p0Normal`: The auto-calculated normal direction of the object's tangent line at `p0`. If the object is not curved, this will be `null`. (`Point`)
  - `p1Normal`: The auto-calculated normal direction of the object's tangent line at `p1`. If the object is not curved, this will be `null`. (`Point`)
  - `arcRadius`: The auto-calculated radius of the arc. If the object is not curved, this will be `null`. (`float`)
  - `arcCenter`: The auto-calculated center of the arc. If the object is not curved, this will be `null`. (`Point`)
  - `curveF`: The auto-calculated curve value of the arc in radians. If the object is not curved, this will be `Infinity`. (`float`)

#### Functions
  - `getCurveDegrees()`: Returns the real curve value of the arc in degrees.
  - `setCurveDegrees(curve)`: Sets the real curve value of the arc in degrees. You also have to run `calculateNormals()` after running this.
  - `calculateNormals()`: Calculates the normals and arc values for collisions.

### FiniteLinearSensor

This is synonymous to a "goal" in Haxball stadiums, and can NOT collide with discs (aka `MoveableCircularObject`s). They only have a function inside to sense if a moveable object has passed a finite line. They are not able to move.

To create a `FiniteLinearSensor`, you can do this:

```js
var sensorObject = new nago.FiniteLinearSensor();
```

You will have to add it to a `World` object for it to have any effect. You can do that with this:

```js
world.finiteLinearSensors.push(sensorObject);
```

#### constructor({p0x=0, p0y=0, p1x=0, p1y=0})
  - `p0x`: The x coordinate of the first point. (`float`)
  - `p0y`: The y coordinate of the first point. (`float`)
  - `p1x`: The x coordinate of the second point. (`float`)
  - `p1y`: The y coordinate of the second point. (`float`)

#### Properties
  - `p0`: The first point of the finite line. (`Point`)
  - `p1`: The second point of the finite line. (`Point`)

### InfiniteLinearObject

This is synonymous to a "plane" in Haxball stadiums, and can collide with discs (aka `MoveableCircularObject`s). They are not able to move.

To create a `InfiniteLinearObject`, you can do this:

```js
var linearObject = new nago.InfiniteLinearObject();
```

You will have to add it to a `World` object for it to have any effect. You can do that with this:

```js
world.infiniteLinearObjects.push(linearObject);
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

### CircularObject

This is synonymous to a "disc" in Haxball stadiums, but they cannot be used inside the physics engine itself. They can be used for the representation of discs inside stadiums.

To create a `CircularObject`, you can do this:

```js
var circularObject = new nago.CircularObject();
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

### MoveableCircularObject

This is synonymous to a "disc" in Haxball stadiums, and can collide with everything except sensors and constraints. They are currently the only moveable objects in this physics engine.

To create a `MoveableCircularObject`, you can do this:

```js
var circularObject = new nago.MoveableCircularObject();
```

You will have to add it to a `World` object for it to have any effect. You can do that with this:

```js
world.moveableCircularObjects.push(circularObject);
```

#### constructor({cGroup=63, cMask=63, damping=0.99, invMass=1, bCoef=0.5, radius=10, xgravity=0, ygravity=0, xspeed=0, yspeed=0, xpos=0, ypos=0})

Same as `CircularObject`.

#### Properties

Same as `CircularObject`.

#### Functions

- `addVelocity(xc: float, yc: float): void`: Adds the given `xc`, `yc` values to the object's current velocity vector. Used to move players while pressing keys inside Haxball.
- `applyForce(force: float, xc: float, yc: float): void`: Applies the given `force` to the object by changing the velocity vector depending on the object's `invMass` value. Used twice to apply force to both player and ball in the opposite directions while kicking the ball.
- `isMoving(): boolean`: Returns `true` if the object has a non-zero velocity.

### DistanceConstraint

This is synonymous to a "joint" in Haxball stadiums, and can NOT collide with discs (aka `MoveableCircularObject`s). They are not able to move.

To create a `DistanceConstraint`, you can do this:

```js
var distanceConstraint = new nago.DistanceConstraint();
```

You will have to add it to a `World` object for it to have any effect. You can do that with this:

```js
world.distanceConstraints.push(distanceConstraint);
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
