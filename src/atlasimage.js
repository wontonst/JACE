/**
 * @brief defines an image within an atlas
 * @param {Image} img raw image 
 * @param {int} atlasx image x-position on atlas
 * @param {iint} atlasy image y-position on atlas
 * @param {int} iwidth image width
 * @param {int} iheight image height
 * @returns {AtlasImage}
 */
function AtlasImage(img, atlasx, atlasy, iwidth, iheight) {
    this.atlas = new AtlasDefinition(atlasx, atlasy, iwidth, iheight);
    this.img = img;
    this.center = new Coordinates(iwidth / 2, iheight / 2);
}
AtlasImage.prototype.draw = function(x, y) {
    engine.context.drawImage(this.img,
            this.atlas.atlasx, this.atlas.atlasy,
            this.atlas.imgwidth, this.atlas.imgheight,
            x + this.center.x, this.center.y + y,
            this.atlas.imgwidth, this.atlas.imgheight);
};
AtlasImage.prototype.clear = function(x,y){
    engine.context.clearRect(x,y, this.atlas.imgwidth, this.atlas.imgheight);
}