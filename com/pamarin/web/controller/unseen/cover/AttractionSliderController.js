/**
 * @author jittagorn pitakmetagoon
 * create 06/06/2014
 */
define('com.pamarin.web.controller.unseen.cover.AttractionSliderController', [
    'module',
    'com.pamarin.core.lang.Class',
    'com.jquery.core.JQuery',
    'com.pamarin.web.controller.unseen.cover.CoverSlider'
], function(module, Class, $, CoverSlider) {

    /**
     * @class AttractionSliderController
     * @controller
     */
    var AttractionSliderController = Class.define(module.id, {
        /**/
        variable: {
            DELAY_JIGSAW_METHOD_: 500,
            TOGGLE_BUTTON_SELECTOR_: '#pmrUnseenAttractionWindowToggle',
            IMAGE_PROFILE_SELECTOR_: '#pmrUnseenImage'
        },
        /**/
        onJigsawReady: function() {
            this.fullSlide();
            this.infoSlide();
        },
        /**
         * @private
         */
        infoSlide: function() {
            var $imageProfile = $(this.IMAGE_PROFILE_SELECTOR_);

            $imageProfile.on('mouseenter', function() {
                !CoverSlider.isAttractExpand() && CoverSlider.infoExpand();
            });

            $imageProfile.on('mouseleave', function() {
                !CoverSlider.isAttractExpand() && CoverSlider.infoCollapse();
            });
        },
        /**
         * @private
         */
        fullSlide: function() {
            var $button = $(this.TOGGLE_BUTTON_SELECTOR_);
            $button.on('click', CoverSlider.toggle);
        }
    });



    return AttractionSliderController;
});