/**
 * @author  jittagorn pitakmetagoon
 * create  04/02/2014
 */
define('com.pamarin.core.util.LangTypes', [
    'module',
    'com.pamarin.core.lang.Object',
    'com.pamarin.core.lang.ReflectionClass',
    'com.pamarin.core.lang.NativeTypes'
], function(module, Object, ReflectionClass, JSTypes) {



    /**
     * @class LangTypes
     * for check anything which map method type name
     */
    var LangTypes = (function() {

        var _slice = Array.prototype.slice;

        function hasProperty(context, property) {
            for (var prop in context) {
                if (prop === property) {
                    return true;
                }
            }

            return false;
        }

        function isImplementationOf(Class, Interfaces) {
            for (var property in Interfaces.prototype) {
                if (Interfaces.prototype.hasOwnProperty(property)
                        && JSTypes.isFunction(Interfaces.prototype[property])
                        && !hasProperty(Class, property)) {
                    return false;
                }
            }

            return true;
        }

        /**
         * return public static method
         */
        return {
            /**
             * return true when data is Class instance
             * 
             * @param {Any} data
             * @returns {Boolean}
             */
            isClassInstance: function(data) {
                return data instanceof Object
                        && JSTypes.isFunction(data.getClass)
                        && data.getClass() instanceof ReflectionClass
                        && data.getClass().isClass();
            },
            /**
             * return true when data is Class
             * 
             * @param {Any} data
             * @returns {Boolean}
             */
            isClass: function(data) {
                return JSTypes.isFunction(data)
                        && JSTypes.isFunction(data.prototype.getClass)
                        && data.prototype.getClass() instanceof ReflectionClass
                        && data.prototype.getClass().isClass() === true;
            },
            /**
             * return true when data is Interface
             * 
             * @param {Any} data
             * @returns {Boolean}
             */
            isInterface: function(data) {
                return JSTypes.isFunction(data) && JSTypes.isString(data._interfaceName_);
//                return JSTypes.isFunction(data)
//                        && JSTypes.isFunction(data.prototype.getClass)
//                        && data.prototype.getClass() instanceof ReflectionClass
//                        && data.prototype.getClass().isInterface() === true;
            },
            /**
             * return true when data is instance of input Class parameter
             * 
             * @param {Any} data
             * @param {Prototype} Class 
             * @returns {Boolean}
             */
            isInstanceOfClass: function(data, Class) {
                if (!this.isClass(Class) || !this.isClassInstance(data)) {
                    return false;
                }

                return (data instanceof Class);
            },
            //
            isImplements: function() {
                var Class = arguments[0];
                var Interfaces = _slice.call(arguments, 1);
                
                if(JSTypes.isUndefined(Class) || JSTypes.isUndefined(Interfaces)){
                    return false;
                }

                var Clazz = JSTypes.isFunction(Class) ? Class.prototype : Class;
                for (var index in Interfaces) {
                    if (Interfaces.hasOwnProperty(index)) {
                        var Interfc = Interfaces[index];
                        
                        if (!this.isInterface(Interfc)) {
                            throw new Error('Invalid input type parameters, ' + module.id + '.isImplements(Class class, Interface... args)');
                        }

                        if (!isImplementationOf(Clazz, Interfc)) {
                            return false;
                        }
                    }
                }

                return true;
            }
        };
    })();



    /**
     * return LangTypes : is singleton
     */
    return LangTypes;
});