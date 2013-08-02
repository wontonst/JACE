function KeyInputController(keystolistenfor) {
    this.keys = keystolistenfor;
}
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
KeyInputController.prototype.startListener = function() {
//    console.log(JSON.stringify(engine.canvas));
    var self = this;
    this.kd = function(a) { self.handleKeyDown(a);};
    this.ku = function(a) { self.handleKeyUp(a);};
    engine.canvas.addEventListener('keydown', this.kd,false);
    engine.canvas.addEventListener('keyup', this.ku,false);
}