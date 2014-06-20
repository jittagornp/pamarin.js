/**
 * @author jittagorn pitakmetagoon
 * create 23/10/2013
 */
define('com.pamarin.core.util.collection.List', [
    'module',
    'com.pamarin.core.lang.Interface',
    'com.pamarin.core.util.collection.Collection'
], function(module, Interface, Collection) {



    /**
     * define standard List interface
     */
    var List = Interface.define(module.id, {
        /**
         * public method add
         * for add an element into List
         * 
         * @param {object} object
         */
        add: function(object) {

        },
        /**
         * public method remove
         * for remove an element outfrom List
         * 
         * @param {object | index} objectOrIndex object or index need remove
         */
        remove: function(objectOrIndex) {

        },
        /**
         * public method indexOf
         * for find index position of object in List
         * 
         * @param {object} object object which need find an index
         * @return {number} index of object in List
         */
        indexOf: function(object) {

        },
        /**
         * public method get
         * for get an object from index parameter
         * 
         * @param {number} index index of object in List, must > -1 and < size of List
         * @throws {ArrayIndexOutofBoundsException} ex
         * @returns {object} object
         */
        get: function(index) {

        },
        /**
         * public method clear
         * for clear elements in List
         */
        clear: function() {

        },
        //
        toArray : function(){
            
        }
    }).extends(Collection);
    
    

    return List;
});