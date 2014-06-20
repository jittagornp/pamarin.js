/**
 * @author jittagorn pitakmetagoon
 * create 01/06/2014
 */
define('com.pamarin.core.util.collection.Iterator', [
    'module',
    'com.pamarin.core.lang.Interface'
], function(module, Interface) {

    /**
     * @interface Iterator
     */
    var Iterator = Interface.define(module.id, {
        /**
         * @returns {Boolean}
         */
        hasNext: function() {

        },
        /** 
         * @returns {T}
         */
        next: function() {

        },
        /**/
        remove: function() {

        }
    });



    Iterator;
});