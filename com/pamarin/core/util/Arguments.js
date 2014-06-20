/**
 * @author jittagorn pitakmetagoon
 * create 17/05/2014
 */
define('com.pamarin.core.util.Arguments', [
    'com.pamarin.core.lang.Array',
    'com.pamarin.core.lang.NativeTypes',
    'com.pamarin.core.exception.IllegalArgumentException'
], function(Array, NativeTypes, IllegalArgumentException) {

    /**
     * @class Arguments
     */
    var Arguments = (function() {

        var slice = Array.prototype.slice;
        function makeError(type, argument) {
            throw new IllegalArgumentException('require arguments is  ' + type + ', but is ' + NativeTypes.get(argument));
        }

        function ensureRequire(type, argument) {
            NativeTypes.isUndefined(argument) && makeError(type, argument);
        }

        function getOptional(type, index, args) {
            args = slice.call(args);
            var argument = args[index];
            if (NativeTypes['is' + type](argument)) {
                return argument;
            }
        }

        function get(type, index, args) {
            var argument = getOptional(type, index, args);
            ensureRequire(type, argument);
            return argument;
        }

        var methods = {};
        Array.forEachIndex(['Object', 'Number', 'Boolean', 'Function', 'String', 'RegEx'], function(type) {
            methods['get' + type] = (function(type) {
                return function(index, args) {
                    return get(type, index, args);
                };
            })(type);

            methods['get' + type + 'Optional'] = (function(type) {
                return function(index, args) {
                    return getOptional(type, index, args);
                };
            })(type);
        });

        return methods;
    })();



    return Arguments;
});