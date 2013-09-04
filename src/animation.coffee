
class Animation
###
@param {Array} frames list of Frame objects
@returns {Animation}
###
constructor: (@frames) ->
@reset()

###
 * @brief called on each turn of engine.tick()
 * @returns {Boolean} whether or not a frame change has occurred
###
tick: () ->
if not @playing
return
if this.currpause-- <= 0{
if ++this.currframe is this.frames.length{
@reset()
true
}
@currpause = this.frames[this.currframe].pause;
true
}
false

getCurrentImage: () ->
this.frames[this.currframe].img

getLastImage: () ->
this.frames[this.lastframe].img

reset: () ->
this.currpause = this.frames[0].pause
this.currframe = 0
this.playing = false
this.lastframe = 0
return

isPlaying: () ->
this.playing

play: () ->
this.playing = true
return

draw: (x,y) ->
@getLastImage().clear(x,y)
@getCurrentImage().draw(x,y)
@lastframe = @currframe;


