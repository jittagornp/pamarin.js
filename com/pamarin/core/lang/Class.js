/** 
 * @author  jittagorn pitakmetagoon 
 * create  30/05/2013
 * 
 * update  30/05/2013 (jittagorn pitakmetagoon)
 * update  28/10/2013 (jittagorn pitakmetagoon : add Class.extends(superClass) and Class.implements(Interface...))
 * update  27/12/2013 (jittagorn pitakmetagoon : Class extends com.pamarin.core.lang.Object
 * update  01/03/2014 (jittagorn pitakmetagoon : can use proxy on define class)
 */
define('com.pamarin.core.lang.Class', [
    'module',
    'com.pamarin.core.lang.Object',
    'com.pamarin.core.lang.Array',
    'com.pamarin.core.lang.Implements',
    'com.pamarin.core.lang.Prototype',
    'com.pamarin.core.lang.ReflectionClass',
    'com.pamarin.core.lang.NativeTypes',
    'com.pamarin.core.lang.Strings',
    'com.pamarin.core.lang.Proxy'
], function(module, Object, Array, Implements, Prototype, ReflectionClass, Types, Strings, Proxy) {

    'use strict';


    var INSTANCE_RESERVE = ['abstract', 'static', 'all', 'annotation'];
    var CLASS_RESERVE = ['newInstance'];

    /**
     * define global variable Class
     */
    var Class = function() {
        //
    };

    var slice = Array.prototype.slice;


    function isInstanceReserve(item) {
        return INSTANCE_RESERVE.indexOf(item) !== -1;
    }

    function isClassReserve(item) {
        return CLASS_RESERVE.indexOf(item) !== -1;
    }

    function isClass(data) {
        return  Types.isFunction(data)
                && Types.isFunction(data.prototype.getClass)
                && data.prototype.getClass() instanceof ReflectionClass
                && data.prototype.getClass().isClass() === true;
    }

    function assertObjectClassBehavior(behavior, behavName, className) {
        if (!Types.isUndefined(behavior[behavName]) && !Types.isObject(behavior[behavName])) {
            throw new Error('class ' + className + '.' + behavName + ' is not Object.');
        }
    }

    function assertArrayClassBehavior(behavior, behavName, className) {
        if (!Types.isUndefined(behavior[behavName]) && !Types.isArray(behavior[behavName])) {
            throw new Error('class ' + className + '.' + behavName + ' is not Array.');
        }
    }

    function assertString(data, message) {
        if (Types.isString(data)) {
            return;
        }

        throw new Error('assertString fail, ' + message);
    }

    function assertFunction(data, message) {
        if (Types.isFunction(data)) {
            return;
        }

        throw new Error('assertFunction fail, ' + message);
    }

    function assertObject(data, message) {
        if (Types.isObject(data)) {
            return;
        }

        throw new Error('assertObject fail, ' + message);
    }

    function assertClass(data, message) {
        if (isClass(data)) {
            return;
        }

        throw new Error('assertClass fail, ' + message);
    }

    function assertImplementsAbstract(subClass, superClass, isAbstract) {
        var sub = subClass.prototype;
        var supClass = superClass.prototype.getClass();

        if (!supClass.isAbstract()) {
            return;
        }

        Object.forEachProperty(supClass.getAbstractMethods(), function(method) {
            var message = 'class \'' +
                    sub.getClass().getName() +
                    '\' dosen\'t implements an abstract method \'' +
                    method +
                    '()\' of super class \'' +
                    supClass.getName() +
                    '\'';

            try {
                assertFunction(sub[method], message);
            } catch (ex) {
                if (isAbstract) {
                    sub.getClass().getAbstractMethods().push(method);
                } else {
                    throw ex;
                }
            }
        });
    }

    function isUndefinedToString(prototype) {
        return  Types.isUndefined(prototype.toString)
                || (prototype.toString() === '[object Object]')
                || !Types.isFunction(prototype.toString);
    }

    function bindContructor(Class, name, classBehavior, context) {
        var simpleClassName = name.split('.').pop();
        if (Types.isFunction(classBehavior[simpleClassName])) {
            classBehavior.constructor = classBehavior[simpleClassName];
        }

        delete classBehavior[simpleClassName];
    }

    function bindConstant(Class, name, behavior, context) {
        assertObjectClassBehavior(behavior, 'constant', name);

        Object.forEachProperty(behavior.constant, function(value, prop) {
            var constantName = prop.toUpperCase();
            context['constant'][constantName] = value;
        });

        Class.constant = function(name) {
            return context['constant'][name];
        };

        Class.constants = function() {
            return Object.toOwnArray(context['constant']);
        };

        delete behavior.constant;
    }

    function bindStatic(Class, name, behavior, context) {
        assertObjectClassBehavior(behavior, 'static', name);

        Object.forEachProperty(behavior['static'], function(value, prop) {
            if (!isClassReserve(prop)) {
                Class[prop] = value;
                context['static'][prop] = value;
            }
        });

        delete behavior['static'];
    }

    function assertInstanceReserve(value, prop, name) {
        if (!isInstanceReserve(prop)) {
            return;
        }

        var isMethod = Types.isFunction(value);
        var attr = isMethod ? (prop + '()') : prop;
        var type = isMethod ? 'method' : 'attribute';

        throw new Error('class \'' + name + '\' already exist the ' + type + ' \'' + attr + '\'.');
    }

    function bindPublic(Class, name, classBehavior, context) {
        Object.forEachProperty(classBehavior, function(value, prop) {
            assertInstanceReserve(value, prop, name);

            Class.prototype[prop] = Proxy.forwardMethod(classBehavior, prop);
        });
    }

    function bindToString(Class, name, behavior, context) {
        if (!isUndefinedToString(behavior)) {
            return;
        }

        Class.prototype.toString = function() {
            return '[class ' + this.getClass().getName() + ']';
        };
    }

    function bindAnotation(Class, name, behavior, context) {
        assertArrayClassBehavior(behavior, 'annotation', name);

        Array.forEachIndex(behavior['annotation'], function(value) {
            context['annotation'].push(value);
        });

        delete behavior['annotation'];
    }

    function bindAbstract(Class, name, behavior, context) {
        assertObjectClassBehavior(behavior, 'abstract', name);

        Object.forEachProperty(behavior['abstract'], function(value, methodName) {
            assertFunction(value, 'abstract method[' + methodName + '] of class \'' + name + '\' it\'s not a function.');

            context['abstract'].push(methodName);
            Class.prototype[methodName] = function() {
                throw new Error('Unsupport operation error.');
            };
        });

        delete behavior['abstract'];
    }

    //start extends ------------------------------------------------------------
    function bindStaticExtends(subClass, superClass) {
        Object.forEach(superClass, function(value, prop) {
            if (!isClassReserve(prop)) {
                subClass[prop] = value;
            }
        });
    }

    function bindPublicExtends(subClass, superClass) {
        Object.forEachProperty(superClass.prototype, function(value, prop) {
            subClass.prototype[prop] = value;
        });
    }

    function bindSuperClassExtends(subClass, superClass) {
        Object.forEachProperty(superClass.prototype, function(method, name) {
            if (Types.isFunction(method)) {
                var superName = 'super' + Strings.toUpperCaseFirstCharacter(name);
                subClass[superName] = method;
            }
        });

        subClass.superClass = superClass.prototype;
        subClass.prototype.__super__ = superClass.prototype;

    }

    function bindVariableExtends(subClass, superClass) {
        var superVar = superClass.prototype['variable'];
        var subVar = subClass.prototype['variable'];

        if (!Types.isObject(superVar)) {
            return;
        }

        if (!Types.isObject(subVar)) {
            subClass.prototype['variable'] = superVar;
            return;
        }

        for (var prop in superVar) {
            if (subVar.hasOwnProperty(prop)) {
                continue;
            }

            //override variable
            subVar[prop] = superVar[prop];
        }
    }
    //end extends --------------------------------------------------------------

    /**
     * define public static method Class.define({String} fullClassName, {Object} prototypeObject)
     * use for define standard class of pamarin
     * 
     * @param {String} className the full name of that class sush as 'com.pamarin.ui.Dialog'
     * @param {Obj} classBehavior the prototype object for @class structure
     * 
     * example >>
     * -------------------------------------------------------------------------
     * var Dialog = Class.define('com.pamarin.ui.Dialog', {
     *      
     *      constructor : function(element){
     *      
     *      },
     *      
     *      show : function(){
     *      
     *      },
     *      
     *      hide : funciton(){
     *      
     *      }                                                                                                                                                                                                                                                                                                    
     * }).extends(UI);
     * -------------------------------------------------------------------------
     */
    Class.define = function(className, classBehavior) {
        assertString(className, module.id + '.define(String className, Object classBehavior).');
        assertObject(classBehavior, module.id + '.define(String className, Object classBehavior).');

        return (function(name, behavior) {

            var CONTEXT = {
                constant: {},
                static: {},
                abstract: [],
                annotation: []
            };

            var isAbstract = Types.isObject(behavior.abstract);
            var ProtoClass = Prototype.create();

            bindContructor(ProtoClass, name, behavior, CONTEXT);
            bindConstant(ProtoClass, name, behavior, CONTEXT);
            bindStatic(ProtoClass, name, behavior, CONTEXT);
            bindAbstract(ProtoClass, name, behavior, CONTEXT);
            bindAnotation(ProtoClass, name, behavior, CONTEXT);
            bindPublic(ProtoClass, name, behavior, CONTEXT);
            bindToString(ProtoClass, name, behavior, CONTEXT);

            var reflection = new ReflectionClass(name)
                    .setClass(true)
                    .setAbstractMethods(CONTEXT['abstract'])
                    .setAnotations(CONTEXT['annotation'])
                    .setInterfaces(CONTEXT['interfaces']);

            ProtoClass.prototype.getClass = function() {
                return reflection;
            };

            ProtoClass.extends = function(superClass) {
                assertClass(superClass, module.id + '.extends(Class superClass).');
                assertImplementsAbstract(ProtoClass, superClass, isAbstract);

                var BridgeClass = Prototype.create();
                BridgeClass.prototype = Types.isFunction(superClass.newInstance)
                        ? superClass.newInstance()
                        : new superClass();

                //Mixin 
                bindVariableExtends(ProtoClass, superClass);
                bindStaticExtends(BridgeClass, superClass);
                bindStaticExtends(BridgeClass, ProtoClass);
                bindPublicExtends(BridgeClass, ProtoClass);
                bindSuperClassExtends(BridgeClass, superClass);

                return ProtoClass = BridgeClass;
            };

            ProtoClass.implements = function() {
                CONTEXT['interfaces'] = Implements(ProtoClass, arguments);
                ProtoClass.prototype.getClass().setInterfaces(CONTEXT['interfaces']);

                return ProtoClass;
            };



            return ProtoClass;

        })(className, classBehavior);
    };



    /**
     * return Class
     */
    return Class;
});