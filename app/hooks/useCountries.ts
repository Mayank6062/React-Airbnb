//npm i world-countries 
import countries from 'world-countries';

const formattedCountries = countries.map((country) => ({
  value: country.cca2, //types of country
  label: country.name.common,
  flag: country.flag,
  latlng: country.latlng,
  region: country.region,
}));

//creare hooks now
const useCountries = () => {
  const getAll = () => formattedCountries;

  //it accet the value  getbyvalue search the item from formatedcountries which val match the  
  //value which we pass value
  const getByValue = (value: string) => {
    return formattedCountries.find((item) => item.value === value);
  }

  return {
    getAll,
    getByValue
  }
};

export default useCountries;
/////////////////////////////////////////////////////
