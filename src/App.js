import React, { useEffect, useState } from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import apiAxios from './apiAxios';
import axios from 'axios';

import Movies from './components/movies/Movies.js';
import PageMovie from './components/PageMovie/PageMovie';
import AddMovie from './components/AddMovie/AddMovie';
import EditMovie from './components/EditMovie';

import'./App.css';

import logo from './logoLBAF.svg';
import logoTMDB from './logoTMBD.svg';

function App() {
  const [moviesdb, setMoviesdb] = useState([]);

// Recupération des films dans movie-board-server
  useEffect(() => {
        apiAxios.getData()
            .then(res => {
                setMoviesdb(res);
            })
            .catch(err => {
                console.log(err.message)
            })
    }, []);
//Fonction de suppréssion d'un film sur la base de données movie-board-server
    const deleteMovie = (event, movieID) => {
      event.preventDefault()
        axios({
          method: 'delete',
          url: `http://localhost:3000/movies/${movieID}`,
        }).then(res => {
          window.location.replace('/')
        }).catch(err => {
          console.log(err.message)
        })
    }
// Rendu de la page d'accueil
// Envoie  de la fonction de suppression d'un film à la page de détail d'un film et au rendu des films
// Routage pour avoir plusieur page
  return (
    <BrowserRouter>
      <div className="App">
        <header className="header">
          <img src={logo} alt="logo" />
        </header>
        <Routes>
            <Route path="/" element={<Movies movies={moviesdb} deleteMovie={deleteMovie}/>} />
            <Route path='/edit/:movieID' element={<EditMovie />} />
            <Route path="/movie/:movieID" element={<PageMovie deleteMovie={deleteMovie}/>}/>
            <Route path="/add-movie" element={<AddMovie/>}/>
              
          </Routes>
        <footer className="footer">
          <div>
            <img src={logoTMDB} alt='logo TMBD'/>
            <p>Copyright © 2021 Mamoudou MBAYE All rights reserved.</p>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
