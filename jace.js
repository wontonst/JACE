var resources = {
    files: {},
    add: function(id, path) {
        this.done = false;
        this.files[id] = {};
        this.files[id]['loaded'] = false;
        this.files[id]['path'] = path;
    },
    loadAll: function(callback) {
        for (var id in this.files) {
            this.getJSON(this.files[id]['path'], id, callback);
        }
    },
    retrieve: function(id) {
        return this.files[id]['value'];
    },
    onload: function(name) {
        console.log("loaded " + name);
    },
    getJSON: function(url, id, callback) {
        var xmlhttp;
        if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        }
        else {// code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function()
        {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                resources.onload(resources.files[id]['path']);
                resources.files[id]['value'] = xmlhttp.responseText;
                resources.files[id]['loaded'] = true;
                if (resources.doneLoading()) {
                    callback();
                }
            }
        };
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    },
    doneLoading: function() {
        for (var d in this.files) {
            if (!this.files[d]['loaded'])
                return false;
        }
        return true;
    }
};
function Drawable(initx, inity) {
    this.position = new Coordinates(initx, inity);
}
Drawable.prototype.tick = function() {
    console.log("ERROR: CALLING Drawable.tick WITHOUT USING INHERITANCE");
};
/**
@param {AtlasImage} img
@param {int} pause milliseconds to display the frame
*/
function Frame(img, pause) {
    this.img = img;
    this.pause = Math.round(pause / engine.tickrate);
//    console.log(engine.tickrate + " " + pause+ " "  +this.pause);
}/**
 * @param {Array} frames list of Frame objects
 * @returns {Animation}
 */function Animation(frames) {
    this.frames = frames
    
    this.currpause = this.frames[0].pause;
    this.currframe = 0;
}
/**
 * @brief called on each turn of engine.tick()
 * @returns {Boolean} whether or not a frame change has occurred
 */
Animation.prototype.tick = function() {
//    console.log(JSON.stringify(this.frames));
    if (this.currpause-- <= 0) {
        this.currframe = (this.currframe + 1) % this.frames.length;
        this.currpause = this.frames[this.currframe].pause;
        return true;
    }
    return false;
};
Animation.prototype.getCurrentImage = function() {
    return this.frames[this.currframe].img;
};
Animation.prototype.getLastImage = function(){
    return this.frames[(this.currframe-1+this.frames.length)%this.frames.length].img;
}/**
@param {Image} img
*/
function AtlasImage(img, atlasx, atlasy, iwidth, iheight) {
    this.atlas = new AtlasDefinition(atlasx, atlasy, iwidth, iheight);
    this.img = img;
}function AtlasDefinition(atlasx, atlasy, iwidth, iheight) {
    this.atlasx = atlasx;
    this.atlasy = atlasy;
    this.imgwidth = iwidth;
    this.imgheight = iheight;
}function Coordinates(x, y) {
    this.x = x;
    this.y = y;
}
Coordinates.prototype.move = function(x,y){
    this.x += x;
    this.y += y;
};window.performance = window.performance || {};
performance.now = (function() {
  return performance.now       ||
         performance.mozNow    ||
         performance.msNow     ||
         performance.oNow      ||
         performance.webkitNow ||
        function() { return new Date().getTime(); };
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
    draw: function(aimage,x,y) {
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

