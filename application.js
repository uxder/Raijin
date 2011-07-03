/**
 * @author hellocreation
 */
;
(function($) {
	$('.control').hide();
	$('#record').show();

	$('#output').click(function() {
		Raijin.output.raw();
	});

	$('#record').click(function() {
		Raijin.story.record();
		$('.control').hide();
		$('#stop').show();
	});

	$('#clear').click(function() {
		Raijin.story.clear();
		$('.control').hide();
		$('#record').show();
	});

	$('#play').click(function() {
		Raijin.story.play();
	});

	$('#stop').click(function() {
		Raijin.story.stop();
		$('.control').hide();
		$('#play').show();
		$('#stop').show();
		$('#clear').show();
	});

	$(".testButton").click(function() {
		$('#console').append('you clicked a button <br/>');
	})

})(jQuery);
