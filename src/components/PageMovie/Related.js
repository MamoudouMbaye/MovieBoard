import React from 'react';
import styles from './Related.module.css';

const Related = (props) => {
// Mise en forme des données
    console.log(props)
    const date = props.related.release_date.split('-');
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
    const alt = `Affiche du film ${props.related.title}`;

// Rendu de la section des films similaire du film
return (
    <article className={styles.movieCard}>
            <figcaption className={styles.movieHead}>
                <img src={props.related.poster} alt={alt}></img>                
                <article className={styles.movieDescription}>
                    <div className={styles.bckgrndBlur}></div>
                    <div className={styles.textDescription}>
                        <h3>{props.related.title}</h3>
                    </div>                    
                </article>
            </figcaption>
            <article className={styles.movieInformations}>
                <p>Date de sortie : <span>{date[2]}</span> <span >{months[parseInt(date[1])-1]}</span> <span>{date[0]}</span></p>
            </article>            
        </article>
)}

export default Related;