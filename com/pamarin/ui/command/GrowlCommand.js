/**
 * @author jittagorn pitakmetagoon
 * create 07/01/2014
 */
define('com.pamarin.ui.command.GrowlCommand', [
    'module',
    'com.pamarin.core.lang.Class',
    'com.pamarin.core.behavioral.Command',
    'com.pamarin.ui.Growl',
    'com.pamarin.core.creational.Singleton'
], function(module, Class, Command, Growl, Singleton) {

    /**
     * @class GrowlCommand
     */
    var GrowlCommand = Class.define(module.id, {
        /**
         * @Override
         */
        run: function(object) {
            Growl.requireTitleAndContent(object.title || '', object.content || '')
                    .setImage(object.image || '')
                    .setSticky(object.sticky || false)
                    .setTime(object.time || 5000)
                    .setStyleClass(object.styleClass || '')
                    .show();
        }
    }).implements(Command);



    return Singleton.getInstance(GrowlCommand);
});