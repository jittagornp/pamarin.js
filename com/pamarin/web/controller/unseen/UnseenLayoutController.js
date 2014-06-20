/**
 * @author  jittagorn pitakmetagoon
 * create  14/04/2013
 * 
 * update  09/06/2013 (jittagorn pitakmetagoon : add to AMD)
 */
define('com.pamarin.web.controller.unseen.UnseenLayoutController', [
    'com.jquery.core.JQuery',
    'com.pamarin.ui.Scrollbar'
], function($, Scrollbar) {

    var $attraction_;

    //
    var ATTRACTION_SPEED_SLIDER_ = 300;
    var scrollData_ = null;

    function init(jigsawContext) {
        $attraction_ = $('#pmrUnseenAttraction');
        var $attractionWindowExpand_ = $('#pmrUnseenAttractionWindowToggle');
        var $attractionWindowToUp_ = $('#pmrUnseenAttractionWindowToUp');
        //
        var $unseenNameWrapper_ = $('#pmrUnseenNameWrapper');
        var $unseenImage_ = $('#pmrUnseenImage');
        var $changeImageProfileButton = $('#pmrUnseenChangeImageProfileButton').show();
        //
        var UNSEEN_NAME_WRAPPER_WIDTH_ = $unseenNameWrapper_.width();
        var UNSEEN_IMAGE_WIDTH_ = $unseenImage_.width();
        var CHANGE_IMAGE_PROFILE_BUTTON_HEIGHT_ = 0;
        var ATTRACTION_WIDTH_ = $attraction_.width();

        if ($changeImageProfileButton.length !== 0) {
            CHANGE_IMAGE_PROFILE_BUTTON_HEIGHT_ = $changeImageProfileButton.height();
        }

        $attractionWindowExpand_.binding('click', 0, function() {
            if (Attraction_.isExpanded()) {
                Attraction_.collapse();
                $attractionWindowExpand_.removeClass('expand');

                $attractionWindowToUp_.fadeOut();
            } else {
                Attraction_.expand();
                $attractionWindowExpand_.addClass('expand');

                if ($attractionWindowToUp_.hasClass('visible') || (scrollData_ !== null && scrollData_.getPercentScrolledY() > 0)) {
                    $attractionWindowToUp_.fadeIn();
                }
            }
        });

        $unseenImage_.binding('mouseenter', 0, function() {
            if (!UnseenInformation_.isExpanded()) {
                UnseenInformation_.expand();
            }

            if ($changeImageProfileButton.length !== 0) {
                $changeImageProfileButton.animate({
                    marginTop: -CHANGE_IMAGE_PROFILE_BUTTON_HEIGHT_
                }, 150, function() {
                    $changeImageProfileButton.addClass('expand');
                });
            }
        });

        $unseenImage_.binding('mouseleave', 0, function() {
            if (!Attraction_.isExpanded()) {
                UnseenInformation_.collapse();
            }

            if ($changeImageProfileButton.length !== 0) {
                $changeImageProfileButton.animate({
                    marginTop: 0
                }, 150, function() {
                    $changeImageProfileButton.removeClass('expand');
                });
            }
        });


        var UnseenInformation_ = {
            //
            isExpanded: function() {
                return $unseenNameWrapper_.hasClass('expand');
            },
            //
            collapse: function() {
                $unseenNameWrapper_.animate({
                    width: UNSEEN_IMAGE_WIDTH_ + 2
                }, ATTRACTION_SPEED_SLIDER_, function() {
                    $unseenNameWrapper_.removeClass('expand');
                });
            },
            //
            expand: function() {
                $unseenNameWrapper_.animate({
                    width: UNSEEN_NAME_WRAPPER_WIDTH_
                }, ATTRACTION_SPEED_SLIDER_, function() {
                    $unseenNameWrapper_.addClass('expand');
                });
            }
        };


        var Attraction_ = {
            //
            isExpanded: function() {
                return $attraction_.hasClass('expand');
            },
            //
            collapse: function() {
                $attraction_.animate({
                    marginRight: -ATTRACTION_WIDTH_
                }, ATTRACTION_SPEED_SLIDER_);
                $attraction_.removeClass('expand');

                UnseenInformation_.collapse();
            },
            //
            expand: function() {
                $attraction_.animate({
                    marginRight: 0
                }, ATTRACTION_SPEED_SLIDER_);
                $attraction_.addClass('expand');

                UnseenInformation_.expand();
            }
        };




        var $scroll = Scrollbar.createOnElement('#pmrUnseenAttractionWindowScroll')
                .withScope(0)
                .get();

        scrollData_ = $scroll.data('jsp');

        $attractionWindowToUp_.binding('click', 0, function() {
            scrollData_.scrollTo(0, 0);
        });

        $scroll.binding('scroll', 0, function() {
            if (scrollData_.getPercentScrolledY() > 0) {
                if (Attraction_.isExpanded()) {
                    $attractionWindowToUp_.show().addClass('visible');
                }
            } else {
                $attractionWindowToUp_.hide().removeClass('visible');
            }
        });

    }

    return{
        init: init
    };
});