/**
 * @author jittagorn pitakmetagoon
 * create 13/06/2014
 */
define('com.pamarin.core.context.ApplicationContextManager', [
    'module',
    'com.pamarin.core.lang.Class',
    'com.pamarin.core.creational.Namespace',
    'com.pamarin.core.util.Types',
    'com.pamarin.core.exception.IllegalArgumentException'
], function(module, Class, Namespace, Types, IllegalArgumentException) {

    /**
     * @class ApplicationContextManager
     */
    var ApplicationContextManager = Class.define(module.id, {
        /**/
        variable: {
            name_: null,
            context_: null
        },
        /**/
        constructor: function(name) {
            this.name_ = name || null;
            this.context_ = {};
        },
        /**
         * @param {String} namespace
         * @param {Object} ctx
         */
        registerContext: function(namespace, ctx) {
            if (!Types.isString(this.name_)) {
                throw new IllegalArgumentException('require name on constructor(String name).');
            }

            if (Types.isObject(namespace)) {
                this.context_[this.name_] = namespace;
                return;
            }

            Namespace.createAndSet(namespace, ctx, this.context_[this.name_]);
        },
        /**
         * @param {String} namespace 
         * @returns {T} 
         */
        getParameter: function(namespace) {
            if (!Types.isString(this.name_)) {
                throw new IllegalArgumentException('require name on constructor(String name).');
            }

            if (!Types.isString(namespace)) {
                return this.context_[this.name_];
            }

            return Namespace.getValue(namespace, this.context_[this.name_]);
        }
    });



    return Namespace.createAndSet('ApplicationContextManager', ApplicationContextManager);
});