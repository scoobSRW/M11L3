// src/components/CharacterList.jsx
import React from "react";
import { Link } from "react-router-dom";  // Import Link for routing
import './index.css';

const CharacterList = ({ characters }) => {
  return (
    <div className="character-grid">
      {characters.map((char) => (
        <div key={char.id} className="character-item">
          <Link to={`/character-details/${char.id}`}>
            <img
              src={`${char.thumbnail.path}.${char.thumbnail.extension}`}
              alt={char.name}
            />
            <p>{char.name}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default CharacterList;
