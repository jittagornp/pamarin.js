/** 
 * @author  jittagorn pitakmetagoon 
 * create  07/06/2013
 * 
 * update  07/06/2013 (jittagorn pitakmetagoon : add to AMD)
 * update  17/03/2014 (jittagorn pitakmetagoon : move to Class.js)
 */
define('com.pamarin.core.util.Cookies', [
    'module',
    'com.pamarin.core.lang.Class',
    'com.jquery.cookie.JQueryCookie',
    'com.pamarin.core.util.StringUtils',
    'com.pamarin.core.logging.LoggerFactory',
    'com.pamarin.core.util.Types',
    'com.pamarin.core.util.Assert'
], function(module, Class, $, StringUtils, LoggerFactory, Types, Assert) {

    /**
     * @class Serializer
     * 
     * example >>
     * -------------------------------------------------------------------------
     * var serializer = new (Cookies.Serializer)({
     *      name : 'cookie_name',
     *      expire : 1,
     *      path : '/',
     *      values : [
     *          { key : 'key 1', value : 'value 1'},
     *          { key : 'key 2', value : 'value 2'},
     *          { key : 'key 3', value : 'value 3'}
     *      ]
     * });
     * 
     * serializer.get('key 1'); //value 1
     * serializer.set('key 2', 99);
     * serializer.get('key 2'); //99
     * -------------------------------------------------------------------------
     * 
     */
    var Serializer = Class.define(module.id + '.Serializer', (function() {

        var LOG = LoggerFactory.getLogger(module.id + '.Serializer');

        var SEPERATE_KEY_VALUE = ':';
        var SEPERATE_BLOCK = ',';

        function isEmpty(data) {
            return data === '';
        }

        function forEachCookie(cookies, callback, context) {
            var array = StringUtils.split(cookies, SEPERATE_BLOCK);
            for (var i = 0; i < array.length; i++) {
                if (isEmpty(array[i])) {
                    continue;
                }

                var keyValuePair = StringUtils.split(array[i], SEPERATE_KEY_VALUE);
                var key = keyValuePair.shift();
                var value = keyValuePair.pop();

                var val = callback.call(context, key, value);
                if (val === false) {
                    break;
                }
            }
        }

        return {
            /**
             * @constant
             */
            constant: {
                SEPERATE_KEY_VALUE: SEPERATE_KEY_VALUE,
                SEPERATE_BLOCK: SEPERATE_BLOCK
            },
            /**
             * @variable
             */
            variable: {
                name_: null,
                serialize_: '',
                expire_: 365,
                path_: '/'
            },
            /**
             * @constructor
             * 
             * @param {Object} option
             */
            constructor: function(option) {
                Assert.assert({
                    Object: option,
                    String: option.name,
                    ArrayOptional: [option.values]
                }, this.getClass().getName() + '.contructor(Object option).');

                this.name_ = option.name;
                var values = option.values;

                if (Types.isNumber(option.expire)) {
                    this.expire_ = option.expire;
                }

                if (Types.isString(option.path)) {
                    this.path_ = option.path;
                }

                Types.isArray(values) && this.serialize(values);
            },
            /**
             * @private
             * 
             * @parame {Array} values
             */
            serialize: function(values) {
                for (var i = 0; i < values.length; i++) {
                    var cookie = values[i];
                    var key = cookie.key;
                    var value = cookie.value;

                    if (!Types.isNotdefined(key) && !Types.isNotdefined(value)) {
                        this.serialize_ = this.serialize_ + key + SEPERATE_KEY_VALUE + value + SEPERATE_BLOCK;
                    }
                }

                var cookies = this.readCookies();
                Types.isNotdefined(cookies) && this.writeCookies(this.serialize_);
            },
            /**
             * @private
             */
            readCookies: function() {
                return $.cookie(this.name_);
            },
            /**
             *@private
             *
             *@param {String} value
             */
            writeCookies: function(value) {
                $.cookie(this.name_, value, {
                    path: this.path_,
                    expires: this.expire_
                });
            },
            /**
             * @param {String} key
             * 
             * @returns {T}
             */
            get: function(key) {
                Assert.assertString(key, this.getClass().getName() + '.get(String key).');

                var cookies = this.readCookies();
                if (Types.isNotdefined(cookies)) {
                    cookies = this.serialize_;
                    this.writeCookies(cookies);
                }

                var value;
                forEachCookie(cookies, function(key_, value_) {
                    if (key_ === key) {
                        value = isEmpty(value_) ? undefined : value_;
                        return false;
                    }
                });

                LOG.debug('cookie name [{}] : key/value --> {}/{}', this.name_, key, value);
                
                return value;
            },
            /**
             * @param {String} key
             * @param {T} value
             */
            set: function(key, value) {
                Assert.assertString(key, this.getClass().getName() + '.set(String key, T value).');

                var cookies = this.readCookies();
                if (Types.isNotdefined(cookies)) {
                    cookies = this.serialize_;
                }

                var serialize = '';
                forEachCookie(cookies, function(key_, value_) {
                    if (key_ === key) {
                        value_ = value;
                    }

                    serialize = serialize + key_ + SEPERATE_KEY_VALUE + value_ + SEPERATE_BLOCK;
                });

                LOG.debug('cookie name [{}] : key/value --> {}/{} to serialize {}', this.name_, key, value, serialize);
                
                this.writeCookies(serialize);
            }
        };
    })());



    /**
     * @class Cookies
     */
    var Cookies = Class.define(module.id, {
        /**
         * @static
         */
        static: {
            Serializer: Serializer
        }
    });



    return Cookies;
});