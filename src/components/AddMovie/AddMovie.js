import React, { useEffect, useState } from 'react';

import apiTMBD from '../../apiTMDB';

import MovieSearch from './MovieSearch';

import styles from './AddMovie.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { faShare } from '@fortawesome/free-solid-svg-icons'

const AddMovie = () => {

    const [movieList, setMoviesList] = useState([]);
    const [formData, setFormData] = useState({
		titleSearch: '',
    });
// Fonction qui récupère la valeur dans le champ titre pour la recherche
    const onUpdateData = (event) => {
		const target = event.target,
			name = target.name,
			value = target.value;

		const data = { ...formData };
		    data[name] = value;
		    setFormData(data);
	};
// Recupération des données à partir des 4 premiers caractères entrée
    useEffect(() => {
        if (formData.titleSearch.length > 3){
        apiTMBD.getMovieList(formData.titleSearch)
            .then(res => {
                if (res.results.length > 0 ){                        
                    setMoviesList(res.results);
                }
                else {
                    console.log('Aucun résultat')
                }
            })
            .catch(err => {
                console.log(err.message)
            })
    }}, [formData.titleSearch]);
// Rendu de la page add-movie avec un tableau des film trouvé
// Envoi des données pour chaque film trouvé vers MovieSearch qui gère le rendu de chaque film
    return (
        <main>
            <section className={styles.redBanner}>               
                    <div className={styles.container}>
                        <a href='/'><FontAwesomeIcon icon={faShare} /></a>
                        <form  action="">
                        <select name="home-filter">
                            <option value="">Filtrer par</option>
                            <option value="title">Titre</option>
                            <option value="date">Date de sortie</option>
                            <option value="category">Catégorie</option>
                        </select>
                                <input type="text" name="titleSearch"  placeholder="Titre" value={formData.titleSearch} onChange={onUpdateData} autoFocus/> 
                                <button type="submit"><FontAwesomeIcon icon={faSearch} /></button>
                        </form>
                    </div>                    
            </section>
            <section className={styles.movieList}>
                {movieList.map((movieSearch) => (
                    <MovieSearch key={movieSearch.id} movieSearch={movieSearch}/>
                    ))}
                
            </section>
            <div className={styles.test}></div>
        </main>
)}

export default AddMovie;