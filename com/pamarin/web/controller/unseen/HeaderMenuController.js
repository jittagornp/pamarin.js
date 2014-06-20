/**
 * @module  page.unseen.HeaderMenu
 * @author  jittagorn pitakmetagoon
 * @create  14/04/2013
 * 
 * @update  09/06/2013 (jittagorn pitakmetagoon : add to AMD)
 */
define('com.pamarin.web.controller.unseen.HeaderMenuController', [
    'module',
    'com.jquery.core.JQuery',
    'com.pamarin.core.logging.LoggerFactory',
    'com.pamarin.core.util.Urls',
    'com.pamarin.ui.loader.JigsawLoader',
    'com.pamarin.ui.loader.ComponentLoader',
    'com.pamarin.web.util.UnseenUtils',
    'com.pamarin.ui.Focusor'
], function(module, $, LoggerFactory, Urls, JigsawLoader, ComponentLoader, UnseenUtils, Focusor) {
    //var log = LoggerFactory.getLogger(module.id);

    var _$window = $(window);
    var _$pamarin = $('#pamarin');
    var _$page = $('#pmrPage');


    var $headerMenuList_;
    var $header_;

    function setupPageStatus(path) {
        if (path.indexOf('information?edit') === -1) {
            _$pamarin.removeClass('pmr-fixed');
            _$page.css('bottom', '0px');
        }
    }

    function highlightHeaderMenu() {
        var path = Urls.getPath();
        setupPageStatus(path);

        var indeOfQuestionMark = path.indexOf('?');
        if (indeOfQuestionMark !== -1) {
            path = path.substring(0, indeOfQuestionMark);
        }

        $headerMenuList_.each(function() {
            var $list = $(this);
            var $link = $list.children('a').attr('href');
            var url = Urls.getPath($link);

            if (url === path || url === (path + '/' + UnseenUtils.DEFAULT_PRESENT_TAB)) {
                $list.addClass('active');
            } else {
                $list.removeClass('active');
            }
        });
    }

    function init() {
        $headerMenuList_ = $('#pmrUnseenHeaderMenuContent .pmr-menu li');
        $header_ = $('#pmrUnseenHeader');
        var $haveBeenToButton_ = $('#pmrUnseenHaveBeenTo');

        $headerMenuList_.each(function() {

            var $list = $(this);
            $list.binding('click', 0, function() {
                var scrollTop = _$window.scrollTop();
                var headerHeight = $header_.height();

                if (scrollTop > headerHeight) {
                    var windowScrollTopTimeout = setTimeout(function() {
                        window.clearTimeout(windowScrollTopTimeout);
                        _$window.scrollTop(headerHeight + 2); //+2 = border top and bottom
                    }, 100);
                }
            });
        });

        highlightHeaderMenu();
        UnseenUtils.onTabChange(function(object) {
            if (object.fullPath.indexOf('/information') !== -1) {
                JigsawLoader.load('#pmrUnseenPresent', object.fullPath, 1);
            } else {
                JigsawLoader.load('#pmrUnseenPresent', object.fullPath);
            }
            highlightHeaderMenu();
        }, module.uuid);



        $haveBeenToButton_.binding('click', 0, function() {
            ComponentLoader.load('dialog.FeelingDialog', function(feelingDialog) {
                feelingDialog.show();
            });
        });

        wow();
    }

    function wow() {
        var $wowCount = $('#pmrUnseenWowCount');
        var $wowButton = $('#pmrUnseenWowButton');
        var $wowOverlay = $('#pmrUnseenWowOverlay');


        $wowCount.binding('click', 0, function() {
            ComponentLoader.load('dialog.WowDialog', function(alertDialog) {
                alertDialog.setWidth(600)
                        .setHeight(400)
                        .setTitle('Wow!')
                        .show();

            });
        });

        Focusor.focusOnElement($wowOverlay)
                .whenClickElement($wowButton)
                .withScope(0)
                .onFocus(function() {
                    console.log('focus');
                })
                .onBlur(function() {
                    console.log('blur');
                })
                .focus();
    }


    return {
        init: init
    };
});
