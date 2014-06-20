/**
 * @author jittagorn pitakmetagoon
 * create 12/05/2014
 */
define('com.pamarin.core.controller.Controller', [
    'module',
    'com.pamarin.core.lang.Class',
    'com.pamarin.core.inject.Injection'
], function(module, Class, Injection) {

    /**
     * @class Controller
     */
    var Controller = Class.define(module.id, (function() {

        return {
            /**/
            static: {
                /**
                 * @param {String} name
                 * @param {String} clazz
                 * @returns {Class}
                 */
                define: function(name, clazz) {
                    clazz.variable = clazz.variable || {};
                    clazz.variable.DI = Injection;

                    return Class.define(name, clazz);
                }
            }
        };
    })());



    return Controller;
});