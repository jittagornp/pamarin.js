/**
 * @author jittagorn pitakmetagoon
 * create 07/06/2014
 */
define('com.pamarin.web.controller.unseen.cover.CoverSlider', [
    'module',
    'com.pamarin.core.lang.Class',
    'com.jquery.core.JQuery'
], function(module, Class, $) {

    /**
     * @class CoverSlider
     */
    var CoverSlider = Class.define(module.id, (function() {

        var infoWidth_ = -1;
        var imageWidth_ = -1;

        return {
            /**/
            static: {
                /**/
                ATTRACTION_SELECTOR_: '#pmrUnseenAttraction',
                TOGGLE_BUTTON_SELECTOR_: '#pmrUnseenAttractionWindowToggle',
                INFO_SELECTOR_: '#pmrUnseenNameWrapper',
                IMAGE_SELECTOR_: '#pmrUnseenImage',
                EXPAND_STYLE_CLASS_: 'expand',
                /**/
                expand: function() {
                    CoverSlider.attractExpand();
                    CoverSlider.infoExpand();
                },
                /**/
                attractExpand: function() {
                    if (CoverSlider.isAttractExpand()) {
                        return;
                    }

                    var $button = $(CoverSlider.TOGGLE_BUTTON_SELECTOR_);
                    var $attraction = $(CoverSlider.ATTRACTION_SELECTOR_);

                    $attraction.stop().animate({
                        'margin-right': 0
                    }, this.SPEED_SLIDE_);

                    $attraction.addClass(this.EXPAND_STYLE_CLASS_);
                    $button.addClass(this.EXPAND_STYLE_CLASS_);
                },
                /**/
                infoExpand: function() {
                    if (CoverSlider.isInfoExpand()) {
                        return;
                    }

                    var $info = $(CoverSlider.INFO_SELECTOR_);

                    if (infoWidth_ < 0) {
                        infoWidth_ = $info.width();
                        imageWidth_ = $(CoverSlider.IMAGE_SELECTOR_).width();
                    }

                    $info.stop().animate({
                        'width': infoWidth_ + 'px'
                    }, this.SPEED_SLIDE_);

                    $info.addClass(this.EXPAND_STYLE_CLASS_);
                },
                /**/
                collapse: function() {
                    CoverSlider.attractCollapse();
                    CoverSlider.infoCollapse();
                },
                /**/
                attractCollapse: function() {
                    if (!CoverSlider.isAttractExpand()) {
                        return;
                    }

                    var $button = $(CoverSlider.TOGGLE_BUTTON_SELECTOR_);
                    var $attraction = $(CoverSlider.ATTRACTION_SELECTOR_);

                    $attraction.stop().animate({
                        'margin-right': -$attraction.width() + 'px'
                    }, this.SPEED_SLIDE_);

                    $attraction.removeClass(this.EXPAND_STYLE_CLASS_);
                    $button.removeClass(this.EXPAND_STYLE_CLASS_);
                },
                /**/
                infoCollapse: function() {
                    if (!CoverSlider.isInfoExpand()) {
                        return;
                    }

                    var $info = $(CoverSlider.INFO_SELECTOR_);

                    if (infoWidth_ < 0) {
                        infoWidth_ = $info.width();
                        imageWidth_ = $(CoverSlider.IMAGE_SELECTOR_).width();
                    }

                    $info.stop().animate({
                        'width': (imageWidth_ + 2) + 'px'
                    }, this.SPEED_SLIDE_);

                    $info.removeClass(this.EXPAND_STYLE_CLASS_);
                },
                /**
                 * @returns {Boolean}
                 */
                isExpand: function() {
                    return CoverSlider.isAttractExpand() && CoverSlider.isInfoExpand();
                },
                /**
                 * @returns {Boolean}
                 */
                isAttractExpand: function() {
                    var $attraction = $(CoverSlider.ATTRACTION_SELECTOR_);
                    return $attraction.hasClass(this.EXPAND_STYLE_CLASS_);
                },
                /**
                 * @returns {Boolean}
                 */
                isInfoExpand: function() {
                    var $info = $(CoverSlider.INFO_SELECTOR_);
                    return $info.hasClass(this.EXPAND_STYLE_CLASS_);
                },
                /**/
                toggle: function() {
                    CoverSlider.isExpand()
                            ? CoverSlider.collapse()
                            : CoverSlider.expand();
                }
            }
        };
    })());



    return CoverSlider;
});