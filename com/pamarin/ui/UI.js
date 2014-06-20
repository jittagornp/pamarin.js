/**
 * @author jittagorn pitakmetagoon
 * create 20/10/2013
 */
define('com.pamarin.ui.UI', [
    'module',
    'com.jquery.core.JQuery',
    'com.pamarin.core.util.Types',
    'com.pamarin.core.exception.IllegalArgumentException',
    'com.pamarin.core.lang.Class',
    'com.pamarin.core.util.Assert'
], function(module, $, Types, IllegalArgumentException, Class, Assert) {

    /**
     * @class UI
     */
    var UI = Class.define(module.id, (function() {

        var $window = $(window);
        var $pamarin = $('#pamarin');
        var scrollTop;

        return {
            /**
             * define UI instance variable
             */
            variable: {
                $element_: null,
                scope_: null
            },
            //
            constructor: function(element) {
                this.$element_ = this.parseElement(element);
            },
            /**
             * for parse string or jqueryElement to this.$element
             * @param {String | jQueryElement} element
             * @returns UI
             */
            parseElement: function(element) {
                var $element;
                if (Types.isString(element)) {
                    $element = $(element);
                } else if (element.constructor === $) {
                    $element = element;
                } else {
                    throw new IllegalArgumentException('Invalid input type parameters,' + module.id + '.parseElement(<String | jQueryElement> element)');
                }

                return $element;
            },
            /**
             * @param {Number} scope
             * @returns UI
             */
            withScope: function(scope) {
                Assert.assertNumber(scope, module.id + '.withScope(Number scope).');

                this.scope_ = scope;
                return this;
            },
            /**
             * 
             * @returns {Number}
             */
            getScope : function(){
                return this.scope_;
            },
            /**
             * @return {jQueryElement} 
             */
            getElement: function() {
                return this.$element_;
            },
            /**
             * fixed window scroll
             */
            fixedWindowScroll: function() {
                scrollTop = $window.scrollTop();
                $pamarin.css({
                    'margin-top': -scrollTop
                }).addClass('pmr-fixed');
            },
            /**
             * return fixed window scroll
             */
            returnWindowScroll: function() {
                $pamarin.removeClass('pmr-fixed').css({
                    'margin-top': 0
                });

                $window.scrollTop(scrollTop);
            }
        };
    })());



    /**
     * return class UI
     */
    return UI;
});