// * This module is to create a ball on index.html and give the ball functions to interact with
// * audience face.
// * created by Kang Peng 20150211


var x = 380, 
    y = 40, 
    dx = 2, 
    dy = 4, 
    radius = 30,
    faceX,
    faceY,
    faceW,
    faceH,
    faceAngle,

    redColor = "#ff0000",
    yellowColor = '#ffff00';


// Listen to face track event, and get the coordinates of upper left point, 
// the size, and the angle of the face object 
document.addEventListener("facetrackingEvent", function( event ) {
    faceX = event.x;
    faceY = event.y;
    faceW = event.width;
    faceH = event.height;
    faceAngle = event.angle; 
 
});


var ballCanvasCtx = $('#ballCanvas')[0].getContext('2d');
var w = $('#ballCanvas').width();
var h = $('#ballCanvas').height();


function clearCanvas(){
	ballCanvasCtx.clearRect(0, 0, w, h);
}


// The function to draw the ball
function circle(x, y, r){
	ballCanvasCtx.fillStyle = '#ff0000';
    ballCanvasCtx.beginPath();
    ballCanvasCtx.arc(x, y, r, 0, Math.PI*2, true); 
    ballCanvasCtx.closePath();
    ballCanvasCtx.fill();
}


function drawBall(){

	// Clear each frame on the canvas
    clearCanvas();
	
    // Draw the circle
	circle(x, y, radius);

    // Make the ball only to bounce inside the frame	
    if (x + dx + radius * 2 > w - radius * 2 || x + dx  < radius)
      dx = -dx;  
    if (y + dy + radius * 4 > h || y + dy  < radius)
      dy = -dy;


    // Make the ball to bounce above player's head
    // If the ball is above the player's head
    if(x > faceX - 20 && x < faceX + faceW + 20){
     
     // If the ball's y-coordinate is greater than the upper left point of the face object's
     if (y + dy + radius * 4 > faceY){
     
      // IF the ball is dropping 
      if (dy > 0){
        dy = -dy;
        ballCanvasCtx.fillStyle = yellowColor;
        
        // prevent accidently hit the ball by the player's chin
        }else{ 
         dy = dy;
         ballCanvasCtx.fillStyle = redColor;
        
       }
      }else{
        dy = dy;
        ballCanvasCtx.fillStyle = redColor;
    }
    
    }else{
        dy = dy;
        ballCanvasCtx.fillStyle = redColor;
    }
    
    // Set the speed of the ball
	x = x + dx;
    y = y + dy;

    // Set animation function call back
    requestAnimationFrame(drawBall);

}

// Start the animation
$('#camVideo').on('play', function(){
    requestAnimationFrame(drawBall);
});



