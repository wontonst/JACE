/**
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
