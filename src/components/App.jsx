class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      videoList: exampleVideoData,
      currentVideo: exampleVideoData[0]
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

  componentDidMount() {
    this.search();
  }

  handleVideoClick(event) {
    this.setState({ currentVideo: event });
  }

  handleSearchInput(event) {
    var self = this;
    console.log('handleSearchInput \n---> self:', self, '---> query:', event);
    _.debounce(() => {
      self.search($('input.form-control').val());
    }, 500)();
  }

  handleSearchButton(event) {
    this.search($('input.form-control').val());
  }

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

window.App = App;
