/**
 * @author jittagorn pitakmetagoon
 * create 20/10/2013
 */
define('com.pamarin.ui.component.dialog.ConfirmDialog', [
    'module',
    'com.pamarin.ui.component.dialog.ContextualDialog',
    'com.pamarin.core.lang.Class',
    'com.pamarin.core.util.Types',
    'com.pamarin.core.creational.Singleton',
    'com.pamarin.core.structural.Proxy'
], function(module, ContextualDialog, Class, Types, Singleton, Proxy) {

    var ConfirmDialog = Class.define(module.id, {
        //
        variable: {
            width_: 400,
            height_: 150
        },
        //
        constructor: function(element) {
            ConfirmDialog.superConstructor.call(this, element);

            this.onCloseCallback_ = Proxy.call(this, function($element) {
                if ($element && $element.hasClass('pmr-dialog-ok-button')) {
                    Types.isFunction(this.okCallback_) && this.okCallback_();
                } else {
                    Types.isFunction(this.cancelCallback_) && this.cancelCallback_();
                }
            });
        },
        //
        init: function(componentContext) {
            //TODO
        },
        //
        onOK: function(callback) {
            if (Types.isFunction(callback)) {
                this.okCallback_ = callback;
            }

            return this;
        },
        //
        onCancel: function(callback) {
            if (Types.isFunction(callback)) {
                this.cancelCallback_ = callback;
            }

            return this;
        },
        //
        setOKButtonLabel: function(text) {
            this.$element_.find('.pmr-dialog-ok-button .pmr-button-text').text(text);
            return this;
        },
        //
        setCancelButtonLabel: function(text) {
            this.$element_.find('.pmr-dialog-cancel-button .pmr-button-text').text(text);
            return this;
        },
        //
        onBeforeShow: function() {
            //$('#pmrConfirmDialogFooter').width(this.width - 40);
        }
    }).extends(ContextualDialog);



    return Singleton.getInstance(ConfirmDialog, '#pmrConfirmDialog');
});