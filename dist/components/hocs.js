'use strict';

exports.__esModule = true;
exports.withAnnounce = exports.withForwardRef = exports.withFocus = void 0;

var _react = _interopRequireWildcard(require('react'));

var _getDisplayName = _interopRequireDefault(
  require('recompose/getDisplayName'),
);

var _hoistNonReactStatics = _interopRequireDefault(
  require('hoist-non-react-statics'),
);

var _styledComponents = require('styled-components');

exports.withTheme = _styledComponents.withTheme;

var _contexts = require('../contexts');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _getRequireWildcardCache() {
  if (typeof WeakMap !== 'function') return null;
  var cache = new WeakMap();
  _getRequireWildcardCache = function _getRequireWildcardCache() {
    return cache;
  };
  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }
  var cache = _getRequireWildcardCache();
  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }
  var newObj = {};
  if (obj != null) {
    var hasPropertyDescriptor =
      Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        var desc = hasPropertyDescriptor
          ? Object.getOwnPropertyDescriptor(obj, key)
          : null;
        if (desc && (desc.get || desc.set)) {
          Object.defineProperty(newObj, key, desc);
        } else {
          newObj[key] = obj[key];
        }
      }
    }
  }
  newObj['default'] = obj;
  if (cache) {
    cache.set(obj, newObj);
  }
  return newObj;
}

function _extends() {
  _extends =
    Object.assign ||
    function(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
  return _extends.apply(this, arguments);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called",
    );
  }
  return self;
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

var withFocus = function withFocus(_temp) {
  var _ref = _temp === void 0 ? {} : _temp,
    focusWithMouse = _ref.focusWithMouse;

  return function(WrappedComponent) {
    var FocusableComponent =
      /*#__PURE__*/
      (function(_Component) {
        _inheritsLoose(FocusableComponent, _Component);

        FocusableComponent.getDerivedStateFromProps = function getDerivedStateFromProps(
          nextProps,
          prevState,
        ) {
          var withFocusRef = nextProps.withFocusRef;
          var wrappedRef = prevState.wrappedRef;
          var nextWrappedRef = withFocusRef || wrappedRef;

          if (nextWrappedRef !== wrappedRef) {
            return {
              wrappedRef: nextWrappedRef,
            };
          }

          return null;
        };

        // not in state because it doesn't affect rendering
        function FocusableComponent(props) {
          var _this;

          _this = _Component.call(this, props) || this;

          _defineProperty(_assertThisInitialized(_this), 'mouseActive', false);

          _defineProperty(
            _assertThisInitialized(_this),
            'componentDidMount',
            function() {
              var wrappedRef = _this.state.wrappedRef; // components such as anchors and buttons should not retain focus after
              // being clicked while text-based components should

              if (!focusWithMouse) {
                window.addEventListener('mousedown', _this.handleActiveMouse);
              } // we could be using onFocus in the wrapper node itself
              // but react does not invoke it if you programically
              // call wrapperNode.focus() inside componentWillUnmount
              // see Drop "this.originalFocusedElement.focus();" for reference

              var wrapperNode = wrappedRef.current;

              if (wrapperNode && wrapperNode.addEventListener) {
                wrapperNode.addEventListener('focus', _this.setFocus);
              }
            },
          );

          _defineProperty(
            _assertThisInitialized(_this),
            'componentWillUnmount',
            function() {
              var wrappedRef = _this.state.wrappedRef;
              window.removeEventListener('mousedown', _this.handleActiveMouse);
              var wrapperNode = wrappedRef.current;

              if (wrapperNode && wrapperNode.addEventListener) {
                wrapperNode.removeEventListener('focus', _this.setFocus);
              }

              clearTimeout(_this.focusTimer);
              clearTimeout(_this.mouseTimer);
            },
          );

          _defineProperty(
            _assertThisInitialized(_this),
            'handleActiveMouse',
            function() {
              // from https://marcysutton.com/button-focus-hell/
              _this.mouseActive = true; // this avoids showing focus when clicking around

              clearTimeout(_this.mouseTimer); // empirical number to reset mouseActive after
              // some time has passed without mousedown

              _this.mouseTimer = setTimeout(function() {
                _this.mouseActive = false;
              }, 150);
            },
          );

          _defineProperty(
            _assertThisInitialized(_this),
            'setFocus',
            function() {
              // delay setting focus to avoid interupting events,
              // 1ms was chosen empirically based on ie11 using Select and TextInput
              // with and without a FormField.
              clearTimeout(_this.focusTimer);
              _this.focusTimer = setTimeout(function() {
                var focus = _this.state.focus;

                if (!focus && !_this.mouseActive) {
                  _this.setState({
                    focus: true,
                  });
                }
              }, 1);
            },
          );

          _defineProperty(
            _assertThisInitialized(_this),
            'resetFocus',
            function() {
              clearTimeout(_this.focusTimer);
              _this.focusTimer = setTimeout(function() {
                var focus = _this.state.focus;

                if (focus) {
                  _this.setState({
                    focus: false,
                  });
                }
              }, 1);
            },
          );

          _this.state = {
            focus: false,
            wrappedRef: _react['default'].createRef(),
          };
          return _this;
        }

        var _proto = FocusableComponent.prototype;

        _proto.render = function render() {
          var _this2 = this;

          var _this$props = this.props,
            _onFocus = _this$props.onFocus,
            _onBlur = _this$props.onBlur,
            withFocusRef = _this$props.withFocusRef,
            rest = _objectWithoutPropertiesLoose(_this$props, [
              'onFocus',
              'onBlur',
              'withFocusRef',
            ]);

          var _this$state = this.state,
            focus = _this$state.focus,
            wrappedRef = _this$state.wrappedRef;
          return _react['default'].createElement(
            WrappedComponent,
            _extends(
              {
                ref: wrappedRef,
                focus: focus,
              },
              rest,
              {
                onFocus: function onFocus(event) {
                  _this2.setFocus();

                  if (_onFocus) {
                    _onFocus(event);
                  }
                },
                onBlur: function onBlur(event) {
                  _this2.resetFocus();

                  if (_onBlur) {
                    _onBlur(event);
                  }
                },
              },
            ),
          );
        };

        return FocusableComponent;
      })(_react.Component);

    var ForwardRef = _react['default'].forwardRef(function(props, ref) {
      return _react['default'].createElement(
        FocusableComponent,
        _extends({}, props, {
          withFocusRef: ref,
        }),
      );
    });

    ForwardRef.displayName = (0, _getDisplayName['default'])(WrappedComponent);
    ForwardRef.name = ForwardRef.displayName;
    ForwardRef.defaultProps = WrappedComponent.defaultProps;
    (0, _hoistNonReactStatics['default'])(ForwardRef, WrappedComponent);
    return ForwardRef;
  };
};

exports.withFocus = withFocus;

var withForwardRef = function withForwardRef(WrappedComponent) {
  var ForwardRefComponent = _react['default'].forwardRef(function(props, ref) {
    return _react['default'].createElement(
      WrappedComponent,
      _extends(
        {
          forwardRef: ref,
        },
        props,
      ),
    );
  });

  ForwardRefComponent.displayName = (0, _getDisplayName['default'])(
    WrappedComponent,
  );
  ForwardRefComponent.name = ForwardRefComponent.displayName;
  ForwardRefComponent.defaultProps = WrappedComponent.defaultProps;
  (0, _hoistNonReactStatics['default'])(ForwardRefComponent, WrappedComponent);
  return ForwardRefComponent;
};

exports.withForwardRef = withForwardRef;

var withAnnounce = function withAnnounce(WrappedComponent) {
  var ForwardRef = _react['default'].forwardRef(function(props, ref) {
    return _react['default'].createElement(
      _contexts.AnnounceContext.Consumer,
      null,
      function(announce) {
        return _react['default'].createElement(
          WrappedComponent,
          _extends({}, props, {
            announce: announce,
            ref: ref,
          }),
        );
      },
    );
  });

  ForwardRef.displayName = (0, _getDisplayName['default'])(WrappedComponent);
  ForwardRef.name = ForwardRef.displayName;
  ForwardRef.defaultProps = WrappedComponent.defaultProps;
  (0, _hoistNonReactStatics['default'])(ForwardRef, WrappedComponent);
  return ForwardRef;
};

exports.withAnnounce = withAnnounce;
