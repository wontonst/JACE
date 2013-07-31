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
};