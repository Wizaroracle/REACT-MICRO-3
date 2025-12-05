import React, { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [search, setSearch] = useState("");
  console.log(cryptoData);
  useEffect(() => {
    const fetchCrypto = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false"
        );
        const data = await response.json();
        setCryptoData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCrypto();
  }, []);

  const filteredCrypto = cryptoData.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );
  const displayCoins = search ? filteredCrypto : cryptoData.slice(0, 20);

  return (
    <div className="container">
      <h1>CRYPTO PRICE TRACKING</h1>
      <input
        type="text"
        placeholder="Search Here..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Logo</th>
            <th>Name</th>
            <th>Symbol</th>
            <th>Market Cap</th>
            <th>Price INR</th>
            <th>Circulating Supply</th>
          </tr>
        </thead>
        <tbody>
          {displayCoins.map((coin) => (
            <tr key={coin.id}>
              <td>{coin.market_cap_rank}</td>
              <td>
                <img src={coin.image} />
              </td>
              <td>{coin.name}</td>
              <td>{coin.symbol.toUpperCase()}</td>
              <td>{coin.market_cap_rank.toLocaleString()}</td>
              <td>{coin.current_price.toLocaleString()}</td>
              <td>{coin.circulating_supply.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
