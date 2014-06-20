/**
 * @author jittagorn pitakmetagoon
 * create 04/01/2014
 */
define('com.pamarin.web.ui.component.dialog.TagViewerDialog', [
    'module',
    'com.jquery.core.JQuery',
    'com.pamarin.ui.component.dialog.ContextualDialog',
    'com.pamarin.core.lang.Class',
    'com.pamarin.core.creational.Singleton'
], function(module, $, ContextualDialog, Class, Singleton) {


    var TagViewerDialog = Class.define(module.id, {
        //    
        variable : {
           modal_ : false,
           destroy_ : true
        },
        //
        constructor: function(element) {
            TagViewerDialog.superConstructor.call(this, element);
        },
        //
        init: function(componentContext) {

        }
    }).extends(ContextualDialog);



    return Singleton.getInstance(TagViewerDialog, '#pmrUnseenTagViewerDialog');
});