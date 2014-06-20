/**
 * @author jittagorn pitakmetagoon
 * create 07/01/2014
 */
define('com.pamarin.core.behavioral.Command', [
    'module',
    'com.pamarin.core.lang.Interface'
], function(module, Interface) {

    /**
     * define interface Command
     * for run command by Command design pattern
     */
    var Command = Interface.define(module.id, {
        /**
         * call when run that command
         */
        run: function() {

        }
    });


    return Command;
});