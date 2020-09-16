import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from './components/header';
import Home from './pages/home';
import Records from './pages/records';


//O Switch determina qual rota a ser tomada
const Routes = () => (
    <BrowserRouter>
        <Header />
        <Switch>
            <Route path="/" exact>
                <Home />
            </Route>
            <Route path="/records">
                <Records />
            </Route>
        </Switch>
    </BrowserRouter>
);

export default Routes;