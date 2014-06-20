/**
 * @author jittagorn pitakmetagoon
 * create 24/12/2013
 */
define('com.pamarin.core.creational.Singleton', [
    'module',
    'com.pamarin.core.lang.Class',
    'com.pamarin.core.util.collection.HashMap',
    'com.pamarin.core.util.Assert'
], function(module, Class, HashMap, Assert) {

    /**
     * @class Singleton
     */
    var Singleton = Class.define(module.id, (function() {
        
        var slice = Array.prototype.slice;
        /**
         * variable for keep single instance of classes
         */
        var instances = new HashMap();

        return {
            /**
             * define static method and variable
             */
            static: {
                /**
                 * @param {Class} class
                 * @param {Any} args
                 * @returns {Class} single instance of input Class parameter 
                 */
                getInstance: function() {
                    
                    Assert.assertClass(arguments[0], module.id + '.getInstance(Class class, <T> arguments...).');

                    var Class = arguments[0];
                    var className = Class.prototype.getClass().getName();
                    var instance = instances.get(className);
                    if (instance === null) {
                        instance = Class.newInstance.apply(this, slice.call(arguments, 1));
                        instances.put(className, instance);
                    }

                    return instance;
                }
            }
        };
    })());



    return Singleton;
});