import React from 'react'
import Styles from "./Countries.module.css";

const Countries = ({name,flag}) => {
  return (
    <div className={Styles.countryCard}>
        <img src={flag} alt={name}/>
        <h5 className={Styles.text}>{name}</h5>
    </div>
  )
}

export default Countries