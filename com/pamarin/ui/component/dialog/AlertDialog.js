/**
 * @author jittagorn pitakmetagoon
 * create 19/10/2013
 */
define('com.pamarin.ui.component.dialog.AlertDialog', [
    'module',
    'com.pamarin.ui.component.dialog.ContextualDialog',
    'com.pamarin.core.lang.Class',
    'com.pamarin.core.creational.Singleton'
], function(module, ContextualDialog, Class, Singleton) {

    var AlertDialog = Class.define(module.id, {
        //
        constructor: function(element) {
            AlertDialog.superConstructor.call(this, element);
            this.width_ = 400;
            this.height_ = 150;
        },
        //
        init: function(componentContext) {
            //TODO
        },
        //
        setCloseButtonLabel: function(text) {
            this.$element_.find('.pmr-dialog-close-button .pmr-button-text').text(text);
            return this;
        },
        //
        onBeforeShow: function() {
            //$('#pmrAlertDialogFooter').width(this.width - 40);
        }
    }).extends(ContextualDialog);



    return Singleton.getInstance(AlertDialog, '#pmrAlertDialog');
});