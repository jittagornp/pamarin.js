/**
 * @author  jittagorn pitakmetagoon
 * create  21/03/2013
 * 
 * update  14/04/2013 (jittagorn pitakmetagoon)
 * update  10/04/2013 (jittagorn pitakmetagoon : add to AMD)
 */
define('com.pamarin.web.controller.RightLayoutController', [
    'module',
    'com.pamarin.core.config.Configs',
    'com.pamarin.core.logging.LoggerFactory',
    'com.pamarin.core.util.Cookies',
    'com.jquery.core.JQuery'
], function(module, Configs, LoggerFactory, Cookies, $) {
    var _windowLayoutCookie = new Cookies.Serializer({
        name : Configs['LAYOUT']['WINDOW_LAYOUT_COOKIE']
    });

    var _$window = $(window);
    var _$body = $('body');
    var _$headbar = $('#pmrHeadbar');
    var _$startup = $('#pmrStartup');
    var _$page = $('#pmrPage');
    var _$left = $('#pmrLeft');
    var _$right = $('#pmrRight');
    var _$bottombar = $('#pmrBottombar');
    var _$leftToggle = $('#pmrLeftToggle');



    var _constants = {
        WINDOW_LAYOUT_COOKIE_WIDTH: Configs['LAYOUT']['WINDOW_LAYOUT_COOKIE_WIDTH'],
        WINDOW_LAYOUT_COOKIE_HEIGHT: Configs['LAYOUT']['WINDOW_LAYOUT_COOKIE_HEIGHT'],
        PAGE_LAYOUT_COOKIE_WIDTH: Configs['LAYOUT']['PAGE_LAYOUT_COOKIE_WIDTH'],
        LAYOUT_COOKIE: Configs['LAYOUT']['RIGHT_LAYOUT_COOKIE'],
        LAYOUT_COOKIE_EXPAND: Configs['LAYOUT']['LAYOUT_COOKIE_EXPAND'],
        LAYOUT_COOKIE_COLLAPSE: Configs['LAYOUT']['LAYOUT_COOKIE_COLLAPSE'],
        SLIDE_SPEED_ANIMATION: Configs['LAYOUT']['RIGHT_SLIDE_SPEED_ANIMATION'],
        LEFT_WIDTH: _$left.width(),
        RIGHT_WIDTH: _$right.width(),
        LEFT_TOGGLE_WIDTH: _$leftToggle.width()
    };



    var RightLayout = (function(window) {
        //var log = LoggerFactory.getLogger('Layout.RightLayout');

        function getPageMinWidth() {
            return parseFloat(_$page.css('min-width').replace('px', ''));
        }

        function getPageCurrentSize(windowWidth, right) {
            var pageCurrentSize;
            if (_$left.hasClass('expand')) {
                pageCurrentSize = windowWidth - (_constants.LEFT_WIDTH + right);
            } else {
                pageCurrentSize = windowWidth - _constants.LEFT_TOGGLE_WIDTH - right;
            }

            return pageCurrentSize;
        }

        var Layout = {
            //
            expand: function() {
                var windowWidth = _$window.width();
                var pageCurrentSize = getPageCurrentSize(windowWidth, _constants.RIGHT_WIDTH);
                var pamarinPageMinWidth = getPageMinWidth();

//                if (pageCurrentSize >= pamarinPageMinWidth) {
//                    _$page.width(pageCurrentSize);
//                } else {
//                    _$page.width(pamarinPageMinWidth);
//                }

                _$page.css({
                    marginRight :  _constants.RIGHT_WIDTH 
                });

                _$right.css({
                    'margin-right': '0px'
                }).addClass('expand');

                _$bottombar.width(windowWidth - _constants.RIGHT_WIDTH);
                _$headbar.width(windowWidth - _constants.RIGHT_WIDTH);
            },
            //
            collapse: function() {
                var windowWidth = _$window.width();
                var pageCurrentSize = getPageCurrentSize(windowWidth, 0);

                //_$page.width(pageCurrentSize);
                
                _$page.css({
                    marginRight : 0
                });

                _$right.css({
                    'margin-right': ((-1) * _constants.RIGHT_WIDTH) + 'px'
                }).removeClass('expand');

                _$bottombar.width(windowWidth);
                _$headbar.width(windowWidth);
            },
            //
            animateExpand: function() {
                var windowWidth = _$window.width();
                var pageCurrentSize = getPageCurrentSize(windowWidth, _constants.RIGHT_WIDTH);
                var pamarinPageMinWidth = getPageMinWidth();
                var pageWidth = (pageCurrentSize >= pamarinPageMinWidth) ? pageCurrentSize : pamarinPageMinWidth;

                _$right.trigger({
                    type: 'beforeExpand',
                    state: {
                        pageWidth: pageWidth,
                        rightMarginRight: 0,
                        bottomWidth: windowWidth - _constants.RIGHT_WIDTH,
                        headbarWidth: windowWidth - _constants.RIGHT_WIDTH,
                        speed: _constants.SLIDE_SPEED_ANIMATION
                    }
                });

                _$page.stop().css('width', 'auto').animate({
                    //width: pageWidth
                    marginRight : _constants.RIGHT_WIDTH    
                }, _constants.SLIDE_SPEED_ANIMATION, function() {
                    _$right.trigger({
                        type: 'afterExpand',
                        state: {
                            pageWidth: pageWidth,
                            rightMarginRight: 0,
                            bottomWidth: windowWidth - _constants.RIGHT_WIDTH,
                            headbarWidth: windowWidth - _constants.RIGHT_WIDTH,
                            speed: _constants.SLIDE_SPEED_ANIMATION
                        }
                    });
                });

                _$right.stop().animate({
                    marginRight: 0
                }, _constants.SLIDE_SPEED_ANIMATION, function() {
                
                }).addClass('expand');

                _$bottombar.stop().animate({
                    width: windowWidth - _constants.RIGHT_WIDTH
                }, _constants.SLIDE_SPEED_ANIMATION);

                _$headbar.stop().animate({
                    width: windowWidth - _constants.RIGHT_WIDTH
                }, _constants.SLIDE_SPEED_ANIMATION);

                _windowLayoutCookie.set(_constants.PAGE_LAYOUT_COOKIE_WIDTH, pageWidth);
            },
            //
            animateCollapse: function() {
                var windowWidth = _$window.width();
                var pageCurrentSize = getPageCurrentSize(windowWidth, 0);

                _$right.trigger({
                    type: 'beforeCollapse',
                    state: {
                        pageWidth: pageCurrentSize,
                        rightMarginRight: (-1) * _constants.RIGHT_WIDTH,
                        bottomWidth: windowWidth,
                        headbarWidth: windowWidth,
                        speed: _constants.SLIDE_SPEED_ANIMATION
                    }
                });

                _$page.stop().css('width', 'auto').animate({
                    //width: pageCurrentSize
                    marginRight : 0
                }, _constants.SLIDE_SPEED_ANIMATION, function() {
                    _$right.trigger({
                        type: 'afterCollapse',
                        state: {
                            pageWidth: pageCurrentSize,
                            rightMarginRight: (-1) * _constants.RIGHT_WIDTH,
                            bottomWidth: windowWidth,
                            headbarWidth: windowWidth,
                            speed: _constants.SLIDE_SPEED_ANIMATION
                        }
                    });
                });

                _$right.stop().animate({
                    marginRight: (-1) * (_constants.RIGHT_WIDTH)
                }, _constants.SLIDE_SPEED_ANIMATION, function() {
                    _$right.removeClass('expand');
                });

                _$bottombar.stop().animate({
                    width: windowWidth
                }, _constants.SLIDE_SPEED_ANIMATION);

                _$headbar.stop().animate({
                    width: windowWidth
                }, _constants.SLIDE_SPEED_ANIMATION);

                _windowLayoutCookie.set(_constants.PAGE_LAYOUT_COOKIE_WIDTH, pageCurrentSize);
            }
        };





        _$startup.binding('click', function() {
            if (!_$right.hasClass('expand')) {
                Layout.animateExpand();
                _windowLayoutCookie.set(_constants.LAYOUT_COOKIE, _constants.LAYOUT_COOKIE_EXPAND);
            } else {
                Layout.animateCollapse();
                _windowLayoutCookie.set(_constants.LAYOUT_COOKIE, _constants.LAYOUT_COOKIE_COLLAPSE);
            }
        });


        var currentStateLayout = _windowLayoutCookie.get(_constants.LAYOUT_COOKIE);
        if (currentStateLayout === _constants.LAYOUT_COOKIE_EXPAND) {
            Layout.expand();
        } else if (currentStateLayout === _constants.LAYOUT_COOKIE_COLLAPSE) {
            Layout.collapse();
        }





        rightResize();
        _$window.binding('resize', function() {
            pageResize();
            rightResize();
        });

        function rightResize() {
            var windowWidth = _$window.width();
            var windowHeight = _$window.height();

            _windowLayoutCookie.set(_constants.WINDOW_LAYOUT_COOKIE_WIDTH, windowWidth);
            _windowLayoutCookie.set(_constants.WINDOW_LAYOUT_COOKIE_HEIGHT, windowHeight);
            _windowLayoutCookie.set(_constants.PAGE_LAYOUT_COOKIE_WIDTH, _$page.width());
        }

        function pageResize() {
            var windowWidth = _$window.width();

            if (!_$right.hasClass('expand')) {
                var pageCurrentSize = getPageCurrentSize(windowWidth, 0);
                //_$page.width(pageCurrentSize);

                _$bottombar.width(windowWidth);
                _$headbar.width(windowWidth);
            } else {
                var pageCurrentSize = getPageCurrentSize(windowWidth, _constants.RIGHT_WIDTH);
                var pamarinPageMinWidth = getPageMinWidth();
                if (pageCurrentSize >= pamarinPageMinWidth) {
                    //_$page.width(pageCurrentSize);
                } else {
                    //_$page.width(pamarinPageMinWidth);
                }

                _$bottombar.width(windowWidth - _constants.RIGHT_WIDTH);
                _$headbar.width(windowWidth - _constants.RIGHT_WIDTH);
            }
            
            _$page.css('width', 'auto');
        }





        return {
            //
            expand: function() {
                Layout.expand();
            },
            //
            collapse: function() {
                Layout.collapse();
            },
            //
            animateExpand: function() {
                Layout.animateExpand();
            },
            //
            animateCollapse: function() {
                Layout.animateCollapse();
            },
            //        
            onBeforeExpand: function(scope, callback) {
                _$right.binding('beforeExpand', scope, function(event) {
                    if (callback) {
                        callback(event);
                    }
                });
            },
            //
            onAfterExpand: function(scope, callback) {
                _$right.binding('afterExpand', scope, function(event) {
                    if (callback) {
                        callback(event);
                    }
                });
            },
            //
            onBeforeCollapse: function(scope, callback) {
                _$right.binding('beforeCollapse', scope, function(event) {
                    if (callback) {
                        callback(event);
                    }
                });
            },
            //
            onAfterCollapse: function(scope, callback) {
                _$right.binding('afterCollapse', scope, function(event) {
                    if (callback) {
                        callback(event);
                    }
                });
            }
        };
    })(window);



    return RightLayout;
});
    