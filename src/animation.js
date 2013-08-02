/**
 * @param {Array} frames list of Frame objects
 * @returns {Animation}
 */function Animation(frames) {
    this.frames = frames
    
    this.currpause = this.frames[0].pause;
    this.currframe = 0;
}
/**
 * @brief called on each turn of engine.tick()
 * @returns {Boolean} whether or not a frame change has occurred
 */
Animation.prototype.tick = function() {
//    console.log(JSON.stringify(this.frames));
    if (this.currpause-- <= 0) {
        this.currframe = (this.currframe + 1) % this.frames.length;
        this.currpause = this.frames[this.currframe].pause;
        return true;
    }
    return false;
};
Animation.prototype.getCurrentImage = function() {
    return this.frames[this.currframe].img;
};
Animation.prototype.getLastImage = function(){
    return this.frames[(this.currframe-1+this.frames.length)%this.frames.length].img;
}