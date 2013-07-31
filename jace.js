function Coordinate(x, y) {
    this.x = x;
    this.y = y;
}
function AtlasDefinition(atlasx, atlasy, iwidth, iheight) {
    this.atlasx = atlasx;
    this.atlasy = atlasy;
    this.imgwidth = iwidth;
    this.imgheight = iheight;
}
function TPImage(img, atlasx, atlasy, iwidth, iheight) {
    this.atlas = new AtlasDefinition(atlasx, atlasy, iwidth, iheight);
    this.img = img;
}
function Drawable(atlasx, atlasy, iwidth, iheight, initx, inity) {
    this.atlas = new AtlasDefinition(atlasx, atlasy, iwidth, iheight);
    this.position = new Coordinate(initx, inity);
}
/**
 * 
 * @param {Canvas context} ctx 
 * @returns {undefined}
 */
Drawable.prototype.draw = function(ctx) {
    console.log(this.atlas.atlasx + "," + this.atlas.atlasy + ","
            + this.atlas.imgwidth + "," + this.atlas.imgheight + ","
            + this.getNextX() + "," + this.getNextY() + "," +
            this.atlast.imgwidth + "," + this.atlast.imgheight);

    engine.context.drawImage(this.getNextFrame(),
            this.atlas.atlasx, this.atlas.atlasy,
            this.atlas.imgwidth, this.atlas.imgheight,
            this.getNextX(), this.getNextY(),
            this.atlas.imgwidth, this.atlas.imgheight);
};
Drawable.prototype.getNextFrame = function() {
    console.log("ERROR: CALLING Drawable.getNextFrame WITHOUT USING INHERITANCE");
};
Drawable.prototype.getNextX = function() {
    console.log("ERROR: CALLING Drawable.getNextX WITHOUT USING INHERITANCE");
};
Drawable.prototype.getNextY = function() {
    console.log("ERROR: CALLING Drawable.getNextY WITHOUT USING INHERITANCE");
};
Drawable.prototype.tick = function() {
    console.log("ERROR: CALLING Drawable.tick WITHOUT USING INHERITANCE");
}
function Animation(keyframearray, fname) {
    this.frames = [];
    var img = new Image();
    img.onload = engine.resourceOnload(fname);
    img.src = fname;
    for (var i = 0; i < keyframearray.length; i++) {
        this.frames.push(new TPImage(img, keyframearray[i].frame.x, keyframearray[i].frame.y, keyframearray[i].frame.w, keyframearray[i].frame.h));
    }
    this.currframe = 0;
}
Animation.prototype.getNextFrame = function() {
    var d = this.frames[this.currframe].img;
    this.currframe = (this.currframe + 1) % this.frames.length;
    return d;
}
Animation.prototype.drawNext = function(x,y){
    var d = this.frames[this.currframe].img;
    engine.context.drawImage(d,this.frames[this.currframe].atlas.atlasx,this.frames[this.currframe].atlas.atlasy,this.frames[this.currframe].atlas.imgwidth,this.frames[this.currframe].atlas.imgheight,x,y,this.frames[this.currframe].atlas.imgwidth,this.frames[this.currframe].atlas.imgheight);
    this.currframe = (this.currframe + 1) % this.frames.length;

}
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
     * @param {int} h height of the canvas
     * @param {int} w width of the canvas
     * @returns {undefined}
     */
    Engine: function(id, h, w) {
        this.canvas = document.getElementById(id)
        this.height = h;
        this.width = w;
        this.canvas.height = this.height;
        this.canvas.width = this.width;
        this.context = this.canvas.getContext('2d');
    },
    start: function(speed) {
        setInterval('engine.tick()', speed);
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
    getJSON: function(url, funct)
    {
        var xmlhttp;
        if (window.XMLHttpRequest)
        {// code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        }
        else
        {// code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function()
        {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                funct(xmlhttp.responseText);
            }
        }
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    }
};
//HORRIBEL HACK WTF FML

