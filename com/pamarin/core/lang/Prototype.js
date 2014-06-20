/**
 * @author jittagorn pitakmetagoon
 * create 04/01/2014
 * 
 * update 08/03/2014 (jittagorn pitakmetagoon : refactoring structure)
 */
define('com.pamarin.core.lang.Prototype', [
    'com.pamarin.core.lang.Object',
    'com.pamarin.core.lang.NativeTypes'
], function(Object, NativeTypes) {

    /**
     * @class Prototype
     */
    var Prototype = {
        /**
         * for create Prototype
         * 
         * @returns {Class}
         */
        create: function() {

            var Class = function() {   
                
                if (NativeTypes.isObject(this.variable)) { 
                    //mix variable
                    Object.forEachProperty(this.variable, function(value, key) {
                        this[key] = value;
                    }, this);
                }

                '[_Class_]' !== arguments[0]
                        && NativeTypes.isFunction(this.constructor)
                        //&& !isNativeContructor(this.constructor.toString)
                        && this.constructor.apply(this, arguments);
            };


            /**
             * Class extends an Object
             */
            Class.prototype = new Object();

            /**
             * for create instance by method
             * and lazy call contructor
             * 
             * @returns {Class}
             */
            Class.newInstance = function() {
                var instance = new Class('[_Class_]');

                arguments.length > 0
                        && NativeTypes.isFunction(instance.constructor)
                        && instance.constructor.apply(instance, arguments);

                return instance;
            };

            return Class;
        }
    };



    return Prototype;
});