import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router } from 'react-router-dom';

import CharacterList from './CharacterList';

import endpoing from './endpoint';

import './styles.scss';

const Application = () => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetch(`${endpoing}/characters`)
      .then((response) => response.json())
      .then(({ characters }) => {
        console.log(characters);
        setCharacters(characters);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="Application">
      <header>
        <h1>Star Wars Characters</h1>
      </header>
      <main>
        <section className="sidebar">
          <CharacterList characters={characters} />
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
