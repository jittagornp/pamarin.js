/**
 * @module  layout.left.LeftResultLayout
 * @author  jittagorn pitakmetagoon
 * @create  08/06/2013
 */
define('com.pamarin.web.controller.LeftResultLayoutController', [
    'module',
    'com.jquery.core.JQuery',
    'com.pamarin.ui.Scrollbar'
], function(module, $, Scrollbar) {
    var _$window = $(window);
    var _$bottombar = $('#pmrBottombar');
    var _$headbar = $('#pmrHeadbar');
    var _$leftSearch = $('#pmrLeftSearch');
    var _$leftResult = $('#pmrLeftResult');
    //
    var _constants = {
        BOTTOMBAR_HEIGHT: _$bottombar.height(),
        LEFT_SEARCH_HEIGHT: _$leftSearch.height(),
        HEADBAR_HEIGHT: _$headbar.height()
    };

    /**
     * left resize when window(browser) resize
     */
    leftResultResize();
    _$window.binding('resize', function() {
        leftResultResize();
    });

    function leftResultResize() {
        var windowHeight = _$window.height();
        _$leftResult.height(windowHeight - _constants.BOTTOMBAR_HEIGHT - _constants.LEFT_SEARCH_HEIGHT - _constants.HEADBAR_HEIGHT);
    }


    Scrollbar.scrollOnElement('#pmrLeftResultSearch').start();
});

