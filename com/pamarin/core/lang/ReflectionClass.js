/**
 * @author jittagorn pitakmetagoon
 * cteate 09/11/2013
 */
define('com.pamarin.core.lang.ReflectionClass', [
    'com.pamarin.core.lang.Object'
], function(Object) {

    /**
     * @class ReflectionClass
     */
    var ReflectionClass = function(name) {
        this.name_ = name || '';
        this.class_ = false;
        this.interfaces_ = null;
        this.abstractMethods_ = null;
        this.annotations_ = null;
    };

    /**
     * ReflectionClass extends an Object
     */
    ReflectionClass.prototype = new Object();

    /**
     * set full class name, class name include package name 
     * 
     * @param {String} name
     * @returns {ReflectionClass} ReflectionClass current instance
     */
    ReflectionClass.prototype.setName = function(name) {
        this.name_ = name;
        return this;
    };

    /**
     * get full class name, class name include package name 
     * 
     * @returns {String} full class name
     */
    ReflectionClass.prototype.getName = function() {
        return this.name_;
    };

    /**
     * get class name only, not include package name 
     * 
     * @returns {String} simpleName 
     */
    ReflectionClass.prototype.getSimpleName = function() {
        return this.name_.split('.').pop();
    };

    /**
     * for detect class is class
     * 
     * @returns {Boolean}
     */
    ReflectionClass.prototype.isClass = function() {
        return this.class_;
    };

    /**
     * for detect class is interface
     * 
     * @returns {Boolean}
     */
    ReflectionClass.prototype.isInterface = function() {
        return !this.class_;
    };

    /**
     * identify class is Class
     * 
     * @param {Boolean} clazz
     * @returns {ReflectionClass} ReflectionClass current instance
     */
    ReflectionClass.prototype.setClass = function(clazz) {
        this.class_ = clazz;
        return this;
    };

    /**
     * get interfaces name
     * 
     * @returns {Array} array of String
     */
    ReflectionClass.prototype.getInterfaces = function() {
        if (this.interfaces_ === null) {
            this.interfaces_ = [];
        }

        return this.interfaces_;
    };

    ReflectionClass.prototype.setInterfaces = function(interfaces) {
        this.interfaces_ = interfaces;
        return this;
    };

    /**
     * for get abstract methods name 
     * 
     * @returns {Array} array of String 
     */
    ReflectionClass.prototype.getAbstractMethods = function() {
        if (this.abstractMethods_ === null) {
            this.abstractMethods_ = [];
        }

        return this.abstractMethods_;
    };

    /**
     * for set abstract methods name 
     * 
     * @param {Array} methods
     * @returns {ReflectionClass} ReflectionClass current instance
     */
    ReflectionClass.prototype.setAbstractMethods = function(methods) {
        this.abstractMethods_ = methods;
        return this;
    };

    /**
     * for add abstract method name 
     * 
     * @param {String} method
     * @returns {ReflectionClass} ReflectionClass current instance
     */
    ReflectionClass.prototype.addAbstractMethod = function(method) {
        this.getAbstractMethods().push(method);
        return this;
    };

    /**
     * for detect class is abstrct
     * 
     * @returns {Boolean}
     */
    ReflectionClass.prototype.isAbstract = function() {
        return (this.abstractMethods_ && this.abstractMethods_.length > 0);
    };


    ReflectionClass.prototype.getAnotations = function() {
        if (this.annotations_ === null) {
            this.annotations_ = [];
        }

        return this.annotations_;
    };

    ReflectionClass.prototype.setAnotations = function(annotations) {
        this.annotations_ = annotations;
        return this;
    };


    return ReflectionClass;
});