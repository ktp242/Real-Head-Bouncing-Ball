define([
  'jquery'
  ], function($) {
  'use strict';

  $(document).on('enterGame', function(){
      $('.content').append($('<div>', {class: 'startBtn'}));
      $('.startBtn').append('Start Game');
      $('.intro').html('<p>HIT THE START BUTTON WITH YOUR HEAD.</p>');
      $('.intro').addClass('introChange');
      console.log("get btn");
  });

});