/**
 * @author jittagorn pitakmetagoon
 * create 09/01/2013
 */
define('com.pamarin.web.controller.RegisterCommand', [
    'com.pamarin.core.behavioral.CommandManager'
], function(CommandManager) {

    CommandManager.registerCommand('GrowlCommand', 'com.pamarin.ui.command.GrowlCommand');
});