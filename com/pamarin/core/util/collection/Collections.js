/**
 * @author jittagorn pitakmetagoon
 * create 07/02/2014
 */
define('com.pamarin.core.util.collection.Collections', [
    'module',
    'com.pamarin.core.lang.Class',
    'com.pamarin.core.util.collection.List',
    'com.pamarin.core.lang.Interface',
    'com.pamarin.core.util.Types'
], function(module, Class, List, Interface, Types) {

    /**
     * @class Collections
     */
    var Collections = Class.define(module.id, (function() {

        return {
            //
            static: {
                //
                sort: function(list, comparator) {
                    Interface.ensureImplements(list, List);

                    if (Types.isObject(comparator) && Types.isFunction(comparator.compare)) {
                        list.toArray().sort(comparator.compare);
                    }
                },
                /**/
                isEmpty: function(collection) {
                    if (Types.isNotdefined(collection)) {
                        return false;
                    }

                    if (Types.isArray(collection)) {
                        return collection.length === 0;
                    }

                    return collection.isEmpty();
                }
            }
        };
    })());



    return Collections;
});