/**
 * @author jittagorn pitakmetagoon
 * create 06/01/2014
 */
define('com.pamarin.core.structural.Proxy', [
    'module',
    'com.pamarin.core.lang.Class',
    'com.pamarin.core.util.Types'
], function(module, Class, Types) {

    /**
     * @class Proxy
     * reference : http://addyosmani.com/resources/essentialjsdesignpatterns/book/#proxypatternjquery
     * 
     * example to use
     * -------------------------------------------------------------------------
     * KeyboardUtils.onKey('Esc', Proxy.call(this, function() {
     *     if (this.isActive()) {
     *         this.close();
     *     }
     * }));
     */
    var Proxy = Class.define(module.id, (function() {

        var slice = Array.prototype.slice;

        return {
            //
            static: {
                /**
                 * @param {Object} context
                 * @param {Function} callback
                 * 
                 * @returns {Function or undefined}
                 */
                call: function(context, callback) {
                    if (Types.isString(callback)) {
                        callback = context[callback];
                    }

                    if (!Types.isFunction(callback)) {
                        return undefined;
                    }

                    //get another arguments, not include context and callback arguments (2)
                    var args =  slice.call(arguments, 2);

                    return function() {
                        //concat call function arguments and this function arguments then apply with context
                        return callback.apply(context, args.concat( slice.call(arguments)));
                    };
                }
            }
        };
    })());



    return Proxy;
});