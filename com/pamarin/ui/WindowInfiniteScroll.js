/**
 * @author jittagorn pitakmetagoon
 * create 01/11/2013
 */
define('com.pamarin.ui.WindowInfiniteScroll', [
    'module',
    'com.pamarin.core.lang.Class',
    'com.jquery.core.JQuery',
    'com.pamarin.ui.InfiniteScroll',
    'com.pamarin.core.util.Types'
], function(module, Class, $, InfiniteScroll, Types) {

    /**
     * @class WiddowInfiniteScroll
     */
    var WiddowInfiniteScroll = Class.define(module.id, (function() {

        return {
            /**
             * @override
             */
            constructor: function() {
                /**
                 * when scroll on $(window)
                 */
                WiddowInfiniteScroll.superConstructor.call(this, $(window));
            },
            /**
             * @override
             * @returns WiddowInfiniteScroll
             */
            detectElement: function() {
                /**
                 * detect $(document)
                 */
                WiddowInfiniteScroll.superDetectElement.call(this, $(document));
                return this;
            },
            //
            static: {
                /**
                 * public static method
                 * 
                 * @param {number} scope - event handler binding scope
                 * @param {function} callback - call when window scroll >= percenScroll
                 * @returns WiddowInfiniteScroll
                 */
                addScrollListener: function(scope, callback) {
                    if (Types.isFunction(scope)) {
                        callback = scope;
                        scope = undefined;
                    }

                    var windowScroll = new WiddowInfiniteScroll();
                    if (Types.isNumber(scope)) {
                        windowScroll.withScope(scope);
                    }

                    windowScroll.detectElement();
                    windowScroll.scroll(callback);
                    return windowScroll;
                }
            }
        };
    })()).extends(InfiniteScroll);



    return WiddowInfiniteScroll;
});
