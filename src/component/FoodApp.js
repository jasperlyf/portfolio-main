import React, { useEffect, useState } from "react";
import "./css/FoodApp.css"
import "bootstrap/dist/css/bootstrap.min.css";

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

  // Custom List
  const [favoriteList, setFavoriteList] = useState([
    { name: "Ding Tai Fung", cuisine: "Chinese", drinks: "N" },
    { name: "Hai Di Lao", cuisine: "Steamboat", drinks: "N" },
    { name: "Tai Er", cuisine: "Chinese", drinks: "N" },
    { name: "Yun Nans", cuisine: "Chinese", drinks: "N" },
    { name: "Beauty In The Pot", cuisine: "Steamboat", drinks: "N" },
    { name: "Mookata", cuisine: "Thailand", drinks: "N" },
    { name: "The Vermillion House", cuisine: "Italian", drinks: "Y" },
    { name: "Chicken Rice", cuisine: "Chinese", drinks: "N" },
    { name: "KBBQ", cuisine: "Korean", drinks: "Y" },
    { name: "Al Capone's", cuisine: "Bar", drinks: "Y" },
    { name: "Stickies", cuisine: "Bar", drinks: "Y" },
  ]);
  const [includeDrinks, setIncludeDrinks] = useState(false);

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
        const radius = 1000; // Search within a radius of 500 meters

        const overpassUrl = `https://overpass-api.de/api/interpreter?data=[out:json];(node["amenity"~"restaurant|bar|coffee_shop|cafe"]["cuisine"](around:${radius},${latitude},${longitude}););out;`;

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
    const randomIndex = Math.floor(Math.random() * sortedCustomFoods.length);
    const selectedFood = sortedCustomFoods[randomIndex];
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

    if (includeDrinks) {
      customFilteredFoods = customFilteredFoods.filter(
        (favorite) => favorite.drinks === "Y"
      );
    } else {
      customFilteredFoods = customFilteredFoods.filter(
        (favorite) => favorite.drinks === "N" || "Y" || !favorite.drinks
      );
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
    <div className="app-container">
      <h2 className="text-center p-2">What to Eat/Drink?</h2>
      <br />
      {/*
      Current Location: Data 
      <div className="row mb-3">
        <div className="col">
          <p className="text-black">Current Location: {userLocation}</p>
        </div>
      </div> */}

      <div className="row">
        <div className="col-8">
          {/* Choose current location or Use custom list */}
          <div className="row col-12">
            <div className="food-card text-center col-12 col-md-5">
              <label>
                <input
                  type="radio"
                  name="location"
                  value="current"
                  checked={displayNearbyPlaces}
                  onChange={() => handleToggleDisplay("current")}
                />
                {" "} Use Current Location
              </label>
              <div className="sub-text">Search for the nearest places to eat or drink from your current location.</div>
            </div>
            <div className="col-2">{" "}</div>
            <br />
            <div className="food-card text-center col-12 col-md-5">
              <label>
                <input
                  type="radio"
                  name="location"
                  value="custom"
                  checked={!displayNearbyPlaces}
                  onChange={() => handleToggleDisplay("custom")}
                />
                {" "} Use Custom List
              </label>
              <div className="sub-text">Search for food from my custom list of favorite food and drinks.</div>
            </div>
          </div>
          <br />

          {/*  Search function */}
          <div className="row col-12 food-card">
            <div className="col-12 col-md-9">
              {displayNearbyPlaces ? (
                <select
                  className="form-select food-drop-box"
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
                  className="form-select food-drop-box"
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
              {displayNearbyPlaces ? (<div></div>
              ) : (
                <div className="form-check text-center">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="drinkCheckbox"
                    checked={includeDrinks}
                    onChange={(e) => setIncludeDrinks(e.target.checked)}
                  />
                  <label className="form-check-label" htmlFor="drinkCheckbox">
                    Drinks
                  </label>
                </div>
              )}
            </div>
            <div className="col-6 col-md-3 p-2">
              {displayNearbyPlaces ? (
                <button className="btn btn-primary" onClick={handleSearch}>
                  Search
                </button>
              ) : (
                <button className="btn btn-primary" onClick={handleCustomSearch}>
                  Search
                </button>
              )}
            </div>
          </div>
        </div>


        <div className="col-4">
          {/* Random food/drink Generator */}
          <div className="row p-2">
            <div className="text-center col-12 food-card">
              <div className="food-card">
                <p>Random Food/Drink Generator</p>
                {displayNearbyPlaces ? (
                  <button className="btn btn-primary col-10" onClick={handleRandomPicker}>
                    Random
                  </button>
                ) : (
                  <button
                    className="btn btn-primary col-10"
                    onClick={handleRandomCustomPicker}
                  >
                    Random
                  </button>
                )}
                <div className="text-center">
                  <br />
                  {randomFood && (
                    <p>
                      Food/Drinks:
                      <a
                        href={googleSearchLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="highlight-underline"
                      >
                        {" " + randomFood}
                      </a>
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <br />

      {/* List of Food/Drinks */}
      <div className="row">
        <div className="col-12 col-md-10">
          <h2 className="text-center">
            {displayNearbyPlaces ? "Nearby Recommended List" : "Custom List"}
          </h2>
        </div>

        {/*  Sort function */}
        <div className="col-12 col-md-2">
          {displayNearbyPlaces ? (
            <button className="btn btn-secondary" onClick={handleSort}>
              {sortByAsc ? <img
                src="https://www.shareicon.net/data/512x512/2015/12/17/688785_arrows_512x512.png"
                alt="Arrow Up"
                style={{ width: "20px", height: "20px", display: "inline-block", filter: "invert(100%)" }}
              /> : <img
                src="https://www.shareicon.net/data/512x512/2015/12/17/688785_arrows_512x512.png"
                alt="Arrow Up"
                style={{ width: "20px", height: "20px", display: "inline-block", transform: "scaleY(-1)", filter: "invert(100%)" }}
              />}
            </button>
          ) : (
            <button className="btn btn-secondary" onClick={handleCustomSort}>
              {sortCustomByAsc ? <img
                src="https://www.shareicon.net/data/512x512/2015/12/17/688785_arrows_512x512.png"
                alt="Arrow Up"
                style={{ width: "20px", height: "20px", display: "inline-block", filter: "invert(100%)" }}
              /> : <img
                src="https://www.shareicon.net/data/512x512/2015/12/17/688785_arrows_512x512.png"
                alt="Arrow Up"
                style={{ width: "20px", height: "20px", display: "inline-block", transform: "scaleY(-1)", filter: "invert(100%)" }}
              />}
            </button>
          )}
        </div>
      </div>

      {/* List of Food/Drinks */}
      <div className="row">
        <div className="col-12">
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
                        className="highlight-underline"
                      >
                        View
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
                        className="highlight-underline"
                      >
                        View
                      </a>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div >
  );
};

export default FoodFinderApp;