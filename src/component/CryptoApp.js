import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/CryptoApp.css";

const CryptoApp = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [fearAndGreedIndex, setFearAndGreedIndex] = useState(null);

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

    const fetchFearAndGreedIndex = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/indices/fear_and_greed"
        );
        setFearAndGreedIndex(response.data);
      } catch (error) {
        console.error("Error fetching Fear and Greed Index data:", error);
      }
    };

    fetchCryptoData();
    fetchFearAndGreedIndex();
  }, []);

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
    <div className="crypto-container">
      <h1 className="text-center mt-4 mb-4">Top 10 Cryptocurrencies</h1>
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
        <div className="mt-4">
          <h2 className="text-center">Fear and Greed Index</h2>
          <p className="text-center">
            Current value: {fearAndGreedIndex.value}
          </p>
          <p className="text-center">
            Classification: {fearAndGreedIndex.value_classification}
          </p>
        </div>
      )}
    </div>
  );
};

export default CryptoApp;
