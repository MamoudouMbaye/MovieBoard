import React from 'react';
import styles from './Actor.module.css';

const Actor = (props) => {
    
// Rendu de la section du casting du film
return (
    <article className={styles.actorCard}>
        <figure><img src={props.actor.photo} alt={props.actor.name}></img></figure>
        
        <p><b>{props.actor.name}</b></p>
        <p><i>{props.actor.character}</i></p>
    </article>
)}

export default Actor;