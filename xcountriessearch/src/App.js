import React, { useEffect, useState } from "react";
import Styles from "./App.module.css";
import axios from "axios";
import Countries from "./components/Countries";

function App() {
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [searchData,setSearchData] = useState("");
  
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

  useEffect(()=>{
    const performSearch = async (name)=>{
      if (name === "") {
        setFilterData([]);
        return;
      }
      try {
        const resp = await axios.get(`https://restcountries.com/v3.1/name/${name}`);
        setFilterData(resp.data);
      } catch (err) {
        console.error("Error fetching data: ", err);
        setFilterData([]);
        return;
      }
    }
    performSearch(searchData);
  },[searchData])
  return (
    <div>
      <div className={Styles.search}>
        <input type="text" placeholder="Search for countries..." value={searchData} onChange={(e)=>setSearchData(e.target.value)}/>
      </div>
      {filterData.length>0 || searchData.length>0 ? 
      (
        <div className={Styles.countryCard}>
        {filterData.map((country) => {
          return (
            <div key={`${country.cca3}`}>
              <Countries name={country.name.common} flag={country.flags.png} abbr={country.tld}/>
            </div>
          );
        })}
      </div>
      ):(
        <div className={Styles.countryCard}>
        {data.map((country) => {
          return (
            <div key={`${country.cca3}`}>
              <Countries name={country.name.common} flag={country.flags.png} abbr={country.tld}/>
            </div>
          );
        })}
      </div>
      )}
      
    </div>
  );
}

export default App;
