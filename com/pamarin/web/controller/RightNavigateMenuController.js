/**
 * @author  jittagorn pitakmetagoon
 * create  27/03/2013
 * 
 * update  14/04/2013 (jittagorn pitakmetagoon)
 */

define('com.pamarin.web.controller.RightNavigateMenuController', [
    'com.jquery.core.JQuery',
    'com.pamarin.core.util.Urls',
    'com.pamarin.core.config.Configs',
    'com.pamarin.core.util.Router'
], function($, Urls, Configs, Router) {
    var _$navigateMenu = $('#pmrNavigateMenu');
    var _$navigateMenuHeader = $('#pmrNavigateMenuHeader');
    var _$navigateMenuCenter = $('#pmrNavigateMenuCenter');
    var _$navigateCenterClass = $('.pmr-navigate-center');

    var _constants = {
        SPEED_ANIMATEION: 300,
        NAVIGATE_MENU_WIDTH: _$navigateMenu.width()
    };


    _$navigateMenuHeader.children('.pmr-navigate').each(function() {
        var $navigateIcon = $(this);

        $navigateIcon.click(function() {
            removeNavigateActive();
            var $navigate = $(this);
            var sequence = $navigate.attr('data-sequence');

            _$navigateMenuCenter.children('.pmr-navigate-center').animate({
                right: _constants.NAVIGATE_MENU_WIDTH * parseInt(sequence - 1)
            }, _constants.SPEED_ANIMATEION);

            $navigate.addClass('active');
        });
    });

    function removeNavigateActive() {
        _$navigateMenuHeader.children('.pmr-navigate').removeClass('active');
    }

    function highlightNavigateMenu() {
        var path = Urls.getPath();

        _$navigateCenterClass
                .children('.pmr-navigate-center-box.home')
                .children('.pmr-menu')
                .children('li')
                .each(function() {

            var $list = $(this);
            var $link = Urls.getPath($list.children('a').attr('href'));
            if (path === $link) {
                $list.addClass('active');
            } else {
                $list.removeClass('active');
            }
        });
    }


    highlightNavigateMenu();
    Router.onRoute(function() {
        highlightNavigateMenu();
    });
});
