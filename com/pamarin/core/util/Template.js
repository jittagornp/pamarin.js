/**
 * @author jittagorn pitakmetagoon
 * create 15/02/2014
 */
define('com.pamarin.core.util.Template', [
    'module',
    'com.pamarin.core.lang.Class',
    'com.pamarin.core.util.Types',
    'com.pamarin.core.util.Assert'
], function(module, Class, Types, Assert) {

    /**
     * @class Template
     * 
     * example >>
     * -------------------------------------------------------------------------
     * var template = new Template();
     * template.replace('{} : {} + {} = {}', 'computation add', 1, 2, (1 + 2));
     * 
     * output --> computation add : 1 + 2 = 3
     * -------------------------------------------------------------------------
     */
    var Template = Class.define(module.id, (function() {

        //dependencies
        var slice = Array.prototype.slice;

        return {
            /**
             * define Template instance variable
             */
            variable: {
                regExp_: null
            },
            /**
             * Template constructor
             * 
             * @param RegularExpression regExp_opt - optional
             * 
             * @throws {IllegalArgumentException} - invalid input type
             */
            constructor: function(regExp_opt) {
                Assert.assertRegExpOptional(regExp_opt, module.id + '.constructor(RegularExpression regExp_opt).');

                this.regExp_ = regExp_opt || /\{\}/g;
            },
            /**
             * for replace message string format with parameters
             * 
             * @param {String} messageFormat 
             * @param {T...} parameters
             *
             * @returns {String} message
             */
            replace: function() {
                Assert.assertString(arguments[0], module.id + '.replace(String messageFormat, String... parameters).');

                var messageFormat = arguments[0];
                var parameters = slice.call(arguments, 1);
                var count = 0;

                return messageFormat.replace(this.regExp_, function(match) {
                    var param = parameters[count++];
                    if (Types.isUndefined(param)) {
                        return match;
                    }

                    return param;
                });
            }
        };
    })());



    return Template;
});