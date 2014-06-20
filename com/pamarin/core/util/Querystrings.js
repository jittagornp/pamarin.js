/**
 * @author jittagorn pitakmetagoon
 * create 19/06/2014
 */
define('com.pamarin.core.util.Querystrings', [
    'module',
    'com.pamarin.core.lang.Class',
    'com.pamarin.core.lang.Array',
    'com.pamarin.core.util.StringUtils',
    'com.pamarin.core.util.collection.HashMap'
], function(module, Class, Array, StringUtils, HashMap) {

    /**
     * @class Querystrings
     */
    var Querystrings = Class.define(module.id, {
        /**/
        static: {
            /** 
             * @param {String} qstr
             * @returns {Map}
             */
            toMap: function(qstr) {
                if (!qstr) {
                    return null;
                }

                var map = new HashMap();
                var arr = StringUtils.split(qstr.replace('?', ''), '&');
                Array.forEachIndex(arr, function(qs) {
                    var qarr = StringUtils.split(qs, '=');
                    if (qarr && qarr.length === 2) {
                        map.put(qarr[0], qarr[1]);
                    }
                });

                return map;
            }
        }
    });



    return Querystrings;
});