
function Drawable(initx, inity) {
    this.position = new Coordinates(initx, inity);
}
Drawable.prototype.tick = function() {
    console.log("ERROR: CALLING Drawable.tick WITHOUT USING INHERITANCE");
};
