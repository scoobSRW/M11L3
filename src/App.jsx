import React, { useEffect, useState } from "react";
import axios from "axios";
import CharacterList from "./CharacterList"; // Import CharacterList component
import CharacterDetail from "./CharacterDetail"; // Import CharacterDetail component
import './index.css'; // Ensure your styles are applied

const App = () => {
  const [marvelData, setMarvelData] = useState(null);
  const [selectedCharacterId, setSelectedCharacterId] = useState(null); // State to store the selected character's ID

  // Function to fetch data from the backend
  const fetchMarvelData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/fetch-marvel-data");
      setMarvelData(response.data); // Store data in state
    } catch (error) {
      console.error("Error fetching Marvel data", error);
    }
  };

  // Fetch the data on component mount
  useEffect(() => {
    fetchMarvelData();
  }, []);

  const handleSelectCharacter = (characterId) => {
    setSelectedCharacterId(characterId); // Set the selected character's ID
  };

  return (
    <div>
      <h1>Marvel Characters</h1>
      <div style={{ display: "flex", gap: "20px" }}>
        <div style={{ width: "50%" }}>
          {marvelData ? (
            <CharacterList
              characters={marvelData.data.results}
              onSelect={handleSelectCharacter} // Pass the select handler to CharacterList
            />
          ) : (
            <p>Loading Marvel characters...</p>
          )}
        </div>
        <div style={{ width: "50%" }}>
          {/* Only show CharacterDetail if a character is selected */}
          {selectedCharacterId ? (
            <CharacterDetail characterId={selectedCharacterId} />
          ) : (
            <p>Select a character to view details</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
