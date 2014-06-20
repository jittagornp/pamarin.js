/**
 * @author jittagorn pitakmetagoon
 * create 07/11/2013
 */
define('com.pamarin.core.lang.Implements', [
    'com.pamarin.core.util.StringBuilder',
    'com.pamarin.core.lang.NativeTypes',
    'com.pamarin.core.util.LangTypes'
], function(StringBuilder, Types, LangTypes) {

    /**
     * method for ensure class implements an interfaces
     * 
     * @param {Class} define by Class.define of 'com.pamarin.core.lang.Class'
     * @param {Interface | [Interface]} Interfaces define by Interface.define of 'com.pamarin.core.lang.Interface'
     */
    var Implements = function(Class, Interfaces) {
        var interfaces = [];
        var clazz = Types.isFunction(Class) ? Class.prototype : Class;

        for (var index in Interfaces) {
            if (interfaces.hasOwnProperty(index)) {
                var Interfc = Interfaces[index];

                if (!LangTypes.isInterface(Interfc)) {
                    throw new Error('Invalid input type parameters ' + clazz.getClass().getName() + '.implements(Interface... args)');
                }

                interfaces.push(checkAndGetImplementation(clazz, Interfc));
            }
        }

        return interfaces;
    };

    function hasProperty(context, property) {
        for (var prop in context) {
            if (prop === property) {
                return true;
            }
        }

        return false;
    }

    function checkAndGetImplementation(Class, Interfaces) {
        var clazz = Class.getClass();
        var interfaceClazz = Interfaces.prototype.getClass();

        for (var property in Interfaces.prototype) {
            if (Interfaces.prototype.hasOwnProperty(property)
                    && Types.isFunction(Interfaces.prototype[property])
                    && !hasProperty(Class, property)) {
                throw new Error(new StringBuilder()
                        .append('class \'')
                        .append(clazz.getName())
                        .append('\' it\'s not implement method \'')
                        .append(property)
                        .append('()\' of interface \'')
                        .append(interfaceClazz.getName())
                        .append()
                        .toString('\'.'));
            }
        }

        return interfaceClazz.getName();
    }


    return Implements;
});