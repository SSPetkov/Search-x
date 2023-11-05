import React, { FC } from 'react';
import Header from '../common/Header/Header';
import Footer from '../common/Footer/Footer';
import Home from '../features/Home';
import './App.scss';

const App: FC = () => {
  return (
    <div className="app-container">
      <Header />
      <div className="container-content">
        <Home />
      </div>
      <Footer />
    </div>
  );
};

export default App;
