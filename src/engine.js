
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
    getJSON: function(url, funct) {
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
                funct(xmlhttp.responseText);
            }
        }
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    }
};
//HORRIBEL HACK WTF FML

