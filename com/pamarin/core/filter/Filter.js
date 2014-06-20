/** 
 * @description for filter every things
 * @author  jittagorn pitakmetagoon 
 * create  27/05/2013
 * 
 * update  27/05/2013 (jittagorn pitakmetagoon)
 * update  07/06/2013 (jittagorn pitakmetagoon : add to AMD)
 * update  09/06/2013 (jittagorn pitakmetagoon : change to standard Filter)
 */
define('com.pamarin.core.filter.Filter', [
    'module',
    'com.pamarin.core.lang.Class',
    'com.pamarin.core.exception.IllegalArgumentException',
    'com.pamarin.core.util.Types',
    'com.pamarin.core.util.collection.HashMap',
    'com.pamarin.core.util.collection.ArrayList',
    'com.pamarin.core.util.Assert'
], function(module, Class, IllegalArgumentException, Types, HashMap, ArrayList, Assert) {

    /**
     * @class Filter
     */
    var Filter = Class.define(module.id, (function() {

        var callbacks = new HashMap();

        //private static method
        function getCallbackFromName(name) {
            var callback = callbacks.get(name);
            if (callback === null) {
                callback = new ArrayList();
            }

            return callback;
        }

        return {
            //
            constant: {
                BEFORE_REQUEST: 'beforeRequest',
                AFTER_REQUEST: 'afterRequest'
            },
            //
            static: {
                /**
                 * @param {String} filterName
                 * @param {String} method
                 * @param {Object} passingData
                 */
                addFilter: function(filterName, method, passingData) {
                    Assert.assert({
                        String: filterName,
                        Object: passingData
                    }, module.id + '.addFilter(String filterName, String method, Object passingData).');

                    if (method !== 'beforeRequest' && method !== 'afterRequest') {
                        throw new IllegalArgumentException(module.id + '.addFilter(String filterName, String method, Object passingData) : require method(name) is beforeRequest or afterRequest only.');
                    }

                    passingData.requestOrder = method;
                    getCallbackFromName(filterName).forEachEntry(function(caller) {
                        if (caller && Types.isFunction(caller[method])) {
                            caller[method](passingData);
                        }
                    });
                },
                /**
                 * 
                 * @param {String} filterName
                 * @param {Object} filter
                 */
                doFilter: function(filterName, filter) {
                    Assert.assert({
                        String: filterName,
                        Object: filter
                    }, module.id + '.doFilter(String filterName, Object filter).');

                    filter.beforeRequest = Types.isFunction(filter.beforeRequest) ? filter.beforeRequest : function(){};
                    filter.afterRequest = Types.isFunction(filter.afterRequest) ? filter.afterRequest : function(){};

                    getCallbackFromName(filterName).add({
                        beforeRequest: filter.beforeRequest,
                        afterRequest: filter.afterRequest
                    });
                }
            }
        };
    })());



    return Filter;
});