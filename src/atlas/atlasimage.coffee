class AtlasImage
###
@brief defines an image within an atlas
@param {Image} img raw image 
@param {int} atlasx image x-position on atlas
@param {iint} atlasy image y-position on atlas
@param {int} iwidth image width
@param {int} iheight image height
@returns {AtlasImage}
###
constructor: (@img, atlasx, atlasy, imgwidth, imgheight) ->
@atlas = new AtlasDefinition(atlasx, atlasy, imgwidth, imgheight)
this.center = new Vector2(imgwidth/2, imgheight/2);

draw:(x,y) ->
engine.context.drawImage(@img,
@atlas.atlasx, @atlas.atlasy,
@atlas.imgwidth, @atlas.imgheight,
x-@center.x, y-@center.y,
@atlas.imgwidth, @atlas.imgheight)

clear: (x,y) ->
engine.context.clearRect(x-@center.x,y-@center.y,@atlas.imgwidth,@atlas.imgheight)