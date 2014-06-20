/**
 * @author jittagorn pitakmetagoon
 * create 24/10/2013
 * 
 * update 04/01/2014 (jittagorn pitakmetagoon : change inheritance methodology from Mixin to prototype chain inheritance (integrate Mixin))
 */
define('com.pamarin.core.lang.Extends', [
    'com.pamarin.core.lang.Prototype',
    'com.pamarin.core.lang.NativeTypes'
], function(Prototype, JSTypes) {

    function isEmpty(string) {
        return JSTypes.isUndefined(string) || string.length === 0;
    }

    function toUpperCaseFirstCharacter(string) {
        if (isEmpty(string)) {
            return '';
        } else if (string.length === 1) {
            return string[0].toUpperCase();
        } else {
            return string[0].toUpperCase() + string.substring(1);
        }

        return string;
    }

    function canMixStaticProperty(Class, property) {
        return Class.hasOwnProperty(property) && property !== 'newInstance';
    }

    function mixStaticProperty(SubClass, SuperClass) {
        for (var staticProperty in SuperClass) {
            if (canMixStaticProperty(SuperClass, staticProperty)) {
                SubClass[staticProperty] = SuperClass[staticProperty];
            }
        }
    }

    function mixPublicProperty(SubClass, SuperClass) {
        for (var property in SuperClass.prototype) {
            if (SuperClass.prototype.hasOwnProperty(property)) {
                SubClass.prototype[property] = SuperClass.prototype[property];
            }
        }
    }

    function hasMethod(SuperClass, methodName) {
        return SuperClass.prototype.hasOwnProperty(methodName) && JSTypes.isFunction(SuperClass.prototype[methodName]);
    }

    function mixSuperClassProperty(SubClass, SuperClass) {
        for (var property in SuperClass.prototype) {
            if (hasMethod(SuperClass, property)) {
                SubClass['super' + toUpperCaseFirstCharacter(property)] = SuperClass.prototype[property];
            }
        }

        SubClass.superClass = SuperClass.prototype;
    }

    function hasVariable(Class) {
        return JSTypes.isObject(Class.prototype.variable);
    }

    //copy variable from SuperClass to SubClass
    function mixVariable(SubClass, SuperClass) {
        if (hasVariable(SuperClass)) {
            if (hasVariable(SubClass)) {
                for (var property in SuperClass.prototype.variable) {
                    //override variable
                    if (!SubClass.prototype.variable.hasOwnProperty(property)) {
                        SubClass.prototype.variable[property] = SuperClass.prototype.variable[property];
                    }
                }
            } else {
                SubClass.prototype.variable = SuperClass.prototype.variable;
            }
        }
    }

    /**
     * for inherit class from SuperClass to SubClass
     * 
     * @param {Class} SubClass
     * @param {Class} SuperClass
     */
    var Extends = function(SubClass, SuperClass) {
        /**
         * create new Prototype for inherit SuperClass to SubClass
         */
        var Bridge = Prototype.create();
        Bridge.prototype = JSTypes.isFunction(SuperClass.newInstance) ? SuperClass.newInstance() : (new SubClass());

        //Mixin 
        mixVariable(SubClass, SuperClass);
        mixStaticProperty(Bridge, SuperClass);
        mixStaticProperty(Bridge, SubClass);
        mixPublicProperty(Bridge, SubClass);
        mixSuperClassProperty(Bridge, SuperClass);

        return Bridge;
    };



    /**
     * return Extends
     */
    return Extends;
});