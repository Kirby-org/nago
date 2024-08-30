function Joint(param) { // nb
  var {strength=Infinity, maxLength=100, minLength=100, d1=0, d0=0} = (param||{});
  this.strength = strength; // ne
  this.maxLength = maxLength; // ec
  this.minLength = minLength; // Hb
  this.d1 = d1; // Zd
  this.d0 = d0; // Yd
}

module.exports = Joint;