import React, { useEffect, useReducer } from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router } from 'react-router-dom';

import CharacterList from './CharacterList';

import endpoint from './endpoint';

import './styles.scss';

const SET_ERROR = 'SET_ERROR';
const SET_LOADING = 'SET_LOADING';
const SET_RESPONSE = 'SET_RESPONSE';

const initialState = {
  loading: false,
  error: null,
  response: []
};

const fetchReducer = (state, action) => {
  if (action.type === SET_ERROR) {
    return {
      ...state,
      loading: false,
      error: action.payload.error
    }
  }
  if (action.type === SET_LOADING) {
    return {
      ...state,
      loading: action.payload.loading
    }
  }
  if (action.type === SET_RESPONSE) {
    return {
      ...state,
      response: action.payload.response,
    }
  }
  return state;
}

const useFetch = (url) => {
  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    const fetchUrl = async () => {
      try {   
        const data = await fetch(url);
        const response = await data.json();
        dispatch({
          type: SET_RESPONSE,
          payload: { response }
        });
      } catch (error) {
        dispatch({
          type: SET_ERROR,
          payload: { error }
        });
      } finally {
        dispatch({
          type: SET_LOADING,
          payload: { loading: false }
        })
      }
    }

    dispatch({
      type: SET_LOADING,
      payload: { loading: true }
    });
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

  const { response, loading, error } = state;
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
