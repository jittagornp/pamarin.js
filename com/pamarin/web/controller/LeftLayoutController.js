/**
 * @module  layout.LeftLayout
 * @author  jittagorn pitakmetagoon
 * @create  22/03/2013
 * 
 * @update  14/04/2013 (jittagorn pitakmetagoon)
 * @update  10/04/2013 (jittagorn pitakmetagoon : add to AMD)
 */
define('com.pamarin.web.controller.LeftLayoutController', [
    'module',
    'com.jquery.core.JQuery',
    'com.pamarin.core.config.Configs',
    'com.pamarin.core.util.Cookies',
    'com.pamarin.ui.Tooltip',
    'com.pamarin.core.util.KeyboardUtils'
], function(module, $, Configs, Cookies, Tooltip, KeyboardUtils) {

    var _windowLayoutCookie = new Cookies.Serializer({
        name : Configs['LAYOUT']['WINDOW_LAYOUT_COOKIE']
    });

    var _$window = $(window);
    var _$page = $('#pmrPage');
    var _$left = $('#pmrLeft');
    var _$right = $('#pmrRight');
    var _$leftToggle = $('#pmrLeftToggle');
    var _$pamarinLogo = $('#pamarinLogo .pmr-icon');
    var _$closeLeft = $('#pmrCloseLeft');
    //

    var _constants = {
        LAYOUT_COOKIE: Configs['LAYOUT']['LEFT_LAYOUT_COOKIE'],
        LAYOUT_COOKIE_EXPAND: Configs['LAYOUT']['LAYOUT_COOKIE_EXPAND'],
        LAYOUT_COOKIE_COLLAPSE: Configs['LAYOUT']['LAYOUT_COOKIE_COLLAPSE'],
        SLIDE_SPEED_ANIMATION: Configs['LAYOUT']['LEFT_SLIDE_SPEED_ANIMATION'],
        PAGE_LAYOUT_COOKIE_WIDTH: Configs['LAYOUT']['PAGE_LAYOUT_COOKIE_WIDTH'],
        LEFT_WIDTH: _$left.width(),
        RIGHT_WIDTH: _$right.width(),
        LEFT_TOGGLE_WIDTH: _$leftToggle.width()
    };
    
    console.log(_constants);

    var LeftLayout = (function() {

        function getPageMinWidth() {
            return parseFloat(_$page.css('min-width').replace('px', ''));
        }

        function getPageCurrentSize(left) {
            var windowWidth = _$window.width();
            var pageCurrentSize;
            if (_$right.hasClass('expand')) {
                pageCurrentSize = windowWidth - (_constants.RIGHT_WIDTH + left);
            } else {
                pageCurrentSize = windowWidth - left;
            }

            return pageCurrentSize;
        }





        /**
         * class for control left layout expand and collapse
         */
        var Layout = {
            //
            expand: function() {
                var pageCurrentSize = getPageCurrentSize(_constants.LEFT_WIDTH);
                var pamarinPageMinWidth = getPageMinWidth();

                if (pageCurrentSize >= pamarinPageMinWidth) {
                    _$page.css({
                        'margin-left': _constants.LEFT_WIDTH + 'px',
                        //'width': pageCurrentSize + 'px'
                    });
                } else {
                    _$page.css({
                        'margin-left': _constants.LEFT_WIDTH + 'px',
                        //'width': pamarinPageMinWidth + 'px'
                    });
                }

                _$left.css({
                    'margin-left': (_constants.LEFT_WIDTH - _constants.LEFT_TOGGLE_WIDTH) + 'px'
                }).addClass('expand');
            },
            //
            collapse: function() {
                var pageCurrentSize = getPageCurrentSize(_constants.LEFT_TOGGLE_WIDTH);

                _$page.css({
                    'margin-left': _constants.LEFT_TOGGLE_WIDTH + 'px',
                    //'width': pageCurrentSize + 'px'
                });

                _$left.css({
                    'margin-left': '0px'
                }).removeClass('expand');
            },
            //
            animateExpand: function() {
                var pageCurrentSize = getPageCurrentSize(_constants.LEFT_WIDTH);
                var pamarinPageMinWidth = getPageMinWidth();
                var pageWidth = (pageCurrentSize >= pamarinPageMinWidth) ? pageCurrentSize : pamarinPageMinWidth;

                _$left.trigger({
                    type: 'beforeExpand',
                    state: {
                        pageWidth: pageWidth,
                        pageMarginLeft: _constants.LEFT_WIDTH,
                        leftMarginLeft: _constants.LEFT_WIDTH - _constants.LEFT_TOGGLE_WIDTH,
                        speed: _constants.SLIDE_SPEED_ANIMATION
                    }
                });

                _$page.stop().css('width', 'auto').animate({
                    marginLeft: _constants.LEFT_WIDTH
                }, _constants.SLIDE_SPEED_ANIMATION, function() {
                    _$left.trigger({
                        type: 'afterExpand',
                        state: {
                            pageWidth: pageWidth,
                            pageMarginLeft: _constants.LEFT_WIDTH,
                            leftMarginLeft: _constants.LEFT_WIDTH - _constants.LEFT_TOGGLE_WIDTH,
                            speed: _constants.SLIDE_SPEED_ANIMATION
                        }
                    });
                });

                _$left.stop().animate({
                    marginLeft: _constants.LEFT_WIDTH - _constants.LEFT_TOGGLE_WIDTH
                }, _constants.SLIDE_SPEED_ANIMATION, function() {

                }).addClass('expand');

                _windowLayoutCookie.set(_constants.PAGE_LAYOUT_COOKIE_WIDTH, pageWidth);
            },
            //
            animateCollapse: function() {
                var pageCurrentSize = getPageCurrentSize(_constants.LEFT_TOGGLE_WIDTH);

                _$left.trigger({
                    type: 'beforeCollapse',
                    state: {
                        pageWidth: pageCurrentSize,
                        pageMarginLeft: _constants.LEFT_TOGGLE_WIDTH,
                        leftMarginLeft: 0,
                        speed: _constants.SLIDE_SPEED_ANIMATION
                    }
                });

                _$page.stop().css('width', 'auto').animate({
                    marginLeft: _constants.LEFT_TOGGLE_WIDTH,
                    //width: pageCurrentSize
                }, _constants.SLIDE_SPEED_ANIMATION, function() {
                    _$left.trigger({
                        type: 'afterCollapse',
                        state: {
                            pageWidth: pageCurrentSize,
                            pageMarginLeft: _constants.LEFT_TOGGLE_WIDTH,
                            leftMarginLeft: 0,
                            speed: _constants.SLIDE_SPEED_ANIMATION
                        }
                    });
                });

                _$left.stop().animate({
                    marginLeft: 0
                }, _constants.SLIDE_SPEED_ANIMATION, function() {

                }).removeClass('expand');

                _windowLayoutCookie.set(_constants.PAGE_LAYOUT_COOKIE_WIDTH, pageCurrentSize);
            }
        };





        function leftSlider() {
            if (!_$left.hasClass('expand')) {
                Layout.animateExpand();
                _windowLayoutCookie.set(_constants.LAYOUT_COOKIE, _constants.LAYOUT_COOKIE_EXPAND);
            } else {
                Layout.animateCollapse();
                _windowLayoutCookie.set(_constants.LAYOUT_COOKIE, _constants.LAYOUT_COOKIE_COLLAPSE);
            }
        }

        /**
         * left expand event click
         */
        _$leftToggle.binding('click', function() {
            leftSlider();
        });

        _$pamarinLogo.binding('click', function() {
            leftSlider();
        });

        _$closeLeft.binding('click', function() {
            Layout.animateCollapse();
            _windowLayoutCookie.set(_constants.LAYOUT_COOKIE, _constants.LAYOUT_COOKIE_COLLAPSE);
        });

        var _currentStateLayout = _windowLayoutCookie.get(_constants.LAYOUT_COOKIE);
        if (_currentStateLayout === _constants.LAYOUT_COOKIE_EXPAND) {
            Layout.expand();
        } else if (_currentStateLayout === _constants.LAYOUT_COOKIE_COLLAPSE) {
            Layout.collapse();
        }


        /**
         * left resize when window(browser) resize
         */
        leftResize();
        _$window.binding('resize', function() {
            leftResize();
        });

        function leftResize() {
            _windowLayoutCookie.set(_constants.PAGE_LAYOUT_COOKIE_WIDTH, _$page.width());
        }




        _$left.binding('hover', function() {
            _$leftToggle.find('.pmr-tooltip').stop().fadeIn('slow');
        }, function() {
            _$leftToggle.find('.pmr-tooltip').stop().fadeOut('slow');
        });





        return {
            isExpand: function() {
                return _$left.hasClass('expand');
            },
            //
            toggle : function(){
                if(LeftLayout.isExpand()){
                    LeftLayout.animateCollapse();
                }else{
                    LeftLayout.animateExpand();
                }
            },
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
                _$left.binding('beforeExpand', scope, function(event) {
                    if (callback) {
                        callback(event);
                    }
                });
            },
            //
            onAfterExpand: function(scope, callback) {
                _$left.binding('afterExpand', scope, function(event) {
                    if (callback) {
                        callback(event);
                    }
                });
            },
            //
            onBeforeCollapse: function(scope, callback) {
                _$left.binding('beforeCollapse', scope, function(event) {
                    if (callback) {
                        callback(event);
                    }
                });
            },
            //
            onAfterCollapse: function(scope, callback) {
                _$left.binding('afterCollapse', scope, function(event) {
                    if (callback) {
                        callback(event);
                    }
                });
            }
        };
    })();



    Tooltip.showOnElement('#pmrCloseLeft')
            .withTitle('close')
            .withEastPosition()
            .show();



    KeyboardUtils.onKey('F2', function() {
        LeftLayout.toggle();
    });

    return LeftLayout;
});