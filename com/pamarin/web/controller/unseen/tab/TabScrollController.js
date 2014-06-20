/**
 * @author jittagorn pitakmetagoon
 * create 05/06/2014
 */
define('com.pamarin.web.controller.unseen.tab.TabScrollController', [
    'module',
    'com.pamarin.web.controller.unseen.UnseenController',
    'com.pamarin.web.controller.unseen.tab.TabInfiniteScroll',
    'com.pamarin.data.controller.AbstractScrollController',
], function(module, UnseenController, TabInfiniteScroll, AbstractScrollController) {

    /**
     * @class TabScrollController
     * @extends AbstractScrollController
     * @controller
     */
    var TabScrollController = UnseenController.define(module.id, {
        /**/
        abstract: {
            //
        },
        /**
         * @override
         * 
         * @returns {T extends com.pamarin.ui.PageInfiniteScroll}
         */
        getInfiniteScroll: function() {
            if (this.infiniteScroll_ === null) {
                this.infiniteScroll_ = new TabInfiniteScroll();
            }

            return this.infiniteScroll_;
        }
    }).extends(AbstractScrollController);



    return TabScrollController;
});