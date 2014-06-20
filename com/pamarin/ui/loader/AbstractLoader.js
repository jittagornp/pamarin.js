/**
 * @author jittagorn pitakmetagoon
 * create 08/03/2014
 */
define('com.pamarin.ui.loader.AbstractLoader', [
    'module',
    'com.pamarin.core.lang.Class',
    'com.pamarin.core.util.Types',
    'com.pamarin.core.util.Assert',
    'com.pamarin.core.behavioral.Chain'
], function(module, Class, Types, Assert, Chain) {

    'use strict';

    /**
     * @class AbstractLoader
     */
    var AbstractLoader = Class.define(module.id, (function() {

        var HASH = '#';

        return {
            /**
             * @constant
             */
            constant: {
                SUCCESS: 'SUCCESS',
                FAIL: 'FAIL'
            },
            /**
             * @variable
             */
            variable: {
                filterCallback_: null,
                chain_: null
            },
            /**
             * @returns {Chain}
             */
            chain: function() {
                if(this.chain_ === null){
                    this.chain_ = new Chain();
                }
                
                return this.chain_;
            },
            /**
             * @abstract
             */
            abstract: {
                //
                load: function() {

                },
                /**
                 * @protected
                 */
                onSuccess: function() {

                },
                /**
                 * @protected
                 */
                onFail: function() {

                }
            },
            /**
             * for filter url before load
             * 
             * @param {Function} callback
             * @returns {AbstractLoader}
             */
            filterPath: function(callback) {
                Assert.assertFunction(callback, module.id + '.filterPath(Function callback).');

                this.filterCallback_ = callback;
                return this;
            },
            /**
             * @protected
             * 
             * @param {String} url
             * @returns {String}
             */
            transformUrl: function(url) {
                var indexOf = url.indexOf(HASH);
                url = (indexOf === -1) ? url : url.substr(0, indexOf);

                return Types.isFunction(this.filterCallback_) ? this.filterCallback_(url) : url;
            }
        };
    })());



    return AbstractLoader;
});