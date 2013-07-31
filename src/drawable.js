
function Drawable(initx, inity) {
    this.atlas = new AtlasDefinition(atlasx, atlasy, iwidth, iheight);
    this.position = new Coordinate(initx, inity);
}
Drawable.prototype.tick = function() {
    console.log("ERROR: CALLING Drawable.tick WITHOUT USING INHERITANCE");
}
