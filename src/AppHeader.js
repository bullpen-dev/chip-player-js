import React, {PureComponent} from "react";

export default class AppHeader extends PureComponent {
  render() {
    return (
      <header className="App-header">
        <h2 className="App-title">Chip Player JS&nbsp;
          {this.props.user ?
            <span>• Logged in as {this.props.user.displayName}.&nbsp;
              <a href="#" onClick={this.props.handleLogout}>Logout</a>
              </span>
            :
            <span>
                <a href="#" onClick={this.props.handleLogin}>Login/Sign Up</a> to Save Favorites
              </span>
          }
        </h2>
        {!this.props.isPhone &&
        <p className="App-subtitle">
            <span className="App-byline">Feedback:&nbsp;
              <a href="https://twitter.com/matthewmontag" target="_blank">@matthewmontag</a>
            </span>
          Powered by&nbsp;
          <a href="https://bitbucket.org/mpyne/game-music-emu/wiki/Home">Game Music Emu</a>,&nbsp;
          <a href="https://github.com/cmatsuoka/libxmp">LibXMP</a>, and&nbsp;
          <a href="https://github.com/schellingb/TinySoundFont">TinySoundFont</a>.
        </p>}
      </header>
    );
  }
}