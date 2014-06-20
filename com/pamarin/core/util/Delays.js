/**
 * @author jittagorn pitakmetagoon
 * create 26/01/2014 
 */
define('com.pamarin.core.util.Delays', [
    'module',
    'com.pamarin.core.lang.Class',
    'com.pamarin.core.util.Types',
    'com.pamarin.core.structural.Proxy',
    'com.pamarin.core.exception.IllegalArgumentException'
], function(module, Class, Types, Proxy, IllegalArgumentException) {

    /**
     * @class Delays
     * 
     * example
     * -------------------------------------------------------------------------
     * Delays.run(function(){
     * 
     *     //do something...
     *           
     * }, 3000, this);
     */
    var Delays = Class.define(module.id, (function() {

        return {
            //
            static: {
                /**
                 * for run delay by timeout
                 * 
                 * @param {Function} callback - require
                 * @param {Number} timeout - (require) delay time
                 * @param {Object} context_opt - optional
                 * 
                 * @throws {IllegalArgumentException} - invalid input type parameters
                 */
                run: function(callback, timeout, context_opt, args) {
                    if (!Types.isFunction(callback) || !Types.isNumber(timeout)) {
                        throw new IllegalArgumentException('Invalid input type parameters, ' + module.id + '.run(Function callback, Number timeout, Object context_opt).');
                    }

                    var timeoutReference = window.setTimeout(function() {
                        window.clearTimeout(timeoutReference);
                        callback.apply(context_opt, args);
                    }, timeout);
                }
            }
        };
    })());



    return Delays;
});