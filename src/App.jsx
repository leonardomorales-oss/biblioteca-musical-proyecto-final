import React, { Component } from 'react';
import Header from './components/Header';
import Song from './components/Song';
import './App.css';

class App extends Component {
  componentDidMount() {
    console.log('La aplicación se ha cargado correctamente');
  }

  render() {
    return (
      <div className="app">
        <Header />

        <main className="song-list">
          <Song
            title="Blinding Lights"
            artist="The Weeknd"
            album="After Hours"
            duration="3:20"
          />

          <Song
            title="Save Your Tears"
            artist="The Weeknd"
            album="After Hours"
            duration="3:35"
          />

          <Song
            title="As It Was"
            artist="Harry Styles"
            album="Harry's House"
            duration="2:47"
          />
        </main>
      </div>
    );
  }
}

export default App;