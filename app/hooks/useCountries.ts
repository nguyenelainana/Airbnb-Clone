import countries from "world-countries";
import { Country, State, City } from "country-state-city";
import { useCallback } from "react";

var formattedCountries = countries.map((country) => ({
  value: country.cca2,
  label: country.name.common,
  flag: country.flag,
  latlng: country.latlng,
  region: country.region,
}));

const usFlag = Country.getCountryByCode("US")?.flag || "";

const formattedStates = State.getStatesOfCountry("US").map((state) => ({
  value: state.name,
  flag: usFlag,
  label: state.name,
  latlng: [Number(state.latitude), Number(state.longitude)] as [number, number],
  region: "Americas",
}));

formattedCountries.push(...formattedStates);

const useCountries = () => {
  const getAll = () => formattedCountries;

  //search the formattedCountries map and find an item which value that the value we pass
  const getByValue = (value: string) => {
    return formattedCountries.find((item) => item.value === value);
  };

  return {
    getAll,
    getByValue,
  };
};

export default useCountries;
