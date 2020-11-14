import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from '../home/Home';
import RestaurantsListPage from '../restaurant/RestaurantListPage';

const Router: React.FC = () => {
    return (
        <BrowserRouter>
            <Route path="/" exact component={Home}></Route>
            <Switch>
                <Route path="/restaurants" exact component={RestaurantsListPage}></Route>
                <Route path="/restaurants/:id" component={RestaurantsListPage}></Route>
            </Switch>
        </BrowserRouter>
    );
};

export default Router;
