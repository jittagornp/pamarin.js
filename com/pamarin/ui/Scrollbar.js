/**
 * @author  jittagorn pitakmetagoon
 * create  17/05/2013
 * 
 * update  17/05/2013 (jittagorn pitakmetagoon)
 * update  08/06/2013 (jittagorn pitakmetagoon : add to AMD)
 */
define('com.pamarin.ui.Scrollbar', [
    'module',
    'com.jscrollpane.core.JScrollPane',
    'com.pamarin.core.io.Event',
    'com.pamarin.core.lang.Class',
    'com.pamarin.ui.UI',
    'com.pamarin.core.structural.Proxy'
], function(module, $, Event, Class, UI, Proxy) {

    /**
     * @class Scrollbar
     */
    var Scrollbar = Class.define(module.id, (function() {

        var $window = $(window);

        return {
            //
            constructor: function(element) {
                Scrollbar.superConstructor.call(this, element);
            },
            //
            start: function() {
                this.$element_.jScrollPane({
                    showArrows: false,
                    maintainPosition: true,
                    stickToBottom: false,
                    stickToRight: false,
                    clickOnTrack: true,
                    autoReinitialise: true,
                    autoReinitialiseDelay: 0,
                    verticalDragMinHeight: 0,
                    verticalDragMaxHeight: 99999,
                    horizontalDragMinWidth: 0,
                    horizontalDragMaxWidth: 99999,
                    animateScroll: true,
                    animateDuration: 500,
                    animateEase: 'linear',
                    hijackInternalLinks: false,
                    verticalGutter: 0,
                    horizontalGutter: 0,
                    mouseWheelSpeed: 0,
                    arrowButtonSpeed: 0,
                    arrowRepeatFreq: 50,
                    arrowScrollOnHover: false,
                    trackClickSpeed: 0,
                    trackClickRepeatFreq: 70,
                    verticalArrowPositions: 'split',
                    horizontalArrowPositions: 'split',
                    enableKeyboardNavigation: true,
                    hideFocus: false,
                    keyboardSpeed: 0,
                    initialDelay: 0,
                    speed: 50,
                    scrollPagePercent: 0.8
                }).binding('mousewheel', this.scope, function(event) {
                    Event.preventDefault(event);
                });

                $window.binding('resize', this.scope, Proxy.call(this, function() {
                    var jsp = this.$element_.data('jsp');
                    if (jsp) {
                        jsp.reinitialise();
                    }
                }));

                return this.$element_;
            },
            //
            static: {
                //
                scrollOnElement: function(element) {
                    return new Scrollbar(element);
                }
            }
        };
    })()).extends(UI);



    return Scrollbar;
});
