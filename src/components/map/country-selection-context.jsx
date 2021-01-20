import React, { createContext, useContext, useReducer } from 'react';
import PropTypes from 'prop-types';

const CountrySelectionStateContext = createContext();
const CountrySelectionDispatchContext = createContext();

const countrySelectionReducer = (state, action) => {
  switch (action.type) {
    case 'select': {
      return { selectedCountry: action.payload };
    }
    case 'deselect': {
      return { selectedCountry: null };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

const CountrySelectionProvider = ({ children }) => {
  const [state, dispatch] = useReducer(countrySelectionReducer, { selectedCountry: null });
  return (
    <CountrySelectionStateContext.Provider value={state}>
      <CountrySelectionDispatchContext.Provider value={dispatch}>
        {children}
      </CountrySelectionDispatchContext.Provider>
    </CountrySelectionStateContext.Provider>
  );
};

CountrySelectionProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const useCountrySelectionState = () => {
  const context = useContext(CountrySelectionStateContext);
  if (context === undefined) {
    throw new Error('useCountrySelectionState must be used within a CountrySelectionProvider');
  }
  return context;
};

const useCountrySelectionDispatch = () => {
  const context = useContext(CountrySelectionDispatchContext);
  if (context === undefined) {
    throw new Error('useCountrySelectionDispatch must be used within a CountrySelectionProvider');
  }
  return context;
};

const useCountrySelection = () => ({ state: useCountrySelectionState(), dispatch: useCountrySelectionDispatch() });

export {
  CountrySelectionProvider, useCountrySelection,
};
