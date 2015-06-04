var app = angular.module('itunes');

app.service('itunesService', function($http, $q){
  //This service is what will do the 'heavy lifting' and get our data from the iTunes API.
  //Also not that we're using a 'service' and not a 'factory' so all your method you want to call in your controller need to be on 'this'.

  //Write a method that accepts an artist's name as the parameter, then makes a 'JSONP' http request to a url that looks like this
  //https://itunes.apple.com/search?term=' + artist + '&callback=JSON_CALLBACK'
  //Note that in the above line, artist is the parameter being passed in. 
  //You can return the http request or you can make your own promise in order to manipulate the data before you resolve it.

	this.tunes = function(artist) {
		var deferred = $q.defer();
		$http ({
			method: 'jsonp',
			url: 'https://itunes.apple.com/search?term=' + artist + '&callback=JSON_CALLBACK',
		}).then(function(response){
			var parsedResponse = []
				for(var i = 0; i < response.data.results.length; i++) {
					var newSong = {
					Artist: response.data.results[i].artistName,
					Song: response.data.results[i].trackName,
					Collection: response.data.results[i].collectionName,
					Type: response.data.results[i].primaryGenreName,
					AlbumArt: response.data.results[i].artworkUrl60,
					CollectionPrice: response.data.results[i].collectionPrice,
					Play: response.data.results[i].previewUrl,
					}
					parsedResponse.push(newSong);
				}





			deferred.resolve(parsedResponse);
		})
		return deferred.promise;
	}
});