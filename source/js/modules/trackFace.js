// This module is to track the user's face on the video
// created by Kang Peng 20150206


// add some custom messaging			
statusMessages = {
	"whitebalance" : "checking for stability of camera whitebalance",
	"detecting" : "Detecting face",
	"hints" : "Hmm. Detecting the face is taking a long time",
	"redetecting" : "Lost track of face, redetecting",
	"lost" : "Lost track of face",
	"found" : "Tracking face"
};
			
supportMessages = {
	"no getUserMedia" : "Unfortunately, <a href='http://dev.w3.org/2011/webrtc/editor/getusermedia.html'>getUserMedia</a> is not supported in your browser. Try <a href='http://www.opera.com/browser/'>downloading Opera 12</a> or <a href='http://caniuse.com/stream'>another browser that supports getUserMedia</a>. Now using fallback video for facedetection.",
	"no camera" : "No camera found. Using fallback video for facedetection."
};

// give messages if need in different situations
document.addEventListener("headtrackrStatus", function(event) {
	if (event.status in supportMessages) {
		$('#supportMsg').html(supportMessages[event.status]);
		} else if (event.status in statusMessages) {
		$('#trackMsg').html(statusMessages[event.status]);
		}
}, true);


// create the instance of headtrackr and start
var htracker = new headtrackr.Tracker({ui : false, headPosition : false, calcAngles: true});

// pass these paramters we got in getVideo.js
htracker.init(camVideo, playground);
htracker.start();

// create the rectangle following the head
var faceFrameCtx = $('#faceFrame')[0].getContext('2d');
document.addEventListener("facetrackingEvent", function( event ) {
				// clear canvas
				faceFrameCtx.clearRect(0,0,960,480);
				// once we have stable tracking, draw rectangle
				if (event.detection == "CS") {
					faceFrameCtx.translate(event.x, event.y);
					faceFrameCtx.rotate(event.angle-(Math.PI/2));
					faceFrameCtx.strokeStyle = "#CCCCCC";
					faceFrameCtx.strokeRect((-(event.width/2)) >> 0, (-(event.height/2)) >> 0, event.width, event.height);
					faceFrameCtx.rotate((Math.PI/2)-event.angle);
					faceFrameCtx.translate(-event.x, -event.y);
	}
});