import React, { useEffect, useState } from 'react';

import apiAxios from '../../apiAxios.js';
import { useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShare } from '@fortawesome/free-solid-svg-icons'

import Actor from './Actor';
import Related from './Related';
import styles from './PageMovie.module.css';
import Delete from '../Delete.js';

const PageMovie = (props) => {
// Mise en forme des données
    const { movieID } = useParams();
    const [movieDetail, setMovieDetail] = useState(null);
    const months = [
        'janvier',
        'février',
        'mars',
        'avril',
        'mai',
        'juin',
        'juillet',
        'août',
        'septembre',
        'octobre',
        'novembre',
        'décembre'
    ];

    let date = [];
    let alt = '';
    let genres = '';

// Recupération du films dans movie-board-server grâce a son ID
    useEffect(() => {
        apiAxios.getMovie(movieID)
          .then(res => {
            setMovieDetail(res);
          })
          .catch(err => {
            console.log(err.message)
          })
      }, []);

    if (movieDetail !== null){
         date = movieDetail.release_date.split('-');
         alt = `Affiche du film${movieDetail.title}`;
         genres = movieDetail.categories.join(', ');
    }
// Rendu De la page détail d'un film 
// Envoye de données pour le rendu des acteur et des film similaire
    return (
        <main className={styles.movieDetail}>
            {movieDetail !== null && 
            <>
            <section className={styles.redBanner}>               
                <div className={styles.container}>
                    <a href='/'><FontAwesomeIcon icon={faShare} /></a>
                    <h1>{movieDetail.title}</h1>
                </div>
            </section>
            <section className={styles.movieInformation}>
                <div className={styles.container}>
                    <figcaption>
                        <img src={movieDetail.poster} alt={alt}></img>
                        <div className={styles.movieController}>
                        <Link to={`edit/Movie/${movieID}`}>
                        <button type="button" className={styles.btnGreen}>Modifier</button>
                        </Link>
                            <Delete id={ movieID }/>
                        </div>
                    </figcaption>
                    <article>  
                        <h2>Informations</h2>
                        <p>Date de sortie : <span>{date[2]}</span> <span >{months[parseInt(date[1])-1]}</span> <span>{date[0]}</span></p>
                        <p>Genres : {genres} </p>
                        <p>{movieDetail.description}</p>
                    </article>
                </div>
            </section>
            <section className={styles.movieCasting}>
                <div className={styles.container}>  
                    <h2>Distribution</h2>
                    {movieDetail.actors.map((actor) => (
                    <Actor actor={actor} ></Actor>
                    ))}
                </div>
            </section>
            <section className={styles.movieRelated}>
                <div className={styles.container}>
                    <h2>Voir aussi</h2>
                    {movieDetail.similar_movies.map((related) => (
                    <Related related={related} ></Related>
                    ))}
                </div>
            </section>
            </>
            }
        </main>
    )
};

export default PageMovie;