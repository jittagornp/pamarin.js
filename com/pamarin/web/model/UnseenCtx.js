/**
 * @author jittagorn pitakmetagoon
 * create 11/06/2014
 */
define('com.pamarin.web.model.UnseenCtx', [
    'module',
    'com.pamarin.core.lang.Class'
], function(module, Class) {

    /**
     * @class UnseenCtx
     * @model
     */
    var UnseenCtx = Class.define(module.id, {
        /**/
        variable: {
            config_: null,
            unseen_: null,
            tab_: null
        },
        /**
         * @returns {Object}
         */
        getConfig: function() {
            return this.config_;
        },
        /**
         * @param {Object} cfg
         */
        setConfig: function(cfg) {
            this.config_ = cfg;
        },
        /**
         * @returns {Unseen}
         */
        getUnseen: function() {
            return this.unseen_;
        },
        /**
         * @param {Unseen} unseen
         */
        setUnseen: function(unseen) {
            this.unseen_ = unseen;
        },
        /**
         * @returns {Tab}
         */
        getTab: function() {
            return this.tab_;
        },
        /**
         * @param {Tab} tab
         */
        setTab: function(tab) {
            this.tab_ = tab;
        },
        /**
         * @param {UnseenCtx} obj
         * @returns {Boolean}
         */
        equals: function(obj) {
            if (!(obj instanceof UnseenCtx)) {
                return false;
            }

            return obj.getUnseen().equals(this.getUnseen());
        }
    });



    return UnseenCtx;
});