const Components = require('./Components');
const Constants  = require('./Constants');
const Mixins     = require('./Mixins');

module.exports = {
  Components,
  Constants,
  Mixins,
  ...Components,
  ...Constants,
  ...Mixins
};
