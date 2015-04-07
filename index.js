var _ = require("hr.utils");
var Class = require("hr.class");

var Logger = Class.extend({
    defaults: {
        namespace: "app",
        handler: console,
        level: "log"
    },

    initialize: function() {
        _.each(Logger.levels, function(level, tag) {
            this.addMethod(tag);
        }, this);
        return this;
    },

    /*
     *  Print informations
     *  @type : debug, error, warning
     *  @*args : data to be log
     */
    printLog: function(type) {
        var args = Array.prototype.slice.call(arguments, 1);

        if (this.logLevel(type) < this.logLevel(this.options.level)) {
            return this;
        }
        args.splice(0, 0, "[" + this.options.namespace + "] [" + type + "]");
        var logMethod = Function.prototype.bind.call(this.options.handler[type], this.options.handler);
        logMethod.apply(null, args);
    },

    /*
     *  Add log method
     *  @type for the log method
     */
    addMethod: function(type) {
        var name = type;
        this[type] = _.bind(function() {
            var args = Array.prototype.slice.call(arguments, 0);
            args.splice(0, 0, type);
            return this.printLog.apply(this, args);
        }, this);
        return this[type];
    },

    /*
     *  Return log level for a log type
     *  @type : debug, error, warning
     *  @return : 0, 1, 2
     */
    logLevel: function(type) {
        return Logger.levels[type] || 0;
    },

    /*
     *  Load and exception
     */
    exception: function(err, message) {
        this.error(message, err.stack);
        this.error(err);
    }
}, {
    levels: {
        "log": 0,
        "debug": 1,
        "warn": 2,
        "error": 3,
        "none": 4
    }
});

module.exports = function(namespace) {
    return new Logger({
        namespace: namespace
    });
};

