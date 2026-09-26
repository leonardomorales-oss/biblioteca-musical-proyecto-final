import React, { Component } from 'react';

class Song extends Component {
  render() {
    const { title, artist, album, duration } = this.props;

    return (
      <div className="song">
        <h2>{title}</h2>
        <p><strong>Artista:</strong> {artist}</p>
        <p><strong>Álbum:</strong> {album}</p>
        <p><strong>Duración:</strong> {duration}</p>
      </div>
    );
  }
}

export default Song;