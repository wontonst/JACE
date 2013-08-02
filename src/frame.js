/**
@param {AtlasImage} img
@param {int} pause milliseconds to display the frame
*/
function Frame(img, pause) {
    this.img = img;
    this.pause = Math.round(pause / engine.tickrate);
//    console.log(engine.tickrate + " " + pause+ " "  +this.pause);
}