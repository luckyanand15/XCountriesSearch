import React, { useEffect, useState } from "react";
import Styles from "./App.module.css";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState("");

  useEffect(() => {
    const getCountries = async () => {
      try {
        const resp = await axios.get("https://restcountries.com/v3.1/all");
        setData(resp.data);
      } catch (err) {
        console.error("Error fetching data: ", err);
      }
    };
    getCountries();
  }, []);

  const filterData = data.filter((country) =>
    country.name.common.toLowerCase().includes(searchData.toLowerCase())
  );
  return (
    <div>
      <div className={Styles.search}>
        <input
          type="text"
          placeholder="Search for countries..."
          value={searchData}
          onChange={(e) => setSearchData(e.target.value)}
        />
      </div>
      {filterData.length > 0 || searchData.length > 0 ? (
        <div className={Styles.wrapper}>
          {filterData.map((country) => {
            return (
              <div className={Styles.countryCard}>
                <img src={country.flags.png} alt={country.name.common} />
                <p>{country.name.common}</p>
              </div>
            );
          })}
        </div>
      ) : (
        <div className={Styles.wrapper}>
          {data.map((country) => {
            return (
              <div className={Styles.countryCard}>
                <img src={country.flags.png} alt={country.name.common} />
                <p>{country.name.common}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default App;
