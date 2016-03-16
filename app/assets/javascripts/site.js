// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
//var dev = ENV["DEV_API_KEY"];
//var dev2 = Figaro.env.dev_api_key;
//console.log(dev);
//console.log(dev2);
// var ajaxRequest = function (){
//   console.log("Starting ajax Request ");
//   $.ajax({
//     type: 'GET',
//     url:'https://global.api.pvp.net/api/lol/static-data/euw/v1.2/champion?api_key=754c3074-aa73-40e7-9404-68f77b1f79d2',
//     success: renderResults,
//     error: ajaxRequestError
//   });
// };

// var renderResults = function(requestResultsAsJson){
//   console.log(requestResultsAsJson.data);
//   renderChampionName(requestResultsAsJson.data);
// }


// var ajaxRequestError = function(requestResultsAsJson){
//   console.log(requestResultsAsJson);
// }

// var renderChampionName = function(championsData){ 
//   for(var index in championsData){
//     $(".champions-grid").append('<a href="#"><img class="champions-gridd-main" src="http://ddragon.leagueoflegends.com/cdn/6.5.1/img/champion/'+championsData[index].key+'.png" alt="img/link to '+championsData[index].name+' champion data"></a>');
//   }
  
// }
// $(document).ready(function(){ //handlers
//   ajaxRequest();
// });




// var ajaxRequest = function(termSearch){
//   console.log("rquest intro")
//   //$.get('https://api.spotify.com/v1/search?q='+termSearch+'&type=track').done(renderResults);
//   $.ajax({
//     url: 'https://api.spotify.com/v1/search?q='+termSearch+'&type=track',
//     success: renderResults,
//     error: ajaxRequestError
//   });
// }

// var renderResults = function(searchResultsAsJson){
//   console.log(searchResultsAsJson);
//   //debugger;
//   console.log("hi");
//   if(searchResultsAsJson.tracks.items.length > 0){
//     cleanDOMTags();
//     var arrArtists =[]; 
//     searchResultsAsJson.tracks.items[0].artists.forEach( function(artist) {
//       arrArtists.push(artist.name);
//     });
//     var albumImageUrl = searchResultsAsJson.tracks.items[0].album.images[1].url;
//     var trackPreviewUrl = searchResultsAsJson.tracks.items[0].preview_url;
//     var trackName = searchResultsAsJson.tracks.items[0].name;

//     renderTrackName(trackName);
//     renderArtistsName(arrArtists);
//     renderAlbumImage(albumImageUrl);
//     renderTrackPreview(trackPreviewUrl);
//   }
//   else{
//     alert("No search results");
//   }
// }

// var renderTrackName = function(trackName){
//   $('.title').append(trackName);
// } 
// var renderArtistsName = function(arrArtists){
//   arrArtists.forEach( function(artistName) {
//     $('.author').append(artistName+" . ")
//   });
// }
// var renderAlbumImage = function(albumImageUrl){
//   $('.js-almbum-img-source').attr('src',albumImageUrl);
// }
// var renderTrackPreview =  function(trackPreviewUrl){
//   $('.js-player').attr('src',trackPreviewUrl);
//   $('.btn-play').removeClass('disabled');
// }
// var trackClassToggler = function(){
//   $('.btn-play').toggleClass('playing');
// }

// var playerTrigger = function(){
//   if($('.btn-play').hasClass('playing')){
//      $('.js-player').trigger('play');
//   }
//   else{
//     $('.js-player').trigger('pause');
//   }
// }

// var printTime = function () {
//   var current = $('.js-player').prop('currentTime');
//   console.debug('Current time: ' + current);
//   $('.js-progress-bar').val(current);
// }

// var cleanDOMTags =  function(){

//   $('.js-almbum-img-source').attr('src',"");
//   $('.js-track-audio-source').attr('src',"");
//   $('.author').empty();
//   $('.title').empty();
//   $('.js-progress-bar').val(0);
// }

// var ajaxRequestError = function(){

// }


// $(document).ready(function(){
//   //events handlers

//   var doSearch = function(){

//     $(".btn-submit").on("click", function(event){
//       event.preventDefault();// evitamos que haga el submit y recargue la pagina
//       var termSearch = $('.js-sinput').val();
//       ajaxRequest(termSearch);
//     });

//   }();

//   var playerStateHandler = function(){
//     $('.btn-play').on('click', function(){
//       trackClassToggler();
//       playerTrigger();
//     });
//   }();

//   var playerTimeUpdateHandler = function(){
//     $('.js-player').on('timeupdate', printTime);
//   }();

// });