import { useEffect, useState } from 'react';
import Header from './components/Header/Header';
import SearchResults from './components/SearchResults/SearchResults';
import Library from './components/Library/Library';
import './App.css';

function App() {
  const [searchResults] = useState([
    {
      id: 1,
      title: 'Blinding Lights',
      artist: 'The Weeknd',
      album: 'After Hours',
      duration: '3:20',
    },
    {
      id: 2,
      title: 'Save Your Tears',
      artist: 'The Weeknd',
      album: 'After Hours',
      duration: '3:35',
    },
    {
      id: 3,
      title: 'As It Was',
      artist: 'Harry Styles',
      album: "Harry's House",
      duration: '2:47',
    },
  ]);

  const [library, setLibrary] = useState([]);

  const handleAddSong = (song) => {
    const alreadyExists = library.some((item) => item.id === song.id);

    if (!alreadyExists) {
      setLibrary([...library, song]);
    }
  };

  useEffect(() => {
    console.log('La biblioteca se actualizó:', library);
  }, [library]);

  return (
    <div className="app">
      <Header />

      <main className="content">
        <SearchResults
          songs={searchResults}
          onAddSong={handleAddSong}
        />

        <Library songs={library} />
      </main>
    </div>
  );
}

export default App;