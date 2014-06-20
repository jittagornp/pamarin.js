/**
 * @author jittagorn pitakmetagoon
 * create 25/03/2014
 */
define('com.pamarin.core.lang.Proxy', [
    'com.pamarin.core.lang.NativeTypes',
    'com.pamarin.core.lang.Strings'
], function(Types, Strings) {

    /**
     * @class Proxy
     * 
     * example >>
     * -------------------------------------------------------------------------
     * var Prototype = {
     *       
     *   save : function(obj){
     *       console.log('save --> ', obj);
     *       
     *       if(!obj.version){
     *          obj.version = -1;       
     *       }
     *       
     *       obj.version = obj.version + 1;
     *       return obj;
     *   },
     *       
     *   proxy : {
     *          
     *      preSave : function(obj){
     *          console.log('pre save --> ', obj);
     *          
     *          obj.name = 'pamarin';          
     *          return [obj];
     *      },
     *          
     *      invokeSave : function(method, args, name){
     *          console.log('invoke save --> ', args);
     *      
     *          return method.apply(this, args);
     *      },
     *          
     *      postSave : function(value){
     *          console.log('post save --> ', value);
     *          
     *          value.saved = true;
     *          
     *          return value;
     *      },
     *          
     *      errorSave : function(ex){
     *          console.error(ex);
     *      }
     *   }
     * };
     * 
     * Prototype.save = Proxy.forwardMethod(Prototype, 'save');
     * 
     * console.log('output --> ', Protoype.save({ name : 'jittagornp' }));
     * -------------------------------------------------------------------------
     * 
     * Output >>
     *  
     * - pre save --> Object { name : 'jittagornp' }
     * - invoke save --> [ 0 : Object { name : 'pamarin' }]
     * - save --> Object { name : 'pamarin' }
     * - post save --> Object { name : 'pamarin', version : 0 }
     * - output --> Object { name : 'pamarin', version : 0, saved : true }
     * 
     */
    var Proxy = (function() {

        var slice = Array.prototype.slice;

        function transparent(method, args) {
            return Types.isFunction(method) ? method.apply(this, args) : args;
        }

        function invoke(originMethod, originName, method, args, status, lazy) {
            var originProxy = function() {
                status.invoked = true;
                return originMethod.apply(this, arguments);
            };

            if (!Types.isFunction(method)) {
                return lazy ? undefined : originProxy.apply(this, args);
            }

            var value = method.call(this, originProxy, args, originName);
            return status.invoked ? value : originProxy.apply(this, args);
        }

        return {
            /**
             * @param {Object} prototype
             * @param {String} name
             * 
             * @returns {Function}
             */
            forwardMethod: (function(prototype, name) {
                var originMethod = prototype[name];
                var proxy = prototype['__proxy__'];

                var makeProxy = Types.isFunction(originMethod) && Types.isObject(proxy);
                if (!makeProxy) {
                    return originMethod;
                }

                var methodName = Strings.toUpperCaseFirstCharacter(name);
                var method = {
                    preAll: proxy['preAll'],
                    invokeAll: proxy['invokeAll'],
                    postAll: proxy['postAll'],
                    errorAll: proxy['errorAll'],
                    //
                    pre: proxy['pre' + methodName],
                    invoke: proxy['invoke' + methodName],
                    post: proxy['post' + methodName],
                    error: proxy['error' + methodName]
                };

                var proxyMethod = function() {
                    var instance = this;
                    var args = slice.call(arguments);
                    var value;
                    var status = {invoked: false};
                    try {
                        //pre
                        if (Types.isFunction(method.preAll)) {
                            args = method.preAll.apply(instance, args);
                        }

                        if (Types.isFunction(method.pre)) {
                            args = method.pre.apply(instance, args);
                        }

                        //origin
                        value = invoke.call(instance, originMethod, name, method.invokeAll, args, status, true);
                        if (!status.invoked) {
                            value = invoke.call(instance, originMethod, name, method.invoke, args, status, false);
                        }
                    } catch (ex) {
                        if (Types.isFunction(method.errorAll)) {
                            method.errorAll.call(instance, ex);
                        }

                        if (Types.isFunction(method.error)) {
                            method.error.call(instance, ex);
                        }

                        throw ex;
                    } finally {
                        try {
                            //post
                            if (Types.isFunction(method.post)) {
                                value = method.post.call(instance, value);
                            }

                            if (Types.isFunction(method.postAll)) {
                                value = method.postAll.call(instance, value);
                            }
                        } catch (ex) {
                            if (Types.isFunction(method.error)) {
                                method.error.call(instance, ex);
                            }

                            if (Types.isFunction(method.errorAll)) {
                                method.errorAll.call(instance, ex);
                            }

                            throw ex;
                        } finally {
                            /**/
                            return value;
                        }
                    }
                };


                return proxyMethod;
            })
        };
    })();



    return Proxy;
});