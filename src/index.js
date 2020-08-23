import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router } from 'react-router-dom';

import CharacterList from './CharacterList';

import endpoing from './endpoint';

import './styles.scss';

const Application = () => {
  const [characters, setCharacters] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`${endpoing}/characters`)
      .then((response) => response.json())
      .then(({ characters }) => {
        setLoading(false);
        setCharacters(characters);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="Application">
      <header>
        <h1>Star Wars Characters</h1>
      </header>
      <main>
        <section className="sidebar">
          {loading ? <p>Loading...</p> :
            <CharacterList characters={characters} />
          }
          { error && <p className="error">{error.message}</p> }
        </section>
      </main>
    </div>
  );
};

const rootElement = document.getElementById('root');

ReactDOM.render(
  <Router>
    <Application />
  </Router>,
  rootElement,
);
