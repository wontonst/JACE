Animation.prototype.tick = function() {
//    console.log(JSON.stringify(this.frames));
    if(!this.playing)return;
    if (this.currpause-- <= 0) {
        this.currframe = (this.currframe + 1) % this.frames.length;
        this.currpause = this.frames[this.currframe].pause;
        return true;
    }
    return false;
};
