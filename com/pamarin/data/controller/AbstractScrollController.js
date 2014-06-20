/**
 * @author jittagorn pitakmetagoon
 * create 04/06/2014
 */
define('com.pamarin.data.controller.AbstractScrollController', [
    'module',
    'com.pamarin.core.controller.Controller',
    'com.pamarin.data.domain.PageRequest',
    'com.pamarin.data.domain.Sort'
], function(module, Controller, PageRequest, Sort) {

    /**
     * @class AbstractScrollController
     * @controller
     */
    var AbstractScrollController = Controller.define(module.id, (function() {

        var slice = Array.prototype.slice;

        return {
            /**/
            abstract: {
                /**
                 * @param {Service} service
                 * @param {Pageable} pageable
                 * @param {T...} others_opt 
                 * @returns {Chain} 
                 */
                load: function(service, pageable, others_opt) {
                    //implements your own.
                },
                /**
                 * @returns {T extends com.pamarin.ui.PageInfiniteScroll}
                 */
                getInfiniteScroll: function() {
                    //implements your own.
                }
            },
            /**/
            variable: {
                PAGE_SIZE_: 10,
                SORT_BY_: 'id',
                SORT_DIRECTION_: Sort.Direction.ASC,
                infiniteScroll_: null,
                loadService_: null
            },
            /**
             * @protected
             */
            render: function() {
                var args = slice.call(arguments);
                var that = this;

                that.DI.inject(that.loadService_, function(service) {
                    var params = [service, that.createPage(0)].concat(args);
                    that.load.apply(that, params)
                            .then(function() {
                                that.getInfiniteScroll().addScrollListener(function(scroll) {
                                    params = [service, that.createPage(scroll.getCurrentPage())].concat(args);
                                    that.load.apply(that, params)
                                            .then(function(hasContent) {
                                                if (hasContent) {
                                                    scroll.toContinue();
                                                }
                                            });
                                });
                            });
                });
            },
            /**
             * @private
             * 
             * @param {Number} pageIndex
             * @returns {PageRequest}
             */
            createPage: function(pageIndex) {
                return new PageRequest(pageIndex, this.PAGE_SIZE_, this.SORT_DIRECTION_, this.SORT_BY_);
            }
        };
    })());



    return AbstractScrollController;
});