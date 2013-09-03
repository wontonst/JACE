/**
 * @brief an object to be drawn onto the canvas
 * @param {int} initx initial starting position of the object
 * @param {int} inity initial starting position of the object
 * @param {int} layer order of rendering
 * @returns {Drawable}
 */
function Drawable(initx, inity, layer) {
    this.position = new Coordinates(initx, inity);
    if (typeof(layer) == 'undefined'){
        console.log("Drawable constructor's layer parameter cannot be undefined" + new Error().stack);
    }
    this.layer = layer;
}
/**
 * @brief called each tick of the engine
 */
Drawable.prototype.tick = function(deltaT) {
    console.log("ERROR: CALLING Drawable.tick WITHOUT USING INHERITANCE");
};
Drawable.prototype.draw = function() {
    console.log("ERROR: CALLING Drawable.draw WITHOUT USING INHERITANCE");
};