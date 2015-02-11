var x = 150;
var y = 150;
var dx = 2;
var dy = 4;

var ballCanvasCtx = $('#ballCanvas')[0].getContext('2d');

var w = $('#ballCanvas').width();
var h = $('#ballCanvas').height();


function clearCanvas(){
	ballCanvasCtx.clearRect(0, 0, w, h);
}


function circle(x, y, r){
	ballCanvasCtx.fillStyle = '#ff0000';
    ballCanvasCtx.beginPath();
    ballCanvasCtx.arc(x, y, r, 0, Math.PI*2, true); 
    ballCanvasCtx.closePath();
    ballCanvasCtx.fill();
}

function drawBall(){

	clearCanvas();
	
	circle(x, y, 30);

	x = x + dx;
    y = y + dy;

    requestAnimationFrame(drawBall);

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

if(hasVideo == true){
	console.log('ball moving');
	requestAnimationFrame(drawBall);
}
