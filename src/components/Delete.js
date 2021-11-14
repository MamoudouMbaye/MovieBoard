import React from 'react';
import axios from 'axios';
import styles from './movies/Movie.module.css';
import './Delete.css';

const Delete = ({ id }) => {
    const handleDelete = () =>{
        axios.delete(`http://localhost:3000/movies/${id}`);
        window.location.reload();
        // console.log("test suppression");
    };

    return (
            <button className={styles.btnRed} onClick={() =>{
                if (window.confirm('Voulez-vous vraiment supprimer ce film ?')) {
                    handleDelete();
                }
                }}>
                Supprimer
            </button>
    );
};

export default Delete;