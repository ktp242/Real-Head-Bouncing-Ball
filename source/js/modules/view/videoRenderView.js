define([], function(){
	'use strict';

	var videoRender = function(){

		// set up the local video object
		// way to get the video depends on different browsers      
		window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;
		navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

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
		if (navigator.getUserMedia){
			navigator.getUserMedia(hdConstraints, 
			function(stream){
			    // where the stream to be shown in the HTML
			    var camVideo = $('#camVideo')[0];
			    // fill the stream into video tag
			    camVideo.src = window.URL.createObjectURL(stream) || stream;
			    camVideo.play();

	    		// if requestAnimationFrame is not supported by the browser
				if (!window.requestAnimationFrame){
					window.requestAnimationFrame = (function(){
					    return window.webkitRequestAnimationFrame ||
					    window.mozRequestAnimationFrame ||
					    window.oRequestAnimationFrame ||
					    window.msRequestAnimationFrame ||
					    function(callback, element){
						    window.setTimeout( callback, 1000 / 60 );
					    };
					})();
				}
				
			    requestAnimationFrame(drawScreen);
			}, 
    
			function(err){
				console.log('Failed to get local stream' ,err);
			});
		}
	};

	var drawScreen = function(){

		// select the main canvas
		var playground = $('#playground')[0];
		var playgroundCtx = playground.getContext("2d");

		var w = playground.width;
		var h = playground.height;

		// create a second canvas for double buffering to prevent image flickering
		var offscreenCanvas = document.createElement('canvas');
		var offscreenCanvasCtx = offscreenCanvas.getContext('2d');

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
	};

	return {
		videoRender: videoRender
	};

});