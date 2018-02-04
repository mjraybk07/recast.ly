var searchYouTube = (options, callback) => {
  // TODO
  //var searchUrl ='https://www.googleapis.com/youtube/v3/search';

  var options = options || { key: window.YOUTUBE_API_KEY, query: 'cats', max: 10 };
  var callback = callback || function (e) { console.log('missing callback', e) };

  $.ajax({
    url: 'https://www.googleapis.com/youtube/v3/search',
    data: {
      part: 'snippet',
      // q: options.keywords,
      q: options.query,
      maxResults: options.max,
      type: 'video',
      videoEmbeddable: 'true',
      key: options.key
    },
    type: 'GET',
    contentType: 'application/json',
    success: (data) => {
      console.log('Sucess..', data);
      callback(data.items);
    },
    error: (e) => {
      console.log('ERROR...', e);
    }
  });

};

window.searchYouTube = searchYouTube;
