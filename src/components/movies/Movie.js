import React from 'react';
import styles from './Movie.module.css';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const Movie = (props) => { 
// Mise en forme des données
    const date = props.movie.release_date.split('-');
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

    
    const alt = 'Affiche du film ' + props.movie.title;
    const href = '/Movie/' + props.movie.id;
// Rendu d'une carte de film présent dans notre base de données movie-board-server
    return (
        <article className={styles.movieCard}>
            <figcaption className={styles.movieHead}>
                <img src={props.movie.poster} alt={alt}></img>                
                <article className={styles.movieDescription}>
                    <div className={styles.bckgrndBlur}></div>
                    <div className={styles.textDescription}>
                        <h3>{props.movie.title}</h3>
                        <p>{props.movie.description}</p>
                        <a href={href}>En savoir plus</a>
                    </div>                    
                </article>
            </figcaption>
            <article className={styles.movieInformations}>
                <p>Date de sortie : <span>{date[2]}</span> <span >{months[parseInt(date[1])-1]}</span> <span>{date[0]}</span></p>
                <p>Genres : {props.movie.categories.join(', ')} </p>
            </article>
            <div className={styles.movieController}>
            <Link to={`edit/Movie` + props.movie.id}>
                <button type="button" className={styles.btnGreen}>Modifier</button>
            </Link>
                <button className={styles.btnRed} onClick={(e) => {
            if(window.confirm("Voulez-vous vraiment supprimer ce film ?")){
                props.deleteMovie(e,props.movie.id); // Importe une fenêtre pop-in via react
            }
        }  }>Supprimer</button>
            </div>
        </article>
    )
}
export default Movie;