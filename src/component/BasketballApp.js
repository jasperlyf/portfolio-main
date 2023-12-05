import React, { useState, useEffect } from "react";
import axios from "axios";
import "./css/BasketballApp.css"; // Import your CSS file

const BasketballApp = () => {
  const [playerIndex, setPlayerIndex] = useState(0);
  const [playerInfo, setPlayerInfo] = useState([]);
  const [playerImages, setPlayerImages] = useState([]);

  useEffect(() => {
    const fetchPlayersInfo = async () => {
      try {
        const players = ["Derrick Rose", "Jayson Tatum", "Devin Booker"];

        const playersInfo = await Promise.all(
          players.map(async (player) => {
            const response = await axios.get(
              `https://www.balldontlie.io/api/v1/players?search=${player}`
            );
            if (response.data.data.length > 0) {
              const playerId = response.data.data[0].id;
              const playerResponse = await axios.get(
                `https://www.balldontlie.io/api/v1/players/${playerId}`
              );
              return playerResponse.data;
            } else {
              return null;
            }
          })
        );

        setPlayerInfo(playersInfo);

        const playerImages = [
          "https://cdn.nba.com/headshots/nba/latest/1040x760/201565.png",
          "https://cdn.nba.com/headshots/nba/latest/1040x760/1628369.png",
          "https://cdn.nba.com/headshots/nba/latest/1040x760/1626164.png",
        ];

        setPlayerImages(playerImages);
      } catch (error) {
        console.error("Error fetching player information:", error);
      }
    };

    fetchPlayersInfo();
  }, []);

  const handleNextPlayer = () => {
    setPlayerIndex((prevIndex) => (prevIndex + 1) % playerInfo.length);
  };

  return (
    <div className="BasketballApp">
      <div className="card-container">
        {playerInfo.length > 0 && (
          <div className="card" onClick={handleNextPlayer}>
            <img src={playerImages[playerIndex]} alt="Player" />
            <div className="player-info">
              <p>
                Name: {playerInfo[playerIndex].first_name}{" "}
                {playerInfo[playerIndex].last_name}
                <br />
                Team: {playerInfo[playerIndex].team.full_name}
                <br />
                Position: {playerInfo[playerIndex].position}
                <br />
                {/* Average Points:{" "}
                {playerInfo[playerIndex].stats
                  ? playerInfo[playerIndex].stats[0].pts
                  : "-"} */}
              </p>
              {/* Displaying average points scored */}
            </div>
            <div className="dots-container">
              {playerInfo.map((_, index) => (
                <span
                  key={index}
                  className={index === playerIndex ? "dot active" : "dot"}
                ></span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BasketballApp;
