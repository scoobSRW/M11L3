// src/components/CharacterDetail.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // Import useParams hook
import './index.css';

const CharacterDetail = () => {
    const { id } = useParams();  // Retrieve the character ID from the URL
    const [character, setCharacter] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCharacter = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/fetch-marvel-data/${id}`);
                setCharacter(response.data.data.results[0]);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching character details:", error);
            }
        };
        if (id) fetchCharacter();
    }, [id]);

    if (loading) return <p>Loading character details...</p>;
    if (!character) return <p>Character not found.</p>;

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
