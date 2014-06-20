/**
 * asynchronous callback chain
 * 
 * @author jittagorn pitakmetagoon
 * create 05/03/2014
 * 
 * update 07/03/2014 (jittagorn pitakmetagoon : lazy done callback chain)
 * update 18/05/2014 (jittagorn pitakmetagoon : delay callback)
 */
define('com.pamarin.core.behavioral.Chain', [
    'module',
    'com.pamarin.core.lang.Class',
    'com.pamarin.core.lang.Array',
    'com.pamarin.core.util.Assert',
    'com.pamarin.core.util.Types',
    'com.pamarin.core.util.Delays'
], function(module, Class, Array, Assert, Types, Delays) {

    /**
     * @class Chain
     * 
     * problem >> callback hierarchy
     * -------------------------------------------------------------------------
     * doFuncA(null, function(a){
     * 	   doFuncB(a, function(b){
     *         doFuncC(b, function(c){
     *		   doFuncD(c, function(d){
     *		       doFuncE(d, function(e){
     *			   //do something...	
     *		       });
     *		   });
     *	       });
     *	   });
     * });
     * 
     * 
     * example >>
     * -------------------------------------------------------------------------
     * Chain.process(function(chain){
     *     chain.done();  //delay 3000 ms
     * }, 3000).then(function(chain, value){
     *
     *     chain.done(); //delay 3000 ms
     *
     *     console.log(1 + ':' + value);
     *     return 'first';
     *
     * }, false, 3000).then(function(value){
     *
     *     console.log(2 + ':' + value); 
     *     return 'secord';
     *
     * }).then(function(chain, value){
     *
     *     chain.done(); //delay 3000 ms
     *
     *     console.log(3 + ':' + value); 
     *     return 'third';
     *
     * }, false, 3000).then(function(value){
     *
     *     console.log(4 + ':' + value);
     * });
     * 
     * output >>
     * -------------------------------------------------------------------------
     * will delay 3000 ms (3 s) then show
     * 
     * 1:15 
     * 
     * ----- delay 3 s -----
     * 
     * 2:first 
     * 3:secord 
     * 
     * ----- delay 3 s -----
     * 
     * 4:third 
     * -------------------------------------------------------------------------
     */
    var Chain = Class.define(module.id, (function() {

        var slice = Array.prototype.slice;

        var delayProxy = function(callback, delay_opt) {
            return function() {
                Delays.run(callback, delay_opt || 0, this, arguments);
            };
        };

        return {
            /**
             * chain instance variable
             */
            variable: {
                callback_: null,
                result_: null
            },
            /**
             * @param {Function} callback
             * @param {Object} context_opt
             * @param {Boolean} lazy_opt
             * @param {Number} delay_opt
             * @returns {Chain}
             */
            then: function(callback) {
                var context_opt;
                var lazy_opt;
                var delay_opt;

                Array.forEachIndex(slice.call(arguments, 1), function(arg) {
                    if (Types.isObject(arg)) context_opt = arg;
                    else if (Types.isBoolean(arg)) lazy_opt = arg;
                    else if (Types.isNumber(arg)) delay_opt = arg;
                });

                Assert.assert({
                    Function: callback,
                    ObjectOptional: context_opt,
                    FalseOptional: lazy_opt,
                    NumberOptional: delay_opt
                }, module.id + '.then(Function callback, Object context_opt, Boolean lazy_opt, Number delay_opt)');

                var chain = new Chain();
                if (lazy_opt === false) {
                    chain.done = delayProxy(chain.done, delay_opt);
                    this.callback_ = function() {
                        var args = [chain].concat(slice.call(arguments));
                        chain.setResult(callback.apply(context_opt, args));
                    };
                } else {
                    this.callback_ = function() {
                        var result = callback.apply(context_opt, arguments);
                        Delays.run(chain.done, delay_opt || 0, chain, [result]);
                    };
                }

                return chain;
            },
            /**/
            setResult: function(result) {
                this.result_ = result;
            },
            /**/
            getResult : function(){
                return this.result_;
            },
            /**
             * for start chaining
             */
            done: function() {
                this.callback_ && this.callback_.apply(this, (this.result_ && [this.result_]) || arguments);
            },
            //
            static: {
                /**
                 * @param {Function} callback
                 * @param {Object} context_opt
                 * @param {Number} delay_opt
                 * @returns {Chain}
                 */
                process: function(callback) {
                    var context_opt;
                    var delay_opt;

                    Array.forEachIndex(slice.call(arguments, 1), function(arg) {
                        if (Types.isObject(arg)) context_opt = arg;
                        else if(Types.isNumber(arg))delay_opt = arg;
                    });

                    Assert.assert({
                        Function: callback,
                        ObjectOptional: context_opt
                    }, module.id + '.process(Function callback, Object context_opt, Number delay_opt)');

                    var chain = new Chain();
                    chain.done = delayProxy(chain.done, delay_opt);
                    var args = [chain].concat(slice.call(arguments));
                    chain.setResult(callback.apply(context_opt, args));

                    return chain;
                }
            }
        };
    })());



    return Chain;
});