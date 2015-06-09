define([
  'jquery'
  ], function($) {
  'use strict';

   // Delete the introduction
  function deleteLogo(){
    $('.logoText').remove();
    $('.redCircle').remove();
  }

   function deleteIntro(){
    $('.intro').remove();
  }
  
  function deleteStartBtn(){
    $('.startBtn').remove();
  }

  function deleteResetBtn(){
    $('.resetBtn').remove();
  }

  function deleteReTrackBtn(){
    $('.reTrackBtn').remove();
  }

  function addScore(){
    $('.main').append($('<div>', {class: 'scoreTitle'}));
    $('.scoreTitle').append('SCORE');
    $('.main').append($('<div>', {class: 'score'}));
  }

  function addStartBtn(){  
    $('.content').append($('<div>', {class: 'Btn startBtn'}));
    $('.startBtn').append('Start Game');
  
    // Click the start game button and fire the animation
    $('.startBtn').click(function(){
      console.log('start');
      addScore();
      deleteIntro();
      deleteLogo();
      deleteStartBtn();
      deleteReTrackBtn();
      // addResetBtn();
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

  function addReTrackBtn(){
    $('.content').append($('<div>', {class: 'Btn reTrackBtn'}));
    $('.reTrackBtn').append('Track Face Again');

    // Click the reset track button and track the face again
    $('.reTrackBtn').on('click', function(){
      $(document).trigger('reTrack'); 
    });
  }

  $(document).on('enterGame', function(){
     addStartBtn();
     addReTrackBtn();
     $('.intro').html('<p>HIT THE START BUTTON WITH YOUR HEAD.</p>');
     $('.intro').addClass('introChange');
  });

  $(document).on('reset', function(){
     // addStartBtn();
     addReTrackBtn();
     // $('.intro').html('<p>HIT THE START BUTTON WITH YOUR HEAD.</p>');
     // $('.intro').addClass('introChange');
  });
});