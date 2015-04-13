define([
  'jquery'
  ], function($) {
  'use strict';


   // Delete the introduction
  function deleteIntro(){
    $('.intro').remove();
  }
  
  function deleteStartBtn(){
    $('.startBtn').remove();
  }

  function deleteResetBtn(){
    $('.resetBtn').remove();
  }

  function addStartBtn(){  
    $('.content').append($('<div>', {class: 'Btn startBtn'}));
    $('.startBtn').append('Start Game');
  
    // Click the start game button and fire the animation
    $('.startBtn').click(function(){
      console.log('start');
      deleteIntro();
      deleteStartBtn();
      addResetBtn();
      $(document).trigger('gameStart'); 
    });
  }

  function addResetBtn(){
    $('.content').append($('<div>', {class: 'Btn resetBtn'}));
    $('.resetBtn').append('Reset Game');

    // Click the reset game button and reset the game
    $('.resetBtn').on('click', function(){
      deleteResetBtn();
      addStartBtn();
      $(document).trigger('reset'); 
      console.log('reset');
    });
  }

  $(document).on('enterGame', function(){
     addStartBtn();
     $('.intro').html('<p>HIT THE START BUTTON WITH YOUR HEAD.</p>');
     $('.intro').addClass('introChange');
  });

});