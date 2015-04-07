var Logger = require("../");

describe('Logger', function() {
    it('should not fail', function() {
        var logger = Logger("test");
        logger.log("hello");
        logger.warn("world");
        logger.error("cool!");
    });
});

