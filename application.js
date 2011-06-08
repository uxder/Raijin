/**
 * @author hellocreation
 * This page loads if user has not logged in
 * Site specific js should go into application.js.
 */
;(function($) {
	$('#output').click(function() {
		Raijin.output.raw();
	});
	
	$('#record').click(function() {
		Raijin.story.record();
	});
	
	$('#clear').click(function() {
		Raijin.story.clear();
	});
	
	
	$('#play').click(function() {
		Raijin.story.play();
	});
	
	
	$('#stop').click(function() {
		Raijin.story.stop();
	});
	
	$(".testButton").click(function() {
		$('#console').append('you clicked a button <br/>');
	})

})(jQuery);