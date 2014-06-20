/**
 * @author jittagorn pitakmetagoon
 * create 23/10/2013
 */
define('com.pamarin.core.util.collection.ArrayList', [
    'module',
    'com.pamarin.core.lang.Class',
    'com.pamarin.core.util.collection.List',
    'com.pamarin.core.util.Types',
    'com.pamarin.core.exception.ArrayIndexOutofBoundsException',
    'com.pamarin.core.util.collection.Collection',
    'com.pamarin.core.lang.Interface',
    'com.pamarin.core.util.Assert',
    'com.pamarin.core.util.collection.ListIterator'
], function(module, Class, List, Types, ArrayIndexOutofBoundsException, Collection, Interface, Assert, ListIterator) {

    /**
     * @class ArrayList
     */
    var ArrayList = Class.define(module.id, {
        /**
         * define variable of ArrayList instance
         */
        variable: {
            list_: null,
            size_: null
        },
        /**
         * method which call on new instance
         */
        constructor: function(collection) {
            if (Types.isUndefined(collection)) {
                this.list_ = [];
                this.size_ = 0;
            }else if (Types.isArray(collection)) {
                this.list_ = collection;
                this.size_ = collection.length;
            } else if (Types.isImplements(collection, Collection)) {
                this.list_ = collection.toArray();
                this.size_ = collection.size();
            }
        },
        /**
         * add element into ArrayList instance 
         * 
         * @param {T extends Object} object
         * @returns {ArrayList}
         */
        add: function(object) {
            this.list_ = this.toArray();
            this.list_[this.size_] = object;
            this.size_ = this.size_ + 1;

            return this;
        },
        /**
         * add all elements into ArrayList instance
         * 
         * @param {Collection<T extends Object>} collection
         * @returns {ArrayList}
         */
        addAll: function(collection) {
            Interface.ensureImplements(collection, Collection);

            var array = collection.toArray();
            var length = array.length;
            for (var i = 0; i < length; i++) {
                this.add(array[i]);
            }
        },
        /**
         * remove all elements of current ArrayList instance 
         */
        clear: function() {
            this.list_ = null;
            this.size_ = 0;
        },
        /**
         * for get element of ArrayList instance by index parameter
         * 
         * @param {Number} index
         * @returns {Object} object
         */
        get: function(index) {
            var object = this.toArray()[index];
            if (Types.isUndefined(object)) {
                throw new ArrayIndexOutofBoundsException(index + ' array index out of bounds exception ' + this.size_);
            }

            return object;
        },
        /**
         * for find index of object in ArrayList instance
         * 
         * @param {T extends Object} object
         * @returns {Number}
         */
        indexOf: function(object) {
            for (var index = 0; index < this.size_; index++) {
                var currentObject = this.list_[index];
                if (Types.isClassInstance(object) && Types.isFunction(object.equals) && object.equals(currentObject)) {
                    return index;
                } else if (currentObject === object) {
                    return index;
                }
            }

            return -1; //not found
        },
        /**
         * for remove element of ArrayList instance by index position (0 to (length - 1))
         * 
         * @param {Number} removeIndex
         * @throws {ArrayIndexOutofBoundsException} ex
         */
        removeIndex: function(removeIndex) {
            Assert.assertNumber(removeIndex, module.id + '.removeIndex(Number index).');

            if (removeIndex < 0 || Types.isUndefined(this.list_[removeIndex])) {
                throw new ArrayIndexOutofBoundsException(removeIndex + ' array index out of bounds exception ' + this.size_);
            }

            this.list_.splice(removeIndex, 1);
            this.size_ = this.list_.length;
        },
        /**
         * for remove element of ArrayList instance by object element or index position (0 to (length - 1))
         * 
         * @param {Object | Number} objectOrIndex
         * @throws {ArrayIndexOutofBoundsException} ex
         */
        remove: function(objectOrIndex) {
            Types.isNumber(objectOrIndex) ? this.removeIndex(objectOrIndex) : this.removeIndex(this.indexOf(objectOrIndex));
        },
        //        
        toArray: function() {
            if (this.list_ === null) {
                this.list_ = [];
            }

            return this.list_;
        },
        /**
         * for check ArrayList instance have not an elements
         * 
         * @returns {Boolean}
         */
        isEmpty: function() {
            return this.size_ === 0;
        },
        /**
         * for get elements current size of ArrayList instance
         * 
         * @returns {Number}
         */
        size: function() {
            return this.size_;
        },
        //
        forEachEntry: function(callback, ctx_opt) {
            for (var index = 0; index < this.size_; index++) {
                var val = callback.call(ctx_opt || this, this.list_[index], index);
                if(val === false){
                    return this;
                }
            }
            
            return this;
        },
        /**/
        iterator : function(){
            return new ListIterator(this);
        }
    }).implements(List);



    /**
     * return class ArrayList
     */
    return ArrayList;
});