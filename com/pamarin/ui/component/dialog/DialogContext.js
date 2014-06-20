/**
 * @author jittagorn pitakmetagoon
 * create 06/11/2013
 */
define('com.pamarin.ui.component.dialog.DialogContext', [
    'module',
    'com.pamarin.core.lang.Class',
    'com.pamarin.core.util.Types',
    'com.pamarin.core.exception.InvalidTypeException'
], function(module, Class, Types, InvalidTypeException) {

    var _instance = null;
    var _$window = $(window);



    /**
     * design class DialogContext
     */
    var DialogContext = Class.define(module.id, {
        /**
         * call before contructor
         */
        preConstruct: function() {
            this.activeDialog = null;
        },
        /**
         * add listener function for listen dialog behavior 
         * 
         * @param {number} scope
         * @param {function} callback
         * @returns DialogContext
         */
        addDialogListener: function(scope, callback) {
            if (Types.isFunction(scope)) {
                callback = scope;
                scope = undefined;
            }

            if (!Types.isFunction(callback)) {
                throw new InvalidTypeException(module.id + '.addDialogShowListener : function({number} scope, {function} callback)');
            }

            //listen jquery trigger type = 'onShowDialog', observer design pattern
            _$window.binding('onShowDialog', scope, function(event) {
                callback({
                    dialog: event.dialog,
                    state: 'show'
                });
            });

            //listen jquery trigger type = 'onCloseDialog', observer design pattern
            _$window.binding('onCloseDialog', scope, function(event) {
                callback({
                    dialog: event.dialog,
                    state: 'close'
                });
            });

            return this;
        }
    });



    /**
     * return class DialogContext 
     */
    return {
        /**
         * get single instance of class DialogContext 
         */
        getInstance: function() {
            if (_instance === null) { //singleton design pattern
                _instance = new DialogContext();
            }

            return _instance;
        }
    };
});