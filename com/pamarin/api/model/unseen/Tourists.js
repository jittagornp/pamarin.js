/**
 * @author jittagorn pitakmetagoon
 * create 06/05/2014
 */
define('com.pamarin.api.model.unseen.Tourists', [
    'module',
    'com.pamarin.core.lang.Class'
], function(module, Class) {

    /**
     * @class Tourists
     * @model
     */
    var Tourists = Class.define(module.id, {
        /**/
        constant : {
            MAX_TOURIST : 18,
            NUMBER_OF_ROW : 6
        },
        /**/
        variable: {
            id_: null,
            totalTourist_: 0,
            tourists_: null
        },
        /**
         * @returns {String}
         */
        getId: function() {
            return this.id_;
        },
        /**
         * @param {String} id
         */
        setId: function(id) {
            this.id_ = id;
        },
        /**
         * @returns {Number}
         */
        getTotalTourist: function() {
            var size = this.getTourists().size();
            if(size === 0){
                this.totalTourist_ = size;
                return 0;
            }
            
            if(size < Tourists.constant('MAX_TOURIST') && this.totalTourist_ > size){
                this.totalTourist_ = size;
                return size;
            }
            
            return this.totalTourist_;
        },
        /**
         * @param {Number} total
         */
        setTotalTourist: function(total) {
            this.totalTourist_ = total;
        },
        /**
         * @returns {List<Tourist>}
         */
        getTourists: function() {
            return this.tourists_;
        },
        /**
         * @param {List<Tourist>} list
         */
        setTourists: function(list) {
            this.tourists_ = list;
        },
        /**
         * @param {Tourists} obj
         */
        equals: function(obj) {
            if (!(obj instanceof Tourists)) {
                return false;
            }

            if (this.id_ === obj.getId()) {
                return true;
            }

            return false;
        }
    });



    return Tourists;
});