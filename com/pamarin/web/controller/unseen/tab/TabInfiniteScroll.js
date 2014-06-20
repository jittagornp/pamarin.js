/**
 * @author jittagorn pitakmetagoon
 * create 23/05/2014
 */
define('com.pamarin.web.controller.unseen.tab.TabInfiniteScroll', [
    'module',
    'com.pamarin.core.lang.Class',
    'com.pamarin.ui.PageInfiniteScroll',
    'com.pamarin.core.page.PageContext'
], function(module, Class, PageInfiniteScroll, PageContext) {

    /**
     * @class TabInfiniteScroll
     * @extends PageInfiniteScroll
     */
    var TabInfiniteScroll = Class.define(module.id, {
        /**/
        constructor: function() {
            var tabIndex = PageContext.getInstance()
                    .getCurrentPage()
                    .getShift();

            this.__super__.constructor.call(this, tabIndex + 1);
        }

    }).extends(PageInfiniteScroll);



    return TabInfiniteScroll;
});