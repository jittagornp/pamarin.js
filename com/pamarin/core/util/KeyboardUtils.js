/**
 * @author jittagorn pitakmetagoon
 * create 06/11/2013
 */
define('com.pamarin.core.util.KeyboardUtils', [
    'module',
    'com.pamarin.core.lang.Class',
    'com.pamarin.core.util.Types',
    'com.pamarin.core.util.collection.HashMap'
], function(module, Class, Types, HashMap) {

    /**
     * @class KeyboardUtils
     */
    var KeyboardUtils = Class.define(module.id, (function() {

        var $document = $(document);
        var keyMap = new HashMap();
        //
        keyMap.put('Esc', 27);
        keyMap.put('Enter', 13);

        return {
            //
            static: {
                /**
                 * for listen keyboard key up
                 * 
                 * @param {string} key 
                 * @param {number} scope
                 * @param {function} callback
                 */
                onKey: function(key, scope, callback) {
                    if (Types.isFunction(scope)) {
                        callback = scope;
                        scope = undefined;
                    }

                    if (Types.isFunction(callback)) {
                        $document.binding('keyup', scope, function(event) {

                            if (event.keyCode === keyMap.get(key)) {
                                callback();
                            }
                        });
                    }
                }
            }
        };
    })());



    /**
     * return class KeyboardUtils
     */
    return KeyboardUtils;
});