import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from '../home/Home';
import Restaurants from '../restaurant/Main';

const Router: React.FC = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home}></Route>
                <Route path="/restaurants" exact component={Restaurants}></Route>
            </Switch>
        </BrowserRouter>
    );
};

export default Router;
