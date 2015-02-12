// This module is to get video from the web cam, flip it horizontal, and show it on the screen
// created by Kang Peng 20150206



// set up the local video object
// way to get the video depends on different browsers      
window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

var hasVideo = false;

// if user say yes to the permission to open the camera
if (navigator.getUserMedia) {
       
    navigator.getUserMedia({video: true, audio: false}, 
         
         function(stream) {
          myStream = stream;
          // where the stream to be shown in the HTML
          camVideo = $('#camVideo')[0];
          hasVideo = true;
           // fill the stream into video tag
          camVideo.src = window.URL.createObjectURL(stream) || stream;
          camVideo.play(); }, 
            
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

function drawScreen(){
    if(!hasVideo)
    console.log('video is not ready'); 

    // select the main canvas
    playground = $('#playground')[0];
    playgroundCtx = playground.getContext("2d");

    // create a second canvas for double buffering to prevent image flickering
    offscreenCanvas = document.createElement('canvas');
    offscreenCanvasCtx = offscreenCanvas.getContext('2d');

    offscreenCanvas.width = playground.width;
    offscreenCanvas.height= playground.height;
       
    // flip the image at the second canvas
    offscreenCanvasCtx.translate(480, 240);
    offscreenCanvasCtx.scale(-1, 1);
    offscreenCanvasCtx.translate(-480, -240);
    
    // background
    offscreenCanvasCtx.fillStyle = '#ffffaa';
    
    // play video in the second canvas at position x=0, y=0
    offscreenCanvasCtx.drawImage(camVideo , 0, 80, 640, 300, 0, 0, 960, 480);

    // flip the video back to the main canvas
    playgroundCtx.drawImage(offscreenCanvas, 0, 0);
     
    // set to darw the video with requestAnimationFrame
    requestAnimationFrame(drawScreen);

    }


requestAnimationFrame(drawScreen);


