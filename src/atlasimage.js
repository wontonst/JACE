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
}