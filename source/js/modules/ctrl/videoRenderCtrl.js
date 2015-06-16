define(['jquery', 'modules/view/videoRenderView'], 

	function($, videoRenderView){
		'use strict';

		var start = function(){
			videoRenderView.videoRender();
		};

		return {
		    start: start
		};
	}
);