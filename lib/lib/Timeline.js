'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultSubHeaderLabelFormats = exports.defaultHeaderLabelFormats = exports.defaultTimeSteps = exports.defaultKeys = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

require('./Timeline.css');

var _Items = require('./items/Items');

var _Items2 = _interopRequireDefault(_Items);

var _InfoLabel = require('./layout/InfoLabel');

var _InfoLabel2 = _interopRequireDefault(_InfoLabel);

var _Sidebar = require('./layout/Sidebar');

var _Sidebar2 = _interopRequireDefault(_Sidebar);

var _Header = require('./layout/Header');

var _Header2 = _interopRequireDefault(_Header);

var _VerticalLines = require('./lines/VerticalLines');

var _VerticalLines2 = _interopRequireDefault(_VerticalLines);

var _HorizontalLines = require('./lines/HorizontalLines');

var _HorizontalLines2 = _interopRequireDefault(_HorizontalLines);

var _TodayLine = require('./lines/TodayLine');

var _TodayLine2 = _interopRequireDefault(_TodayLine);

var _CursorLine = require('./lines/CursorLine');

var _CursorLine2 = _interopRequireDefault(_CursorLine);

var _window = require('../resize-detector/window');

var _window2 = _interopRequireDefault(_window);

var _utils = require('./utils.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaultKeys = exports.defaultKeys = {
  groupIdKey: 'id',
  groupTitleKey: 'title',
  groupRightTitleKey: 'rightTitle',
  itemIdKey: 'id',
  itemTitleKey: 'title',
  itemDivTitleKey: 'title',
  itemGroupKey: 'group',
  itemTimeStartKey: 'start_time',
  itemTimeEndKey: 'end_time'
};

var defaultTimeSteps = exports.defaultTimeSteps = {
  second: 1,
  minute: 1,
  hour: 1,
  day: 1,
  month: 1,
  year: 1
};

var defaultHeaderLabelFormats = exports.defaultHeaderLabelFormats = {
  yearShort: 'YY',
  yearLong: 'YYYY',
  monthShort: 'MM/YY',
  monthMedium: 'MM/YYYY',
  monthMediumLong: 'MMM YYYY',
  monthLong: 'MMMM YYYY',
  dayShort: 'L',
  dayLong: 'dddd, LL',
  hourShort: 'HH',
  hourMedium: 'HH:00',
  hourMediumLong: 'L, HH:00',
  hourLong: 'dddd, LL, HH:00',
  time: 'LLL'
};

var defaultSubHeaderLabelFormats = exports.defaultSubHeaderLabelFormats = {
  yearShort: 'YY',
  yearLong: 'YYYY',
  monthShort: 'MM',
  monthMedium: 'MMM',
  monthLong: 'MMMM',
  dayShort: 'D',
  dayMedium: 'dd D',
  dayMediumLong: 'ddd, Do',
  dayLong: 'dddd, Do',
  hourShort: 'HH',
  hourLong: 'HH:00',
  minuteShort: 'mm',
  minuteLong: 'HH:mm'
};

var ReactCalendarTimeline = function (_Component) {
  _inherits(ReactCalendarTimeline, _Component);

  function ReactCalendarTimeline(props) {
    _classCallCheck(this, ReactCalendarTimeline);

    var _this = _possibleConstructorReturn(this, (ReactCalendarTimeline.__proto__ || Object.getPrototypeOf(ReactCalendarTimeline)).call(this, props));

    _initialiseProps.call(_this);

    var visibleTimeStart = null;
    var visibleTimeEnd = null;

    if (_this.props.defaultTimeStart && _this.props.defaultTimeEnd) {
      visibleTimeStart = _this.props.defaultTimeStart.valueOf();
      visibleTimeEnd = _this.props.defaultTimeEnd.valueOf();
    } else if (_this.props.visibleTimeStart && _this.props.visibleTimeEnd) {
      visibleTimeStart = _this.props.visibleTimeStart;
      visibleTimeEnd = _this.props.visibleTimeEnd;
    } else {
      visibleTimeStart = Math.min.apply(Math, _toConsumableArray(_this.props.items.map(function (item) {
        return (0, _utils._get)(item, 'start').getTime();
      })));
      visibleTimeEnd = Math.max.apply(Math, _toConsumableArray(_this.props.items.map(function (item) {
        return (0, _utils._get)(item, 'end').getTime();
      })));

      if (!visibleTimeStart || !visibleTimeEnd) {
        visibleTimeStart = new Date().getTime() - 86400 * 7 * 1000;
        visibleTimeEnd = new Date().getTime() + 86400 * 7 * 1000;
      }

      if (_this.props.onTimeInit) {
        _this.props.onTimeInit(visibleTimeStart, visibleTimeEnd);
      }
    }

    _this.state = {
      width: 1000,

      visibleTimeStart: visibleTimeStart,
      visibleTimeEnd: visibleTimeEnd,
      canvasTimeStart: visibleTimeStart - (visibleTimeEnd - visibleTimeStart),

      selectedItem: null,
      dragTime: null,
      dragGroupTitle: null,
      resizeTime: null,
      isDragging: false,
      topOffset: 0,
      resizingItem: null,
      resizingEdge: null
    };

    var _this$stackItems = _this.stackItems(props.items, props.groups, _this.state.canvasTimeStart, _this.state.visibleTimeStart, _this.state.visibleTimeEnd, _this.state.width),
        dimensionItems = _this$stackItems.dimensionItems,
        height = _this$stackItems.height,
        groupHeights = _this$stackItems.groupHeights,
        groupTops = _this$stackItems.groupTops;

    _this.state.dimensionItems = dimensionItems;
    _this.state.height = height;
    _this.state.groupHeights = groupHeights;
    _this.state.groupTops = groupTops;
    return _this;
  }

  _createClass(ReactCalendarTimeline, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.resize(this.props);

      if (this.props.resizeDetector && this.props.resizeDetector.addListener) {
        this.props.resizeDetector.addListener(this);
      }

      _window2.default.addListener(this);

      this.lastTouchDistance = null;

      this.refs.scrollComponent.addEventListener('touchstart', this.touchStart);
      this.refs.scrollComponent.addEventListener('touchmove', this.touchMove);
      this.refs.scrollComponent.addEventListener('touchend', this.touchEnd);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.props.resizeDetector && this.props.resizeDetector.addListener) {
        this.props.resizeDetector.removeListener(this);
      }

      _window2.default.removeListener(this);

      this.refs.scrollComponent.removeEventListener('touchstart', this.touchStart);
      this.refs.scrollComponent.removeEventListener('touchmove', this.touchMove);
      this.refs.scrollComponent.removeEventListener('touchend', this.touchEnd);
    }
  }, {
    key: '__touchStart__REACT_HOT_LOADER__',
    value: function __touchStart__REACT_HOT_LOADER__(e) {
      if (e.touches.length === 2) {
        e.preventDefault();

        this.lastTouchDistance = Math.abs(e.touches[0].screenX - e.touches[1].screenX);
        this.singleTouchStart = null;
        this.lastSingleTouch = null;
      } else if (e.touches.length === 1 && this.props.fixedHeader === 'fixed') {
        e.preventDefault();

        var x = e.touches[0].clientX;
        var y = e.touches[0].clientY;

        this.lastTouchDistance = null;
        this.singleTouchStart = { x: x, y: y, screenY: window.pageYOffset };
        this.lastSingleTouch = { x: x, y: y, screenY: window.pageYOffset };
      }
    }
  }, {
    key: '__touchMove__REACT_HOT_LOADER__',
    value: function __touchMove__REACT_HOT_LOADER__(e) {
      if (this.state.dragTime || this.state.resizeTime) {
        e.preventDefault();
        return;
      }
      if (this.lastTouchDistance && e.touches.length === 2) {
        e.preventDefault();

        var touchDistance = Math.abs(e.touches[0].screenX - e.touches[1].screenX);

        var parentPosition = (0, _utils.getParentPosition)(e.currentTarget);
        var xPosition = (e.touches[0].screenX + e.touches[1].screenX) / 2 - parentPosition.x;

        if (touchDistance !== 0 && this.lastTouchDistance !== 0) {
          this.changeZoom(this.lastTouchDistance / touchDistance, xPosition / this.state.width);
          this.lastTouchDistance = touchDistance;
        }
      } else if (this.lastSingleTouch && e.touches.length === 1 && this.props.fixedHeader === 'fixed') {
        e.preventDefault();

        var x = e.touches[0].clientX;
        var y = e.touches[0].clientY;

        var deltaX = x - this.lastSingleTouch.x;
        // let deltaY = y - this.lastSingleTouch.y

        var deltaX0 = x - this.singleTouchStart.x;
        var deltaY0 = y - this.singleTouchStart.y;

        this.lastSingleTouch = { x: x, y: y };

        var moveX = Math.abs(deltaX0) * 3 > Math.abs(deltaY0);
        var moveY = Math.abs(deltaY0) * 3 > Math.abs(deltaX0);

        if (deltaX !== 0 && moveX) {
          this.refs.scrollComponent.scrollLeft -= deltaX;
        }
        if (moveY) {
          window.scrollTo(window.pageXOffset, this.singleTouchStart.screenY - deltaY0);
        }
      }
    }
  }, {
    key: '__touchEnd__REACT_HOT_LOADER__',
    value: function __touchEnd__REACT_HOT_LOADER__(e) {
      if (this.lastTouchDistance) {
        e.preventDefault();

        this.lastTouchDistance = null;
      }
      if (this.lastSingleTouch) {
        e.preventDefault();

        this.lastSingleTouch = null;
        this.singleTouchStart = null;
      }
    }
  }, {
    key: '__resize__REACT_HOT_LOADER__',
    value: function __resize__REACT_HOT_LOADER__() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;

      var _refs$container$getBo = this.refs.container.getBoundingClientRect(),
          containerWidth = _refs$container$getBo.width,
          containerTop = _refs$container$getBo.top;

      var width = containerWidth - props.sidebarWidth - props.rightSidebarWidth;

      var _stackItems = this.stackItems(props.items, props.groups, this.state.canvasTimeStart, this.state.visibleTimeStart, this.state.visibleTimeEnd, width),
          dimensionItems = _stackItems.dimensionItems,
          height = _stackItems.height,
          groupHeights = _stackItems.groupHeights,
          groupTops = _stackItems.groupTops;

      this.setState({
        width: width,
        topOffset: containerTop + window.pageYOffset,
        dimensionItems: dimensionItems,
        height: height,
        groupHeights: groupHeights,
        groupTops: groupTops
      });
      this.refs.scrollComponent.scrollLeft = width;
    }
  }, {
    key: '__onScroll__REACT_HOT_LOADER__',
    value: function __onScroll__REACT_HOT_LOADER__() {
      var scrollComponent = this.refs.scrollComponent;
      var canvasTimeStart = this.state.canvasTimeStart;
      var scrollX = scrollComponent.scrollLeft;
      var zoom = this.state.visibleTimeEnd - this.state.visibleTimeStart;
      var width = this.state.width;
      var visibleTimeStart = canvasTimeStart + zoom * scrollX / width;

      // move the virtual canvas if needed
      if (scrollX < this.state.width * 0.5) {
        this.setState({
          canvasTimeStart: this.state.canvasTimeStart - zoom
        });
        scrollComponent.scrollLeft += this.state.width;
      }
      if (scrollX > this.state.width * 1.5) {
        this.setState({
          canvasTimeStart: this.state.canvasTimeStart + zoom
        });
        scrollComponent.scrollLeft -= this.state.width;
      }

      if (this.state.visibleTimeStart !== visibleTimeStart || this.state.visibleTimeEnd !== visibleTimeStart + zoom) {
        this.props.onTimeChange.bind(this)(visibleTimeStart, visibleTimeStart + zoom, this.updateScrollCanvas);
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var visibleTimeStart = nextProps.visibleTimeStart,
          visibleTimeEnd = nextProps.visibleTimeEnd,
          items = nextProps.items,
          groups = nextProps.groups,
          sidebarWidth = nextProps.sidebarWidth;


      if (visibleTimeStart && visibleTimeEnd) {
        this.updateScrollCanvas(visibleTimeStart, visibleTimeEnd, items !== this.props.items || groups !== this.props.groups, items, groups);
      } else if (items !== this.props.items || groups !== this.props.groups) {
        this.updateDimensions(items, groups);
      }

      if (sidebarWidth && items && groups) {
        this.resize(nextProps);
      }
    }
  }, {
    key: 'updateDimensions',
    value: function updateDimensions(items, groups) {
      var _state = this.state,
          canvasTimeStart = _state.canvasTimeStart,
          visibleTimeStart = _state.visibleTimeStart,
          visibleTimeEnd = _state.visibleTimeEnd,
          width = _state.width;

      var _stackItems2 = this.stackItems(items, groups, canvasTimeStart, visibleTimeStart, visibleTimeEnd, width),
          dimensionItems = _stackItems2.dimensionItems,
          height = _stackItems2.height,
          groupHeights = _stackItems2.groupHeights,
          groupTops = _stackItems2.groupTops;

      this.setState({ dimensionItems: dimensionItems, height: height, groupHeights: groupHeights, groupTops: groupTops });
    }

    // called when the visible time changes

  }, {
    key: '__updateScrollCanvas__REACT_HOT_LOADER__',
    value: function __updateScrollCanvas__REACT_HOT_LOADER__(visibleTimeStart, visibleTimeEnd, forceUpdateDimensions, updatedItems, updatedGroups) {
      var oldCanvasTimeStart = this.state.canvasTimeStart;
      var oldZoom = this.state.visibleTimeEnd - this.state.visibleTimeStart;
      var newZoom = visibleTimeEnd - visibleTimeStart;
      var items = updatedItems || this.props.items;
      var groups = updatedGroups || this.props.groups;
      var fullUpdate = this.props.fullUpdate;


      var newState = {
        visibleTimeStart: visibleTimeStart,
        visibleTimeEnd: visibleTimeEnd
      };

      var resetCanvas = false;

      var canKeepCanvas = visibleTimeStart >= oldCanvasTimeStart + oldZoom * 0.5 && visibleTimeStart <= oldCanvasTimeStart + oldZoom * 1.5 && visibleTimeEnd >= oldCanvasTimeStart + oldZoom * 1.5 && visibleTimeEnd <= oldCanvasTimeStart + oldZoom * 2.5;

      // if new visible time is in the right canvas area
      if (canKeepCanvas) {
        // but we need to update the scroll
        var newScrollLeft = Math.round(this.state.width * (visibleTimeStart - oldCanvasTimeStart) / newZoom);
        if (this.refs.scrollComponent.scrollLeft !== newScrollLeft) {
          resetCanvas = true;
        }
      } else {
        resetCanvas = true;
      }

      if (resetCanvas) {
        // Todo: need to calculate new dimensions
        newState.canvasTimeStart = visibleTimeStart - newZoom;
        this.refs.scrollComponent.scrollLeft = this.state.width;

        if (this.props.onBoundsChange) {
          this.props.onBoundsChange(newState.canvasTimeStart, newState.canvasTimeStart + newZoom * 3);
        }
      }

      if (resetCanvas || forceUpdateDimensions || fullUpdate) {
        var canvasTimeStart = newState.canvasTimeStart ? newState.canvasTimeStart : oldCanvasTimeStart;

        var _stackItems3 = this.stackItems(items, groups, canvasTimeStart, visibleTimeStart, visibleTimeEnd, this.state.width, fullUpdate),
            dimensionItems = _stackItems3.dimensionItems,
            height = _stackItems3.height,
            groupHeights = _stackItems3.groupHeights,
            groupTops = _stackItems3.groupTops;

        newState.dimensionItems = dimensionItems;
        newState.height = height;
        newState.groupHeights = groupHeights;
        newState.groupTops = groupTops;
      }

      this.setState(newState);
    }
  }, {
    key: '__onWheel__REACT_HOT_LOADER__',
    value: function __onWheel__REACT_HOT_LOADER__(e) {
      var traditionalZoom = this.props.traditionalZoom;

      if (e.ctrlKey) {
        e.preventDefault();
        var parentPosition = (0, _utils.getParentPosition)(e.currentTarget);
        var xPosition = e.clientX - parentPosition.x;
        this.changeZoom(1.0 + e.deltaY / 50, xPosition / this.state.width);
      } else if (e.shiftKey) {
        e.preventDefault();
        var scrollComponent = this.refs.scrollComponent;
        scrollComponent.scrollLeft += e.deltaY;
      } else if (e.altKey) {
        var _parentPosition = (0, _utils.getParentPosition)(e.currentTarget);
        var _xPosition = e.clientX - _parentPosition.x;
        this.changeZoom(1.0 + e.deltaY / 500, _xPosition / this.state.width);
      } else {
        if (this.props.fixedHeader === 'fixed') {
          e.preventDefault();
          if (e.deltaX !== 0) {
            if (!traditionalZoom) {
              this.refs.scrollComponent.scrollLeft += e.deltaX;
            }
          }
          if (e.deltaY !== 0) {
            window.scrollTo(window.pageXOffset, window.pageYOffset + e.deltaY);
            if (traditionalZoom) {
              var _parentPosition2 = (0, _utils.getParentPosition)(e.currentTarget);
              var _xPosition2 = e.clientX - _parentPosition2.x;
              this.changeZoom(1.0 + e.deltaY / 50, _xPosition2 / this.state.width);
            }
          }
        }
      }
    }
  }, {
    key: 'zoomIn',
    value: function zoomIn(e) {
      e.preventDefault();

      this.changeZoom(0.75);
    }
  }, {
    key: 'zoomOut',
    value: function zoomOut(e) {
      e.preventDefault();

      this.changeZoom(1.25);
    }
  }, {
    key: 'changeZoom',
    value: function changeZoom(scale) {
      var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.5;
      var _props = this.props,
          minZoom = _props.minZoom,
          maxZoom = _props.maxZoom;

      var oldZoom = this.state.visibleTimeEnd - this.state.visibleTimeStart;
      var newZoom = Math.min(Math.max(Math.round(oldZoom * scale), minZoom), maxZoom); // min 1 min, max 20 years
      var newVisibleTimeStart = Math.round(this.state.visibleTimeStart + (oldZoom - newZoom) * offset);

      this.props.onTimeChange.bind(this)(newVisibleTimeStart, newVisibleTimeStart + newZoom, this.updateScrollCanvas);
    }
  }, {
    key: '__showPeriod__REACT_HOT_LOADER__',
    value: function __showPeriod__REACT_HOT_LOADER__(from, unit) {
      var visibleTimeStart = from.valueOf();
      var visibleTimeEnd = (0, _moment2.default)(from).add(1, unit).valueOf();
      var zoom = visibleTimeEnd - visibleTimeStart;

      // can't zoom in more than to show one hour
      if (zoom < 360000) {
        return;
      }

      // clicked on the big header and already focused here, zoom out
      if (unit !== 'year' && this.state.visibleTimeStart === visibleTimeStart && this.state.visibleTimeEnd === visibleTimeEnd) {
        var nextUnit = (0, _utils.getNextUnit)(unit);

        visibleTimeStart = from.startOf(nextUnit).valueOf();
        visibleTimeEnd = (0, _moment2.default)(visibleTimeStart).add(1, nextUnit);
        zoom = visibleTimeEnd - visibleTimeStart;
      }

      this.props.onTimeChange.bind(this)(visibleTimeStart, visibleTimeStart + zoom, this.updateScrollCanvas);
    }
  }, {
    key: '__selectItem__REACT_HOT_LOADER__',
    value: function __selectItem__REACT_HOT_LOADER__(item, clickType, e) {
      if (this.state.selectedItem === item || this.props.itemTouchSendsClick && clickType === 'touch') {
        if (item && this.props.onItemClick) {
          this.props.onItemClick(item, e);
        }
      } else {
        this.setState({ selectedItem: item });
        if (item && this.props.onItemSelect) {
          this.props.onItemSelect(item, e);
        } else if (item === null && this.props.onItemDeselect) {
          this.props.onItemDeselect(e);
        }
      }
    }
  }, {
    key: 'rowAndTimeFromEvent',
    value: function rowAndTimeFromEvent(e) {
      var _props2 = this.props,
          lineHeight = _props2.lineHeight,
          dragSnap = _props2.dragSnap;
      var _state2 = this.state,
          width = _state2.width,
          visibleTimeStart = _state2.visibleTimeStart,
          visibleTimeEnd = _state2.visibleTimeEnd;


      var parentPosition = (0, _utils.getParentPosition)(e.currentTarget);
      var x = e.clientX - parentPosition.x;
      var y = e.clientY - parentPosition.y;

      var row = Math.floor((y - lineHeight * 2) / lineHeight);
      var time = Math.round(visibleTimeStart + x / width * (visibleTimeEnd - visibleTimeStart));
      time = Math.floor(time / dragSnap) * dragSnap;

      return [row, time];
    }
  }, {
    key: '__scrollAreaClick__REACT_HOT_LOADER__',
    value: function __scrollAreaClick__REACT_HOT_LOADER__(e) {
      // if not clicking on an item

      if (!(0, _utils.hasSomeParentTheClass)(e.target, 'rct-item')) {
        if (this.state.selectedItem) {
          this.selectItem(null);
        } else if (this.props.onCanvasClick) {
          var _rowAndTimeFromEvent = this.rowAndTimeFromEvent(e),
              _rowAndTimeFromEvent2 = _slicedToArray(_rowAndTimeFromEvent, 2),
              row = _rowAndTimeFromEvent2[0],
              time = _rowAndTimeFromEvent2[1];

          if (row >= 0 && row < this.props.groups.length) {
            var groupId = (0, _utils._get)(this.props.groups[row], this.props.keys.groupIdKey);
            this.props.onCanvasClick(groupId, time, e);
          }
        }
      }
    }
  }, {
    key: '__dragItem__REACT_HOT_LOADER__',
    value: function __dragItem__REACT_HOT_LOADER__(item, dragTime, newGroupOrder) {
      var newGroup = this.props.groups[newGroupOrder];
      var keys = this.props.keys;

      this.setState({
        draggingItem: item,
        dragTime: dragTime,
        newGroupOrder: newGroupOrder,
        dragGroupTitle: newGroup ? (0, _utils._get)(newGroup, keys.groupTitleKey) : ''
      });
    }
  }, {
    key: '__dropItem__REACT_HOT_LOADER__',
    value: function __dropItem__REACT_HOT_LOADER__(item, dragTime, newGroupOrder) {
      this.setState({ draggingItem: null, dragTime: null, dragGroupTitle: null });
      if (this.props.onItemMove) {
        this.props.onItemMove(item, dragTime, newGroupOrder);
      }
    }
  }, {
    key: '__resizingItem__REACT_HOT_LOADER__',
    value: function __resizingItem__REACT_HOT_LOADER__(item, resizeTime, edge) {
      this.setState({
        resizingItem: item,
        resizingEdge: edge,
        resizeTime: resizeTime
      });
    }
  }, {
    key: '__resizedItem__REACT_HOT_LOADER__',
    value: function __resizedItem__REACT_HOT_LOADER__(item, resizeTime, edge) {
      this.setState({ resizingItem: null, resizingEdge: null, resizeTime: null });
      if (this.props.onItemResize) {
        this.props.onItemResize(item, resizeTime, edge);
      }
    }
  }, {
    key: '__handleMouseDown__REACT_HOT_LOADER__',
    value: function __handleMouseDown__REACT_HOT_LOADER__(e) {
      var topOffset = this.state.topOffset;
      var pageY = e.pageY;
      var _props3 = this.props,
          headerLabelGroupHeight = _props3.headerLabelGroupHeight,
          headerLabelHeight = _props3.headerLabelHeight;

      var headerHeight = headerLabelGroupHeight + headerLabelHeight;

      if (pageY - topOffset > headerHeight && e.button === 0) {
        this.setState({ isDragging: true, dragStartPosition: e.pageX, dragLastPosition: e.pageX });
      }
    }
  }, {
    key: '__handleMouseMove__REACT_HOT_LOADER__',
    value: function __handleMouseMove__REACT_HOT_LOADER__(e) {
      if (this.state.isDragging && !this.state.draggingItem && !this.state.resizingItem) {
        this.refs.scrollComponent.scrollLeft += this.state.dragLastPosition - e.pageX;
        this.setState({ dragLastPosition: e.pageX });
      }
    }
  }, {
    key: '__handleMouseUp__REACT_HOT_LOADER__',
    value: function __handleMouseUp__REACT_HOT_LOADER__(e) {
      var dragStartPosition = this.state.dragStartPosition;


      if (Math.abs(dragStartPosition - e.pageX) <= this.props.clickTolerance) {
        this.scrollAreaClick(e);
      }

      this.setState({ isDragging: false, dragStartPosition: null, dragLastPosition: null });
    }
  }, {
    key: '__handleCanvasMouseEnter__REACT_HOT_LOADER__',
    value: function __handleCanvasMouseEnter__REACT_HOT_LOADER__(e) {
      var showCursorLine = this.props.showCursorLine;

      if (showCursorLine) {
        this.setState({ mouseOverCanvas: true });
      }

      if (this.props.onCanvasMouseEnter) {
        this.props.onCanvasMouseEnter(e);
      }
    }
  }, {
    key: '__handleCanvasMouseLeave__REACT_HOT_LOADER__',
    value: function __handleCanvasMouseLeave__REACT_HOT_LOADER__(e) {
      var showCursorLine = this.props.showCursorLine;

      if (showCursorLine) {
        this.setState({ mouseOverCanvas: false });
      }

      if (this.props.onCanvasMouseLeave) {
        this.props.onCanvasMouseLeave(e);
      }
    }
  }, {
    key: '__handleCanvasMouseMove__REACT_HOT_LOADER__',
    value: function __handleCanvasMouseMove__REACT_HOT_LOADER__(e) {
      var showCursorLine = this.props.showCursorLine;
      var _state3 = this.state,
          canvasTimeStart = _state3.canvasTimeStart,
          width = _state3.width,
          visibleTimeStart = _state3.visibleTimeStart,
          visibleTimeEnd = _state3.visibleTimeEnd,
          cursorTime = _state3.cursorTime;

      var zoom = visibleTimeEnd - visibleTimeStart;
      var canvasTimeEnd = canvasTimeStart + zoom * 3;
      var canvasWidth = width * 3;
      var pageX = e.pageX;

      var ratio = (canvasTimeEnd - canvasTimeStart) / canvasWidth;
      var boundingRect = this.refs.scrollComponent.getBoundingClientRect();
      var timePosition = visibleTimeStart + ratio * (pageX - boundingRect.left);

      if (this.props.dragSnap) {
        timePosition = Math.round(timePosition / this.props.dragSnap) * this.props.dragSnap;
      }

      if (this.props.onCanvasMouseMove) {
        this.props.onCanvasMouseMove(e);
      }

      if (cursorTime !== timePosition && showCursorLine) {
        this.setState({ cursorTime: timePosition, mouseOverCanvas: true });
      }
    }
  }, {
    key: 'todayLine',
    value: function todayLine(canvasTimeStart, zoom, canvasTimeEnd, canvasWidth, minUnit, height, headerHeight) {
      return _react2.default.createElement(_TodayLine2.default, { canvasTimeStart: canvasTimeStart,
        canvasTimeEnd: canvasTimeEnd,
        canvasWidth: canvasWidth,
        lineHeight: this.props.lineHeight,
        lineCount: (0, _utils._length)(this.props.groups),
        height: height,
        headerHeight: headerHeight
      });
    }
  }, {
    key: 'cursorLine',
    value: function cursorLine(cursorTime, canvasTimeStart, zoom, canvasTimeEnd, canvasWidth, minUnit, height, headerHeight) {
      return _react2.default.createElement(_CursorLine2.default, { cursorTime: cursorTime,
        canvasTimeStart: canvasTimeStart,
        canvasTimeEnd: canvasTimeEnd,
        canvasWidth: canvasWidth,
        lineHeight: this.props.lineHeight,
        lineCount: (0, _utils._length)(this.props.groups),
        height: height,
        headerHeight: headerHeight
      });
    }
  }, {
    key: 'verticalLines',
    value: function verticalLines(canvasTimeStart, zoom, canvasTimeEnd, canvasWidth, minUnit, timeSteps, height, headerHeight) {
      return _react2.default.createElement(_VerticalLines2.default, { canvasTimeStart: canvasTimeStart,
        canvasTimeEnd: canvasTimeEnd,
        canvasWidth: canvasWidth,
        lineHeight: this.props.lineHeight,
        lineCount: (0, _utils._length)(this.props.groups),
        minUnit: minUnit,
        timeSteps: timeSteps,
        fixedHeader: this.props.fixedHeader,
        height: height,
        headerHeight: headerHeight
      });
    }
  }, {
    key: 'horizontalLines',
    value: function horizontalLines(canvasTimeStart, zoom, canvasTimeEnd, canvasWidth, groupHeights, headerHeight) {
      return _react2.default.createElement(_HorizontalLines2.default, { canvasWidth: canvasWidth,
        lineHeight: this.props.lineHeight,
        lineCount: (0, _utils._length)(this.props.groups),
        groups: this.props.groups,
        groupHeights: groupHeights,
        headerHeight: headerHeight
      });
    }
  }, {
    key: 'items',
    value: function items(canvasTimeStart, zoom, canvasTimeEnd, canvasWidth, minUnit, dimensionItems, groupHeights, groupTops) {
      return _react2.default.createElement(_Items2.default, { canvasTimeStart: canvasTimeStart,
        canvasTimeEnd: canvasTimeEnd,
        canvasWidth: canvasWidth,
        lineHeight: this.props.lineHeight,
        lineCount: (0, _utils._length)(this.props.groups),
        dimensionItems: dimensionItems,
        minUnit: minUnit,
        groupHeights: groupHeights,
        groupTops: groupTops,
        items: this.props.items,
        groups: this.props.groups,
        keys: this.props.keys,
        selectedItem: this.state.selectedItem,
        dragSnap: this.props.dragSnap,
        minResizeWidth: this.props.minResizeWidth,
        canChangeGroup: this.props.canChangeGroup,
        canMove: this.props.canMove,
        canResize: this.props.canResize,
        useResizeHandle: this.props.useResizeHandle,
        canSelect: this.props.canSelect,
        moveResizeValidator: this.props.moveResizeValidator,
        topOffset: this.state.topOffset,
        itemSelect: this.selectItem,
        itemDrag: this.dragItem,
        itemDrop: this.dropItem,
        onItemDoubleClick: this.props.onItemDoubleClick,
        onItemContextMenu: this.props.onItemContextMenu,
        itemResizing: this.resizingItem,
        itemResized: this.resizedItem,
        itemRenderer: this.props.itemRenderer,
        selected: this.props.selected });
    }
  }, {
    key: 'infoLabel',
    value: function infoLabel() {
      var label = null;

      if (this.state.dragTime) {
        label = (0, _moment2.default)(this.state.dragTime).format('LLL') + ', ' + this.state.dragGroupTitle;
      } else if (this.state.resizeTime) {
        label = (0, _moment2.default)(this.state.resizeTime).format('LLL');
      }

      return label ? _react2.default.createElement(_InfoLabel2.default, { label: label }) : '';
    }
  }, {
    key: 'header',
    value: function header(canvasTimeStart, zoom, canvasTimeEnd, canvasWidth, minUnit, timeSteps, headerLabelGroupHeight, headerLabelHeight) {
      return _react2.default.createElement(_Header2.default, { canvasTimeStart: canvasTimeStart,
        hasRightSidebar: this.props.rightSidebarWidth > 0,
        canvasTimeEnd: canvasTimeEnd,
        canvasWidth: canvasWidth,
        lineHeight: this.props.lineHeight,
        minUnit: minUnit,
        timeSteps: timeSteps,
        headerLabelGroupHeight: headerLabelGroupHeight,
        headerLabelHeight: headerLabelHeight,
        width: this.state.width,
        zoom: zoom,
        visibleTimeStart: this.state.visibleTimeStart,
        visibleTimeEnd: this.state.visibleTimeEnd,
        fixedHeader: this.props.fixedHeader,
        zIndex: this.props.zIndexStart + 1,
        showPeriod: this.showPeriod,
        headerLabelFormats: this.props.headerLabelFormats,
        subHeaderLabelFormats: this.props.subHeaderLabelFormats });
    }
  }, {
    key: 'sidebar',
    value: function sidebar(height, groupHeights, headerHeight) {
      return _react2.default.createElement(
        _Sidebar2.default,
        { groups: this.props.groups,
          groupRenderer: this.props.groupRenderer,
          keys: this.props.keys,

          width: this.props.sidebarWidth,
          lineHeight: this.props.lineHeight,
          groupHeights: groupHeights,
          height: height,
          headerHeight: headerHeight,

          fixedHeader: this.props.fixedHeader,
          zIndex: this.props.zIndexStart + 2 },
        this.props.sidebarContent || this.props.children
      );
    }
  }, {
    key: 'rightSidebar',
    value: function rightSidebar(height, groupHeights, headerHeight) {
      return _react2.default.createElement(
        _Sidebar2.default,
        { groups: this.props.groups,
          keys: this.props.keys,
          isRightSidebar: true,

          width: this.props.rightSidebarWidth,
          lineHeight: this.props.lineHeight,
          groupHeights: groupHeights,
          height: height,
          headerHeight: headerHeight,

          fixedHeader: this.props.fixedHeader,
          zIndex: this.props.zIndexStart + 2 },
        this.props.rightSidebarContent
      );
    }
  }, {
    key: 'stackItems',
    value: function stackItems(items, groups, canvasTimeStart, visibleTimeStart, visibleTimeEnd, width) {
      // if there are no groups return an empty array of dimensions
      if (groups.length === 0) {
        return {
          dimensionItems: [],
          height: 0,
          groupHeights: 0,
          groupTops: 0
        };
      }

      var _props4 = this.props,
          keys = _props4.keys,
          dragSnap = _props4.dragSnap,
          lineHeight = _props4.lineHeight,
          headerLabelGroupHeight = _props4.headerLabelGroupHeight,
          headerLabelHeight = _props4.headerLabelHeight,
          stackItems = _props4.stackItems,
          fullUpdate = _props4.fullUpdate,
          itemHeightRatio = _props4.itemHeightRatio,
          customHeightCalculator = _props4.customHeightCalculator;
      var _state4 = this.state,
          draggingItem = _state4.draggingItem,
          dragTime = _state4.dragTime,
          resizingItem = _state4.resizingItem,
          resizingEdge = _state4.resizingEdge,
          resizeTime = _state4.resizeTime,
          newGroupOrder = _state4.newGroupOrder;

      var zoom = visibleTimeEnd - visibleTimeStart;
      var canvasTimeEnd = canvasTimeStart + zoom * 3;
      var canvasWidth = width * 3;
      var headerHeight = headerLabelGroupHeight + headerLabelHeight;

      var visibleItems = (0, _utils.getVisibleItems)(items, canvasTimeStart, canvasTimeEnd, keys);
      var groupOrders = (0, _utils.getGroupOrders)(groups, keys);

      var dimensionItems = visibleItems.map(function (item) {
        return {
          id: (0, _utils._get)(item, keys.itemIdKey),
          dimensions: (0, _utils.calculateDimensions)({
            item: item,
            order: groupOrders[(0, _utils._get)(item, keys.itemGroupKey)],
            keys: keys,
            canvasTimeStart: canvasTimeStart,
            canvasTimeEnd: canvasTimeEnd,
            canvasWidth: canvasWidth,
            dragSnap: dragSnap,
            lineHeight: lineHeight,
            draggingItem: draggingItem,
            dragTime: dragTime,
            resizingItem: resizingItem,
            resizingEdge: resizingEdge,
            resizeTime: resizeTime,
            newGroupOrder: newGroupOrder,
            itemHeightRatio: itemHeightRatio,
            fullUpdate: fullUpdate,
            visibleTimeStart: visibleTimeStart,
            visibleTimeEnd: visibleTimeEnd,
            customHeightCalculator: customHeightCalculator
          })
        };
      }).filter(function (i) {
        return i.dimensions;
      });

      var stackingMethod = stackItems ? _utils.stack : _utils.nostack;

      var _stackingMethod = stackingMethod(dimensionItems, groupOrders, lineHeight, headerHeight),
          height = _stackingMethod.height,
          groupHeights = _stackingMethod.groupHeights,
          groupTops = _stackingMethod.groupTops;

      return { dimensionItems: dimensionItems, height: height, groupHeights: groupHeights, groupTops: groupTops };
    }
  }, {
    key: '__handleDoubleClick__REACT_HOT_LOADER__',
    value: function __handleDoubleClick__REACT_HOT_LOADER__(e) {
      var _state5 = this.state,
          canvasTimeStart = _state5.canvasTimeStart,
          width = _state5.width,
          visibleTimeStart = _state5.visibleTimeStart,
          visibleTimeEnd = _state5.visibleTimeEnd,
          groupTops = _state5.groupTops,
          topOffset = _state5.topOffset;

      var zoom = visibleTimeEnd - visibleTimeStart;
      var canvasTimeEnd = canvasTimeStart + zoom * 3;
      var canvasWidth = width * 3;
      var pageX = e.pageX,
          pageY = e.pageY;

      var ratio = (canvasTimeEnd - canvasTimeStart) / canvasWidth;
      var boundingRect = this.refs.scrollComponent.getBoundingClientRect();
      var timePosition = visibleTimeStart + ratio * (pageX - boundingRect.left);
      if (this.props.dragSnap) {
        timePosition = Math.round(timePosition / this.props.dragSnap) * this.props.dragSnap;
      }

      var groupIndex = 0;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = Object.keys(groupTops)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var key = _step.value;

          var item = groupTops[key];
          if (pageY - topOffset > item) {
            groupIndex = parseInt(key, 10);
          } else {
            break;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      if (this.props.onCanvasDoubleClick) {
        this.props.onCanvasDoubleClick(this.props.groups[groupIndex], timePosition, e);
      }
    }
  }, {
    key: '__handleCanvasContextMenu__REACT_HOT_LOADER__',
    value: function __handleCanvasContextMenu__REACT_HOT_LOADER__(e) {
      var _state6 = this.state,
          canvasTimeStart = _state6.canvasTimeStart,
          width = _state6.width,
          visibleTimeStart = _state6.visibleTimeStart,
          visibleTimeEnd = _state6.visibleTimeEnd,
          groupTops = _state6.groupTops,
          topOffset = _state6.topOffset;

      var zoom = visibleTimeEnd - visibleTimeStart;
      var canvasTimeEnd = canvasTimeStart + zoom * 3;
      var canvasWidth = width * 3;
      var pageX = e.pageX,
          pageY = e.pageY;

      var ratio = (canvasTimeEnd - canvasTimeStart) / canvasWidth;
      var boundingRect = this.refs.scrollComponent.getBoundingClientRect();
      var timePosition = visibleTimeStart + ratio * (pageX - boundingRect.left);
      if (this.props.dragSnap) {
        timePosition = Math.round(timePosition / this.props.dragSnap) * this.props.dragSnap;
      }

      var groupIndex = 0;
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = Object.keys(groupTops)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var key = _step2.value;

          var item = groupTops[key];
          if (pageY - topOffset > item) {
            groupIndex = parseInt(key, 10);
          } else {
            break;
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      if (this.props.onCanvasContextMenu) {
        e.preventDefault();
        this.props.onCanvasContextMenu(this.props.groups[groupIndex], timePosition, e);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props5 = this.props,
          items = _props5.items,
          groups = _props5.groups,
          headerLabelGroupHeight = _props5.headerLabelGroupHeight,
          headerLabelHeight = _props5.headerLabelHeight,
          sidebarWidth = _props5.sidebarWidth,
          rightSidebarWidth = _props5.rightSidebarWidth,
          timeSteps = _props5.timeSteps,
          showCursorLine = _props5.showCursorLine;
      var _state7 = this.state,
          draggingItem = _state7.draggingItem,
          resizingItem = _state7.resizingItem,
          isDragging = _state7.isDragging,
          width = _state7.width,
          visibleTimeStart = _state7.visibleTimeStart,
          visibleTimeEnd = _state7.visibleTimeEnd,
          canvasTimeStart = _state7.canvasTimeStart,
          mouseOverCanvas = _state7.mouseOverCanvas,
          cursorTime = _state7.cursorTime;
      var _state8 = this.state,
          dimensionItems = _state8.dimensionItems,
          height = _state8.height,
          groupHeights = _state8.groupHeights,
          groupTops = _state8.groupTops;


      var zoom = visibleTimeEnd - visibleTimeStart;
      var canvasTimeEnd = canvasTimeStart + zoom * 3;
      var canvasWidth = width * 3;
      var minUnit = (0, _utils.getMinUnit)(zoom, width, timeSteps);
      var headerHeight = headerLabelGroupHeight + headerLabelHeight;

      if (draggingItem || resizingItem) {
        var stackResults = this.stackItems(items, groups, canvasTimeStart, visibleTimeStart, visibleTimeEnd, width);
        dimensionItems = stackResults.dimensionItems;
        height = stackResults.height;
        groupHeights = stackResults.groupHeights;
        groupTops = stackResults.groupTops;
      }
      if (this.props.minHeight && height < this.props.minHeight && (0, _utils._length)(groups) > 0) {
        var lineCount = (0, _utils._length)(groups);
        var perGroup = this.props.minHeight / lineCount;
        for (var i = 0; i < lineCount; i++) {
          groupHeights[i] += perGroup;
        }
        height = this.props.minHeight;
      }

      var outerComponentStyle = {
        height: height + 'px'
      };

      var scrollComponentStyle = {
        width: width + 'px',
        height: height + 20 + 'px',
        cursor: isDragging ? 'move' : 'default'
      };

      var canvasComponentStyle = {
        width: canvasWidth + 'px',
        height: height + 'px'
      };

      return _react2.default.createElement(
        'div',
        { style: this.props.style, ref: 'container', className: 'react-calendar-timeline' },
        _react2.default.createElement(
          'div',
          { style: outerComponentStyle, className: 'rct-outer' },
          sidebarWidth > 0 ? this.sidebar(height, groupHeights, headerHeight) : null,
          _react2.default.createElement(
            'div',
            { ref: 'scrollComponent',
              className: 'rct-scroll',
              style: scrollComponentStyle,
              onScroll: this.onScroll,
              onWheel: this.onWheel,
              onMouseDown: this.handleMouseDown,
              onMouseMove: this.handleMouseMove,
              onMouseUp: this.handleMouseUp
            },
            _react2.default.createElement(
              'div',
              { ref: 'canvasComponent',
                className: 'rct-canvas',
                style: canvasComponentStyle,
                onDoubleClick: this.handleDoubleClick,
                onMouseEnter: this.handleCanvasMouseEnter,
                onMouseLeave: this.handleCanvasMouseLeave,
                onMouseMove: this.handleCanvasMouseMove,
                onContextMenu: this.handleCanvasContextMenu
              },
              this.items(canvasTimeStart, zoom, canvasTimeEnd, canvasWidth, minUnit, dimensionItems, groupHeights, groupTops),
              this.verticalLines(canvasTimeStart, zoom, canvasTimeEnd, canvasWidth, minUnit, timeSteps, height, headerHeight),
              this.horizontalLines(canvasTimeStart, zoom, canvasTimeEnd, canvasWidth, groupHeights, headerHeight),
              this.todayLine(canvasTimeStart, zoom, canvasTimeEnd, canvasWidth, minUnit, height, headerHeight),
              mouseOverCanvas && showCursorLine ? this.cursorLine(cursorTime, canvasTimeStart, zoom, canvasTimeEnd, canvasWidth, minUnit, height, headerHeight) : null,
              this.infoLabel(),
              this.header(canvasTimeStart, zoom, canvasTimeEnd, canvasWidth, minUnit, timeSteps, headerLabelGroupHeight, headerLabelHeight)
            )
          ),
          rightSidebarWidth > 0 ? this.rightSidebar(height, groupHeights, headerHeight) : null
        )
      );
    }
  }]);

  return ReactCalendarTimeline;
}(_react.Component);

ReactCalendarTimeline.propTypes = {
  groups: _react.PropTypes.oneOfType([_react.PropTypes.array, _react.PropTypes.object]).isRequired,
  items: _react.PropTypes.oneOfType([_react.PropTypes.array, _react.PropTypes.object]).isRequired,
  sidebarWidth: _react.PropTypes.number,
  sidebarContent: _react.PropTypes.node,
  rightSidebarWidth: _react.PropTypes.number,
  rightSidebarContent: _react.PropTypes.node,
  dragSnap: _react.PropTypes.number,
  minResizeWidth: _react.PropTypes.number,
  fixedHeader: _react.PropTypes.oneOf(['fixed', 'absolute', 'none']),
  fullUpdate: _react.PropTypes.bool,
  zIndexStart: _react.PropTypes.number,
  lineHeight: _react.PropTypes.number,
  headerLabelGroupHeight: _react.PropTypes.number,
  headerLabelHeight: _react.PropTypes.number,
  minHeight: _react.PropTypes.number,
  itemHeightRatio: _react.PropTypes.number,

  minZoom: _react.PropTypes.number,
  maxZoom: _react.PropTypes.number,

  clickTolerance: _react.PropTypes.number,

  canChangeGroup: _react.PropTypes.bool,
  canMove: _react.PropTypes.bool,
  canResize: _react.PropTypes.oneOf([true, false, 'left', 'right', 'both']),
  useResizeHandle: _react.PropTypes.bool,
  canSelect: _react.PropTypes.bool,

  stackItems: _react.PropTypes.bool,

  traditionalZoom: _react.PropTypes.bool,
  showCursorLine: _react.PropTypes.bool,

  itemTouchSendsClick: _react.PropTypes.bool,

  onItemMove: _react.PropTypes.func,
  onItemResize: _react.PropTypes.func,
  onItemClick: _react.PropTypes.func,
  onItemSelect: _react.PropTypes.func,
  onItemDeselect: _react.PropTypes.func,
  onCanvasClick: _react.PropTypes.func,
  onItemDoubleClick: _react.PropTypes.func,
  onItemContextMenu: _react.PropTypes.func,
  onCanvasDoubleClick: _react.PropTypes.func,
  onCanvasContextMenu: _react.PropTypes.func,
  onCanvasMouseEnter: _react.PropTypes.func,
  onCanvasMouseLeave: _react.PropTypes.func,
  onCanvasMouseMove: _react.PropTypes.func,

  moveResizeValidator: _react.PropTypes.func,
  itemRenderer: _react.PropTypes.func,
  groupRenderer: _react.PropTypes.func,
  customHeightCalculator: _react.PropTypes.func,

  dayBackground: _react.PropTypes.func,

  style: _react.PropTypes.object,

  keys: _react.PropTypes.shape({
    groupIdKey: _react.PropTypes.string,
    groupTitleKey: _react.PropTypes.string,
    groupRightTitleKey: _react.PropTypes.string,
    itemIdKey: _react.PropTypes.string,
    itemTitleKey: _react.PropTypes.string,
    itemDivTitleKey: _react.PropTypes.string,
    itemGroupKey: _react.PropTypes.string,
    itemTimeStartKey: _react.PropTypes.string,
    itemTimeEndKey: _react.PropTypes.string
  }),

  timeSteps: _react.PropTypes.shape({
    second: _react.PropTypes.number,
    minute: _react.PropTypes.number,
    hour: _react.PropTypes.number,
    day: _react.PropTypes.number,
    month: _react.PropTypes.number,
    year: _react.PropTypes.number
  }),

  defaultTimeStart: _react.PropTypes.object,
  defaultTimeEnd: _react.PropTypes.object,

  visibleTimeStart: _react.PropTypes.number,
  visibleTimeEnd: _react.PropTypes.number,
  onTimeChange: _react.PropTypes.func,
  onTimeInit: _react.PropTypes.func,
  onBoundsChange: _react.PropTypes.func,

  selected: _react.PropTypes.array,

  headerLabelFormats: _react.PropTypes.shape({
    yearShort: _react.PropTypes.string,
    yearLong: _react.PropTypes.string,
    monthShort: _react.PropTypes.string,
    monthMedium: _react.PropTypes.string,
    monthMediumLong: _react.PropTypes.string,
    monthLong: _react.PropTypes.string,
    dayShort: _react.PropTypes.string,
    dayLong: _react.PropTypes.string,
    hourShort: _react.PropTypes.string,
    hourMedium: _react.PropTypes.string,
    hourMediumLong: _react.PropTypes.string,
    hourLong: _react.PropTypes.string
  }),

  subHeaderLabelFormats: _react.PropTypes.shape({
    yearShort: _react.PropTypes.string,
    yearLong: _react.PropTypes.string,
    monthShort: _react.PropTypes.string,
    monthMedium: _react.PropTypes.string,
    monthLong: _react.PropTypes.string,
    dayShort: _react.PropTypes.string,
    dayMedium: _react.PropTypes.string,
    dayMediumLong: _react.PropTypes.string,
    dayLong: _react.PropTypes.string,
    hourShort: _react.PropTypes.string,
    hourLong: _react.PropTypes.string,
    minuteShort: _react.PropTypes.string,
    minuteLong: _react.PropTypes.string
  }),

  resizeDetector: _react.PropTypes.shape({
    addListener: _react.PropTypes.func,
    removeListener: _react.PropTypes.func
  }),

  children: _react.PropTypes.node
};
ReactCalendarTimeline.defaultProps = {
  sidebarWidth: 150,
  rightSidebarWidth: 0,
  dragSnap: 1000 * 60 * 15, // 15min
  minResizeWidth: 20,
  fixedHeader: 'none', // fixed or absolute or none
  fullUpdate: true,
  zIndexStart: 10,
  lineHeight: 30,
  headerLabelGroupHeight: 30,
  headerLabelHeight: 30,
  minHeight: 0,
  itemHeightRatio: 0.65,

  minZoom: 60 * 60 * 1000, // 1 hour
  maxZoom: 5 * 365.24 * 86400 * 1000, // 5 years

  clickTolerance: 3, // how many pixels can we drag for it to be still considered a click?

  canChangeGroup: true,
  canMove: true,
  canResize: 'right',
  useResizeHandle: false,
  canSelect: true,

  stackItems: false,

  traditionalZoom: false,
  showCursorLine: false,

  onItemMove: null,
  onItemResize: null,
  onItemClick: null,
  onItemSelect: null,
  onItemDeselect: null,
  onCanvasClick: null,
  onItemDoubleClick: null,
  onItemContextMenu: null,
  onCanvasMouseEnter: null,
  onCanvasMouseLeave: null,
  onCanvasMouseMove: null,

  moveResizeValidator: null,
  customHeightCalculator: null,

  dayBackground: null,

  defaultTimeStart: null,
  defaultTimeEnd: null,

  itemTouchSendsClick: false,

  style: {},
  keys: defaultKeys,
  timeSteps: defaultTimeSteps,

  // if you pass in visibleTimeStart and visibleTimeEnd, you must also pass onTimeChange(visibleTimeStart, visibleTimeEnd),
  // which needs to update the props visibleTimeStart and visibleTimeEnd to the ones passed
  visibleTimeStart: null,
  visibleTimeEnd: null,
  onTimeChange: function onTimeChange(visibleTimeStart, visibleTimeEnd, updateScrollCanvas) {
    updateScrollCanvas(visibleTimeStart, visibleTimeEnd);
  },
  // called after the calendar loads and the visible time has been calculated
  onTimeInit: null,
  // called when the canvas area of the calendar changes
  onBoundsChange: null,
  children: null,

  headerLabelFormats: defaultHeaderLabelFormats,
  subHeaderLabelFormats: defaultSubHeaderLabelFormats,

  selected: null
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.touchStart = function () {
    return _this2.__touchStart__REACT_HOT_LOADER__.apply(_this2, arguments);
  };

  this.touchMove = function () {
    return _this2.__touchMove__REACT_HOT_LOADER__.apply(_this2, arguments);
  };

  this.touchEnd = function () {
    return _this2.__touchEnd__REACT_HOT_LOADER__.apply(_this2, arguments);
  };

  this.resize = function () {
    return _this2.__resize__REACT_HOT_LOADER__.apply(_this2, arguments);
  };

  this.onScroll = function () {
    return _this2.__onScroll__REACT_HOT_LOADER__.apply(_this2, arguments);
  };

  this.updateScrollCanvas = function () {
    return _this2.__updateScrollCanvas__REACT_HOT_LOADER__.apply(_this2, arguments);
  };

  this.onWheel = function () {
    return _this2.__onWheel__REACT_HOT_LOADER__.apply(_this2, arguments);
  };

  this.showPeriod = function () {
    return _this2.__showPeriod__REACT_HOT_LOADER__.apply(_this2, arguments);
  };

  this.selectItem = function () {
    return _this2.__selectItem__REACT_HOT_LOADER__.apply(_this2, arguments);
  };

  this.scrollAreaClick = function () {
    return _this2.__scrollAreaClick__REACT_HOT_LOADER__.apply(_this2, arguments);
  };

  this.dragItem = function () {
    return _this2.__dragItem__REACT_HOT_LOADER__.apply(_this2, arguments);
  };

  this.dropItem = function () {
    return _this2.__dropItem__REACT_HOT_LOADER__.apply(_this2, arguments);
  };

  this.resizingItem = function () {
    return _this2.__resizingItem__REACT_HOT_LOADER__.apply(_this2, arguments);
  };

  this.resizedItem = function () {
    return _this2.__resizedItem__REACT_HOT_LOADER__.apply(_this2, arguments);
  };

  this.handleMouseDown = function () {
    return _this2.__handleMouseDown__REACT_HOT_LOADER__.apply(_this2, arguments);
  };

  this.handleMouseMove = function () {
    return _this2.__handleMouseMove__REACT_HOT_LOADER__.apply(_this2, arguments);
  };

  this.handleMouseUp = function () {
    return _this2.__handleMouseUp__REACT_HOT_LOADER__.apply(_this2, arguments);
  };

  this.handleCanvasMouseEnter = function () {
    return _this2.__handleCanvasMouseEnter__REACT_HOT_LOADER__.apply(_this2, arguments);
  };

  this.handleCanvasMouseLeave = function () {
    return _this2.__handleCanvasMouseLeave__REACT_HOT_LOADER__.apply(_this2, arguments);
  };

  this.handleCanvasMouseMove = function () {
    return _this2.__handleCanvasMouseMove__REACT_HOT_LOADER__.apply(_this2, arguments);
  };

  this.handleDoubleClick = function () {
    return _this2.__handleDoubleClick__REACT_HOT_LOADER__.apply(_this2, arguments);
  };

  this.handleCanvasContextMenu = function () {
    return _this2.__handleCanvasContextMenu__REACT_HOT_LOADER__.apply(_this2, arguments);
  };
};

var _default = ReactCalendarTimeline;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(defaultKeys, 'defaultKeys', 'src/lib/Timeline.js');

  __REACT_HOT_LOADER__.register(defaultTimeSteps, 'defaultTimeSteps', 'src/lib/Timeline.js');

  __REACT_HOT_LOADER__.register(defaultHeaderLabelFormats, 'defaultHeaderLabelFormats', 'src/lib/Timeline.js');

  __REACT_HOT_LOADER__.register(defaultSubHeaderLabelFormats, 'defaultSubHeaderLabelFormats', 'src/lib/Timeline.js');

  __REACT_HOT_LOADER__.register(ReactCalendarTimeline, 'ReactCalendarTimeline', 'src/lib/Timeline.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/lib/Timeline.js');
}();

;