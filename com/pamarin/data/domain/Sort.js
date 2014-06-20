/**
 * @author jittagorn pitakmetagoon
 * create 02/06/2014
 */
define('com.pamarin.data.domain.Sort', [
    'module',
    'com.pamarin.core.lang.Class',
    'com.pamarin.core.lang.Array',
    'com.pamarin.core.exception.IllegalArgumentException',
    'com.pamarin.core.util.collection.Collections',
    'com.pamarin.core.util.collection.ArrayList'
], function(module, Class, Array, IllegalArgumentException, Collections, ArrayList) {

    /**
     * @class Sort
     */
    var Sort = Class.define(module.id, (function() {

        var slice = Array.prototype.slice;

        /**
         * @enum Direction
         */
        var Direction = {
            ASC: 'ASENDING',
            DESC: 'DESENDING'
        };

        /**
         * @class Order
         */
        var Order = Class.define(module.id + '.Order', {
            /**/
            variable: {
                direction_: Direction.ASC,
                property_: null
            },
            /**
             * @param {Direction} direction
             * @param {String} property
             */
            constructor: function(direction, property) {
                this.direction_ = direction;
                this.property_ = property;
            },
            /**
             * @returns {String}
             */
            getProperty: function() {
                return this.property_;
            },
            /**
             * @returns {Direction}
             */
            getDirection: function() {
                return this.direction_;
            },
            /**
             * @returns {Boolean}
             */
            isAcsending: function() {
                return this.direction_ === Direction.ASC;
            }
        });

        return {
            /**/
            constant: {
                DEFAULT_DIRECTION: Direction.ASC
            },
            /**/
            variable: {
                orders_: null
            },
            /**
             * @param {Direction} direction
             * @param {String...} properties
             */
            constructor: function(direction, properties) {
                var props = properties instanceof ArrayList
                        ? properties.toArray()
                        : slice.call(arguments, 1);

                if (Collections.isEmpty(props)) {
                    throw new IllegalArgumentException('You have to provide at least one sort property to sort by!');
                }

                this.orders_ = new ArrayList();
                Array.forEachIndex(props, function(prop) {
                    this.orders_.add(new Order(direction, prop));
                }, this);
            },
            /**/
            static: {
                /**/
                Direction: Direction,
                Order: Order
            },
            /**
             * @returns {Iterator<Order>}
             */
            iterator: function() {
                return this.orders_.iterator();
            }
        };
    })());



    return Sort;
});