class Drawable
###
@brief an object to be drawn onto the canvas
@param {int} initx initial starting position of the object
@param {int} inity initial starting position of the object
@param {int} layer order of rendering
@returns {Drawable}
###
constructor: (initx, inity, @layer) ->
  @position = new Vector2(initx, inity)
  if layer?
    console.log("Drawable constructor's layer parameter cannot be undefined" + new Error().stack);

###
@brief called each tick of the engine
###
tick: (deltaT) ->
  console.log("ERROR: CALLING Drawable.tick WITHOUT USING INHERITANCE");

draw: () ->
  console.log("ERROR: CALLING Drawable.draw WITHOUT USING INHERITANCE");
