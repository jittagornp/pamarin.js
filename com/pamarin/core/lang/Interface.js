/**
 * for define and check implementation of interface javascript
 *
 * @author jittagorn pitakmetagoon
 * create 10/02/2014
 *
 * License Apache License Version 2.0, January 2004
 * 
 * =============================================================================
 * example to use
 * 
 * var UserService = Interface.define('UserService', {
 * 
 *     save : function(user){
 *     
 *     }
 * });
 * 
 * //define class
 * var UserServiceImpl = function(){
 * 
 * };
 * 
 * //define method
 * UserServiceImpl.prototype.save = function(){
 * 
 * };
 * 
 * Interface.ensureImplements(UserServiceImpl, UserService); 
 * //will throw Error, it's not implements arguments user on save method
 * 
 * modify new
 * -----------------------------------------------------------------------------
 * UserServiceImpl.prototype.save = function(user){
 * 
 * };
 * 
 * Interface.ensureImplements(UserServiceImpl, UserService); //not throw Error
 */
define('com.pamarin.core.lang.Interface', [
    'module',
    'com.pamarin.core.lang.Prototype',
    'com.pamarin.core.lang.Object',
    'com.pamarin.core.lang.Array',
    'com.pamarin.core.lang.NativeTypes',
    'com.pamarin.core.lang.Functions'
], function(module, Prototype, Object, Array, NativeTypes, Functions) {

    /**
     * @class Interface
     */
    var Interface = function() {
        /**/
    };


    var slice = Array.prototype.slice;

    /**
     * public static method for define Interface by interface name and interface prototype
     * 
     * @param {String} name
     * @param {Object} prototype
     * 
     * @throws {Error}
     * @returns {Interface} interface
     */
    Interface.define = function(name, prototype) {
        var isCorrect = NativeTypes.isString(name) && NativeTypes.isObject(prototype);
        if (!isCorrect) {
            throw new Error(module.id + '.define(String name, Object prototype).');
        }

        var InterF = Prototype.create();

        //extends an Interface
        InterF.prototype = new Interface();
        InterF._interfaceName_ = name;

        Object.forEachFunctionProperty(prototype, function(method, property) {
            InterF.prototype[property] = transformMethod(method, property);
        });


        function transformMethod(method, property) {
            var args = Functions.getArgumentsName(method);
            return new Function(args, methodBody(args, property));
        }

        function methodBody(args, property) {
            return "throw new Error('abstract method \\'" + property +
                    "(" + args.join(', ') + ")\\' of interface \\'" +
                    name + "\\' it\\'s not implements.')";
        }

        /**
         * for extends from super interfaces... to this interface
         * @param {Interface} interfaces...
         * @returns {Interface} interface
         */
        InterF.extends = function() {
            var interfaces = slice.call(arguments);
            Array.forEachIndex(interfaces, function(interfc, index) {
                assertInterface(interfc, index, '.extends(Interface interfaces...)');
                Object.copyProperty(interfc.prototype, InterF.prototype);
            });

            return InterF;
        };

        return InterF;
    };

    /**
     * for ensure Class or class instance implements an interfaces
     * 
     * @param {Function | Object} class
     * @param {Interface} interfaces.. 
     *
     * @throws {Error}
     */
    Interface.ensureImplements = function() {
        var arg0 = arguments[0];
        var thisMethod = '.ensureImplements(<Function | Object> class, Interface interfaces...).';

        var isClassOrInstance = NativeTypes.isFunction(arg0) || NativeTypes.isObject(arg0);
        if (arguments.length < 2 || !isClassOrInstance) {
            throw new Error(module.id + thisMethod);
        }

        var instance = NativeTypes.isFunction(arg0) ? arg0.prototype : arg0;
        var interfaces = slice.call(arguments, 1);

        //implements multiple interfaces
        Array.forEachIndex(interfaces, function(interfc, index) {
            assertInterface(interfc, index, thisMethod);

            Object.forEachFunctionProperty(interfc.prototype, function(method, property) {
                assertMethodImpl(instance, property, interfc);
                //assertArgsImpl(instance, method, property, interfc);
            });
        });
    };

    function assertArgsImpl(instance, method, property, interfc) {
        var interfaceArgs = Functions.getArgumentsName(method);
        var classArgs = Functions.getArgumentsName(instance[property]);

        var isImplArgs = classArgs.length >= interfaceArgs.length;
        if (!isImplArgs) {
            var message = 'it\'s not implements arguments on method ' +
                    property + '(' + interfaceArgs.join(', ') +
                    ') of interface "' + interfc._interfaceName_ + '".';
            throw new Error(message);
        }
    }

    function assertMethodImpl(instance, property, interfc) {
        var isImplMethod = NativeTypes.isFunction(instance[property]);
        if (!isImplMethod) {
            throw new Error('it\'s not implements method ' + property + '() of interface "' + interfc._interfaceName_ + '".');
        }
    }

    function assertInterface(interfc, index, message) {
        var isInterface = NativeTypes.isFunction(interfc) && (interfc.prototype instanceof Interface);
        if (!isInterface) {
            throw new Error(module.id + message + ' - interfaces[' + index + '] is not "' + module.id + '".');
        }
    }

    /**
     * for check Class or class instance implements an interfaces
     * 
     * @param {Function | Object} class
     * @param {Interface} interfaces.. 
     *
     * @return {Boolean}
     */
    Interface.isImplements = function() {
        try {
            Interface.ensureImplements.apply(this, arguments);
        } catch (ex) {
            return false;
        }

        return true;
    };



    /**
     * return Interface
     */
    return Interface;
});