/** 
 * @author  jittagorn pitakmetagoon 
 * create  12/04/2013
 * 
 * update  07/06/2013 (jittagorn pitakmetagoon : add to AMD)
 * update  23/07/2013 (jittagorn pitakmetagoon : add disable logger)
 * update  07/01/2014 (jittagorn pitakmetagoon : move to Class.js)
 * update  22/01/2014 (jittagorn pitakmetagoon : custom css console log)
 * update  08/03/2014 (jittagorn pitakmetagoon : print real line number by Error.stack)
 */
define('com.pamarin.core.logging.Logger', [
    'module',
    'com.pamarin.core.lang.Class',
    'com.pamarin.core.util.Types'
], function(module, Class, Types) {

    /**
     * @class Logger
     */
    var Logger = Class.define(module.id, (function() {

        var console = window.console;
        var slice = Array.prototype.slice;
        //
        var TEMPLATE_FORMAT_REGX_PATTERN = /\{\}/g;
        var PLAIN_MESSAGE_FORMAT = '%O';
        var STYLE_FORMAT = '%c';

        function time() {
            var date = new Date();

            var hrs = date.getHours();
            var mnis = date.getMinutes();
            var secs = date.getSeconds();
            var millsecs = date.getMilliseconds();

            var hours = (hrs < 10 ? ('0' + hrs) : hrs);
            var minutes = (mnis < 10 ? ('0' + mnis) : mnis);
            var seconds = (secs < 10 ? ('0' + secs) : secs);
            var milliseconds = (millsecs < 10 ? ('00' + millsecs) : (millsecs < 100) ? ('0' + millsecs) : millsecs);

            return hours + ':' + minutes + ':' + seconds + '.' + milliseconds;
        }

        function isPlainMessage(message) {
            return Types.isObject(message) || Types.isArray(message) || Types.isFunction(message) || Types.isArguments(message);
        }

        function replaceTemplateFormatWithParameters(format, parameters) {
            if (!Types.isString(format) && parameters.push(format)) {
                return PLAIN_MESSAGE_FORMAT;
            }

            var index = -1;
            return format.replace(TEMPLATE_FORMAT_REGX_PATTERN, function(match) {
                var param = parameters[++index];
                if (Types.isUndefined(param)) {
                    return match;
                }

                if (isPlainMessage(param)) {
                    return PLAIN_MESSAGE_FORMAT;
                }

                parameters.splice(index--, 1);

                return param;
            });
        }

        function print(args, type, topic, style) {
            var templateFormat = args[0];
            var parameters = slice.call(args, 1);

            var lineNumber;
            try {
                throw new Error();
            } catch (error) {
                var source = error.stack.split('\n')[3];
                var array = source.split(':');
                array.pop();

                lineNumber = array.pop();
            }

            var prefix = [
                STYLE_FORMAT, topic,
                STYLE_FORMAT, '[',
                STYLE_FORMAT, this.name_ + ' at line ' + lineNumber,
                STYLE_FORMAT, '] ',
                STYLE_FORMAT, time(),
                STYLE_FORMAT, ' - '
            ].join('');

            var css = [
                'font-weight : bold;' + style,
                'font-weight : normal; color : #000',
                'color : blue;',
                'color : #000',
                'color : #777',
                style
            ];

            templateFormat = replaceTemplateFormatWithParameters(templateFormat, parameters);
            console[type].apply(console, [prefix + templateFormat].concat(css).concat(parameters));
        }

        return {
            //
            variable: {
                name_: null,
                debug_: true,
                info_: true,
                warn_: true,
                error_: true
            },
            //
            constructor: function(name) {
                this.name_ = name || 'unknown';
            },
            /**
             * print log DEBUG level
             * 
             * @param {T...} message
             */
            debug: function() {
                this.debug_ && print.call(this, arguments, 'debug', 'DEBUG ', 'color : green');
            },
            /**
             * print log INFO level
             * 
             * @param {T...} message
             */
            info: function() {
                this.info_ && print.call(this, arguments, 'log', 'INFO ', 'color : #0078da');
            },
            /**
             * print log WARNING level
             * 
             * @param {T...} message
             */
            warn: function() {
                this.warn_ && print.call(this, arguments, 'warn', 'WARN ', 'color : orange');
            },
            /**
             * print log ERROR level
             * 
             * @param {T...} message
             */
            error: function() {
                this.error_ && print.call(this, arguments, 'error', 'ERROR ', 'color : red');
            }
        };
    })()); //end class Log



    /**
     * return class Logger
     */
    return  Logger;
});