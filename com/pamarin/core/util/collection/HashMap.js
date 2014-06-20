/**
 * @author jittagorn pitakmetagoon
 * create 23/10/2013
 */
define('com.pamarin.core.util.collection.HashMap', [
    'module',
    'com.pamarin.core.util.Types',
    'com.pamarin.core.lang.Object',
    'com.pamarin.core.lang.Class',
    'com.pamarin.core.util.collection.Map'
], function(module, Types, Object, Class, Map) {


    /**
     * @class HashMap
     */
    var HashMap = Class.define(module.id, (function() {

        /**
         * for check real time Map size
         */
        function totalEntry() {
            var count = 0;
            var entry = this.entrySet();
            for (var key in entry) {
                if (entry.hasOwnProperty(key)) {
                    count = count + 1;
                }
            }

            return count;
        }

        return {
            /**/
            static: {
                /**/
                fromObject: function(obj) {
                    var map = new HashMap();
                    Object.forEachProperty(obj, function(val, key) {
                        map.put(key, val);
                    });

                    return map;
                }
            },
            //
            variable: {
                entry_: null,
                size_: 0
            },
            //
            constructor: function(object) {
                this.entry_ = object || {};
            },
            /**
             * for check Map size
             */
            size: function() {
                return this.size_;
            },
            //
            isEmpty: function() {
                return this.size_ === 0;
            },
            //
            put: function(key, value) {
                this.entrySet()[key] = value;
                this.size_ = totalEntry.call(this);
            },
            //
            remove: function(key) {
                delete this.entrySet()[key];
                this.size_ = totalEntry.call(this);
            },
            //
            entrySet: function() {
                if (this.entry_ === null) {
                    this.entry_ = {};
                }

                return this.entry_;
            },
            //
            get: function(key) {
                var value = this.entrySet()[key];
                if (Types.isUndefined(value)) {
                    return null;
                }

                return value;
            },
            //
            clear: function() {
                this.entry_ = null;
                this.size_ = 0;
            },
            //
            forEachEntry: function(callback, context_opt) {
                if (this.entry_ === null) {
                    return;
                }

                for (var property in this.entry_) {
                    if (this.entry_.hasOwnProperty(property)) {
                        var val = callback.call(context_opt || this, this.entry_[property], property, this.entry_);
                        if (val === false) {
                            return false;
                        }
                    }
                }
                
                return true;
            }
        };
    })()).implements(Map);



    /**
     * return class HashMap
     */
    return HashMap;
});