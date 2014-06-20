/**
 * @author jittagorn pitakmetagoon
 * create 23/05/2014
 */
define('com.pamarin.ui.PageInfiniteScroll', [
    'module',
    'com.pamarin.core.lang.Class',
    'com.pamarin.ui.WindowInfiniteScroll',
    'com.pamarin.core.util.collection.ArrayList',
    'com.pamarin.core.util.Router',
    'com.pamarin.core.util.Types'
], function(module, Class, WindowInfiniteScroll, ArrayList, Router, Types) {

    /**
     * @class ScrollListener
     */
    var ScrollListener = Class.define(module.id + '.ScrollListener', {
        /**/
        variable: {
            callback_: null,
            live_: 0,
            continue_: true,
            currentPage_: 1,
            percent_: 0
        },
        /**/
        constructor: function(live, callback) {
            this.live_ = live;
            this.callback_ = callback;
        },
        /**/
        increasePage: function() {
            this.currentPage_ = this.currentPage_ + 1;
        },
        /**
         * @returns {Number}
         */
        getCurrentPage: function() {
            return this.currentPage_;
        },
        /**
         * @returns {Boolean}
         */
        isContinue: function() {
            return this.continue_ === true;
        },
        /**/
        toContinue: function() {
            this.continue_ = true;
        },
        /**/
        breakScroll: function() {
            this.continue_ = false;
        },
        /**
         * @param {Number} percent
         */
        setPercent: function(percent) {
            this.percent_ = percent;
        },
        /**
         * @returns {Number}
         */
        getPercent: function() {
            return this.percent_;
        },
        /**/
        executeCallback: function() {
            this.callback_(this);
        },
        /**
         * @returns {Number}
         */
        getLive: function() {
            return this.live_;
        }
    });

    /**
     * @class PageInfiniteScroll
     */
    var PageInfiniteScroll = Class.define(module.id, (function() {

        var DELAY_MILLISECOND = 300;
        var listeners = new ArrayList();

        var timeout = null;
        WindowInfiniteScroll.addScrollListener(function(percent) {
            if (timeout) {
                clearTimeout(timeout);
            }

            timeout = setTimeout(function() {
                clearTimeout(timeout);
                listeners.forEachEntry(function(listener) {
                    if (listener.isContinue()) {
                        listener.breakScroll();
                        listener.setPercent(percent);
                        listener.executeCallback();
                        listener.increasePage();
                    }
                });
            }, DELAY_MILLISECOND);
        });

        Router.onRoute(function(data) {
            if (listeners.isEmpty()) {
                return;
            }

            var itr = listeners.iterator();
            while (itr.hasNext()) {
                var listener = itr.next();
                if (data.index <= listener.getLive()) {
                    itr.remove();
                }
            }
        });

        return {
            /**/
            variable: {
                live_: 0
            },
            /**/
            constructor: function(live) {
                if (Types.isNumber(live)) {
                    this.live_ = live;
                }
            },
            /**
             * @param {Function} callback
             */
            addScrollListener: function(callback) {
                listeners.add(new ScrollListener(this.live_, callback));
            }
        };
    })());



    return PageInfiniteScroll;
});