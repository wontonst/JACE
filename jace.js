var resources = {
    files: {}, ///<list of files to be loaded
    /**
     * @brief adds a file to be loaded
     * @param {string} id used to identify the file
     * @param {string} path path used to locate and load the file
     */
    add: function(id, path) {
        this.done = false;
        this.files[id] = {};
        this.files[id]['loaded'] = false;
        this.files[id]['path'] = path;
    },
    /**
     * @brief loads all files at once and runs the callback function
     * @param {function} callback function to be run after all loading is complete
     */
    loadAll: function(callback) {
        for (var id in this.files) {
            this.getJSON(this.files[id]['path'], id, callback);
        }
    },
    /**
     * @brief returns the file associated with the id
     * @param {type} id retrieves file with associated id
     * @throws {exception} if file is not loaded yet
     * @returns {string} file attached to id
     */
    retrieve: function(id) {
        if (!this.files[id]['loaded'])
            throw "cannot resources.retrieve(" + id + ") without doing resources.loadAll() first";
        return this.files[id]['value'];
    },
    /**
     * @brief utility function used to unify debug output for resource load
     * @param {string} name resource name
     */
    onload: function(name) {
        console.log("loaded " + name);
    },
    /**
     * @brief preforms an AJAX call
     * @param {string} url URL path to load from
     * @param {string} id resource id being loaded
     * @param {function} callback function to call when all files have been loaded
     */
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
    /**
     * @brief checks if all files have been loaded
     * @returns {Boolean}
     */
    doneLoading: function() {
        for (var d in this.files) {
            if (!this.files[d]['loaded'])
                return false;
        }
        return true;
    }
};function KeyPress(key){
    this.key = key;
    this.presstime = 0;
}/**
 * @brief an object to be drawn onto the canvas
 * @param {int} initx initial starting position of the object
 * @param {int} inity initial starting position of the object
 * @returns {Drawable}
 */
function Drawable(initx, inity) {
    this.position = new Coordinates(initx, inity);
}
/**
 * @brief called each tick of the engine
 */
Drawable.prototype.tick = function() {
    console.log("ERROR: CALLING Drawable.tick WITHOUT USING INHERITANCE");
};
Drawable.prototype.draw = function(){
    console.log("ERROR: CALLING Drawable.draw WITHOUT USING INHERITANCE");
}/**
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
     this.frames = frames;
    this.reset();
}
/**
 * @brief called on each turn of engine.tick()
 * @returns {Boolean} whether or not a frame change has occurred
 */
Animation.prototype.tick = function() {
//    console.log(JSON.stringify(this.frames));
    if(!this.playing)return;
    if (this.currpause-- <= 0) {
	if(++this.currframe == this.frames.length){
	    this.reset();
	    return true;}
        this.currpause = this.frames[this.currframe].pause;
        return true;
    }
    return false;
};
Animation.prototype.getCurrentImage = function() {
    return this.frames[this.currframe].img;
};
Animation.prototype.getLastImage = function() {
    return this.frames[(this.currframe - 1 + this.frames.length) % this.frames.length].img;
};
Animation.prototype.reset = function() {
    this.currpause = this.frames[0].pause;
    this.currframe = 0;
     this.playing = false;
};
Animation.prototype.isPlaying = function(){
    return this.playing;
}
Animation.prototype.play = function(){
    this.playing = true;
}/**
 * @brief defines an image within an atlas
 * @param {Image} img raw image 
 * @param {int} atlasx image x-position on atlas
 * @param {iint} atlasy image y-position on atlas
 * @param {int} iwidth image width
 * @param {int} iheight image height
 * @returns {AtlasImage}
 */
function AtlasImage(img, atlasx, atlasy, iwidth, iheight) {
    this.atlas = new AtlasDefinition(atlasx, atlasy, iwidth, iheight);
    this.img = img;
    this.center = new Coordinates(iwidth / 2, iheight / 2);
}
AtlasImage.prototype.draw = function(x, y) {
    engine.drawdebug(this,x,y);
    engine.context.drawImage(this.img,
            this.atlas.atlasx, this.atlas.atlasy,
            this.atlas.imgwidth, this.atlas.imgheight,
            x - this.center.x, y-this.center.y,
            this.atlas.imgwidth, this.atlas.imgheight);
};
AtlasImage.prototype.clear = function(x,y){
    engine.context.clearRect(x-this.center.x,y-this.center.y, this.atlas.imgwidth, this.atlas.imgheight);
}/**
 *  @brief class used to define the position of an image within an atlas
 * @param {int} atlasx image x-position on atlas
 * @param {iint} atlasy image y-position on atlas
 * @param {int} iwidth image width
 * @param {int} iheight image height
 * @returns {AtlasDefinition}
 */function AtlasDefinition(atlasx, atlasy, iwidth, iheight) {
    this.atlasx = atlasx;
    this.atlasy = atlasy;
    this.imgwidth = iwidth;
    this.imgheight = iheight;
}function Coordinates(x, y) {
    this.x = x;
    this.y = y;
}
Coordinates.prototype.move = function(x, y) {
    this.x += x;
    this.y += y;
};window.performance = window.performance || {};
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
    Engine: function(id, tr, w,h) {
        this.tickrate = tr;
        this.canvas = document.getElementById(id);
        this.height = h;
        this.width = w;
        this.canvas.height = this.height;
        this.canvas.width = this.width;
        this.context = this.canvas.getContext('2d');
	this.canvas.setAttribute('tabindex','0');
	this.canvas.focus();
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
//        console.log("tick " + window.performance.now());
//        engine.context.clearRect(0, 0, engine.width, engine.height);
        for (var i = 0; i < engine.objects.length; i++) {
            engine.objects[i].tick();
        }
    },
    drawdebug: function(aimage,x,y){
        console.log("draw operation: " + aimage.img.src + " - atlas(" + aimage.atlas.atlasx + "," + aimage.atlas.atlasy + ") height("
                + aimage.atlas.imgwidth + "," + aimage.atlas.imgheight + ") position("
                + x + "," + y +")");

    }
            /*
             * @brief force draw onto canvas
             * @param {AtlasImage} aimage
             * @param {int} x x-coordinate to draw on
             * @param {int} y y-coordinate to draw on
             
    draw: function(aimage, x, y) {

        engine.context.drawImage(aimage.img,
                aimage.atlas.atlasx, aimage.atlas.atlasy,
                aimage.atlas.imgwidth, aimage.atlas.imgheight,
                x, y,
                aimage.atlas.imgwidth, aimage.atlas.imgheight);
    }*/
};

/**
 * @brief keeps track of a list of keys to listen for and updates it with keypress status
 * @param {KeyPress} keystolistenfor list of keys to keep track of
 * @returns {KeyInputController}
 */
function KeyInputController(keystolistenfor) {
    this.keys = keystolistenfor;
}
/**
 * @brief given a javascript key ID, returns the current state of the key
 * @param {int} keyID
 * @returns {int} time of keypress or 0 if key is not pressed
 */
KeyInputController.prototype.getKeyState = function(keyID) {
    if (!this.keys[keyID]) {
        throw "KeyInputController could not find key with ID " + keyID;
    }
    return this.keys[keyID].presstime;
};
KeyInputController.prototype.handleKeyDown = function(event) {
//    console.log(event);
    if (typeof(this.keys[event.keyCode]) != 'undefined') {
        this.keys[event.keyCode].presstime = window.performance.now();
    }
};
KeyInputController.prototype.handleKeyUp = function(event) {
//    console.log(event);    
    if (this.keys[event.keyCode]) {
        this.keys[event.keyCode].presstime = 0;
    }
};
/**
 * @brief begins listening for key presses; listens to canvas only
 */
KeyInputController.prototype.startListener = function() {
//    console.log(JSON.stringify(engine.canvas));
    var self = this;
    this.kd = function(a) {
        self.handleKeyDown(a);
    };
    this.ku = function(a) {
        self.handleKeyUp(a);
    };
    engine.canvas.addEventListener('keydown', this.kd, false);
    engine.canvas.addEventListener('keyup', this.ku, false);
}