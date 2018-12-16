import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import { PrivateRoute } from './components/PrivateRoute';
import Home from './components/Home';
import Counter from './components/Counter';
import Food from './components/Food';
import LoginForm from './components/Login';


export default () => {
    return localStorage.getItem('user') ?
        <Layout>
            <PrivateRoute PrivateRoute exact path='/' component={Home} />
            <PrivateRoute path='/counter' component={Counter} />
            <PrivateRoute path='/food/:startDateIndex?' component={Food} />
        </Layout> :
        <Route path='/' component={LoginForm} />
};
