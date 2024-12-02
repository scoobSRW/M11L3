import React, { useEffect, useState } from "react";
import axios from "axios";
import { Route, Routes, Link } from "react-router-dom"; // Import routing components, no need for BrowserRouter here
import CharacterList from "./CharacterList"; // Import CharacterList component
import CharacterDetail from "./CharacterDetail"; // Import CharacterDetail component
import './index.css'; // Ensure your styles are applied
import NotFound from './NotFound'; // Import the NotFound component

// Inside your Routes setup
<Route path="*" component={NotFound} />


const App = () => {
  const [marvelData, setMarvelData] = useState(null);

  // Fetch Marvel data for the home page (list of characters)
  const fetchMarvelData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/fetch-marvel-data");
      setMarvelData(response.data); // Store data in state
    } catch (error) {
      console.error("Error fetching Marvel data", error);
    }
  };

  useEffect(() => {
    fetchMarvelData();
  }, []);

  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/browse-characters">Browse Characters</Link></li>
          <li><Link to="/comics">Comics</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<h1>Welcome to the Marvel Comic Book Library!</h1>} />
        <Route
            path="/browse-characters"
            element={<CharacterList characters={marvelData?.data?.results} />}
        />
        <Route
            path="/character-details/:id"
            element={<CharacterDetail />}
        />
        <Route path="/comics" element={<h1>Comics - Coming soon!</h1>} />
        <Route path="*" element={<NotFound />} />
    </Routes>
    </div>
  );
};

export default App;
