import React from 'react';
import { useCountrySelection } from './country-selection-context';
import useCovidInfo from './useCovidInfo';
import './Popup.css';

const Popup = () => {
  const { state, dispatch } = useCountrySelection();
  const { selectedCountry } = state;
  const { countryInfo, error } = useCovidInfo(selectedCountry ? selectedCountry.name : null);

  const displayContent = () => {
    if (!countryInfo && !error) {
      return <p>Loading...</p>;
    }
    return (
      <>
        <div className="popup-country-card">
          <h1 className="popup-country-name">{selectedCountry.displayName}</h1>
          {countryInfo
            ? (
              <img
                className="popup-country-flag"
                width="40"
                height="30"
                src={`https://flagcdn.com/120x90/${countryInfo.code.toLowerCase()}.png`}
                alt={countryInfo.name}
              />
            ) : null }
        </div>
        {error
          ? <h2>No data for this country.</h2>
          : (
            <div className="popup-figure-container">
              <div>
                <h2 className="popup-figure-name">
                  Confirmed cases
                </h2>
                <h2 className="popup-figure-name">
                  Recovered
                </h2>
                <h2 className="popup-figure-name">
                  Deaths
                </h2>
              </div>
              <div>
                <h2 className="popup-figure">
                  {countryInfo.confirmed.toLocaleString()}
                </h2>
                <h2 className="popup-figure">
                  {countryInfo.recovered.toLocaleString()}
                </h2>
                <h2 className="popup-figure">
                  {countryInfo.deaths.toLocaleString()}
                </h2>
              </div>
            </div>
          )}
      </>
    );
  };

  const onClosePopup = () => {
    dispatch({ type: 'deselect' });
  };

  return (
    <div className={`popup ${state.selectedCountry === null ? 'popup-hidden' : null}`}>
      {state.selectedCountry === null ? null : displayContent()}
      <button type="button" className="popup-close-button" onClick={onClosePopup} aria-label="close" />
    </div>
  );
};

export default Popup;
