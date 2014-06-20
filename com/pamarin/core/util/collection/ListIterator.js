/**
 * @author jittagorn pitakmetagoon
 * create 01/06/2014
 */
define('com.pamarin.core.util.collection.ListIterator', [
    'module',
    'com.pamarin.core.lang.Class',
    'com.pamarin.core.util.collection.Iterator'
], function(module, Class, Iterator) {

    /**
     * @class ListIterator
     * @implements Iterator
     */
    var ListIterator = Class.define(module.id, {
        /**/
        variable: {
            list_: null, //com.pamarin.core.util.collection.List
            position_: 0,
            calledNext_: false
        },
        /**/
        constructor: function(list) {
            this.list_ = list;
        },
        /**
         * @returns {Boolean}
         */
        hasNext: function() {
            this.calledNext_ = false;
            return this.position_ < this.list_.size();
        },
        /**
         * @returns {T}
         */
        next: function() {
            this.calledNext_ = true;
            return this.list_.get(this.position_++);
        },
        /**/
        remove: function() {
            if (this.calledNext_) {
                --this.position_;
            }

            this.list_.remove(this.position_);
        }
    }).implements(Iterator);



    return ListIterator;
});