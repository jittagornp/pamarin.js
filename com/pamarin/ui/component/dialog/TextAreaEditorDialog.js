/**
 * @author jittagorn pitakmetagoon
 * create 08/11/2013
 */
define('com.pamarin.ui.component.dialog.TextAreaEditorDialog', [
    'module',
    'com.jquery.core.JQuery',
    'com.pamarin.core.util.Types',
    'com.pamarin.core.lang.Class',
    'com.pamarin.ui.component.dialog.SaveCancelDialog',
    'com.pamarin.core.exception.InvalidTypeException',
    'com.pamarin.core.creational.Singleton',
    'com.pamarin.core.structural.Proxy'
], function(module, $, Types, Class, SaveCancelDialog, InvalidTypeException, Singleton, Proxy) {

    /**
     * @class TextAreaEditorDialog
     */
    var TextAreaEditorDialog = Class.define(module.id, {
        /**
         * call when component loaded (from server)
         * 
         * @param {ComponentContext} componentContext
         */
        init: function(componentContext) {
            TextAreaEditorDialog.superInit.call(this, componentContext);

            this.$textAreaEditor_ = $('#pmrTextAreaEditorDialogTextarea');

            var headerHeight = $('#pmrTextAreaEditorDialogHeader').height();
            var footerHeight = 69;
            var padding = 32;

            this.onShow(Proxy.call(this, function() {
                this.$textAreaEditor_.width(this.$element_.width() - padding);
                this.$textAreaEditor_.height(this.$element_.height() - (headerHeight + footerHeight) - padding);
            }));
        },
        /**
         * set content text
         * 
         * @param {string} text 
         * @returns TextAreaEditorDialog
         */
        setText: function(text) {
            if (!Types.isString(text) && !Types.isNumber(text)) {
                throw new InvalidTypeException(module.id + '.setText({string | number} text)');
            }

            this.$textAreaEditor_.val(text);
            return this;
        },
        /**
         * get content text
         * 
         * @returns {string} text
         */
        getText: function() {
            return this.$textAreaEditor_.val();
        },
        /**
         * for clear content text
         */        
         clearText : function(){
             this.$textAreaEditor_.val('');
             return this;
         }
    }).extends(SaveCancelDialog);



    /**
     * return TextAreaEditorDialog instance
     */
    return Singleton.getInstance(TextAreaEditorDialog, '#pmrTextAreaEditorDialog');
});