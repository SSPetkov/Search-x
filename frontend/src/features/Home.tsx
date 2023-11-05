import React from 'react';
import './Home.scss';
import AutocompleteSearchComponent from './autocomplete/AutocompleteSearchComponent';
const Home: React.FC = () => {
  return (
    <div className="home">
      <AutocompleteSearchComponent />
    </div>
  );
};

export default Home;
