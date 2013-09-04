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