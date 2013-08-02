function Frame(img, pause) {
    this.img = img;
    this.pause = Math.floor(pause / engine.tickrate);
}