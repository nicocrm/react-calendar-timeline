'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _elementResizeDetector = require('element-resize-detector');

var _elementResizeDetector2 = _interopRequireDefault(_elementResizeDetector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function addListener(component) {
  component._erd = (0, _elementResizeDetector2.default)({
    strategy: 'scroll'
  });

  component._erd.listenTo(component.refs.container, function () {
    component.resize(component.props);
  });
}

function removeListener(component) {
  component._erd.removeAllListeners(component.refs.container);
}

var _default = { addListener: addListener, removeListener: removeListener };
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(addListener, 'addListener', 'src/resize-detector/container.js');

  __REACT_HOT_LOADER__.register(removeListener, 'removeListener', 'src/resize-detector/container.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/resize-detector/container.js');
}();

;