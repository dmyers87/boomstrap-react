const Components = require('./Components');
const Constants  = require('./Constants');
const Containers = require('./Containers');
const Mixins     = require('./Mixins');

module.exports = {
  Components,
  Constants,
  Containers,
  Mixins,
  ...Components,
  ...Constants,
  ...Containers,
  ...Mixins
};
