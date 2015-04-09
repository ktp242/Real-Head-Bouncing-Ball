// This module is to get video from the web cam, flip it horizontal, and show it on the screen
// created by Kang Peng 20150206

define([
  'jquery'
  ], function($) {
  'use strict';

// set up the local video object
// way to get the video depends on different browsers      
window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

var hasVideo = false;

// set the constraints for the webcame input
var hdConstraints = {
  video: {
    mandatory: {
      minWidth: 1280,
      minHeight: 720
    }
  },
  audio: false
};

// if user say yes to the permission to open the camera
if (navigator.getUserMedia) {
       
  navigator.getUserMedia(hdConstraints, 
       
  function(stream) {
    var myStream = stream;
    // where the stream to be shown in the HTML
    var camVideo = $('#camVideo')[0];
    hasVideo = true;
    $(document).trigger('enterGame'); 
    // fill the stream into video tag
    camVideo.src = window.URL.createObjectURL(stream) || stream;
    camVideo.play(); 
  }, 
    
  function(err) {
    console.log('Failed to get local stream' ,err);
  });
}

   
// if requestAnimationFrame is not supported by the browser
if ( !window.requestAnimationFrame ) {
 
  window.requestAnimationFrame = ( function() {
 
    return window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element ) {
 
    window.setTimeout( callback, 1000 / 60 );
 
    };
 
  } )();
 
}

var w, h, playground, playgroundCtx, offscreenCanvas, offscreenCanvasCtx;

// window.addEventListener('resizeGame', function(changeSize){

//   w = changeSize.newWidth;
//   h = changeSize.newHeight; 
  
//   // Set the drawing on all the canvases fit the dimensions
//   playground.width = w;
//   playground.height = h;

// });

function drawScreen(){

  if(!hasVideo)
  console.log('video is not ready');

  // select the main canvas
  playground = $('#playground')[0];
  playgroundCtx = playground.getContext("2d");

  w = playground.width;
  h = playground.height;

  // create a second canvas for double buffering to prevent image flickering
  offscreenCanvas = document.createElement('canvas');
  offscreenCanvasCtx = offscreenCanvas.getContext('2d');

  offscreenCanvas.width = w;
  offscreenCanvas.height = h;

  // flip the image at the second canvas
  offscreenCanvasCtx.translate(w / 2, h / 2);
  offscreenCanvasCtx.scale(-1, 1);
  offscreenCanvasCtx.translate(-w / 2, -h / 2); 
     
  // background
  offscreenCanvasCtx.fillStyle = '#ffffaa';
  
  // play video in the second canvas at position x=0, y=0
  offscreenCanvasCtx.drawImage(camVideo, 40, 84, 1240, 632, 0, 0, w, h);

  // flip the video back to the main canvas
  playgroundCtx.drawImage(offscreenCanvas, 0, 0, w, h, 0 ,0, w, h);
   
  // set to darw the video with requestAnimationFrame
  requestAnimationFrame(drawScreen);

  //console.log(w, h);

}

requestAnimationFrame(drawScreen);

});

