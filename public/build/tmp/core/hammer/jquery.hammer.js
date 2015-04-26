define("js/cmd/core/hammer/jquery.hammer", [ "hammer" ], function(require, exports, module) {
    return function($) {
        var Hammer = require("hammer");
        function hammerify(el, options) {
            var $el = $(el);
            if (!$el.data("hammer")) {
                $el.data("hammer", new Hammer($el[0], options));
            }
        }
        $.fn.hammer = function(options) {
            return this.each(function() {
                hammerify(this, options);
            });
        };
        // extend the emit method to also trigger jQuery events
        Hammer.Manager.prototype.emit = function(originalEmit) {
            return function(type, data) {
                originalEmit.call(this, type, data);
                $(this.element).trigger({
                    type: type,
                    gesture: data
                });
            };
        }(Hammer.Manager.prototype.emit);
    };
});
