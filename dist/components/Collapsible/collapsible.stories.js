'use strict';

var _react = _interopRequireDefault(require('react'));

var _react2 = require('@storybook/react');

var _grommetIcons = require('grommet-icons');

var _grommet = require('grommet');

var _themes = require('grommet/themes');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
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

var SimpleCollapsible = function SimpleCollapsible(props) {
  var _React$useState = _react['default'].useState(false),
    open = _React$useState[0],
    setOpen = _React$useState[1];

  return _react['default'].createElement(
    _grommet.Grommet,
    {
      theme: _themes.grommet,
    },
    _react['default'].createElement(
      _grommet.Box,
      {
        align: 'start',
        gap: 'small',
      },
      _react['default'].createElement(_grommet.Button, {
        primary: true,
        onClick: function onClick() {
          return setOpen(!open);
        },
        label: 'Toggle',
      }),
      _react['default'].createElement(
        _grommet.Collapsible,
        _extends(
          {
            open: open,
          },
          props,
        ),
        _react['default'].createElement(
          _grommet.Box,
          {
            background: 'light-2',
            round: 'medium',
            pad: 'medium',
            align: 'center',
            justify: 'center',
          },
          _react['default'].createElement(
            _grommet.Text,
            null,
            'This is a box inside a Collapsible component',
          ),
        ),
      ),
      _react['default'].createElement(
        _grommet.Text,
        null,
        'This is other content outside the Collapsible box',
      ),
    ),
  );
};

var MenuButton = function MenuButton(_ref) {
  var label = _ref.label,
    open = _ref.open,
    submenu = _ref.submenu,
    rest = _objectWithoutPropertiesLoose(_ref, ['label', 'open', 'submenu']);

  var Icon = open ? _grommetIcons.FormDown : _grommetIcons.FormNext;
  return _react['default'].createElement(
    _grommet.Button,
    _extends(
      {
        hoverIndicator: 'background',
      },
      rest,
    ),
    _react['default'].createElement(
      _grommet.Box,
      {
        margin: submenu
          ? {
              left: 'small',
            }
          : undefined,
        direction: 'row',
        align: 'center',
        pad: 'xsmall',
      },
      _react['default'].createElement(Icon, {
        color: 'brand',
      }),
      _react['default'].createElement(
        _grommet.Text,
        {
          size: 'small',
        },
        label,
      ),
    ),
  );
};

var NestedCollapsible = function NestedCollapsible() {
  var _React$useState2 = _react['default'].useState(false),
    openMenu1 = _React$useState2[0],
    setOpenMenu1 = _React$useState2[1];

  var _React$useState3 = _react['default'].useState(false),
    openSubmenu1 = _React$useState3[0],
    setOpenSubmenu1 = _React$useState3[1];

  var _React$useState4 = _react['default'].useState(false),
    openMenu2 = _React$useState4[0],
    setOpenMenu2 = _React$useState4[1];

  return _react['default'].createElement(
    _grommet.Grommet,
    {
      theme: _themes.grommet,
    },
    _react['default'].createElement(
      _grommet.Box,
      {
        width: 'small',
      },
      _react['default'].createElement(MenuButton, {
        open: openMenu1,
        label: 'Accordion',
        onClick: function onClick() {
          var newOpenMenu1 = !openMenu1;
          setOpenMenu1(newOpenMenu1);
          setOpenSubmenu1(!newOpenMenu1 ? false : openSubmenu1);
        },
      }),
      _react['default'].createElement(
        _grommet.Collapsible,
        {
          open: openMenu1,
        },
        _react['default'].createElement(MenuButton, {
          submenu: true,
          open: openSubmenu1,
          label: 'Accordion Basics',
          onClick: function onClick() {
            return setOpenSubmenu1(!openSubmenu1);
          },
        }),
        _react['default'].createElement(
          _grommet.Collapsible,
          {
            open: openSubmenu1,
          },
          _react['default'].createElement(
            _grommet.Button,
            {
              hoverIndicator: 'background',
              onClick: function onClick() {
                return alert('Submenu item 1 selected');
              },
            },
            _react['default'].createElement(
              _grommet.Box,
              {
                margin: {
                  left: 'medium',
                },
                direction: 'row',
                align: 'center',
                pad: 'xsmall',
              },
              _react['default'].createElement(
                _grommet.Text,
                {
                  size: 'small',
                },
                'Submenu item 1',
              ),
            ),
          ),
          _react['default'].createElement(
            _grommet.Button,
            {
              hoverIndicator: 'background',
              onClick: function onClick() {
                return alert('Submenu item 2 selected');
              },
            },
            _react['default'].createElement(
              _grommet.Box,
              {
                margin: {
                  left: 'medium',
                },
                direction: 'row',
                align: 'center',
                pad: 'xsmall',
              },
              _react['default'].createElement(
                _grommet.Text,
                {
                  size: 'small',
                },
                'Submenu item 2',
              ),
            ),
          ),
        ),
      ),
      _react['default'].createElement(MenuButton, {
        open: openMenu2,
        label: 'Button',
        onClick: function onClick() {
          return setOpenMenu2(!openMenu2);
        },
      }),
      _react['default'].createElement(
        _grommet.Collapsible,
        {
          open: openMenu2,
        },
        _react['default'].createElement(
          _grommet.Button,
          {
            hoverIndicator: 'background',
            onClick: function onClick() {
              return alert('Submenu item 1 selected');
            },
          },
          _react['default'].createElement(
            _grommet.Box,
            {
              margin: {
                left: 'medium',
              },
              direction: 'row',
              align: 'center',
              pad: 'xsmall',
            },
            _react['default'].createElement(
              _grommet.Text,
              {
                size: 'small',
              },
              'Submenu item 1',
            ),
          ),
        ),
      ),
    ),
  );
};

var HorizontalCollapsible = function HorizontalCollapsible() {
  var _React$useState5 = _react['default'].useState(),
    openNotification = _React$useState5[0],
    setOpenNotification = _React$useState5[1];

  return _react['default'].createElement(
    _grommet.Grommet,
    {
      full: true,
      theme: _themes.grommet,
    },
    _react['default'].createElement(
      _grommet.Box,
      {
        fill: true,
      },
      _react['default'].createElement(
        _grommet.Box,
        {
          as: 'header',
          direction: 'row',
          align: 'center',
          pad: {
            vertical: 'small',
            horizontal: 'medium',
          },
          justify: 'between',
          background: 'neutral-3',
          elevation: 'large',
          style: {
            zIndex: '1000',
          },
        },
        _react['default'].createElement(
          _grommet.Heading,
          {
            level: 3,
            margin: 'none',
            color: 'white',
          },
          _react['default'].createElement('strong', null, 'My App'),
        ),
        _react['default'].createElement(_grommet.Button, {
          onClick: function onClick() {
            return setOpenNotification(!openNotification);
          },
          icon: _react['default'].createElement(_grommetIcons.Notification, {
            color: 'white',
          }),
        }),
      ),
      _react['default'].createElement(
        _grommet.Box,
        {
          flex: true,
          direction: 'row',
        },
        _react['default'].createElement(
          _grommet.Box,
          {
            flex: true,
            align: 'center',
            justify: 'center',
          },
          'Dashboard content goes here, click on the notification icon',
        ),
        _react['default'].createElement(
          _grommet.Collapsible,
          {
            direction: 'horizontal',
            open: openNotification,
          },
          _react['default'].createElement(
            _grommet.Box,
            {
              flex: true,
              width: 'medium',
              background: 'light-2',
              pad: 'small',
              elevation: 'small',
            },
            _react['default'].createElement(
              _grommet.Text,
              {
                size: 'xlarge',
              },
              'Sidebar',
            ),
          ),
        ),
      ),
    ),
  );
};

(0, _react2.storiesOf)('Collapsible', module)
  .add('Default', function() {
    return _react['default'].createElement(SimpleCollapsible, null);
  })
  .add('Nested', function() {
    return _react['default'].createElement(NestedCollapsible, null);
  })
  .add('Horizontal', function() {
    return _react['default'].createElement(HorizontalCollapsible, null);
  });
