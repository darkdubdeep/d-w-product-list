import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HeaderNavigation from '../layout/HeaderNavigation';
import ProductsList from '../product-list/ProductstList';
import ProductDetail from '../product-detail/ProductDetail';

const MainContainer = () => {
  return (
    <Router>
      <div className='main-conainer'>
        <HeaderNavigation />
        <Switch>
          <Route path='/' exact component={ProductsList} />
        </Switch>
        <Switch>
          <Route path='/product-detail/:id' component={ProductDetail} />
        </Switch>
      </div>
    </Router>
  );
};
export default MainContainer;
