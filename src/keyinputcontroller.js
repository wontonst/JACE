function KeyInputController(keystolistenfor) {
    this.keys = keystolistenfor;
    engine.canvas.addEventListener('keydown', this.handleKeyDown);
    engine.canvas.addEventListener('keyup', this.handleKeyUp);
}
KeyInputController.prototype.getKeyState = function(keyID) {
    if (!this.keys[keyID]) {
        throw "KeyInputController could not find key with ID " + keyID;
    }
    return this.keys[keyID].presstime;
};
KeyInputController.prototype.handleKeyDown = function(event) {
    if (this.keys[event.keyID]) {
        this.keys[event.keyID].presstime = window.performance.now();
    }
};
KeyInputController.prototype.handleKeyUp = function(event) {
    if (this.keys[event.keyID]) {
        this.keys[event.keyID].presstime = 0;
    }
};