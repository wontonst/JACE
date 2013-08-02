window.performance = window.performance || {};
performance.now = (function() {
    return performance.now ||
            performance.mozNow ||
            performance.msNow ||
            performance.oNow ||
            performance.webkitNow ||
            function() {
                return new Date().getTime();
            };
})();
var engine = {
    height: '', ///<height of canvas
    width: '', ///<width of canvas
    context: '', ///<canvas context
    canvas: '', ///<canvas to draw on
    objects: [], ///<list of Drawable objects
    thread: '', ///<ID of the thread used for clearInterval
    /**
     * @brief constructor for the engine
     * @param {string} id id of the canvas element
     * @param {int} tr refresh rate in ms
     * @param {int} h height of the canvas
     * @param {int} w width of the canvas
     * @returns {undefined}
     */
    Engine: function(id, tr, h, w) {
        this.tickrate = tr;
        this.canvas = document.getElementById(id);
        this.height = h;
        this.width = w;
        this.canvas.height = this.height;
        this.canvas.width = this.width;
        this.context = this.canvas.getContext('2d');
    },
    start: function() {
        setInterval('engine.tick()', this.tickrate);
    },
    stop: function() {
        clearInterval(thread);
    },
    addDrawable: function(nd) {
        this.objects.push(nd);
    },
    tick: function() {
        console.log("tick " + window.performance.now());
//        engine.context.clearRect(0, 0, engine.width, engine.height);
        for (var i = 0; i < engine.objects.length; i++) {
            engine.objects[i].tick();
        }
    },
    /**
     * @brief constructor for Drawable
     * @param {AtlasImage} aimage 
     */
    draw: function(aimage, x, y) {
        console.log("draw operation: " + aimage.atlas.atlasx + "," + aimage.atlas.atlasy + ","
                + aimage.atlas.imgwidth + "," + aimage.atlas.imgheight + ","
                + x + "," + y + "," +
                aimage.atlas.imgwidth + "," + aimage.atlas.imgheight);

        engine.context.drawImage(aimage.img,
                aimage.atlas.atlasx, aimage.atlas.atlasy,
                aimage.atlas.imgwidth, aimage.atlas.imgheight,
                x, y,
                aimage.atlas.imgwidth, aimage.atlas.imgheight);
    }
};

