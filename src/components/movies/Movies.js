import React from 'react';

import Movie from './Movie';
import styles from './Movies.module.css';

const Movies = (props) => {
// Rendu de la page d'accueil avec un tableau des films présent sur movie-board-server
// Envoi des données pour chaque film trouvé vers MovieSearch qui gère le rendu de chaque film
    return (
        <main className={styles.moviesList}>
            <section className={styles.redBanner}>
                <div className={styles.container}>
                    <a href='/add-movie'>Ajouter un film</a>
                </div>
            </section>
            {props.movies.map((movie) => (
                <Movie key={movie.id} movie={movie} deleteMovie={props.deleteMovie}></Movie>
            ))}
        </main>
    )
}
export default Movies;