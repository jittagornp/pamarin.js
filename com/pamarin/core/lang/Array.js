/**
 * @author jittagorn pitakmetagoon
 * create 17/03/2014
 */
define('com.pamarin.core.lang.Array', [
    //
], function() {

    var Array = function() {
        //
    };

    /**
     * extends native Array
     */
    Array.prototype = new window.Array();


    Array.forEachIndex = function(array, callback, context_opt) {
        if (!array) {
            return false;
        }

        var length = array.length;
        for (var i = 0; i < length; i++) {
            var val = callback.call(context_opt, array[i], i, array);
            if (val === false) {
                return false;
            }
        }

        return true;
    };

    Array.prototype.forEachIndex = function(callback, context_opt) {
        return Array.forEachIndex(this, callback, context_opt);
    };

    Array.hasElement = function(array, element) {
        return array.indexOf(element) !== -1;
    };

    Array.prototype.hasElement = function(element) {
        return Array.hasElement(this, element);
    };

    Array.clone = function(array, callback_opt, context_opt) {
        var cloneArray = [];

        Array.forEachIndex(array, function(value, index) {
            if (typeof callback_opt === 'function') {
                callback_opt.call(context_opt, value, index, cloneArray);
            } else {
                cloneArray[index] = value;
            }
        });

        return cloneArray;
    };

    Array.prototype.clone = function(callback_opt, context_opt) {
        return Array.clone(this, callback_opt, context_opt);
    };

    Array.remove = function(array, item) {
        if (!array) {
            return array;
        }

        var length = array.length;
        for (var i = 0; i < length; i++) {
            if (array[i] === item) {
                array.splice(i, 1);
                --i;
            }
        }

        return array;
    };

    Array.prototype.remove = function(item) {
        return Array.remove(this, item);
    };

    Array.removeAt = function(array, index) {
        Array.forEachIndex(array, function(value, index_, array) {
            if (index === index_) {
                array.splice(index_, 1);
            }
        });

        return array;
    };

    Array.prototype.removeAt = function(index) {
        return Array.remove(this, index);
    };



    return Array;
});