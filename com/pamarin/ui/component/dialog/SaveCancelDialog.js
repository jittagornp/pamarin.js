/**
 * @author jittagorn pitakmetagoon
 * create 08/11/2013
 */
define('com.pamarin.ui.component.dialog.SaveCancelDialog', [
    'module',
    'com.jquery.core.JQuery',
    'com.pamarin.core.util.Types',
    'com.pamarin.core.lang.Class',
    'com.pamarin.ui.component.dialog.ContextualDialog',
    'com.pamarin.core.exception.InvalidTypeException',
    'com.pamarin.core.structural.Proxy'
], function(module, $, Types, Class, ContextualDialog, InvalidTypeException, Proxy) {



    /**
     * @class SaveCancelDialog
     */
    var SaveCancelDialog = Class.define(module.id, {
        //
        variable: {
            $saveButton_: null,
            $cancelButton_: null,
            onSaveCallback_: null,
            onCancelCallback_: null
        },
        /**
         * call when component loaded (from server)
         * 
         * @param {ComponentContext} componentContext
         */
        init: function(componentContext) {
            this.$saveButton_ = $('.pmr-dialog-save-button');
            this.$cancelButton_ = $('.pmr-dialog-cancel-button');

            this.$saveButton_.binding('click', Proxy.call(this, function() {
                Types.isFunction(this.onSaveCallback_) && this.onSaveCallback_();
            }));

            this.$cancelButton_.binding('click', Proxy.call(this, function() {
                Types.isFunction(this.onCancelCallback_) && this.onCancelCallback_();
            }));
        },
        /**
         * even handler for listen save dialog
         * 
         * @param {Function} callback
         * @returns SaveCancelDialog
         */
        onSave: function(callback) {
            if (!Types.isFunction(callback)) {
                throw new InvalidTypeException(module.id + '.onSave(Function callback)');
            }

            this.onSaveCallback_ = callback;
            return this;
        },
        /**
         * even handler for listen cancel dialog
         * 
         * @param {Function} callback
         * @returns SaveCancelDialog
         */
        onCancel: function(callback) {
            if (!Types.isFunction(callback)) {
                throw new InvalidTypeException(module.id + '.onCancel(Function callback)');
            }

            this.onCancelCallback_ = callback;
            return this;
        },
        /**
         * set save button label
         * 
         * @param {String | Number} label
         * @returns SaveCancelDialog
         */
        setSaveButtonLabel: function(label) {
            if (!Types.isString(label) && !Types.isNumber(label)) {
                throw new InvalidTypeException(module.id + '.setSaveButtonLabel(<String | Number> label)');
            }

            this.$saveButton_.find('.pmr-button-text').text(label);
            return this;
        },
        /**
         * set cancel button label
         * 
         * @param {String | Number} label
         * @returns SaveCancelDialog
         */
        setCancelButtonLabel: function(label) {
            if (!Types.isString(label) && !Types.isNumber(label)) {
                throw new InvalidTypeException(module.id + '.setCancelButtonLabel(<String | Number> label)');
            }

            this.$cancelButton_.find('.pmr-button-text').text(label);
            return this;
        }
    }).extends(ContextualDialog);



    /**
     * return class SaveCancelDialog
     */
    return SaveCancelDialog;
});