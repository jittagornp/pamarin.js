/**
 * @author  jittagorn pitakmetagoon
 * create  09/06/2013
 */
define('com.pamarin.web.controller.layout.HeaderMenuStyleLayoutController', [
    'module',
    'com.jquery.core.JQuery',
    'com.pamarin.core.logging.LoggerFactory',
    'com.pamarin.core.config.Configs',
    'com.pamarin.web.controller.LeftLayoutController',
    'com.pamarin.web.controller.RightLayoutController',
    'com.pamarin.core.util.Types'
], function(module, $, LoggerFactory, Configs, LeftLayoutController, RightLayoutController, Types) {
    //var log = LoggerFactory.getLogger(module.id);

    var _$window = $(window);
    var _$page = $('#pmrPage');
    var _$left = $('#pmrLeft');
    var _$leftToggle = $('#pmrLeftToggle');

    var _constants = {
        RIGHT_SLIDE_SPEED_ANIMATION: Configs['LAYOUT']['RIGHT_SLIDE_SPEED_ANIMATION'],
        LEFT_SLIDE_SPEED_ANIMATION: Configs['LAYOUT']['LEFT_SLIDE_SPEED_ANIMATION'],
        HEADER_SIZE_RATIO: 0.40, //45%
        LEFT_WIDTH: _$left.width(),
        LEFT_TOGGLE_WIDTH: _$leftToggle.width(),
        PAGE_MIN_WIDTH: parseFloat(_$page.css('min-width').replace('px', ''))
    };


    //lazy
    var _$header;
    var _$headerMenu;
    var _$headerMenuHiding;
    var _headerResizeCallback;
    var _errorValue;


    function setupHeaderSize(pageWidth) {
        if (_$header) {
            var headerHeight = _$header.width() * _constants.HEADER_SIZE_RATIO;
            _$header.height(headerHeight);

            if (Types.isFunction(_headerResizeCallback)) {
                _headerResizeCallback({
                    headerHeight: headerHeight,
                    pageWidth: pageWidth
                });
            }
        }
    }

    function transformToHeaderHeight(width) {
        if (_constants.PAGE_MIN_WIDTH && (width < _constants.PAGE_MIN_WIDTH)) {
            width = _constants.PAGE_MIN_WIDTH;
        }

        return width * _constants.HEADER_SIZE_RATIO;
    }



    function init() {
        _$header = $('.pmr-header');
        _$headerMenu = $('.pmr-header-menu');
        _errorValue = parseInt(_$headerMenu.attr('data-error')) || 0;

        _$headerMenuHiding = $('<div>').height(_$headerMenu.height()).hide();
        _$headerMenuHiding.insertBefore(_$headerMenu);

        if (_$left.hasClass('expand')) {
            _$headerMenu.css({
                'left': _constants.LEFT_WIDTH
            });
        } else {
            _$headerMenu.css({
                'left': _constants.LEFT_TOGGLE_WIDTH
            });
        }

        setupHeaderSize(_$page.width());

        RightLayoutController.onBeforeExpand(0, function(event) {
            if (_$headerMenu) {
                _$headerMenu.animate({
                    width: event.state.pageWidth
                }, _constants.RIGHT_SLIDE_SPEED_ANIMATION);

                _$header.animate({
                    height: transformToHeaderHeight(event.state.pageWidth)
                }, _constants.RIGHT_SLIDE_SPEED_ANIMATION);
            }
        });

        RightLayoutController.onBeforeCollapse(0, function(event) {
            if (_$headerMenu) {
                _$headerMenu.animate({
                    width: event.state.pageWidth
                }, _constants.RIGHT_SLIDE_SPEED_ANIMATION);

                _$header.animate({
                    height: transformToHeaderHeight(event.state.pageWidth)
                }, _constants.RIGHT_SLIDE_SPEED_ANIMATION);
            }
        });

        LeftLayoutController.onBeforeExpand(0, function(event) {
            if (_$headerMenu) {
                _$headerMenu.animate({
                    width: event.state.pageWidth,
                    left: event.state.pageMarginLeft
                }, _constants.LEFT_SLIDE_SPEED_ANIMATION);

                _$header.animate({
                    height: transformToHeaderHeight(event.state.pageWidth)
                }, _constants.RIGHT_SLIDE_SPEED_ANIMATION);
            }
        });

        LeftLayoutController.onBeforeCollapse(0, function(event) {
            if (_$headerMenu) {
                _$headerMenu.animate({
                    width: event.state.pageWidth,
                    left: event.state.pageMarginLeft
                }, _constants.LEFT_SLIDE_SPEED_ANIMATION);

                _$header.animate({
                    height: transformToHeaderHeight(event.state.pageWidth)
                }, _constants.RIGHT_SLIDE_SPEED_ANIMATION);
            }
        });

        _$window.binding('scroll', 0, function() {
            if (_$header && _$headerMenu) {
                var scrollTop = _$window.scrollTop();
                var pageWidth = _$page.width();

                if ((scrollTop) > (_$header.height() + 1)) {
                    _$headerMenuHiding.show();
                    _$headerMenu.addClass('fixed').css({
                        'width': pageWidth + 'px'
                    });
                } else {
                    _$headerMenuHiding.hide();
                    _$headerMenu.removeClass('fixed').css({
                        'width': '100%'
                    });
                }
            }
        }).binding('resize', 0, function() {
            if (_$headerMenu) {
                var pageWidth = _$page.width();

                _$headerMenu.css({
                    'width': pageWidth + 'px'
                });

                setupHeaderSize(pageWidth);
            }
        });
    }



    return {
        init: init,
        transformToHeaderHeight: transformToHeaderHeight
    };
});

