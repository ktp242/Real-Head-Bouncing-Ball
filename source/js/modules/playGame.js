// * This module is to create a ball on index.html and give the ball functions to interact with
// * audience face.
// * created by Kang Peng 20150211
// *
// * Change this module to the main game execution. It inlucdes drawing the ball, reset, and game 
// * over.

define([
  'jquery'
  ], function($) {
  'use strict';


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

      requestID,

      redColor = "#ff0000",
      yellowColor = '#ffff00',

      hitNumber = 0,
      level = 1,
      levelCheck,

      speed = 1.2;


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


  // Fire the how many times the player hit the ball to score.js
  // speedup hasn't work yet
  function hitBall(){
    hitNumber ++;
    $(document).trigger('hitBall', { passedScore : hitNumber });
    
    levelCheck = Math.floor(hitNumber / 5) + 1;
    console.log(level + " , " + speed);

    if (levelCheck != level) {
       speedup();
       setLevel();
    }
  }

  function setLevel(){
    level = levelCheck;
  }


  function speedup(){
    // speed = Math.floor(hitNumber / 10) + 1;
    speed = speed * 1.2;
    dy = dy * (speed);
    dx = dx * (speed);
  }


  function drawBall(){

	  // Clear each frame on the canvas
    clearCanvas();
	
    // Draw the circle
	  circle(x, y, radius);

    // Make the ball only to bounce inside the frame	
    if (x + dx + radius  > w || x + dx  < radius)
      dx = -dx;  
    if (y + dy  < radius)
      dy = -dy;

    if (y + dy + radius > h) {
      $(document).trigger('lose');
    }


      // Make the ball to bounce above player's head
      // If the ball is above the player's head
      if(x > faceX - 20 && x < faceX + faceW + 20){
       
       // If the ball's y-coordinate is greater than the upper left point of the face object's
       if (y + dy + radius * 4 > faceY && x < faceX + (faceW + 20)/2){
       
        // IF the ball is dropping 
        if (dy > 0 && dx > 0){
          hitBall();
          dy = -dy;
          dx = -dx;
          
        // prevent accidently hit the ball by the player's chin
        }else if (dy > 0 && dx < 0){ 
          hitBall();
          dy = -dy;
          dx = dx;
          
        }else if (dy < 0){
             dy = dy;
        } 
        
       } else if (y + dy + radius * 4 > faceY && x > faceX + (faceW + 20)/2){
        if (dy > 0 && dx > 0){
          hitBall();
          dy = -dy;
          dx = dx;
         
        }else if (dy > 0 && dx < 0){
          hitBall();
          dy = -dy;
          dx = -dx;


        }else if (dy < 0){
          dy = dy;
        }
      }
      
      }else{
       dy = dy;
      }
      
      // Set the speed of the ball
      x = x + dx;
      y = y + dy;
      
      // Set animation function call back
      requestAnimationFrame(drawBall);
  }

  // Start the game
  function startBall(){
    setTimeout(function(){
      requestAnimationFrame(drawBall);
    }, 3000);
  }

  $(document).on('gameStart', function(){
    startBall();
  });

  $(document).on('reset', function(){
    cancelAnimationFrame(requestID);
    clearCanvas();
    x = 380; 
    y = 40;
    console.log('reset done');
  });

  $(document).on('lose', function(){
    cancelAnimationFrame(requestID);
    clearCanvas();
    x = -20; 
    y = -20;
    dx = 0;
    dy = 0 ;
    console.log('you lost');
    $('.logo').append('<h1 class="lostText">You Lost!</h1>');
  });

  // Start the animation
  $('#camVideo').on('play', function(){

      // // When video is available, the button shows for the next step
      // var startGame = $('.sidebar').append('<button class="startBtn">Click to Start</button>');

  });

});
