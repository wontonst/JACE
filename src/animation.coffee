
class Animation
/**
 * @param {Array} frames list of Frame objects
 * @returns {Animation}
 */
constructor: (@frames) ->
@reset()

/**
 * @brief called on each turn of engine.tick()
 * @returns {Boolean} whether or not a frame change has occurred
 */
tick: () ->
if(!this.playing)

if(this.currpause-- <= 0){
if(++this.currframe is this.frames.length){
@reset()
true
}
@currpause = this.frames[this.currframe].pause;
true
}
false
/*
Animation.prototype.getCurrentImage = function() {
    return this.frames[this.currframe].img;
};
Animation.prototype.getLastImage = function() {
    return this.frames[this.lastframe].img;
    //   return this.frames[(this.currframe - 1 + this.frames.length) % this.frames.length].img;
};
Animation.prototype.reset = function() {
    this.currpause = this.frames[0].pause;
    this.currframe = 0;
    this.playing = false;
    this.lastframe = 0;
};
Animation.prototype.isPlaying = function() {
    return this.playing;
};
Animation.prototype.play = function() {
    this.playing = true;
};
Animation.prototype.draw = function(x, y) {
    this.getLastImage().clear(x, y);
    this.getCurrentImage().draw(x, y);
    this.lastframe = this.currframe;
};*/