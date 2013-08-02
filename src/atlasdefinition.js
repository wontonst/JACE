/**
 *  @brief class used to define the position of an image within an atlas
 * @param {int} atlasx image x-position on atlas
 * @param {iint} atlasy image y-position on atlas
 * @param {int} iwidth image width
 * @param {int} iheight image height
 * @returns {AtlasDefinition}
 */function AtlasDefinition(atlasx, atlasy, iwidth, iheight) {
    this.atlasx = atlasx;
    this.atlasy = atlasy;
    this.imgwidth = iwidth;
    this.imgheight = iheight;
}