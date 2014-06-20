/**
 * @author jittagorn pitakmetagoon
 * create 09/01/2014
 */
define('com.pamarin.core.creational.Namespace', [
    'module',
    'com.pamarin.core.lang.Class',
    'com.pamarin.core.lang.Object',
    'com.pamarin.core.lang.Array',
    'com.pamarin.core.util.StringUtils',
    'com.pamarin.core.util.Types',
    'com.pamarin.core.util.Assert'
], function(module, Class, Object, Array, StringUtils, Types, Assert) {

    /**
     * @class Namespace
     */
    var Namespace = Class.define(module.id, (function(window) {

        function forEachPath(namespace, callback, func) {
            var paths = StringUtils.split(namespace, '.');
            paths = Types.isFunction(func) ? func(paths) : paths;

            return Array.forEachIndex(paths, callback) ? paths : undefined;
        }

        return {
            //
            static: {
                /**
                 * for create name space on context object
                 * 
                 * @param {String} namespace
                 * @param {Object} context_opt - optional / default is window
                 * 
                 * @returns {T extends Object} 
                 */
                create: function(namespace, context_opt) {
                    return Namespace.createAndSet(namespace, {}, context_opt);
                },
                /**
                 * for create name space and set value to context object
                 * 
                 * @param {String} namespace
                 * @param {T} value - value for set to name space
                 * @param {Object} context_opt - optional / default is window
                 * 
                 * @returns {T} 
                 */
                createAndSet: function(namespace, value, context_opt) {
                    Assert.assertString(namespace, module.id + '.createAndSet(String namespace, T value, Object context_opt).');

                    var parent = context_opt || window;
                    var last;

                    forEachPath(namespace, function(path) {
                        if (Types.isUndefined(parent[path])) {
                            parent[path] = {};
                        }

                        parent = parent[path];
                    }, function(paths) {
                        last = paths.pop();
                        return paths;
                    });

                    if (Types.isUndefined(parent[last])) {
                        parent[last] = value;
                    }

                    return parent[last];
                },
                /**
                 * for check name space is defined on context object
                 * 
                 * @param {String} namespace
                 * @param {Object} context_opt - optional / default is window
                 * 
                 * @returns {Boolean}
                 */
                isDefined: function(namespace, context_opt) {
                    Assert.assertString(namespace, module.id + '.isDefined(String namespace, Object context_opt).');

                    var parent = context_opt || window;
                    return !!forEachPath(namespace, function(path) {
                        if (Types.isUndefined(parent[path])) {
                            return false;
                        }

                        parent = parent[path];
                    });
                },
                /**
                 * for get value name space from context object
                 * 
                 * @param {String} namespace
                 * @param {Object} context_opt - optional
                 * @returns {T extends Object}
                 */
                getValue: function(namespace, context_opt) {
                    Assert.assert({
                        String: namespace,
                        ObjectOptional: context_opt
                    }, module.id + '.getValue(String namespace, Object context_opt).');

                    var parent = context_opt || window;
                    if (!Namespace.isDefined(namespace, parent)) {
                        return undefined;
                    }

                    forEachPath(namespace, function(path) {
                        parent = parent[path];
                    });

                    return parent;
                },
                /**
                 * for copy name space value from source to destination
                 * 
                 * @param {String} namespace
                 * @param {T extends Object} source
                 * @param {T extends Object} destination
                 */
                copy: function(namespace, source, destination) {
                    var value = Namespace.getValue(namespace, source);
                    if (Types.isUndefined(value)) {
                        return;
                    }

                    Namespace.createAndSet(namespace, value, destination || window);
                },
                /**
                 * for copy name space children value from source to destination
                 * 
                 * @param {String} namespace
                 * @param {T extends Object} source
                 * @param {T extends Object} destination
                 */
                copyChildren: function(namespace, source, destination) {
                    var value = Namespace.getValue(namespace, source);

                    Types.isObject(value) && Object.forEachProperty(value, function(val, key) {
                        Namespace.createAndSet(namespace + '.' + key, val, destination || window);
                    });
                }
            }
        };
    })(window));



    return Namespace;
});