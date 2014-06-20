/**
 * @author jittagorn pitakmetagoon
 * create 01/11/2013
 */
define('com.pamarin.ui.DOMInfiniteScroll', [
    'module',
    'com.pamarin.core.lang.Class',
    'com.pamarin.ui.InfiniteScroll'
], function(module, Class, InfiniteScroll) {

    /**
     * @class DOMInfiniteScroll
     */
    var DOMInfiniteScroll = Class.define(module.id, {
        /**
         * define DOMInfiniteScroll constructor
         */
        constructor: function(element) {
            DOMInfiniteScroll.superConstructor.call(this, element);
        },
        //
        static: {
            /**
             * public static method
             * 
             * @param {String | jQueryElement} element
             * @returns DOMInfiniteScroll
             */
            scrollElement: function(element) {
                return new DOMInfiniteScroll(element);
            }
        }
    }).extends(InfiniteScroll);



    return DOMInfiniteScroll;
});
