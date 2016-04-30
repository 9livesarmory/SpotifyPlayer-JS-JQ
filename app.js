
$(document).on('ready', function() {
	
	$('.js-submit-tracksearch').on('click', function(event){
			event.preventDefault();
			var searchTerm=$('.js-track-search').val();
			//console.log(searchTerm);


		$.ajax({
			url: `https://api.spotify.com/v1/search?type=track&query=${searchTerm}`,

			success: function (trackData) {
				console.log("success!");
				//console.log(trackData.tracks);
				//console.log(trackData.tracks.items);
				var itemsArray = trackData.tracks.items;  //create variable for array of items that are objects
				//console.log(itemsArray[0]);
				var trackTitle = itemsArray[0].name //get first object returned of tracks
				var coverImageUrl = itemsArray[0].album.images[0].url;  //get the albums first image url and store to variable
				var artistName = itemsArray[0].artists[0].name;
				var trackPreview = itemsArray[0].preview_url; //get url to track preview mp3
				//console.log(title);  
				//console.log(coverImageUrl);
				$('.title').text(trackTitle); //replace content of .title class
				$('.cover').html(`<img src="${coverImageUrl}">`); //replace image tag with the URL
				$('.author').text(artistName); //replace content of .author class
				$('.js-player').attr('src', trackPreview);
			},
			error: function (error) {
				console.log("womp womp");
				console.log(error.responseJSON);
			}
		});
	});
	
	$('.btn-play').on('click', function(){  //onclick audio function

			if ($('.btn-play').hasClass('playing')) {  
				$('.js-player').trigger('pause');
				$('.btn-play').removeClass('playing').addClass('disabled');
			}

			else if ($('.btn-play').hasClass('disabled')) {
				$('.js-player').trigger('play');
				$('.btn-play').removeClass('disabled').addClass('playing');
			}
	});
		function printTime () {  // Define a function to print the player's current time
  			var current = $('.js-player').prop('currentTime');
  			console.debug('Current time: ' + current);
  			$('progress').val(current);
}
	$('.js-player').on('timeupdate', printTime);  // Have printTime be called when the time is updated


	$('.author').on('click', function(){ //function to click

		var searchTerm=$('.author').text();

		$.ajax({
			url: `https://api.spotify.com/v1/search?type=artist&query=${searchTerm}`,
			success: function (artistData) {
				console.log("woot!");
				console.log(artistData);

			},
			error: function (error) {
				console.log("oh noes");
				console.log(error.responseJSON);
			}
		});
	});


});





