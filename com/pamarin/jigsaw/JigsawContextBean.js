/**
 * @author jittagorn pitakmetagoon
 * create 25/06/2014
 */
define('com.pamarin.jigsaw.JigsawContextBean', [
    'module',
    'com.pamarin.core.lang.Class'
], function(module, Class) {

    /**
     * @class JigsawContextBean
     */
    var JigsawContextBean = Class.define(module.id, {
        /**/
        constant: {
            CONTEXT_SCOPED: 'context',
            PAGE_SCOPED: 'page',
            TAB_SCOPED: 'tab',
            SECTION_SCOPED: 'section',
            SCOPEDS: ['page', 'tab', 'section']
        },
        /**/
        variable: {
            $element_: null,
            scoped_: 'context',
            controller_: null
        },
        /**/
        constructor: function($element) {
            this.$element_ = $element;
        },
        /**/
        static: {
            /**/
            buildContext: function($element) {
                return new JigsawContextBean($element);
            },
            /**
             * @param {type} obj
             */
            fromObject: function(obj) {
                return JigsawContextBean
                        .buildContext(obj.$element)
                        .setScoped(obj.scoped || 'context')
                        .setController(obj.controller);
            }
        },
        /**
         * @param {String} scoped - ref to constant
         * @returns {JigsawContextBean}
         */
        setScoped: function(scoped) {
            this.scoped_ = scoped;
            return this;
        },
        /**
         * @returns {String}
         */
        getScoped: function() {
            return this.scoped_;
        },
        /**
         * @param {String} controller
         * @returns {JigsawContextBean}
         */
        setController: function(controller) {
            this.controller_ = controller;
            return this;
        },
        /**
         * @returns {String}
         */
        getController: function() {
            return this.controller_;
        },
        /** 
         * @param {jQuery} $element
         * @returns {JigsawContextBean}
         */
        set$Element: function($element) {
            this.$element_ = $element;
            return this;
        },
        /**
         * @returns {jQuery}
         */
        get$Element: function() {
            return this.$element_;
        },
        /**
         * @param {JigsawContextBean} obj
         * @returns {Boolean}
         */
        equals: function(obj) {
            if (!(obj instanceof JigsawContextBean)) {
                return false;
            }

            return this.getController() === obj.getController();
        }
    });



    return JigsawContextBean;
});
