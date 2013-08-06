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
    tickthread: '', ///<ID of the thread used for tick()
    renderthread: '', ///<ID of the thread used for draw()
    renderer: '',
    objects:[],///<list of drawables
    /**
     * @brief constructor for the engine
     * @param {string} id id of the canvas element
     * @param {int} tr refresh rate in ms
     * @param {int} fr frame rate in FPS
     * @param {int} h height of the canvas
     * @param {int} w width of the canvas
     * @returns {undefined}
     */
    Engine: function(id, tr, fr, w, h) {
        this.tickrate = tr;
        this.framerate = 1000 / fr;
        this.canvas = document.getElementById(id);
        this.height = h;
        this.width = w;
        this.canvas.height = this.height;
        this.canvas.width = this.width;
        this.context = this.canvas.getContext('2d');
        this.canvas.setAttribute('tabindex', '0');
        this.canvas.focus();
        this.renderer = new Renderer();
    },
    start: function() {
        this.tickthread = setInterval('engine.tick()', this.tickrate);
        this.renderthread = setInterval('engine.draw()', this.framerate);
    },
    stop: function() {
        clearInterval(tickthread);
        clearInterval(this.renderthread);
    },
    addDrawable: function(nd) {
	this.objects.push(nd);
        this.renderer.add(nd);
    },
    tick: function() {
        for (var i = 0; i < engine.objects.length; i++) {
            engine.objects[i].tick();
        }
    },
    draw: function() {
        this.renderer.render();
    },
    drawdebug: function(aimage, x, y) {
        console.log("draw operation: " + aimage.img.src + " - atlas(" + aimage.atlas.atlasx + "," + aimage.atlas.atlasy + ") height("
                + aimage.atlas.imgwidth + "," + aimage.atlas.imgheight + ") position("
                + x + "," + y + ")");

    }
};

