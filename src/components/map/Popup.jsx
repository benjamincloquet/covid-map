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
        <h1>{selectedCountry.displayName}</h1>
        {error
          ? <p>No data for this country.</p>
          : (
            <p>
              Confirmed cases :
              {countryInfo.confirmed.toLocaleString()}
            </p>
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
