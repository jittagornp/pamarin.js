/**
 * @author jittagorn pitakmetagoon
 * create 09/11/2013
 */
define('com.pamarin.core.util.collection.Collection', [
    'module',
    'com.pamarin.core.lang.Interface'
], function(module, Interface) {



    /**
     * define interface Collection
     */
    var Collection = Interface.define(module.id, {
        /**
         * for add entry into collection
         */
        add: function(entry) {

        },
        /**
         * for add All collectionEntry into current collection
         * @param {Collection} collection
         */
        addAll: function(collection) {

        },
        /**
         * for clear all entry in colleciotn
         */
        clear: function() {

        },
        /**
         * for check current entry containts in collection
         * 
         * @param {Collection} entry
         * @returns {Boolean} if containts return true else return false
         */
        contains: function(entry) {

        },
        /**
         * for remove current entry out from collection
         * 
         * @param {Collection} entry
         * @returns {Boolean} if can remove return true else return false
         */
        remove: function(entry) {

        },
        /**
         * for remove collectionEntry out from collection
         * 
         * @param {Collection} collection
         * @returns {Boolean} if can remove all return true else return false
         */
        removeAll: function(collection) {

        },
        /**
         * for check collection is empty
         * 
         * @returns {Boolean} if empty return true else return false
         */
        isEmpty: function() {

        },
        /**
         * get current size of collection
         * 
         * @returns {number}
         */
        size: function() {

        },
        /**
         * convert current collection to array
         * 
         * @returns {array}
         */
        toArray: function() {

        },
        //
        forEachEntry : function(){
            
        },
        /**/
        iterator : function(){
            
        }
    });



    /**
     * return interface Collection
     */
    return Collection;
});