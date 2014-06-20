/**
 * @author jittagorn pitakmetagoon
 * create 01/10/2013
 */
define('com.pamarin.web.controller.layout.SuggestionFixedController', [
    'module',
    'com.jquery.core.JQuery',
    'com.pamarin.web.controller.LeftLayoutController',
    'com.pamarin.web.controller.RightLayoutController'
], function(module, $, LeftLayout, RightLayout) {

    var _$WINDOW = $(window);
    var _$HEADBAR = $('#pmrHeadbar');
    var _$BOTTOMBAR = $('#pmrBottombar');
    var _$LEFT = $('#pmrLeft');
    var _$LEFT_TOGGLE = $('#pmrLeftToggle');
    var _$PAGE = $('#pmrPage');
    //
    var _$header;
    var _$suggestion;
    var _$center;
    var _$headerMenu;
    var _$headerMenuTop;

    var _HEADBAR_HEIGHT = _$HEADBAR.height();
    var _BOTTOMBAR_HEIGHT = _$BOTTOMBAR.height();
    var _LEFT_WIDTH = _$LEFT.width();
    var _LEFT_TOGGLE_WIDTH = _$LEFT_TOGGLE.width();
    var _PAGE_MIN_WIDTH = parseFloat(_$PAGE.css('min-width').replace('px', ''));
    //
    var _headerMenuHeight = 0;
    var _hederMenuTopHeight = 0;
    var _centerWidth = 0;
    var _suggestionWidth = 0;
    var _suggestionHeight = 0;

    function init() {
        var suggestionTimeout = setTimeout(function() {
            window.clearTimeout(suggestionTimeout);

            _$header = $('.pmr-header');
            _$suggestion = $('#pmrUnseenSuggestion');
            _$headerMenu = $('#pmrUnseenHeaderMenu');
            _$headerMenuTop = $('#pmrUnseenHeaderMenuTop');
            _$center = $('#pmrUnseenCenter');

            _headerMenuHeight = _$headerMenu.height();
            _hederMenuTopHeight = _$headerMenuTop.height();
            _centerWidth = _$center.width();
            _suggestionWidth = _$suggestion.width();
            _suggestionHeight = _$suggestion.height();
        }, 300);
    }

    function getLocking(pageWidth, leftLeft) {
        if (pageWidth < _PAGE_MIN_WIDTH) {
            pageWidth = _PAGE_MIN_WIDTH;
        }

        var pageHalft = pageWidth / 2;
        var centerHaft = _centerWidth / 2;

        var left;
        if (!leftLeft) {
            if (_$LEFT.hasClass('expand')) {
                left = _LEFT_WIDTH;
            } else {
                left = _LEFT_TOGGLE_WIDTH;
            }
        } else {
            left = leftLeft;
        }

        return  left + pageWidth - (pageHalft - centerHaft) - _suggestionWidth;
    }

    function suggestionReposition() {
        if (_$header && _$suggestion) {
            var scrollTop = _$WINDOW.scrollTop();
            var windowHeight = _$WINDOW.height();
            var leftLock = getLocking(_$PAGE.width());

            if (_suggestionHeight > (windowHeight - (_BOTTOMBAR_HEIGHT + _hederMenuTopHeight + _headerMenuHeight))) {
                var overlayFixed = windowHeight - (_HEADBAR_HEIGHT + _$header.height() + _hederMenuTopHeight + _headerMenuHeight + _suggestionHeight + _BOTTOMBAR_HEIGHT);
                if (overlayFixed < 0) {
                    overlayFixed = (-1) * overlayFixed;
                }

                _$suggestion.removeClass('top-fixed');
                if (scrollTop > overlayFixed) {


                    if (window.event) {
                        _$suggestion.addClass('bottom-fixed');
                        console.log('window event');
                        _$suggestion.css({
                            left: leftLock
                        });
                    }
                } else {
                    _$suggestion.removeClass('bottom-fixed');
                    _$suggestion.css({
                        left: 0
                    });
                }
            } else {
                var overlayFixed = _$header.height();
                _$suggestion.removeClass('bottom-fixed');
                if (scrollTop > overlayFixed) {


                    if (window.event) {
                        _$suggestion.addClass('top-fixed');
                        console.log('window event');

                        _$suggestion.css({
                            left: leftLock
                        });
                    }
                } else {
                    _$suggestion.removeClass('top-fixed');
                    _$suggestion.css({
                        left: 0
                    });
                }
            }
        }
    }

    _$WINDOW.binding('resize', 0, function(event) {
        suggestionReposition();
    });

    _$WINDOW.binding('scroll', 0, function(event) {
        suggestionReposition();
    });

    LeftLayout.onBeforeCollapse(0, function(event) {
        var leftLock = getLocking(event.state.pageWidth, event.state.pageMarginLeft);
        if (_$suggestion) {
            _$suggestion.stop().animate({
                left: leftLock
            }, event.state.speed);
        }

        console.log(event.state);
    });

    LeftLayout.onBeforeExpand(0, function(event) {
        var leftLock = getLocking(event.state.pageWidth, event.state.pageMarginLeft);
        if (_$suggestion) {
            _$suggestion.stop().animate({
                left: leftLock
            }, event.state.speed);
        }

        console.log(event.state);
    });

    RightLayout.onBeforeCollapse(0, function(event) {
        var leftLock = getLocking(event.state.pageWidth, event.state.pageMarginLeft);
        if (_$suggestion) {
            _$suggestion.stop().animate({
                left: leftLock
            }, event.state.speed);
        }

        console.log(event.state);
    });

    RightLayout.onBeforeExpand(0, function(event) {
        var leftLock = getLocking(event.state.pageWidth, event.state.pageMarginLeft);
        if (_$suggestion) {
            _$suggestion.stop().animate({
                left: leftLock
            }, event.state.speed);
        }

        console.log(event.state);
    });

    return {
        init: init
    };
});