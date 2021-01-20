import { useState, useEffect } from 'react';

export default (countryName) => {
  const [countryInfo, setCountryInfo] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`https://covid19-api.com/country?name=${countryName}&format=json`)
      .then((res) => res.json())
      .then((result) => {
        if (result[0] === undefined) {
          setError(true);
        } else {
          setError(false);
          setCountryInfo(result[0]);
        }
      });
  }, [countryName]);

  return { countryInfo, error };
};
