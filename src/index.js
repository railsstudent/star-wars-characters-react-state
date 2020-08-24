import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router } from 'react-router-dom';

import CharacterList from './CharacterList';

import endpoint from './endpoint';

import './styles.scss';

const useFetch = (url) => {
  const [response, setResponse] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUrl = async () => {
      try {   
        const data = await fetch(url);
        const response = await data.json();
        setResponse(response);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    fetchUrl();

    // fetch(url)
    //   .then((response) => response.json())
    //   .then((response) => {
    //     setLoading(false);
    //     setResponse(response);
    //   })
    //   .catch(error => {
    //     setError(error);
    //     setLoading(false);
    //   });
  }, [url]);

  return [response, loading, error];
}

const Application = () => {
  const [response, loading, error ] = useFetch(`${endpoint}/characters`);
  const characters = (response && response.characters) || [];

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
