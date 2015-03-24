// * This module is to calculate the times the user hit the ball,
// * and put the score on the screen
// * created by Kang Peng 20150212


define([
  'jquery'
  ], function($) {
  'use strict';

  var score = 0;
  $('.score').html('<h2>'+score+'</h2>');

  $(document).on('hitBall', function(event, getScore){
    
    // Get the times the player hit the ball and set it to the scores
    score = getScore.passedScore;
    
    if (score < 10){
      
      $('.score').html('<h2>'+score+'</h2>');
    
    }else{
      
      $('.score').removeClass('score').addClass('score10');
      $('.score10').html('<h2>'+score+'</h2>');
    }
  });
});




