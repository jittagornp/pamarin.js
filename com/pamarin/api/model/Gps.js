/**
 * @author jittagorn pitakmetagoon
 * create 08/06/2014
 */
define('com.pamarin.api.model.Gps', [
    'module',
    'com.pamarin.core.lang.Class'
], function(module, Class) {

    /**
     * @class Gps
     * @model
     */
    var Gps = Class.define(module.id, {
        /**/
        variable: {
            latitude_: -1,
            longitude_: -1
        },
        /**/
        constructor: function(lat, lnt) {
            this.latitude_ = lat || -1;
            this.longitude_ = lnt || -1;
        },
        /**
         * @returns {Number}
         */
        getLatitude: function() {
            return this.latitude_;
        },
        /**
         * @param {Number} lat
         */
        setLatitude: function(lat) {
            this.latitude_ = lat;
        },
        /**
         * @returns {Number}
         */
        getLongitude: function() {
            return this.longitude_;
        },
        /**
         * @param {Number} lnt 
         */
        setLongitude: function(lnt) {
            this.longitude_ = lnt;
        },
        /**/
        equals: function(obj) {
            if (!(obj instanceof Gps)) {
                return false;
            }

            return obj.getLatitude() === this.getLatitude()
                    && obj.getLongitude() === this.getLongitude();
        },
        /**
         * @override
         * 
         * @returns {String}
         */
        toString: function() {
            return 'Gps {' + this.getLatitude() + ', ' + this.getLongitude() + '}';
        }
    });



    return Gps;
});