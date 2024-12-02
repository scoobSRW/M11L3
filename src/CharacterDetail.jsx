import React, { useState, useEffect } from "react";
import axios from "axios";
import './index.css';

const CharacterDetail = ({ characterId }) => {
    const [character, setCharacter] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!characterId) return;

        const fetchCharacter = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/fetch-marvel-data/${characterId}`); // Adjust the backend endpoint as needed
                setCharacter(response.data.data.results[0]);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching character details:", error);
            }
        };
        fetchCharacter();
    }, [characterId]);

    if (!characterId) return <p>Select a character to view details.</p>;
    if (loading) return <p>Loading character details...</p>;

    return (
        <div className="character-detail">
            <h2>{character.name}</h2>
            <p>{character.description || "No description available."}</p>
            <h3>Comics:</h3>
            <ul>
                {character.comics.items.map((comic) => (
                    <li key={comic.resourceURI}>{comic.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default CharacterDetail;
