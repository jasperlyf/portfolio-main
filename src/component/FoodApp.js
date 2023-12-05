import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/FoodApp.css";

const FoodFinderApp = () => {
  const [userLocation, setUserLocation] = useState("");
  const [nearbyFoodPlaces, setNearbyFoodPlaces] = useState([]);
  const [useCurrentLocation, setUseCurrentLocation] = useState(true);
  const [displayNearbyPlaces, setDisplayNearbyPlaces] = useState(true);
  const [error, setError] = useState(null);

  //Random Food Picker
  const [randomFood, setRandomFood] = useState(null);

  //Sort
  const [sortedFoods, setSortedFoods] = useState([]);
  const [sortedCustomFoods, setCustomSortedFoods] = useState([]);
  const [sortByAsc, setSortByAsc] = useState(true);
  const [sortCustomByAsc, setSortCustomByAsc] = useState(true);

  //Search
  const [cuisineOptions, setCuisineOptions] = useState([]);
  const [customCuisineOptions, setCustomCuisineOptions] = useState([]);

  const [selectedCuisine, setSelectedCuisine] = useState("All");
  const [selectedCustomCuisine, setSelectedCustomCuisine] = useState("All");

  //Custom List
  const [favoriteList, setFavoriteList] = useState([
    { name: "Pizza", cuisine: "Italian" },
    { name: "Sushi", cuisine: "Japanese" },
    { name: "Tacos", cuisine: "Mexican" },
  ]);

  useEffect(() => {
    const fetchUserLocation = async () => {
      try {
        const ipInfoResponse = await fetch(
          "https://ipinfo.io/json?token=5ee67d9f5b37ad"
        );
        if (!ipInfoResponse.ok) {
          throw new Error("Error fetching user location.");
        }
        const ipInfoData = await ipInfoResponse.json();
        setUserLocation(ipInfoData.city + ", " + ipInfoData.region);
        const { loc } = ipInfoData;
        const [latitude, longitude] = loc.split(",");

        if (useCurrentLocation) {
          findNearbyFood(latitude, longitude);
        }
      } catch (error) {
        setError("Error fetching user location.");
        console.error("Error fetching user location:", error);
      }
    };

    const findNearbyFood = async (latitude, longitude) => {
      try {
        const radius = 500; // Search within a radius of 500 meters

        const overpassUrl = `https://overpass-api.de/api/interpreter?data=[out:json];(node["amenity"="restaurant"]["cuisine"](around:${radius},${latitude},${longitude}););out;`;

        const overpassResponse = await fetch(overpassUrl);
        if (!overpassResponse.ok) {
          throw new Error("Error fetching nearby food places.");
        }
        const overpassData = await overpassResponse.json();
        setNearbyFoodPlaces(overpassData.elements);
        setSortedFoods(overpassData.elements);
        setCustomSortedFoods(favoriteList);
      } catch (error) {
        setError("Error fetching nearby food places.");
        console.error("Error fetching nearby food places:", error);
      }
    };

    fetchUserLocation();
  }, [useCurrentLocation]);

  //Toggle Current Location and Custom List
  const handleToggleDisplay = (value) => {
    if (value === "current") {
      setDisplayNearbyPlaces(true);
    } else {
      setDisplayNearbyPlaces(false);
    }
  };

  //Sort
  const handleSort = () => {
    const sorted = [...sortedFoods].sort((a, b) =>
      sortByAsc
        ? a.tags.name.localeCompare(b.tags.name, "en", {
            sensitivity: "base",
          })
        : b.tags.name.localeCompare(a.tags.name, "en", {
            sensitivity: "base",
          })
    );
    setSortedFoods(sorted);
    setSortByAsc(!sortByAsc);
  };

  const handleCustomSort = () => {
    const sortedCustom = [...sortedCustomFoods].sort((a, b) =>
      sortCustomByAsc
        ? a.name.localeCompare(b.name, "en", {
            sensitivity: "base",
          })
        : b.name.localeCompare(a.name, "en", {
            sensitivity: "base",
          })
    );
    setCustomSortedFoods(sortedCustom);
    setSortCustomByAsc(!sortCustomByAsc);
  };

  //Random Food Picker
  const handleRandomPicker = () => {
    const randomIndex = Math.floor(Math.random() * nearbyFoodPlaces.length);
    const selectedFood = nearbyFoodPlaces[randomIndex];
    setRandomFood(selectedFood.tags.name || "Unnamed Place");
  };

  const handleRandomCustomPicker = () => {
    const randomIndex = Math.floor(Math.random() * favoriteList.length);
    const selectedFood = favoriteList[randomIndex];
    setRandomFood(selectedFood.name || "Unnamed Place");
  };

  useEffect(() => {
    setRandomFood(null); // Reset the random food when sorting or filtering occurs
  }, [sortedFoods]);

  //Dropdown Box Select Option
  useEffect(() => {
    const uniqueCuisines = [
      ...new Set(
        nearbyFoodPlaces
          .filter((place) => place.tags?.cuisine)
          .map((place) => place.tags.cuisine)
      ),
    ];

    setCuisineOptions(["All", ...uniqueCuisines]);
  }, [nearbyFoodPlaces]);

  const handleCuisineChange = (event) => {
    setSelectedCuisine(event.target.value);
  };

  useEffect(() => {
    const uniqueCustomCuisines = [
      ...new Set(
        favoriteList
          .filter((favorite) => favorite.cuisine) // Excludes empty or undefined cuisines
          .map((favorite) => favorite.cuisine)
      ),
    ];
    setCustomCuisineOptions(["All", ...uniqueCustomCuisines]);
  }, [favoriteList]);

  const handleCustomCuisineChange = (event) => {
    setSelectedCustomCuisine(event.target.value);
    console.log(event.target.value);
  };

  //Search
  const handleSearch = () => {
    let filteredFoods = [...nearbyFoodPlaces];

    if (selectedCuisine !== "All") {
      filteredFoods = nearbyFoodPlaces.filter(
        (place) => place.tags?.cuisine === selectedCuisine
      );
    }

    setSortedFoods(filteredFoods);
  };

  const handleCustomSearch = () => {
    let customFilteredFoods = [...favoriteList];

    if (selectedCustomCuisine !== "All") {
      customFilteredFoods = favoriteList.filter(
        (favorite) => favorite.cuisine === selectedCustomCuisine
      );
    }

    if (selectedCustomCuisine === "All") {
      customFilteredFoods = favoriteList;
    }

    setCustomSortedFoods(customFilteredFoods);
  };

  //Google Map Search Link
  const googleSearchLink = randomFood
    ? `https://www.google.com/maps?q=${encodeURIComponent(randomFood)}`
    : "";

  const generateGoogleSearchLink = (foodName) => {
    return `https://www.google.com/maps?q=${encodeURIComponent(foodName)}`;
  };

  return (
    <div className="food-container mt-4">
      <h1 className="text-center mb-4">Nearby Food Places</h1>
      <div className="row mb-3">
        <div className="col">
          <p className="text-black">Current Location: {userLocation}</p>
        </div>
      </div>
      <div className="row mb-3">
        <div className="text-center col">
          <label>
            <input
              type="radio"
              name="location"
              value="current"
              checked={displayNearbyPlaces}
              onChange={() => handleToggleDisplay("current")}
            />
            Use Current Location
          </label>
          <label>
            <input
              type="radio"
              name="location"
              value="custom"
              checked={!displayNearbyPlaces}
              onChange={() => handleToggleDisplay("custom")}
            />
            Use Custom List
          </label>
        </div>
      </div>
      <div className="row mb-3">
        <div className="text-center col">
          {displayNearbyPlaces ? (
            <select
              className="form-select"
              value={selectedCuisine}
              onChange={handleCuisineChange}
            >
              {cuisineOptions.map((cuisine, index) => (
                <option key={index} value={cuisine}>
                  {cuisine}
                </option>
              ))}
            </select>
          ) : (
            <select
              className="form-select"
              value={selectedCustomCuisine}
              onChange={handleCustomCuisineChange}
            >
              {customCuisineOptions.map((cuisine, index) => (
                <option key={index} value={cuisine}>
                  {cuisine}
                </option>
              ))}
            </select>
          )}

          {displayNearbyPlaces ? (
            <button className="btn btn-primary" onClick={handleSearch}>
              Search Cuisine
            </button>
          ) : (
            <button className="btn btn-primary" onClick={handleCustomSearch}>
              Search Cuisine Custom
            </button>
          )}
        </div>
        <div className="text-center col">
          {displayNearbyPlaces ? (
            <button className="btn btn-primary" onClick={handleRandomPicker}>
              Pick Random Food
            </button>
          ) : (
            <button
              className="btn btn-primary"
              onClick={handleRandomCustomPicker}
            >
              Pick Random Food
            </button>
          )}
        </div>
        <div className="text-center col">
          {displayNearbyPlaces ? (
            <button className="btn btn-secondary" onClick={handleSort}>
              {sortByAsc ? "Sort Ascending" : "Sort Descending"}
            </button>
          ) : (
            <button className="btn btn-secondary" onClick={handleCustomSort}>
              {sortCustomByAsc ? "Sort Ascending" : "Sort Descending"}
            </button>
          )}
        </div>
      </div>
      <div className="row mb-3">
        <div className="text-center col">
          {randomFood && (
            <div>
              <p>
                Randomly Picked Food: {randomFood} <br />
                Google Search:
                <a
                  href={googleSearchLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {" " + randomFood}
                </a>
              </p>
            </div>
          )}{" "}
        </div>
      </div>
      <div className="row">
        <div className="col">
          <h2>
            {displayNearbyPlaces ? "Nearby Food List" : "Custom Food List"}
          </h2>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Cuisine</th>
                <th>Map URL</th>
              </tr>
            </thead>
            <tbody>
              {displayNearbyPlaces
                ? sortedFoods.map((place, index) => (
                    // Display nearby food items
                    <tr key={index}>
                      <td>{place.tags?.name || "Unnamed Place"}</td>
                      <td>{place.tags?.cuisine || "Unknown Type"}</td>
                      <td>
                        {" "}
                        <a
                          href={generateGoogleSearchLink(place.tags?.name)}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View on Google Map
                        </a>
                      </td>
                    </tr>
                  ))
                : // Display favorite food items in the custom list
                  sortedCustomFoods.map((favorite, index) => (
                    <tr key={index}>
                      <td>{favorite.name}</td>
                      <td>{favorite.cuisine}</td>
                      <td>
                        {" "}
                        <a
                          href={generateGoogleSearchLink(favorite.name)}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View on Google Map
                        </a>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FoodFinderApp;
