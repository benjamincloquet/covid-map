import { useState, useEffect } from 'react';

export default (countryName) => {
  const [countryInfo, setCountryInfo] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
    if (countryName) {
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
    } else {
      setCountryInfo(null);
    }
  }, [countryName]);

  return { countryInfo, error };
};
