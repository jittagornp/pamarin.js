/**
 * @author jittagorn pitakmetagoon
 * cteate 07/05/2014
 */
define('com.pamarin.web.controller.unseen.tag.TagsController', [
    'module',
    'com.pamarin.core.lang.Class',
    'com.pamarin.ui.Tooltip'
], function(module, Class, Tooltip) {

    /**
     * @class TagsController
     * @controller
     */
    var TagsController = Class.define(module.id, {
        /**/
        onJigsawReady: function(jigsawContext) {
            Tooltip.showOnElement('#pmrUnseenTag .pmr-unseen-tag')
                    .withWestPosition()
                    .show();

        }
    });



    return TagsController;
});