/**
 * @author jittagorn pitakmetagoon
 * create 23/10/2013
 */
define('com.pamarin.core.util.collection.HashSet', [
    'module',
    'com.pamarin.core.util.Types',
    'com.pamarin.core.lang.Class',
    'com.pamarin.core.util.collection.Set',
    'com.pamarin.core.util.collection.HashMap',
    'com.pamarin.core.structural.Proxy'
], function(module, Types, Class, Set, HashMap, Proxy) {

    /**
     * @class HashSet
     */
    var HashSet = Class.define(module.id, (function() {

        return {
            //
            variable: {
                map_: null
            },
            //
            constructor: function() {
                this.map_ = new HashMap();
            },
            //
            add: function(entry) {
                this.map_.put(entry, entry);
            },
            //
            addAll: function() {

            },
            //
            clear: function() {
                this.map_.clear();
            },
            //
            contains: function() {

            },
            //
            containsAll: function() {

            },
            //
            isEmpty: function() {
                return this.map_.isEmpty();
            },
            //
            iterator: function() {

            },
            //
            remove: function(entry) {
                this.map_.remove(entry);
            },
            //
            removeAll: function() {

            },
            //
            size: function() {
                return this.map_.size();
            },
            //
            toArray: function() {
                var ARRAY = [];
                this.forEachEntry(function(value) {
                    ARRAY.push(value);
                });

                return ARRAY;
            },
            //
            hashCode: function() {

            },
            //
            equals: function() {

            },
            //
            forEachEntry: function(callback) {
                this.map_.forEachEntry(Proxy.call(this, function(value, key, entry) {
                    callback.call(this, value, entry);
                }));
            }
        };
    })()).implements(Set);



    return HashSet;
});