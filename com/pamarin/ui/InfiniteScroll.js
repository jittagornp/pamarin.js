/**
 * @author jittagorn pitakmetagoon
 * create 01/11/2013
 */
define('com.pamarin.ui.InfiniteScroll', [
    'module',
    'com.pamarin.core.lang.Class',
    'com.pamarin.ui.UI',
    'com.pamarin.core.util.Types',
    'com.pamarin.core.util.Assert'
], function(module, Class, UI, Types, Assert) {

    /**
     * @class InfiniteScroll
     * for detect percent scroll binding 
     */
    var InfiniteScroll = Class.define(module.id, {
        //
        variable: {
            percentScroll_: 95,
            $detectElement_: null
        },
        /**
         * @param {String | jQueryElement} element
         */
        constructor: function(element) {
            InfiniteScroll.superConstructor.call(this, element);
        },
        /**
         * @param {number} percent
         * @returns InfiniteScroll
         */
        setPercentScroll: function(percent) {
            Assert.assertNumber(percent, module.id + '.setPercentScroll(Number percent).');

            this.percentScroll_ = percent;
            return this;
        },
        /**
         * @param {String | jQueryElement} element
         * @returns InfiniteScroll
         */
        detectElement: function(element) {
            this.$detectElement_ = this.parseElement(element);
            return this;
        },
        /**
         * @param {function} callback
         */
        scroll: function(callback) {
            if (!Types.isFunction(callback)) {
                return;
            }

            var that = this;
            that.$element_.on('scroll', function() {
                var scrollTop = that.$element_.scrollTop();
                var detectHeight = that.$detectElement_.height();
                var elementHeight = that.$element_.height();
                var percent = 100 * (scrollTop / (detectHeight - elementHeight));

                if (percent >= that.percentScroll_) {
                    callback(percent, that.percentScroll_);
                }
            });
        }
    }).extends(UI);



    /**
     * return class InfiniteScroll
     */
    return InfiniteScroll;
});
