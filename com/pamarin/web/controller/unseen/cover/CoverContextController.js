/**
 * @author jittagorn pitakmetagoon
 * create 07/06/2014
 */
define('com.pamarin.web.controller.unseen.cover.CoverContextController', [
    'module',
    'com.pamarin.web.controller.unseen.UnseenController',
    'com.jquery.core.JQuery',
    'com.pamarin.web.controller.unseen.cover.MapContextController',
    'com.pamarin.core.creational.Singleton',
    'com.pamarin.web.controller.unseen.cover.CoverSlider',
    'com.pamarin.core.util.Delays'
], function(module, UnseenController, $, MapContextController, Singleton, CoverSlider, Delays) {

    /**
     * @class CoverContextController
     * @controller
     */
    var CoverContextController = UnseenController.define(module.id, (function() {

        var isFirstTime_ = true;
        return {
            /**/
            variable: {
                DELAY_JIGSAW_METHOD_: 500,
                CHANGE_CONTEXT_BUTTON_SELECTOR_: '#pmrChangeCoverContextButton',
                TO_MAP_MESSAGE_: 'Map »',
                TO_IMAGE_MESSAGE_: '« Image',
                PAGE_SELECTOR_: '#pmrUnseenPage',
                GOOGLE_MAP_STYLE_CLASS_: 'map'
            },
            /**/
            onJigsawReady: function() {
                this.contextButton();
            },
            /**/
            contextButton: function() {
                var that = this;
                var $button = $(this.CHANGE_CONTEXT_BUTTON_SELECTOR_);
                $button.on('click', function() {
                    that.toggleContext($button);
                });
            },
            /**/
            toggleContext: function($button) {
                var $buttonText = $button.find('.pmr-button-text');
                var $page = $(this.PAGE_SELECTOR_);
                this.isMapContext($page)
                        ? this.change2ImageContext($page, $buttonText)
                        : this.change2MapContext($page, $buttonText);
            },
            /**
             * @private
             * 
             * @param {jQuery} $page
             * @returns {Boooean}
             */
            isMapContext: function($page) {
                return $page.hasClass(this.GOOGLE_MAP_STYLE_CLASS_);
            },
            /**/
            change2MapContext: function($page, $buttonText) {
                this.change2Map();
                $buttonText.text(this.TO_IMAGE_MESSAGE_);
                $page.addClass(this.GOOGLE_MAP_STYLE_CLASS_);
            },
            /**/
            change2ImageContext: function($page, $buttonText) {
                this.change2Image();
                $page.removeClass(this.GOOGLE_MAP_STYLE_CLASS_);
                $buttonText.text(this.TO_MAP_MESSAGE_);
            },
            /**/
            change2Map: function() {
                var controller = Singleton.getInstance(MapContextController, undefined);
                Delays.run(function() {
                    controller.start();
                }, 50);

                if (isFirstTime_) {
                    Delays.run(CoverSlider.collapse, 500);
                    isFirstTime_ = false;
                } else {
                    CoverSlider.collapse();
                }
            },
            /**/
            change2Image: function() {
                Singleton.getInstance(MapContextController, undefined).stop();
                CoverSlider.expand();
            }
        };
    })());
    return CoverContextController;
});