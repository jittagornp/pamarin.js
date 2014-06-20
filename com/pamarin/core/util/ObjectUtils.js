/**
 * @author jittagorn pitakmetagoon
 * create 30/01/2104
 */
define('com.pamarin.core.util.ObjectUtils', [
    'module',
    'com.pamarin.core.lang.Class'
], function(module, Class) {

    /**
     * @class ObjectUtils
     */
    var ObjectUtils = Class.define(module.id, (function() {

        var _slice = Array.prototype.slice;

        return {
            //
            static: {
                //
                mergeObjects: function() {
                    var objects = _slice.call(arguments);
                    var newObject = {};

                    //...

                    return newObject;
                }
            }
        };
    })());


    return ObjectUtils;
});