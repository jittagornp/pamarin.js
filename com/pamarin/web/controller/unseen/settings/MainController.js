/**
 * @author jittagorn pitakmetagoon
 * create 11/06/2014
 */
define('com.pamarin.web.controller.unseen.settings.MainController', [
    'module',
    'com.pamarin.web.controller.unseen.settings.SettingsController'
], function(module, SettingsController){
    
    /**
     * @class MainController
     * @controller
     */
    var MainController = SettingsController.define(module.id, {
        /**/
        onJigsawReady : function(){
            console.log(this);
        }
    });
    
    
    
    return MainController;
});