/**
 * @author jittagorn pitakmetagoon
 * create 13/06/2014
 */
var ApplicationContextManager = (function() {

    function is(data, type) {
        return Object.prototype.toString.call(data) === '[object ' + type + ']';
    }

    function isString(data) {
        return is(data, 'String');
    }

    function isObject(data) {
        return is(data, 'Object');
    }

    function isArray(data) {
        return is(data, 'Array');
    }

    function isFunction(data) {
        return is(data, 'Function');
    }

    function isUndefined(data) {
        return is(data, 'Undefined');
    }

    function forEachIndex(arr, callback, ctx_opt) {
        if (!isArray(arr)) {
            return false;
        }

        var length = arr.length;
        for (var i = 0; i < length; i++) {
            var val = callback.call(ctx_opt || this, arr[i], i, arr, length);
            if (val === false) {
                return false;
            }
        }

        return true;
    }

    function split(text, by) {
        var split = text.split(by);
        var newArr = [];
        forEachIndex(split, function(val) {
            !!val && newArr.push(val);
        });

        return newArr;
    }

    function forEachPath(namespace, callback, func) {
        var paths = split(namespace, '.');
        paths = isFunction(func) ? func(paths) : paths;
        return forEachIndex(paths, callback) ? paths : undefined;
    }

    function createAndSet(namespace, value, context_opt) {
        var parent = context_opt || window;
        var last;

        forEachPath(namespace, function(path) {
            if (isUndefined(parent[path])) {
                parent[path] = {};
            }

            parent = parent[path];
        }, function(paths) {
            last = paths.pop();
            return paths;
        });

        if (isUndefined(parent[last])) {
            parent[last] = value;
        }

        return parent[last];
    }

    function isDefined(namespace, context_opt) {
        var parent = context_opt || window;
        return !!forEachPath(namespace, function(path) {
            if (isUndefined(parent[path])) {
                return false;
            }

            parent = parent[path];
        });
    }

    function getValue(namespace, context_opt) {
        var parent = context_opt || window;
        if (!isDefined(namespace, parent)) {
            return undefined;
        }

        forEachPath(namespace, function(path) {
            parent = parent[path];
        });

        return parent;
    }

    /**
     * @class AppContext
     */
    var AppContext = function(name) {
        this.name_ = name || 'ctx__' + new Date().getTime();
        this.context_ = {};
    };

    AppContext.prototype.registerContext = function(namespace, ctx) {
        if (isObject(namespace)) {
            this.context_[this.name_] = namespace;
            return;
        }

        if (!this.context_[this.name_]) {
            this.context_[this.name_] = {};
        }

        createAndSet(namespace, ctx, this.context_[this.name_]);
    };

    AppContext.prototype.getParameter = function(namespace) {
        if (!this.context_[this.name_]) {
            this.context_[this.name_] = {};
        }

        if (!isString(namespace)) {
            return this.context_[this.name_];
        }

        return getValue(namespace, this.context_[this.name_]);
    };

    return AppContext;
})();