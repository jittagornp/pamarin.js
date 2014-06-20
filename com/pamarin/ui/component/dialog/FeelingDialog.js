/**
 * @author jittagorn pitakmetagoon
 * create 08/10/2013 
 */
define('com.pamarin.ui.component.dialog.FeelingDialog', [
    'module',
    'com.pamarin.ui.component.dialog.ContextualDialog',
    'com.pamarin.core.lang.Class',
    'com.pamarin.ui.Scrollbar',
    'com.pamarin.core.creational.Singleton'
], function(module, ContextualDialog, Class, Scrollbar, Singleton) {

    var FeelingDialog = Class.define(module.id, {
        //        
        constructor: function(element) {
            FeelingDialog.superConstructor.call(this, element);
        },
        //
        init: function(componentContext) {
            var $historyList = $('#pmrFeelingDialogHistoryList');
            for (var i = 0; i < 20; i++) {
                var $delete = $('<div>').addClass('pmr-delete-item').attr('title', 'delete');
                var $div = $('<div>').append('ครั้งที่ ' + (i + 1) + ' 17/10/2103').append($delete);
                var $historyItem = $('<li>').html($div)
                        .attr('data-sequence', i)
                        .addClass('pmr-history-item');
                $historyList.append($historyItem);
            }

            Scrollbar.createOnElement('#pmrFeelingDialogLeftBody').get();
        }

    }).extends(ContextualDialog);



    return Singleton.getInstance(FeelingDialog, '#pmrFeelingDialog');
});