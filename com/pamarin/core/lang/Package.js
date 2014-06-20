/**
 * for wrap AMD define (it's proxy of define)
 * 
 * @author jittagorn pitakmetagoon
 * create 22/02/2014
 * 
 * update 23/02/2014 (jittagorn pitakmetagoon : create name space when define pack)
 * 
 * example >>
 * -----------------------------------------------------------------------------
 * pack('com.pamarin.test.MyClass', [
 *      'module',
 *      'com.pamarin.core.lang.Class'
 * ], function(module, Class){
 * 
 *      //...
 * }, {
 *      before : function(){
 *          //call before module defined
 *      },
 *      
 *      filter : function(module){
 *          
 *          //do something
 *          
 *          return module;
 *      },
 *      
 *      after : function(){
 *          //call after module defined
 *      },
 *      
 *      error : function(e, id){
 *          //call when module has error
 *      }
 * })
 * 
 * //when use pack you can call window name space 
 * window.com.pamarin.test.MyClass
 * -----------------------------------------------------------------------------
 * 
 * @param {String} id
 * @param {Array<String>} dependencies
 * @param {Function} func
 * @param {Object} fil_opt - optional 
 */
window.pack = window.pack || (function(window, Object, define) {

    var slice = Array.prototype.slice;

    function is(data, type) {
        return Object.prototype.toString.call(data) === '[object ' + type + ']';
    }

    function isFunction(data) {
        return is(data, 'Function');
    }

    function isObject(data) {
        return is(data, 'Object');
    }

    function isUndefined(data) {
        return is(data, 'Undefined');
    }

    function split(string, separator) {
        var array = string.split(separator);
        var newArray = [];
        var length = array.length;
        for (var i = 0; i < length; i++) {
            (array[i] !== '') && newArray.push(array[i]);
        }

        return newArray;
    }

    function createNamespace(namespace, module) {
        var parent = window;
        var paths = split(namespace, '.');
        var last = paths.pop();
        var length = paths.length;

        for (var i = 0; i < length; i++) {
            if (isUndefined(parent[paths[i]])) {
                parent[paths[i]] = {};
            }
            
            parent = parent[paths[i]];
        }

        return parent[last] = module;
    }

    return function(id, dependencies, func, fil_opt) {
        
        //protect fil_opt is not defined
        fil_opt = isObject(fil_opt) ? fil_opt : {};
        fil_opt.before = isFunction(fil_opt.before) ? fil_opt.before : function(){};
        fil_opt.filter = isFunction(fil_opt.filter) ? fil_opt.filter : function(mod){ return mod; };
        fil_opt.after = isFunction(fil_opt.after) ? fil_opt.after : function(){};
        fil_opt.error = isFunction(fil_opt.error) ? fil_opt.error : function(){};

        var firstDep = dependencies[0];
        if(firstDep !== 'module'){
            dependencies = ['module'].concat(dependencies);
        }

        //define module pass proxy
        define.call(this, id, dependencies, function() {
            var module = undefined;

            try {
                //before proxy call
                //--------------------------------------------------------------
                //
                fil_opt.before.call(this);
                var deps = slice.call(arguments);
                this.module = deps.shift(); 
                
                module = fil_opt.filter.call(this, func.apply(this, deps));
                createNamespace(id, module);
                //
                //--------------------------------------------------------------
                //after proxy call
            } catch (e) {
                fil_opt.error.call(this, e, id);
            } finally {
                fil_opt.after.call(this);

                return module;
            }
        });
    };
}).call(this, window, Object, define);
