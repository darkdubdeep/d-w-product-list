import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HeaderNavigation from '../layout/HeaderNavigation';
import ProductsList from '../product-list/ProductstList';

const MainContainer = () => {
  return (
    <Router>
      <div className='main-conainer'>
        <HeaderNavigation />
        <Switch>
          <Route path='/' component={ProductsList} />
        </Switch>
      </div>
    </Router>
  );
};
export default MainContainer;
