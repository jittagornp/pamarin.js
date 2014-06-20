/**
 * @author jittagorn pitakmetagoon
 * create 15/05/2014
 */
define('com.pamarin.core.inject.Injection', [
    'module',
    'com.pamarin.core.lang.Class',
    'com.pamarin.core.lang.Interface',
    'com.pamarin.core.lang.Array',
    'com.pamarin.core.context.ApplicationContext',
    'com.pamarin.core.exception.BeanNotFoundException',
    'com.pamarin.core.exception.IllegalArgumentException',
    'com.pamarin.core.util.Types',
    'com.pamarin.core.util.Assert',
    'com.pamarin.core.creational.Singleton'
], function(module, Class, Interface, Array, ApplicationContext, BeanNotFoundException, IllegalArgumentException, Types, Assert, Singleton) {

    /**
     * @class Injection
     */
    var Injection = Class.define(module.id, (function() {

        var slice = Array.prototype.slice;
        var applicationContext = ApplicationContext.getInstance();
        var __beans__ = applicationContext.getParameter('beans');

        function findCallbackIndex(args) {
            var length = args.length;
            for (var i = 0; i < length; i++) {
                if (Types.isFunction(args[i])) {
                    return i;
                }
            }

            throw new IllegalArgumentException('require callback function.');
        }

        function transformDependencies(dependencies) {
            Array.forEachIndex(dependencies, function(name, index) {
                var beanClass = __beans__[name];
                if (Types.isUndefined(beanClass)) {
                    throw new BeanNotFoundException('dependencies ' + name + ' not found.');
                }

                dependencies[index] = beanClass;
            });

            return dependencies;
        }

        function provide(dependencies, callback, interfaces) {
            Assert.assert({
                String: dependencies,
                Function: callback
            }, module.id + '.inject(String... dependencies, Function callback, Interface... interface_opt).');

            

            require(transformDependencies(dependencies), function() {
                var deps = slice.call(arguments);
                var fn = function(dep, i) {
                    var interf = interfaces[i];
                    if (Types.isClass(dep)) {
                        dep = Singleton.getInstance(dep);
                        var interf = interfaces[i];
                        if (Types.isInterface(interf)) {
                            Interface.ensureImplements(dep, interf);
                        }
                    }

                    deps[i] = dep;
                };

                Array.forEachIndex(deps, fn);
                callback.apply(null, deps);
            });
        }

        return {
            /**/
            static: {
                /***
                 * @param {String...} dependencies 
                 * @param {Function} callback - such as function(beanName1, beanName2, ...){}
                 * @param {Interface...} interface_opt
                 */
                inject: function() {
                    var args = slice.call(arguments);
                    var index = findCallbackIndex(args);
                    var dependencies = args.slice(0, index);
                    var callback = args[index];
                    var interfaces = args.slice(index + 1);

                    provide(dependencies, callback, interfaces);
                }
            }
        };
    })());



    return Injection;
});