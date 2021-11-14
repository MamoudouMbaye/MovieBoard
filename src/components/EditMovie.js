import React, { useEffect, useState } from 'react';
import apiAxios from '../apiAxios';
import { useParams } from 'react-router';
import styles from './movies/Movie.module.css';
import './EditMovie.css';

const EditMovie = () => {
    
    const { movieID } = useParams();
    const [movieDetail, setMovieDetail] = useState('');
    

    // on récupère les données du film à modifier
    useEffect(() => {
        apiAxios.getMovie(movieID)
          .then(res => {
            setMovieDetail(res);
          })
          .catch(err => {
            console.log(err.message)
          })
      }, []);

    return (
        <div className="edit page">
            <main>
                <h2>Modifier le film</h2>
                <section className={styles.redBanner}>
                    <form className="form-edit-movie">
                        <div className="form-edit-movie-filters">
                            <div className="form-edit-movie-filter">
                                <label htmlFor="title">Titre</label>
                                <input type="text" 
                                       name="title"
                                       defaultValue={ movieDetail.title }
                                       required />
                            </div>
                            <div className="form-edit-movie-filter">
                                <label htmlFor="date">Date de sortie</label>
                                <input type="date" 
                                       name="date"
                                       defaultValue={ movieDetail.release_date }
                                       required />
                            </div>
                            <div className="form-edit-movie-filter">
                                <label htmlFor="categories">Catégories</label>
                                <input type="text"
                                       name="categories" 
                                       placeholder="Action, Aventure, Science-Fiction, etc."
                                       required />
                            </div>
                            <div className="form-edit-movie-filter">
                                <label htmlFor="description">Description</label>
                                <input type="textarea" 
                                       name="description" 
                                       defaultValue={ movieDetail.description }
                                       required />
                            </div>
                            <div className="form-edit-movie-filter">
                                <label htmlFor="poster">Affiche</label>
                                <input type="url" 
                                       name="poster" 
                                       defaultValue={ movieDetail.poster }
                                       required />
                            </div>
                            <div className="form-edit-movie-filter">
                                <label htmlFor="backdrop">Backdrop</label>
                                <input type="url" 
                                       name="backdrop" 
                                       defaultValue={ movieDetail.backdrop }
                                       pattern="http://*"
                                       required />
                            </div>
                            <div className="form-add-movie-filter">
                                <p>Casting :</p>
                                <div className="form-actor">
                                    <div className="filter">
                                        <label htmlFor="actor">Acteur / Actrice</label>
                                        <input type="text" 
                                            name="actor"
                                            placeholder="Nom de l'acteur / actrice"
                                            required />
                                    </div>
                                    <div className="filter">
                                        <label htmlFor="poster">Photo</label>
                                        <input type="url" 
                                                name="poster" 
                                                placeholder="http://exemple-photo.jpg"
                                                pattern="http://*"
                                                required />
                                    </div>
                                    <div className="filter">
                                        <label htmlFor="actor">Rôle</label>
                                        <input type="text" 
                                            name="actor"
                                            placeholder="Rôle"
                                            required />
                                    </div>
                                </div>
                            </div>
                            <div className="form-add-movie-filter">
                                <p>Films similaires :</p>
                                <div className="form-similar-movies">
                                    <div className="filter">
                                        <label htmlFor="title-similar-movie">Titre</label>
                                        <input type="text" 
                                            name="title-similar-movie"
                                            placeholder="Titre du film"
                                            required />
                                    </div>
                                    <div className="filter">
                                        <label htmlFor="poster-similar-movie">Affiche</label>
                                        <input type="url" 
                                                name="poster-similar-movie" 
                                                placeholder="http://exemple-poster.jpg"
                                                pattern="http://*"
                                                required />
                                    </div>
                                    <div className="filter">
                                        <label htmlFor="date-similar-movie">Date de sortie</label>
                                        <input type="date" 
                                            name="date-similar-movie"
                                            required />
                                    </div>
                                </div>

                            </div>
                        </div>
                        <button className={styles.btnGreen}>Modifier</button>
                    </form>
                </section>
            </main>
        </div>
    );
};

export default EditMovie;