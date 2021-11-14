import React, { useEffect, useState } from 'react';
import styles from './MovieSearch.module.css';
import apiTMBD from '../../apiTMDB';
import axios from 'axios';

const MovieSearch = (props) => {
// Mise en forme des données
    const date = props.movieSearch.release_date.split('-');
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
    const alt = `Affiche du film ${props.movieSearch.title}`;
    const srcPoster = `https://image.tmdb.org/t/p/w342${props.movieSearch.poster_path}`;
        
    const [addMovieDetail, setAddMovieDetail] = useState([
        {
            title: '',
            release_date: '',
            categories: [],
            description: '',
            poster: '',
            backdrop: '',
            actors: [{}],
            similar_movies: [{}],
        }
    ]);

// Recupération des données de l'API TMDB avec trois requete de recherche
    useEffect(() => { 
        // premiere requete : recherche du film par ID        
        apiTMBD.getMovie(props.movieSearch.id)
            .then(res => {               
                let genresMovie = [];
                for (let h=0; h < res.genres.length; h++){
                    genresMovie.push(res.genres[h].name)
                }
                                
                let movieActors = []
                
                // deuxieme requete : recherche du film par ID pour récuperer juste les acteurs
                apiTMBD.getCredit(props.movieSearch.id)
                    .then(res => {
                        res.cast.splice(0,6).map(actor => {
                            movieActors.push({
                                name: actor.name,
                                photo: `https://image.tmdb.org/t/p/w342${actor.profile_path}`,
                                character: actor.character
                            })
                        })                     
                    })
                    .catch(err => {
                        console.log(err.message)
                    })
                let movieRelated = []
                // deuxieme requete : recherche du film par ID pour récuperer juste les flims similaire
                apiTMBD.getRelated(props.movieSearch.id)
                    .then(res => {
                        res.results.splice(0,3).map(related => {
                            movieRelated.push({
                                title: related.title,
                                poster: `https://image.tmdb.org/t/p/w342${related.poster_path}`,
                                release_date: related.release_date
                            })
                        })
                    })
                    .catch(err => {
                        console.log(err.message)
                    })

                setAddMovieDetail({
                    title : res.title,
                    release_date : res.release_date,
                    description: res.overview,
                    poster : 'https://image.tmdb.org/t/p/w342' + res.poster_path,
                    backdrop : 'https://image.tmdb.org/t/p/w342' + res.backdrop_path,
                    categories : genresMovie,
                    actors : movieActors,
                    similar_movies : movieRelated,
                })
            })
            .catch(err => {
                console.log(err.message)
            })
    }, []);
// Fonction d'ajout d'un film à notre base movie-board-server
    const AddThisMovie = (event) => {
        axios({
            method: 'post',
            url: 'http://localhost:3000/movies',
            data: addMovieDetail
        })
        .then (res => {
          window.location.replace('/')
        })
    }
// Rendu d'une carte de film trouvé grace à la recherche
    return (
        <article className={styles.movieCard}>            
            <figcaption className={styles.movieHead}>
                <img src={srcPoster} alt={alt}></img>                
                <article className={styles.movieDescription}>
                    <div className={styles.bckgrndBlur}></div>
                    <div className={styles.textDescription}>
                        <h3>{props.movieSearch.title}</h3>
                    </div>                    
                </article>
            </figcaption>
            <article className={styles.movieInformations}>
                <p>Date de sortie : <span>{date[2]}</span> <span >{months[parseInt(date[1])-1]}</span> <span>{date[0]}</span></p>
            </article>
            <div className={styles.movieController}>
                <a className={styles.btnGreen} onClick={AddThisMovie} >Ajouter</a>
            </div>            
        </article>
    )
}
export default MovieSearch;