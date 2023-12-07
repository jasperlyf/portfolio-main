import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const CryptoApp = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [fearAndGreedIndex, setFearAndGreedIndex] = useState(null);
  const [lastRSI, setLastRSI] = useState(null);

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets",
          {
            params: {
              vs_currency: "usd",
              per_page: 10,
              page: 1,
              sparkline: false,
            },
          }
        );
        setCryptoData(response.data);
      } catch (error) {
        console.error("Error fetching crypto data:", error);
      }
    };
    fetchCryptoData();
  }, []);

  useEffect(() => {
    const fetchFearAndGreedIndex = async () => {
      try {
        const response = await fetch(
          "https://api.alternative.me/fng/"
        );
        const data = await response.json();
        setFearAndGreedIndex(data);
      } catch (error) {
        console.error("Error fetching Fear and Greed Index data:", error);
      }
    };

    fetchFearAndGreedIndex();
  }, []);

  const calculateRSI = () => {
    // Simulated RSI value (for demonstration purposes)
    const simulatedRSI = Math.floor(Math.random() * 100);
    setLastRSI(simulatedRSI);
  };


  useEffect(() => {
    // Fetch RSI or perform real-time calculations here
    // For the purpose of this example, we simulate RSI calculation
    calculateRSI();
  }, []);

  const handleTradeDecision = () => {
    if (lastRSI) {
      if (lastRSI < 30) {
        console.log('Buy Signal Detected');
        // Implement buy order logic here
      } else if (lastRSI > 70) {
        console.log('Sell Signal Detected');
        // Implement sell order logic here
      } else {
        console.log('No Trading Signal');
      }
    } else {
      console.log('RSI data not available');
    }
  };


  const highlightCrypto = (symbol) => {
    switch (symbol) {
      case "btc":
      case "eth":
      case "sol":
      case "ada":
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="app-container">
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Symbol</th>
              <th>Price (USD)</th>
              <th>Market Cap</th>
              <th>24h Change</th>
            </tr>
          </thead>
          <tbody>
            {cryptoData.map((crypto, index) => (
              <tr
                key={index}
                className={
                  highlightCrypto(crypto.symbol.toLowerCase())
                    ? "highlight"
                    : ""
                }
              >
                <td>{crypto.market_cap_rank}</td>
                <td>{crypto.name}</td>
                <td>{crypto.symbol.toUpperCase()}</td>
                <td>${crypto.current_price.toLocaleString(2)}</td>
                <td>${crypto.market_cap.toLocaleString()}</td>
                <td
                  className={
                    crypto.price_change_percentage_24h >= 0
                      ? "text-success"
                      : "text-danger"
                  }
                >
                  {crypto.price_change_percentage_24h.toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {fearAndGreedIndex && (
        <div>
          <h3>Fear and Greed Index</h3>
          <p>Value: {fearAndGreedIndex.data[0].value}</p>
        </div>
      )}
    <div>
      <p>Last RSI: {lastRSI || 'N/A'}</p>
      <button onClick={calculateRSI}>Calculate RSI</button>
      <button onClick={handleTradeDecision}>Execute Trade Decision</button>
    </div>
    </div>
  );
};

export default CryptoApp;
