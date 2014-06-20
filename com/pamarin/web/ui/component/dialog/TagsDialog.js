/**
 * @author jittagorn pitakmetagoon
 * create 24/12/2013
 */
define('com.pamarin.web.ui.component.dialog.TagsDialog', [
    'module',
    'com.jquery.core.JQuery',
    'com.pamarin.ui.component.dialog.ContextualDialog',
    'com.pamarin.core.lang.Class',
    'com.pamarin.core.creational.Singleton'
], function(module, $, ContextualDialog, Class, Singleton) {
    

    var TagsDialog = Class.define(module.id, {
        //
        constructor: function(element) {
            TagsDialog.superConstructor.call(this, element);
        },
        //
        init: function(componentContext) {
            
        }
    }).extends(ContextualDialog);


    return Singleton.getInstance(TagsDialog, '#pmrUnseenTagsDialog');
});