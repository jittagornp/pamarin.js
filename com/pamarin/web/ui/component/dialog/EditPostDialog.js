/**
 * @author jittagorn pitakmetagoon
 * create 06/01/2014
 */
define('com.pamarin.web.ui.component.dialog.EditPostDialog', [
    'module',
    'com.pamarin.ui.component.dialog.ContextualDialog',
    'com.pamarin.core.lang.Class',
    'com.pamarin.core.creational.Singleton'
], function(module, ContextualDialog, Class, Singleton){
    
    var EditPostDialog = Class.define(module.id, (function(){
        
        return {
            //
            constructor : function(element){
                EditPostDialog.superConstructor.call(this, element);
            }
        };
    })()).extends(ContextualDialog);
    
    
    
    return Singleton.getInstance(EditPostDialog, '#pmrUnseenEditPostDialog');
});