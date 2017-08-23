'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HTMLRenderer = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _plugin = require('ory-editor-core/lib/service/plugin');

var _plugin2 = _interopRequireDefault(_plugin);

var _editable = require('ory-editor-core/lib/reducer/editable');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var gridClass = function gridClass() {
  var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 12;
  return 'ory-cell-sm-' + size + ' ory-cell-xs-12';
};

var HTMLRow = function HTMLRow(_ref) {
  var _ref$cells = _ref.cells,
      cells = _ref$cells === undefined ? [] : _ref$cells,
      className = _ref.className,
      hasInlineChildren = _ref.hasInlineChildren;
  return _react2.default.createElement(
    'div',
    {
      className: (0, _classnames2.default)('ory-row', className, {
        'ory-row-has-floating-children': hasInlineChildren
      })
    },
    cells.map(function (c) {
      return _react2.default.createElement(HTMLCell, Object.assign({ key: c.id }, c));
    })
  );
};

// eslint-disable-next-line no-empty-function
var noop = function noop() {};

var HTMLCell = function HTMLCell(props) {
  var _props$rows = props.rows,
      rows = _props$rows === undefined ? [] : _props$rows,
      _props$layout = props.layout,
      layout = _props$layout === undefined ? {} : _props$layout,
      _props$content = props.content,
      content = _props$content === undefined ? {} : _props$content,
      hasInlineNeighbour = props.hasInlineNeighbour,
      inline = props.inline,
      size = props.size;

  var cn = (0, _classnames2.default)('ory-cell', gridClass(size), _defineProperty({
    'ory-cell-has-inline-neighbour': hasInlineNeighbour
  }, 'ory-cell-inline-' + (inline || ''), inline));

  if (layout.plugin) {
    var state = layout.state,
        Component = layout.plugin.Component;


    return _react2.default.createElement(
      'div',
      { className: cn },
      _react2.default.createElement(
        'div',
        { className: 'ory-cell-inner' },
        _react2.default.createElement(
          Component,
          { isPreviewMode: true, readOnly: true, state: state, onChange: noop },
          rows.map(function (r) {
            return _react2.default.createElement(HTMLRow, Object.assign({ key: r.id }, r, { className: 'ory-cell-inner' }));
          })
        )
      )
    );
  } else if (content.plugin) {
    var _state = content.state,
        _content$plugin = content.plugin,
        _Component = _content$plugin.Component,
        StaticComponent = _content$plugin.StaticComponent;

    var Renderer = StaticComponent || _Component;

    return _react2.default.createElement(
      'div',
      { className: cn },
      _react2.default.createElement(
        'div',
        { className: 'ory-cell-inner ory-cell-leaf' },
        _react2.default.createElement(Renderer, { isPreviewMode: true, readOnly: true, state: _state, onChange: noop })
      )
    );
  } else if (rows.length > 0) {
    return _react2.default.createElement(
      'div',
      { className: cn },
      rows.map(function (r) {
        return _react2.default.createElement(HTMLRow, Object.assign({ key: r.id }, r, { className: 'ory-cell-inner' }));
      })
    );
  }

  return _react2.default.createElement(
    'div',
    { className: cn },
    _react2.default.createElement('div', { className: 'ory-cell-inner' })
  );
};

var HTMLRenderer = exports.HTMLRenderer = function HTMLRenderer(_ref2) {
  var state = _ref2.state,
      plugins = _ref2.plugins;

  var service = new _plugin2.default(plugins);
  var props = (0, _editable.editable)(service.unserialize(state), { type: 'renderer/noop' });

  return _react2.default.createElement(HTMLRow, props);
};
//# sourceMappingURL=index.js.map