import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./FoodApp.css";

const FoodApp = () => {
  const [foods] = useState([
    {
      name: "Hainanese Chicken Rice",
      location: "Central",
      store: "Tian Tian Hainanese Chicken Rice",
      cuisine: "Singaporean",
      mapUrl:
        "https://www.google.com/maps?q=Tian+Tian+Hainanese+Chicken+Rice+Singapore",
    },
    {
      name: "Chilli Crab",
      location: "East",
      store: "Jumbo Seafood",
      cuisine: "Singaporean",
      mapUrl: "https://www.google.com/maps?q=Jumbo+Seafood+Singapore",
    },
    {
      name: "Roti Prata",
      location: "North",
      store: "Springleaf Prata Place",
      cuisine: "Indian",
      mapUrl: "https://www.google.com/maps?q=Springleaf+Prata+Place+Singapore",
    },
    // Add more Singaporean food items with region, store, cuisine, and mapUrl details
  ]);

  const [sortedFoods, setSortedFoods] = useState([...foods]);
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [searchInput, setSearchInput] = useState("");

  const handleSort = () => {
    const sorted = [...foods].sort((a, b) =>
      a.name.localeCompare(b.name, "en", { sensitivity: "base" })
    );
    setSortedFoods(sorted);
  };

  const handleRegionFilter = (region) => {
    if (region === "All") {
      setSortedFoods([...foods]);
    } else {
      const filtered = foods.filter((food) => food.location === region);
      setSortedFoods(filtered);
    }
    setSelectedRegion(region);
  };

  const handleSearch = () => {
    const searchResult = foods.filter(
      (food) =>
        food.location.toLowerCase().includes(searchInput.toLowerCase()) ||
        food.cuisine.toLowerCase().includes(searchInput.toLowerCase())
    );
    setSortedFoods(searchResult);
  };

  return (
    <div className="food-app-container">
      <h1 className="text-center mt-4 mb-4">Singaporean Food</h1>

      <div className="filters-container">
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownRegion"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {selectedRegion === "All" ? "Select Region" : selectedRegion}
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownRegion">
            <button
              className="dropdown-item"
              onClick={() => handleRegionFilter("All")}
            >
              All
            </button>
            <button
              className="dropdown-item"
              onClick={() => handleRegionFilter("Central")}
            >
              Central
            </button>
            <button
              className="dropdown-item"
              onClick={() => handleRegionFilter("North")}
            >
              North
            </button>
            <button
              className="dropdown-item"
              onClick={() => handleRegionFilter("East")}
            >
              East
            </button>
            <button
              className="dropdown-item"
              onClick={() => handleRegionFilter("West")}
            >
              West
            </button>
            <button
              className="dropdown-item"
              onClick={() => handleRegionFilter("North-West")}
            >
              North-West
            </button>
          </div>
        </div>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by region or cuisine"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button className="btn btn-primary" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>

      <button className="btn btn-primary" onClick={handleSort}>
        Sort Alphabetically
      </button>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Store</th>
            <th>Cuisine</th>
            <th>Google Maps</th> {/* New column for Google Maps URL */}
          </tr>
        </thead>
        <tbody>
          {sortedFoods.map((food, index) => (
            <tr key={index}>
              <td>{food.name}</td>
              <td>{food.location}</td>
              <td>{food.store}</td>
              <td>{food.cuisine}</td>
              <td>
                <a href={food.mapUrl} target="_blank" rel="noopener noreferrer">
                  View on Google Maps
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FoodApp;
