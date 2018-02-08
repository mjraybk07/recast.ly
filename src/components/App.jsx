import React from 'react';
import {render} from 'react-dom';
import preload from '../data/data.json';
import $ from 'jquery';
import _ from 'lodash'
import Search from './Search';
import VideoList from './VideoList';
//import VideoListEntry from  'VideoListEntry';
import VideoPlayer from './VideoPlayer';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      videoList: preload.items,
      currentVideo: preload.items[0]
    };

    this.handleSearchInput = this.handleSearchInput.bind(this);
    this.handleSearchButton = this.handleSearchButton.bind(this);
    this.handleVideoClick = this.handleVideoClick.bind(this);
    this.search = this.search.bind(this);
  }

  search(query) {
    var options = {
      query: query || 'hackreactor',
      key: window.YOUTUBE_API_KEY,
      max: 5
    };

    this.props.searchYouTube(options, data => {
      this.setState({
        videoList: data,
        currentVideo: data[0]
      });
    });
  }


  fetchData(query='pickles') {
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&maxResults=5&type=video&key=AIzaSyBQba-G_MH4gYPpgTLlnhsWjXXqVO6uomQ`)
    .then( results => {
      return results.json();
    })
    .then( data => {
      console.log('this is the data: ', data.items);
      this.setState({videoList: data.items, currentVideo: data.items[0]});
    })

  }

  componentDidMount() {

    this.fetchData();
  }

  handleVideoClick(event) {
    this.setState({ currentVideo: event });
  }

  handleSearchInput(event) {
  //   var self = this;

  //   console.log('handleSearchInput \n---> self:', self, '---> query:', event);
  //  // _.debounce((event) => {
  // //  self.fetchData(event.target.value); //  $('input.form-control').val()
  //  //}, 500)();
  //   setTimeout((event)=> { console.log('inside timeout: ', self.event); self.fetchData(event.target.value)}, 2000);
  }

  handleSearchButton(event) {
    console.log('handleSearchButton', event);
    // this.fetchData($('input.form-control').val());
    this.fetchData(event.target.value);

  }
//  <VideoPlayer video={this.state.currentVideo} />
  render() {
    return (
      <div>
        <nav className="navbar">
          <div className="col-md-6 offset-md-3">
            <Search handleSearchInput={this.handleSearchInput} handleSearchButton={this.handleSearchButton} />
          </div>
        </nav>
        <div className="row">
          <div className="col-md-7">
            <VideoPlayer video={this.state.currentVideo} />
          </div>
          <div className="col-md-5">
            <VideoList videos={this.state.videoList} handleVideoClick={this.handleVideoClick} />
          </div>
        </div>
      </div>
    );
  }
}

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined

// window.App = App;

export default App;
