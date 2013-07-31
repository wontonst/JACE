var resources = {
    files: {},
    load: function(id, path) {
        this.done = false;
        this.files[id] = {};
        this.files[id]['loaded'] = false;
        this.files[id]['path'] = path;
        this.getJSON(path, id);
    },
    retrieve: function(id) {
        return this.files[id]['value'];
    },
    getJSON: function(url, id) {
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
                resources.files.id.value = xmlhttp.responseText;
                resources.files.id.loaded = true;
            }
        };
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    },
    doneLoading: function() {
	console.log(JSON.stringify(this.files));
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
 * 
 * @param {List<obj>} keyframearray each object is a TexturePacker JSON output entry
 * @param {List<int>} keyframewait each int represents time to display frame in milliseconds
 * @param {string} img image
 * @returns {Animation}
 */function Animation(keyframearray, keyframewait, img) {
    if (keyframearray.length !== keyframewait.length) {
        throw "Animation: keyframearray.length != keyframewait.length";
    }
    this.frames = [];
    this.pauses = [];
    this.img = img;
    //determine number of ticks to wait
    for (var i = 0; i < keyframewait.length; i++) {
        this.pauses.push((int)(keyframewait[i] / engine.tickrate));
    }
    //push each individual animation frame
    for (var i = 0; i < keyframearray.length; i++) {
        this.frames.push(new TPImage(img, keyframearray[i].frame.x, keyframearray[i].frame.y, keyframearray[i].frame.w, keyframearray[i].frame.h));
    }
    this.currpause = this.pauses[0];
    this.currframe = 0;
}
/**
 * @brief called on each turn of engine.tick()
 * @returns {Boolean} whether or not a frame change has occurred
 */
Animation.prototype.tick = function() {
    if (this.currpause-- <= 0) {
        this.currframe = (this.currframe + 1) % this.frames.length;
        this.currpause = this.pauses[this.currframe];
        return true;
    }
    return false;
};
Animation.prototype.getCurrentImage = function() {
    return this.frames[this.currframe];
};function AtlasImage(img, atlasx, atlasy, iwidth, iheight) {
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
};
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
    resourceOnload: function(r) {
        console.log(r + " successfully loaded.");
    },
    tick: function() {
        console.log("tick");
        engine.context.clearRect(0, 0, engine.width, engine.height);
        for (var i = 0; i < engine.objects.length; i++) {
            engine.objects[i].tick();
        }
    },
    /**
     * @brief constructor for Drawable
     * @param {AtlasImage} aimage 
     */
    draw: function(aimage) {
        console.log(this.atlas.atlasx + "," + this.atlas.atlasy + ","
                + this.atlas.imgwidth + "," + this.atlas.imgheight + ","
                + this.getNextX() + "," + this.getNextY() + "," +
                this.atlast.imgwidth + "," + this.atlast.imgheight);

        engine.context.drawImage(aimage.img,
                aimage.atlas.atlasx, aimage.atlas.atlasy,
                aimage.atlas.imgwidth, aimage.atlas.imgheight,
                this.position.x, this.position.y,
                aimage.atlas.imgwidth, aimage.atlas.imgheight);
    }
};
//HORRIBEL HACK WTF FML

