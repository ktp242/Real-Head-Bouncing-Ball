// * This module is to keep the canvas with the same dimensions all the time following the window's size.
// * The source of the method thanks to Derek Detweiler from this link
// * http://www.html5rocks.com/en/tutorials/casestudies/gopherwoord-studios-resizing-html5-games/
// * created by Kang Peng 20150309

define([
  'jquery'
  ], function($) {
  'use strict';

function resizeGame(){

  // Grab the parent elements of each of the canvases
  var displays  = document.getElementsByClassName('display');

  // The ratio of the canvases width to height is 2 / 1 
  var canvasWToH = 2;

  // Get the ratio of current window
  var newWidth = window.innerWidth;
  var newHeight = window.innerHeight;
  var newWToH = newWidth / newHeight;

  // Set the display area to fit the size of window
  if (newWToH > canvasWToH) {

    // If the window ratio is wider, make the canvas fit the width and leave left and right bars 
    newWidth = newHeight * canvasWToH;
    
    // Set the attributes to each parent of the canvas
    for ( var i = 0; i < displays.lenght; i ++){
      displays[i].style.height = newHeight + 'px';
      displays[i].style.width = newWidth + 'px';
     }
    console.log(displays[0].style.height+","+displays[0].style.width);
  } else {
    
    // If the window ratio is taller, make the canvas fit the height and leave top and bottom bars 
    newHeight = newWidth / canvasWToH;
    
    // Set the attributes to each parent of the canvas
    for ( var i = 0; i < displays.length; i ++){
      displays[i].style.width = newWidth + 'px';
      displays[i].style.height = newHeight + 'px';
     }
    //console.log(newHeight+","+newWidth);
  }

  // Set the top left corner back to original place. Look up CSS .display.
  for ( var i = 0; i < displays.length; i ++){
    displays[i].style.marginTop = (-newHeight / 2) + 'px';
    displays[i].style.marginLeft = (-newWidth / 2) + 'px';
  }

  // Set dynamic font size

  // Return the new width and the new height
  return {
    newWidth : newWidth, 
    newHeight : newHeight 
  }

}

resizeGame();

// Listen to the size change of the window and fire resizeGame function 
window.addEventListener("resize", resizeGame, false);
window.addEventListener("orientationchange", resizeGame, false);

// Set the size of canvases once the page is loaded
//window.addEventListener("load", resizeGame, false);

});