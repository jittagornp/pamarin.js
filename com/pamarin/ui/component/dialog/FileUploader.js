/**
 * @author jittagorn pitakmetagoon
 * create 17/02/2014
 */
define('com.pamarin.ui.component.dialog.FileUploader', [
    'module',
    'com.pamarin.core.lang.Class',
    'com.pamarin.ui.component.dialog.ResizingDialog',
    'com.pamarin.core.creational.Singleton'
], function(module, Class, ResizingDialog, Singleton) {

    /**
     * @class FileUploader
     */
    var FileUploader = Class.define(module.id, (function() {

        return {
            //
            variable : {
                modalColor_ : 'white'
            },
            //
            constructor: function(element) {
                FileUploader.superConstructor.call(this, element);
            },
            //
            init : function(componentContext){
                
            }
        };
    })()).extends(ResizingDialog);



    return Singleton.getInstance(FileUploader, '#pmrFileuploader');
});