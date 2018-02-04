class App extends React.Component {
  constructor(props) {
    super(props);

    //this.videos = props.videos;
    //props.videos(null, this.testFn.bind(this));

    this.state = {
      videoList: props.videos,
      currentVideo: props.videos[0]
    };
  }

  search () {
    searchYouTube(null, (data) => {
      this.setState({
        videoList: data,
        currentVideo: data[0]
        })
      console.log('data.items', data);
    })  
  }

  componentDidMount () {
    console.log('componentDidMount');
    this.search();
  }

  handleVideoClick (event) {
    console.log('handleVideoClick event:', event);
    this.setState({currentVideo: event});
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <div className="col-md-6 offset-md-3">
            <div>
              <h5>
                <em>search</em> view goes here
              </h5>
            </div>
          </div>
        </nav>
        <div className="row">
          <div className="col-md-7">
            <VideoPlayer video={this.state.currentVideo}/>
          </div>
          <div className="col-md-5">
            <VideoList videos={this.state.videoList} handleVideoClick={this.handleVideoClick.bind(this)}/>
          </div>
        </div>
      </div>
    );
  }
}

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined

window.App = App;
