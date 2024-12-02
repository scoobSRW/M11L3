import React from "react";
import './index.css';

const CharacterList = ({ characters, onSelect }) => {
  return (
    <div className="character-grid">
      {characters.map((char) => (
        <div
          key={char.id}
          onClick={() => onSelect(char.id)} // Trigger onSelect with character's ID
          className="character-item"
        >
          <img
            src={`${char.thumbnail.path}.${char.thumbnail.extension}`}
            alt={char.name}
          />
          <p>{char.name}</p>
        </div>
      ))}
    </div>
  );
};

export default CharacterList;
