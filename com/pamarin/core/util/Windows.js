/**
 * @author jittagorn pitakmetagoon
 * create 03/11/2013
 */
define('com.pamarin.core.util.Windows', [
    'module',
    'com.jquery.core.JQuery',
    'com.pamarin.core.lang.Class',
    'com.pamarin.core.util.Types',
    'com.pamarin.core.util.Assert'
], function(module, $, Class, Types, Assert) {

    /**
     * @class Windows
     */
    var Windows = Class.define(module.id, (function() {

        var $window = $(window);

        return {
            //
            constant: {
                DELAY_TIME: 100
            },
            /**
             * define public static method
             */
            static: {
                /**
                 * add window resize listener
                 * 
                 * @param {Number} scope_opt
                 * @param {Function} callback
                 * @param {Number} delay_opt - (optional)
                 */
                resize: function(scope_opt, callback, delay_opt) {
                    if (Types.isFunction(scope_opt)) {
                        callback = scope_opt;
                        scope_opt = undefined;
                    }
                    
                    Assert.assert({
                        Function : callback,
                        NumberOptional : [scope_opt, delay_opt]
                    }, module.id + '.resize(Number scope_opt, Function callback, Number delay_opt).');

                    var timeoutReference = null;
                    $window.binding('resize', scope_opt, function() {
                        if (timeoutReference) {
                            window.clearTimeout(timeoutReference);
                        }

                        timeoutReference = setTimeout(function() {
                            window.clearTimeout(timeoutReference);
                            callback();
                        }, delay_opt || Windows.constant('DELAY_TIME'));
                    });
                }
            }
        };
    })());



    /**
     * return class Windows
     */
    return Windows;
});