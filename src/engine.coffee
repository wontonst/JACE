`window.performance = window.performance || {};
performance.now = (function() {
    return performance.now ||
            performance.mozNow ||
            performance.msNow ||
            performance.oNow ||
            performance.webkitNow ||
            function() {
                return new Date().getTime();
            };
})();`

class Engine
    /**
     * @brief constructor for the engine
     * @param {string} id id of the canvas element
     * @param {int} tr refresh rate in ms
     * @param {int} fr frame rate in FPS
     * @param {int} h height of the canvas
     * @param {int} w width of the canvas
     * @returns {undefined}
     */
constructor: (id, @tickrate, fr, @width, @height) ->
@framerate = 1000/fr
@canvas = `document.getElementById(id)`
@context = @canvas.getContext('2d')
@canvas.setAttribute('tabindex','0')
@canvas.focus()
@renderer = new Renderer()
@objects = []

start: () ->
@tickthread = `setInterval('engine.tick()', this.tickrate)`
@renderthread = `setInterval('engine.draw()', this.framerate)`

stop: () ->
`clearInterval(tickthread);
        clearInterval(this.renderthread);`

addDrawable: (nd) ->
@objects[] = nd
@renderer.add(nd)

    addDrawable: function(nd) {
	this.objects.push(nd);
        this.renderer.add(nd);
    },
    tick: function() {
var t = window.performance.now() - this.lasttime;
console.log("deltaT:"+t);
this.lasttime = window.performance.now();
        for (var i = 0; i < engine.objects.length; i++) {
            engine.objects[i].tick(t);
        }
    },
lasttime:0,
    draw: function() {
        this.renderer.render();
    },
    drawdebug: function(aimage, x, y) {
        console.log("draw operation: " + aimage.img.src + " - atlas(" + aimage.atlas.atlasx + "," + aimage.atlas.atlasy + ") height("
                + aimage.atlas.imgwidth + "," + aimage.atlas.imgheight + ") position("
                + x + "," + y + ")");

    }
};

