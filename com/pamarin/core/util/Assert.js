/**
 * @author jittagorn pitakmetagoon
 * create 15/02/2014
 * 
 * update 21/02/2014 (jittagorn pitakmetagoon : can assert multiple value)
 */
define('com.pamarin.core.util.Assert', [
    'module',
    'com.pamarin.core.lang.Object',
    'com.pamarin.core.lang.Class',
    'com.pamarin.core.util.Types',
    'com.pamarin.core.exception.AssertException',
    'com.pamarin.core.exception.IllegalArgumentException',
    'com.pamarin.core.exception.MethodNotFoundException',
    'com.pamarin.core.context.Configuration'
], function(module, Object, Class, Types, AssertException, IllegalArgumentException, MethodNotFoundException, Configuration) {

    /**
     * @class Assert
     */
    var Assert = Class.define(module.id, (function() {

        var slice = Array.prototype.slice;
        var profile = Configuration.profile || 'DEVELOPMENT';
        var isDevelopment = profile === 'DEVELOPMENT';

        function forEachParameters(array, callback) {
            var args = slice.call(array);
            var message_opt = args.pop();

            var isNotHaveMessage = args.length === 0 || !Types.isString(message_opt);
            if (isNotHaveMessage) {
                args = args.concat([message_opt]);
                message_opt = '#';
            }

            var length = args.length;
            for (var i = 0; i < length; i++) {
                callback.call(null, args[i], message_opt);
            }
        }

        return {
            //
            static: {
                /**
                 * for assert number of input (any type) parameters   
                 *
                 * example >>
                 * -------------------------------------------------------------------------
                 * Assert.assertNumber(2, 'not Number');
                 * Assert.assertNumber(4, 5, 6, 'not Number');
                 *
                 * Assert.assertNumber('foo', 'not Number'); //will throw AssertException
                 * -------------------------------------------------------------------------
                 *
                 * @param {T...} t
                 * @param {String} message_opt - optional
                 *
                 * @throws {AssertException}
                 */
                assertNumber: function() {
                    isDevelopment && forEachParameters(arguments, function(t, message_opt) {
                        if (!Types.isNumber(t)) {
                            throw new AssertException('Assert.assertNumber(T.. t, String message_opt) fail, because t is \'{}\' - [{}]', Types.get(t), message_opt);
                        }
                    });
                },
                /**
                 * for assert number [optional] of input (any type) parameters   
                 *
                 * example >>
                 * -------------------------------------------------------------------------
                 * Assert.assertNumberOptional(2, 'not Number');
                 * Assert.assertNumberOptional(2, null, undefined, 'not Number');
                 *
                 * Assert.assertNumberOptional('foo', 'not Number'); //will throw AssertException
                 * -------------------------------------------------------------------------
                 *
                 * @param {T...} t
                 * @param {String} message_opt - optional
                 *
                 * @throws {AssertException}
                 */
                assertNumberOptional: function() {
                    isDevelopment && forEachParameters(arguments, function(t, message_opt) {
                        if (Types.isDefined(t) && !Types.isNumber(t)) {
                            throw new AssertException('Assert.assertNumberOptional(T.. t, String message_opt) fail, because t is \'{}\' - [{}]', Types.get(t), message_opt);
                        }
                    });
                },
                /**
                 * for assert string of input (any type) parameters   
                 *
                 * example >>
                 * -------------------------------------------------------------------------
                 * Assert.assertString('bar', 'not String');
                 * Assert.assertString('foo', 'bar', 'not String');
                 *
                 * Assert.assertString(3, 'not String'); //will throw AssertException
                 * -------------------------------------------------------------------------
                 *
                 * @param {T...} t
                 * @param {String} message_opt - optional
                 *
                 * @throws {AssertException}
                 */
                assertString: function() {
                    isDevelopment && forEachParameters(arguments, function(t, message_opt) {
                        if (!Types.isString(t)) {
                            throw new AssertException('Assert.assertString(T.. t, String message_opt) fail, because t is \'{}\' - [{}]', Types.get(t), message_opt);
                        }
                    });
                },
                /**
                 * for assert string [optional] of input (any type) parameters   
                 *
                 * example >>
                 * -------------------------------------------------------------------------
                 * Assert.assertStringOptional('bar', 'not String');
                 * Assert.assertStringOptional(undefined, 'class', 'not String');
                 *
                 * Assert.assertStringOptional(3, 'not String'); //will throw AssertException
                 * -------------------------------------------------------------------------
                 *
                 * @param {T...} t
                 * @param {String} message_opt - optional
                 *
                 * @throws {AssertException}
                 */
                assertStringOptional: function() {
                    isDevelopment && forEachParameters(arguments, function(t, message_opt) {
                        if (Types.isDefined(t) && !Types.isString(t)) {
                            throw new AssertException('Assert.assertStringOptional(T.. t, String message_opt) fail, because t is \'{}\' - [{}]', Types.get(t), message_opt);
                        }
                    });
                },
                /**
                 * for assert boolean of input (any type) parameters   
                 *
                 * example >>
                 * -------------------------------------------------------------------------
                 * Assert.assertBoolean(true, 'not Boolean');
                 * Assert.assertBoolean(true, false, true, 'not Boolean');
                 *
                 * Assert.assertBoolean({}, 'not Boolean'); //will throw AssertException
                 * -------------------------------------------------------------------------
                 *
                 * @param {T..} t
                 * @param {String} message_opt - optional
                 *
                 * @throws {AssertException}
                 */
                assertBoolean: function() {
                    isDevelopment && forEachParameters(arguments, function(t, message_opt) {
                        if (!Types.isBoolean(t)) {
                            throw new AssertException('Assert.assertBoolean(T.. t, String message_opt) fail, because t is \'{}\' - [{}]', Types.get(t), message_opt);
                        }
                    });
                },
                /**
                 * for assert boolean [optional] of input (any type) parameters   
                 *
                 * example >>
                 * -------------------------------------------------------------------------
                 * Assert.assertBooleanOptional(true, 'not Boolean');
                 * Assert.assertBooleanOptional(undefined, true, null, 'not Boolean');
                 *
                 * Assert.assertBooleanOptional({}, 'not Boolean'); //will throw AssertException
                 * -------------------------------------------------------------------------
                 *
                 * @param {T..} t
                 * @param {String} message_opt - optional
                 *
                 * @throws {AssertException}
                 */
                assertBooleanOptional: function() {
                    isDevelopment && forEachParameters(arguments, function(t, message_opt) {
                        if (Types.isDefined(t) && !Types.isBoolean(t)) {
                            throw new AssertException('Assert.assertBooleanOptional(T.. t, String message_opt) fail, because t is \'{}\' - [{}]', Types.get(t), message_opt);
                        }
                    });
                },
                /**
                 * for assert boolean 'true' of input (any type) parameters   
                 *
                 * example >>
                 * -------------------------------------------------------------------------
                 * Assert.assertTrue(true, 'not True');
                 * Assert.assertTrue(true, true, true, 'not True');
                 *
                 * Assert.assertTrue(false, 'not True'); //will throw AssertException
                 * -------------------------------------------------------------------------
                 *
                 * @param {T...} t
                 * @param {String} message_opt - optional
                 *
                 * @throws {AssertException}
                 */
                assertTrue: function() {
                    isDevelopment && forEachParameters(arguments, function(t, message_opt) {
                        if (!(Types.isBoolean(t) && t)) {
                            throw new AssertException('Assert.assertTrue(T.. t, String message_opt) fail, because t is \'{}\' - [{}]', Types.get(t), message_opt);
                        }
                    });
                },
                /**
                 * for assert boolean 'true' [optional] of input (any type) parameters   
                 *
                 * example >>
                 * -------------------------------------------------------------------------
                 * Assert.assertTrueOptional(true, 'not True');
                 * Assert.assertTrueOptional(null, true, undefined, 'not True');
                 *
                 * Assert.assertTrue(false, 'not True'); //will throw AssertException
                 * -------------------------------------------------------------------------
                 *
                 * @param {T...} t
                 * @param {String} message_opt - optional
                 *
                 * @throws {AssertException}
                 */
                assertTrueOptional: function() {
                    isDevelopment && forEachParameters(arguments, function(t, message_opt) {
                        if (Types.isDefined(t) && !(Types.isBoolean(t) && t)) {
                            throw new AssertException('Assert.assertTrueOptional(T.. t, String message_opt) fail, because t is \'{}\' - [{}]', Types.get(t), message_opt);
                        }
                    });
                },
                /**
                 * for assert boolean 'false' of input (any type) parameters   
                 *
                 * example >>
                 * -------------------------------------------------------------------------
                 * Assert.assertFalse(false, 'not False');
                 * Assert.assertFalse(false, false, 'not False');
                 *
                 * Assert.assertFalse(true, 'not False'); //will throw AssertException
                 * -------------------------------------------------------------------------
                 *
                 * @param {T...} t
                 * @param {String} message_opt - optional
                 *
                 * @throws {AssertException}
                 */
                assertFalse: function() {
                    isDevelopment && forEachParameters(arguments, function(t, message_opt) {
                        if (!(Types.isBoolean(t) && !t)) {
                            throw new AssertException('Assert.assertFalse(T.. t, String message_opt) fail, because t is \'{}\' - [{}]', Types.get(t), message_opt);
                        }
                    });
                },
                /**
                 * for assert boolean 'false' [optional] of input (any type) parameters   
                 *
                 * example >>
                 * -------------------------------------------------------------------------
                 * Assert.assertFalseOptional(false, 'not False');
                 * Assert.assertFalseOptional(undefined, false, 'not False');
                 *
                 * Assert.assertFalseOptional(true, 'not False'); //will throw AssertException
                 * -------------------------------------------------------------------------
                 *
                 * @param {T...} t
                 * @param {String} message_opt - optional
                 *
                 * @throws {AssertException}
                 */
                assertFalseOptional: function() {
                    isDevelopment && forEachParameters(arguments, function(t, message_opt) {
                        if (Types.isDefined(t) && !(Types.isBoolean(t) && !t)) {
                            throw new AssertException('Assert.assertFalseOptional(T.. t, String message_opt) fail, because t is \'{}\' - [{}]', Types.get(t), message_opt);
                        }
                    });
                },
                /**
                 * for assert null of input (any type) parameters   
                 *
                 * example >>
                 * -------------------------------------------------------------------------
                 * Assert.assertNull(null, 'not Null');
                 * Assert.assertNull(null, null, null, 'not Null');
                 *
                 * Assert.assertNull(1, 'not Null'); //will throw AssertException
                 * -------------------------------------------------------------------------
                 *
                 * @param {T...} t
                 * @param {String} message_opt - optional
                 *
                 * @throws {AssertException}
                 */
                assertNull: function() {
                    isDevelopment && forEachParameters(arguments, function(t, message_opt) {
                        if (t !== null) {
                            throw new AssertException('Assert.assertNull(T.. t, String message_opt) fail, because t is \'{}\' - [{}]', Types.get(t), message_opt);
                        }
                    });
                },
                /**
                 * for assert object of input (any type) parameters   
                 *
                 * example >>
                 * -------------------------------------------------------------------------
                 * Assert.assertObject({}, 'not Object');
                 * Assert.assertObject({}, {}, 'not Object');
                 *
                 * Assert.assertObject(null, 'not Object'); //will throw AssertException
                 * -------------------------------------------------------------------------
                 *
                 * @param {T...} t
                 * @param {String} message_opt - optional
                 *
                 * @throws {AssertException}
                 */
                assertObject: function() {
                    isDevelopment && forEachParameters(arguments, function(t, message_opt) {
                        if (!Types.isObject(t)) {
                            throw new AssertException('Assert.assertObject(T.. t, String message_opt) fail, because t is \'{}\' - [{}]', Types.get(t), message_opt);
                        }
                    });
                },
                /**
                 * for assert object [optional] of input (any type) parameters   
                 *
                 * example >>
                 * -------------------------------------------------------------------------
                 * Assert.assertObjectOptional({}, 'not Object');
                 * Assert.assertObjectOptional({}, undefined, 'not Object');
                 *
                 * Assert.assertObjectOptional('my', 'not Object'); //will throw AssertException
                 * -------------------------------------------------------------------------
                 *
                 * @param {T...} t
                 * @param {String} message_opt - optional
                 *
                 * @throws {AssertException}
                 */
                assertObjectOptional: function() {
                    isDevelopment && forEachParameters(arguments, function(t, message_opt) {
                        if (Types.isDefined(t) && !Types.isObject(t)) {
                            throw new AssertException('Assert.assertObjectOptional(T.. t, String message_opt) fail, because t is \'{}\' - [{}]', Types.get(t), message_opt);
                        }
                    });
                },
                /**
                 * for assert function of input (any type) parameters   
                 *
                 * example >>
                 * -------------------------------------------------------------------------
                 * Assert.assertFunction(function(){ }, 'not Function');
                 * Assert.assertFunction(function(){ }, function(){ }, function(){ }, 'not Function');
                 *
                 * Assert.assertFunction(null, 'not Function'); //will throw AssertException
                 * -------------------------------------------------------------------------
                 *
                 * @param {T...} t
                 * @param {String} message_opt - optional
                 *
                 * @throws {AssertException}
                 */
                assertFunction: function() {
                    isDevelopment && forEachParameters(arguments, function(t, message_opt) {
                        if (!Types.isFunction(t)) {
                            throw new AssertException('Assert.assertFunction(T.. t, String message_opt) fail, because t is \'{}\' - [{}]', Types.get(t), message_opt);
                        }
                    });
                },
                /**
                 * for assert function [optional] of input (any type) parameters   
                 *
                 * example >>
                 * -------------------------------------------------------------------------
                 * Assert.assertFunctionOptional(function(){ }, 'not Function');
                 * Assert.assertFunctionOptional(null, function(){ }, undefined, 'not Function');
                 *
                 * Assert.assertFunctionOptional(null, 'not Function'); //will throw AssertException
                 * -------------------------------------------------------------------------
                 *
                 * @param {T...} t
                 * @param {String} message_opt - optional
                 *
                 * @throws {AssertException}
                 */
                assertFunctionOptional: function() {
                    isDevelopment && forEachParameters(arguments, function(t, message_opt) {
                        if (Types.isDefined(t) && !Types.isFunction(t)) {
                            throw new AssertException('Assert.assertFunctionOptional(T.. t, String message_opt) fail, because t is \'{}\' - [{}]', Types.get(t), message_opt);
                        }
                    });
                },
                /**
                 * for assert undefined of input (any type) parameters   
                 *
                 * example >>
                 * -------------------------------------------------------------------------
                 * Assert.assertUndefined(undefined, 'not Undefined');
                 * Assert.assertUndefined(undefined, undefined, undefined, 'not Undefined');
                 *
                 * Assert.assertUndefined(99, 'not Undefined'); //will throw AssertException
                 * -------------------------------------------------------------------------
                 *
                 * @param {T...} t
                 * @param {String} message_opt - optional
                 *
                 * @throws {AssertException}
                 */
                assertUndefined: function() {
                    isDevelopment && forEachParameters(arguments, function(t, message_opt) {
                        if (!Types.isUndefined(t)) {
                            throw new AssertException('Assert.assertUndefined(T.. t, String message_opt) fail, because t is \'{}\' - [{}]', Types.get(t), message_opt);
                        }
                    });
                },
                /**
                 * for assert defined of input (any type) parameters   
                 *
                 * example >>
                 * -------------------------------------------------------------------------
                 * Assert.assertDefined(99, 'not Defined');
                 * Assert.assertDefined(99, false, {}, 'not Defined');
                 *
                 * Assert.assertDefined(null || undefined, 'not Defined'); //will throw AssertException
                 * -------------------------------------------------------------------------
                 *
                 * @param {T...} t
                 * @param {String} message_opt - optional
                 *
                 * @throws {AssertException}
                 */
                assertDefined: function() {
                    isDevelopment && forEachParameters(arguments, function(t, message_opt) {
                        if (Types.isUndefined(t) || t === null) {
                            throw new AssertException('Assert.assertDefined(T.. t, String message_opt) fail, because t is \'{}\' - [{}]', Types.get(t), message_opt);
                        }
                    });
                },
                /**
                 * for assert array of input (any type) parameters   
                 *
                 * example >>
                 * -------------------------------------------------------------------------
                 * Assert.assertArray([], 'not Array');
                 * Assert.assertArray([], [1, 2], [99], 'not Array');
                 *
                 * Assert.assertArray(4, 'not Array'); //will throw AssertException
                 * -------------------------------------------------------------------------
                 *
                 * @param {T...} t
                 * @param {String} message_opt - optional
                 *
                 * @throws {AssertException}
                 */
                assertArray: function() {
                    isDevelopment && forEachParameters(arguments, function(t, message_opt) {
                        if (!Types.isArray(t)) {
                            throw new AssertException('Assert.assertArray(T.. t, String message_opt) fail, because t is \'{}\' - [{}]', Types.get(t), message_opt);
                        }
                    });
                },
                /**
                 * for assert array [optional] of input (any type) parameters   
                 *
                 * example >>
                 * -------------------------------------------------------------------------
                 * Assert.assertArrayOptional([], 'not Array');
                 * Assert.assertArrayOptional(undefined, [1, 2], null, 'not Array');
                 *
                 * Assert.assertArrayOptional(4, 'not Array'); //will throw AssertException
                 * -------------------------------------------------------------------------
                 *
                 * @param {T...} t
                 * @param {String} message_opt - optional
                 *
                 * @throws {AssertException}
                 */
                assertArrayOptional: function() {
                    isDevelopment && forEachParameters(arguments, function(t, message_opt) {
                        if (Types.isDefined(t) && !Types.isArray(t)) {
                            throw new AssertException('Assert.assertArrayOptional(T.. t, String message_opt) fail, because t is \'{}\' - [{}]', Types.get(t), message_opt);
                        }
                    });
                },
                /**
                 * for assert regular expression of input (any type) parameters   
                 *
                 * example >>
                 * -------------------------------------------------------------------------
                 * Assert.assertRegExp(/i/g, 'not Rexgular Expression');
                 * Assert.assertRegExp(/\s+/, /\W+/ig, 'not Rexgular Expression');
                 *
                 * Assert.assertRegExp(4, 'not Rexgular Expression'); //will throw AssertException
                 * -------------------------------------------------------------------------
                 *
                 * @param {T...} t
                 * @param {String} message_opt - optional
                 *
                 * @throws {AssertException}
                 */
                assertRegExp: function() {
                    isDevelopment && forEachParameters(arguments, function(t, message_opt) {
                        if (!Types.isRegExp(t)) {
                            throw new AssertException('Assert.assertRegExp(T.. t, String message_opt) fail, because t is \'{}\' - [{}]', Types.get(t), message_opt);
                        }
                    });
                },
                /**
                 * for assert regular expression [optional] of input (any type) parameters   
                 *
                 * example >>
                 * -------------------------------------------------------------------------
                 * Assert.assertRegExpOptional(/i/g, 'not Rexgular Expression');
                 * Assert.assertRegExpOptional(null || undefined, /\W+/ig, 'not Rexgular Expression');
                 *
                 * Assert.assertRegExpOptional(4, 'not Rexgular Expression'); //will throw AssertException
                 * -------------------------------------------------------------------------
                 *
                 * @param {T...} t
                 * @param {String} message_opt - optional
                 *
                 * @throws {AssertException}
                 */
                assertRegExpOptional: function() {
                    isDevelopment && forEachParameters(arguments, function(t, message_opt) {
                        if (Types.isDefined(t) && !Types.isRegExp(t)) {
                            throw new AssertException('Assert.assertRegExpOptional(T.. t, String message_opt) fail, because t is \'{}\' - [{}]', Types.get(t), message_opt);
                        }
                    });
                },
                /**
                 * for assert classs of input (any type) parameters   
                 *
                 * example >>
                 * -------------------------------------------------------------------------
                 * Assert.assertClass(Class.define('MyClass', {}), 'not Class');
                 *
                 * Assert.assertClass('bar', 'not Class'); //will throw AssertException
                 * -------------------------------------------------------------------------
                 *
                 * @param {T...} t
                 * @param {String} message_opt - optional
                 *
                 * @throws {AssertException}
                 */
                assertClass: function() {
                    isDevelopment && forEachParameters(arguments, function(t, message_opt) {
                        if (!Types.isClass(t)) {
                            throw new AssertException('Assert.assertClass(T.. t, String message_opt) fail, because t is \'{}\' - [{}]', Types.get(t), message_opt);
                        }
                    });
                },
                /**
                 * for assert classs of input (any type) parameters   
                 *
                 * example >>
                 * -------------------------------------------------------------------------
                 * Assert.assertClassOptional(Class.define('MyClass', {}), null, 'not Class');
                 *
                 * Assert.assertClassOptional('bar', 'not Class'); //will throw AssertException
                 * -------------------------------------------------------------------------
                 *
                 * @param {T...} t
                 * @param {String} message_opt - optional
                 *
                 * @throws {AssertException}
                 */
                assertClassOptional: function() {
                    isDevelopment && forEachParameters(arguments, function(t, message_opt) {
                        if (Types.isDefined(t) && !Types.isClass(t)) {
                            throw new AssertException('Assert.assertClassOptional(T.. t, String message_opt) fail, because t is \'{}\' - [{}]', Types.get(t), message_opt);
                        }
                    });
                },
                /**
                 * for assert multiple type by context object  
                 *
                 * example >>
                 * -------------------------------------------------------------------------
                 * Assert.assert({
                 *     'Boolean' : false,    
                 *     'Number' : 2,
                 *     'String' 'hello'
                 * }, 'assert fail');
                 * -------------------------------------------------------------------------
                 *
                 * @param {Object} object
                 * @param {String} message_opt - optional
                 *
                 * @throws {IllegalArgumentException} - invalid input type parameters
                 * @throws {MethodNotFoundException} - not found assert method
                 * @throws {AssertException}
                 */
                assert: function(object, message_opt) {
                    if (!Types.isObject(object)) {
                        throw new IllegalArgumentException('Invalid input type parameters,  {}.assert(Object object, String message_opt).', module.id);
                    }

                    Object.forEachProperty(object, function(assrt, type) {
                        var method = Assert['assert' + type];
                        if (Types.isUndefined(method)) {
                            throw new MethodNotFoundException('Assert method assert{}() not found, {}.assert(Object object, String message_opt).', type, module.id);
                        }

                        if (Types.isArray(assrt)) {
                            method.apply(this, assrt.concat([message_opt]));
                        } else {
                            method.call(this, assrt, message_opt);
                        }
                    });
                }
            }
        };
    })());



    return Assert;
});