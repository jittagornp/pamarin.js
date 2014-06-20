/**
 * @author jittagorn pitakmetagoon
 * create 23/10/2013
 */
define('com.pamarin.core.util.collection.Map', [
    'module',
    'com.pamarin.core.lang.Interface'
], function(module, Interface) {



    /**
     * define standard Map interface
     */
    var Map = Interface.define(module.id, {
        /**
         * public method put
         * for put key/value pair into Map
         * 
         * @param {object} key key for identify value
         * @param {object} value 
         */
        put: function(key, value) {

        },
        /**
         * public method remove
         * for remove value out from Map by key
         * 
         * @param {object} key
         */
        remove: function(key) {

        },
        /**
         * public method get
         * for get value from Map by key
         * 
         * @param {object} key
         * @returns {object} value
         */
        get: function(key) {

        },
        /**
         * public method clear
         * for clear entry in Map
         */
        clear: function() {

        },
        /**
         * public method entrySet
         * for get real entries in Map
         * 
         * @return {object} map
         */
        entrySet: function() {

        }
    });



    return Map;
});