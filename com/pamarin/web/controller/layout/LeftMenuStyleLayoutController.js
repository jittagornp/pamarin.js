/**
 * @author  jittagorn pitakmetagoon
 * create  06/06/2013
 * 
 * update  06/06/2013 (jittagorn pitakmetagoon)
 * update  08/06/2013 (jittagorn pitakmetagoon : add to AMD)
 */
define('com.pamarin.web.controller.layout.LeftMenuStyleLayoutController', [
    'module',
    'com.jquery.core.JQuery',
    'com.pamarin.web.controller.LeftLayoutController',
    'com.pamarin.web.controller.RightLayoutController'
], function(module, $, LeftLayout, RightLayout) {
    var $window_ = $(window);
    var $page_ = $('#pmrPage');
    var $pageLeft_;
    var $pageRight_;
    var $headbar_ = $('#pmrHeadbar');
    var $bottombar_ = $('#pmrBottombar');
    var $left_ = $('#pmrLeft');
    var $leftToggle_ = $('#pmrLeftToggle');

    var MANAGEMENT_LEFT_WIDTH_;
    var LEFT_WIDTH_ = $left_.width();
    var LEFT_TOGGLE_WIDTH_ = $leftToggle_.width();
    var HEADBAR_HEIGHT_ = $headbar_.height();
    var BOTTOMBAR_HEIGHT_ = $bottombar_.height();
    var PAGE_MIN_HEIGHT_ = parseInt($page_.css('min-height').replace('px', ''));

    function init() {
        $pageLeft_ = $('.pmr-page-left');
        $pageRight_ = $('.pmr-page-right');

        MANAGEMENT_LEFT_WIDTH_ = $pageLeft_.width();
        pageResize();
        fixed();
    }

    function pageResize() {
        if ($pageRight_ && $pageLeft_) {
            $pageRight_.width($page_.width() - MANAGEMENT_LEFT_WIDTH_);
            
            var height = $window_.height() - HEADBAR_HEIGHT_ - BOTTOMBAR_HEIGHT_;
            if(height < PAGE_MIN_HEIGHT_){
                height = PAGE_MIN_HEIGHT_;
            }     
            
            $pageLeft_.css({
                'min-height': height + 'px'
            });
        }
    }

    function animateLeft(event) {
        if ($pageLeft_.hasClass('fixed')) {
            if (!$left_.hasClass('expand')) {
                $pageLeft_.stop().animate({
                    'left': LEFT_WIDTH_ + 'px'
                }, event.state.speed);
            } else {
                $pageLeft_.stop().animate({
                    'left': LEFT_TOGGLE_WIDTH_ + 'px'
                }, event.state.speed);
            }
        } else {
            $pageLeft_.stop().animate({
                'left': 0 + 'px'
            }, event.state.speed);
        }
    }

    function animatePageResize(event) {
        if ($pageRight_) {
            $pageRight_.stop().animate({
                width: (event.state.pageWidth - MANAGEMENT_LEFT_WIDTH_)
            }, event.state.speed);
        }
    }

    LeftLayout.onBeforeCollapse(0, function(event) {
        animatePageResize(event);
        animateLeft(event);
    });

    LeftLayout.onBeforeExpand(0, function(event) {
        animatePageResize(event);
        animateLeft(event);
    });

    RightLayout.onBeforeCollapse(0, function(event) {
        animatePageResize(event);
    });

    RightLayout.onBeforeExpand(0, function(event) {
        animatePageResize(event);
    });

    function fixed() {
        var windowHeight = $window_.height();
        var pageHeight = windowHeight - BOTTOMBAR_HEIGHT_;
        var pageLeftHeight = $pageLeft_.height();

        if (pageLeftHeight > pageHeight) {
            var over = pageLeftHeight - pageHeight;
            if ($window_.scrollTop() > over) {
                $pageLeft_.css({
                    position: 'fixed',
                    top: (-1) * over + 'px'
                }).addClass('fixed');
            } else {
                $pageLeft_.css({
                    position: 'relative',
                    top: 0 + 'px'
                }).removeClass('fixed');
            }
        } else {
            $pageLeft_.css({
                position: 'fixed',
                top: HEADBAR_HEIGHT_ + 'px'
            }).addClass('fixed');
        }

        if ($pageLeft_.hasClass('fixed')) {
            if ($left_.hasClass('expand')) {
                $pageLeft_.css({
                    'left': LEFT_WIDTH_ + 'px'
                });
            } else {
                $pageLeft_.css({
                    'left': LEFT_TOGGLE_WIDTH_ + 'px'
                });
            }
        } else {
            $pageLeft_.css({
                'left': 0 + 'px'
            });
        }
    }

    $window_.binding('scroll', 0, function() {
        fixed();
    }).binding('resize', 0, function() {
        fixed();
        pageResize();
    });

    return {
        init: init
    };
});