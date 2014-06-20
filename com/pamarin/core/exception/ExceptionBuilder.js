/**
 * for build exception message
 * 
 * example 
 * -----------------------------------------------------------------------------
 * ExceptionBuilder.buildFromException(new IllegalArgumentException())
 *                 .setExceptionCode(5412)
 *                 .setLocationOccur('location')  
 *                 .addMessage('test')
 *                 .addMessage('test2')
 *                 .build()
 * 
 * @author jittagorn pitakmetagoon
 * create 02/01/2014 
 */
define('com.pamarin.core.exception.ExceptionBuilder', [
    'module',
    'com.pamarin.core.lang.Class',
    'com.pamarin.core.util.StringBuilder',
    'com.pamarin.core.util.Types',
    'com.pamarin.core.exception.IllegalArgumentException'
], function(module, Class, StringBuilder, Types, IllegalArgumentException) {

    /**
     * @class ExceptionBuilder
     */
    var ExceptionBuilder = Class.define(module.id, (function() {

        function isEmpty(text) {
            return text === null || text.length === 0;
        }

        return {
            /**
             * define variable
             */
            variable: {
                ex_: null,
                code_: 500,
                name_: null,
                locationOccur_: null,
                messageBuilder_: null,
                description_: null
            },
            /**
             * constuctor of ExceptionBuilder
             * 
             * @param {T extends Exception} ex
             */
            constructor: function(ex) {
                this.ex_ = ex;
                this.name_ = ex.name_;
            },
            /**
             * define static variable or static method
             */
            static: {
                /**
                 * static method for build Exception from Exception instance
                 * 
                 * @param {Exception} ex
                 * @returns {ExceptionBuilder} ExceptionBuilder instance
                 */
                buildFromException: function(ex) {
                    if (!Types.isException(ex)) {
                        throw new IllegalArgumentException(module.id + '.buildFromException(Exception ex), argument ex not an exception.');
                    }

                    return new ExceptionBuilder(ex);
                }
            },
            /**
             * for set exception code
             * 
             * @param {Number} code
             * @returns {ExceptionBuilder} ExceptionBuilder instance
             */
            setExceptionCode: function(code) {
                this.code_ = code;
                return this;
            },
            /**
             * for set location exception occur
             * 
             * @param {String} location
             * @returns {ExceptionBuilder} ExceptionBuilder instance
             */
            setLocationOccur: function(location) {
                this.locationOccur_ = location;
                return this;
            },
            /**
             * for add exception message
             * 
             * @param {String} message
             * @returns {ExceptionBuilder} ExceptionBuilder instance
             */
            addMessage: function(message) {
                if (this.messageBuilder_ === null) {
                    this.messageBuilder_ = new StringBuilder();
                }

                this.messageBuilder_.append(message);
                return this;
            },
            /**
             * for set descriotion of exception
             * 
             * @param {String} desc 
             * @returns {ExceptionBuilder} ExceptionBuilder instance
             */
            setDescrition: function(desc) {
                this.description_ = desc;
                return this;
            },
            /**
             * build message then thow an exception
             * 
             * @throws {Exception} ex
             */
            build: function() {
                var builder = new StringBuilder();
                builder.append('exception type : ')
                        .append(this.name_)
                        .append(', exception code : ')
                        .append(this.code_);

                if (!isEmpty(this.description_)) {
                    builder.append(', descriotion : ')
                            .append(this.description_);
                }

                if (!isEmpty(this.locationOccur_)) {
                    builder.append(', occur : ')
                            .append(this.locationOccur_);
                }

                var message = this.messageBuilder_.toString();
                if (!isEmpty(message)) {
                    builder.append(', message : ')
                            .append(message);
                }

                this.messageBuilder_ = null;
                this.ex_.message_ = builder.toString();

                throw this.ex_;
            }
        };
    })());



    return ExceptionBuilder;
});