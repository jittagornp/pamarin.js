/**
 * @author jittagorn pitakmetagoon
 * create 26/12/2013
 * 
 * update 15/03/2014 (jittagorn pitakmetagoon : add static method, move prototye method use static method)
 */
define('com.pamarin.core.lang.Object', [
    //
], function() {

    /**
     * Object
     */
    var Object = function() {
        //
    };

    Object.containsKey = function(object, key) {
        return key in object;
    };

    Object.prototype.containsKey = function(key) {
        return Object.containsKey(this, key);
    };

    Object.hasOwnKey = function(object, key) {
        return object.hasOwnProperty(key);
    };

    Object.prototype.hasOwnKey = function(key) {
        return Object.hasOwnKey(this, key);
    };

    Object.hasOwnValue = function(object, value) {
        for (var key in object) {
            if (this.hasOwnKey(object, key) && object[key] === value) {
                return true;
            }
        }

        return false;
    };

    Object.prototype.hasOwnValue = function(value) {
        return Object.hasOwnValue(this, value);
    };

    Object.containsValue = function(object, value) {
        for (var key in object) {
            if (object[key] === value) {
                return true;
            }
        }

        return false;
    };

    Object.prototype.containsValue = function(value) {
        return Object.containsValue(this, value);
    };

    Object.getAttribute = function(object, key, defaultValue) {
        return typeof object[key] === 'undefined' ? defaultValue : object[key];
    };

    Object.prototype.getAttribute = function(key, defaultValue) {
        return Object.getAttribute(this, key, defaultValue);
    };

    Object.setAttribute = function(object, key, value) {
        object[key] = value;
    };

    Object.prototype.setAttribute = function(key, value) {
        Object.setAttribute(this, key, value);
    };

    Object.findSize = function(object) {
        var size = 0;
        for (var key in object) {
            size = size + 1;
        }

        return size;
    };

    Object.prototype.findSize = function() {
        return Object.findSize(this);
    };

    Object.findOwnSize = function(object) {
        var size = 0;
        for (var key in object) {
            if (this.hasOwnKey(object, key)) {
                size = size + 1;
            }
        }

        return size;
    };

    Object.prototype.findOwnSize = function() {
        return Object.findOwnSize(this);
    };

    Object.getKeys = function(object) {
        var keys = [];
        for (var key in object) {
            keys.push(key);
        }

        return keys;
    };

    Object.prototype.getKeys = function() {
        return Object.getKeys(this);
    };

    Object.getOwnKeys = function(object) {
        var keys = [];
        for (var key in object) {
            if (Object.hasOwnKey(object, key)) {
                keys.push(key);
            }
        }

        return keys;
    };

    Object.prototype.getOwnKeys = function() {
        return Object.getOwnKeys(this);
    };

    Object.getValues = function(object) {
        return this.toArray(object);
    };

    Object.prototype.getValues = function() {
        return Object.getValues(this);
    };

    Object.getOwnValues = function(object) {
        return this.toOwnArray(object);
    };

    Object.prototype.getOwnValues = function() {
        return Object.getOwnValues(this);
    };

    Object.transpose = function(object) {
        var transposed = {};
        this.forEach(object, function(value, key) {
            this.setAttribute(transposed, value, key);
        }, this);

        return transposed;
    };

    Object.prototype.transpose = function() {
        return Object.transpose(this);
    };

    Object.isEmpty = function(object) {
        for (var key in object) {
            if (this.hasOwnKey(object, key)) {
                return false;
            }
        }

        return true;
    };

    Object.prototype.isEmpty = function() {
        return Object.isEmpty(this);
    };

    Object.clear = function(object) {
        for (var key in object) {
            delete object[key];
        }
    };

    Object.prototype.clear = function() {
        Object.clear(this);
    };

    Object.removeByKey = function(object, key) {
        if (typeof object[key] === 'undefined') {
            return false;
        }

        delete this[key];

        if (typeof object[key] === 'undefined') {
            return true;
        }

        return false;
    };

    Object.prototype.removeByKey = function(key) {
        return Object.removeByKey(this, key);
    };

    Object.copy = function(source, destination) {
        this.forEach(source, function(value, key) {
            destination[key] = value;
        });

        return destination;
    };

    Object.copyProperty = function(source, destination) {
        this.forEachProperty(source, function(value, key) {
            destination[key] = value;
        });

        return destination;
    };

    Object.prototype.copyProperty = function(destination) {
        return Object.copyProperty(this, destination);
    };

    Object.prototype.copy = function(destination) {
        return Object.copy(this, destination);
    };

    Object.clone = function(object) {
        return this.copy(object, {});
    };

    Object.prototype.clone = function() {
        return Object.clone(this);
    };

    Object.forEach = function(object, callback, context_opt) {
        if (!object) {
            return false;
        }

        for (var key in object) {
            var value = callback.call(context_opt || object, object[key], key, object);
            if (value === false) {
                return false;
            }
        }

        return true;
    };

    Object.prototype.forEach = function(callback, context_opt) {
        return Object.forEach(this, callback, context_opt);
    };

    Object.forEachProperty = function(object, callback, context_opt) {
        if (!object) {
            return false;
        }

        for (var key in object) {
            if (this.hasOwnKey(object, key)) {
                var value = callback.call(context_opt || object, object[key], key, object);
                if (value === false) {
                    return false;
                }
            }
        }

        return true;
    };

    Object.prototype.forEachProperty = function(callback, context_opt) {
        return Object.forEachProperty(this, callback, context_opt);
    };

    Object.toArray = function(object) {
        var array = [];
        Object.forEach(object, function(value) {
            array.push(value);
        });

        return array;
    };

    Object.prototype.toArray = function() {
        return Object.toArray(this);
    };

    Object.toOwnArray = function(object) {
        var array = [];
        Object.forEachProperty(object, function(value) {
            array.push(value);
        });

        return array;
    };

    Object.prototype.toOwnArray = function() {
        return Object.toOwnArray(this);
    };

    Object.forEachFunction = function(object, callback, context_opt) {
        return this.forEach(object, function(value) {
            if (typeof value === 'function') {
                callback.apply(this, arguments);
            }
        }, context_opt);
    };

    Object.prototype.forEachFunction = function(callback, context_opt) {
        return Object.forEachFunction(this, callback, context_opt);
    };

    Object.forEachFunctionProperty = function(object, callback, context_opt) {
        return this.forEachProperty(object, function(value) {
            if (typeof value === 'function') {
                callback.apply(this, arguments);
            }
        }, context_opt);
    };

    Object.prototype.forEachFunctionProperty = function(callback, context_opt) {
        return Object.forEachFunctionProperty(this, callback, context_opt);
    };

    return Object;
});