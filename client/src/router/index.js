import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import Login from '../components/login/Login';
import App from '../components/events/Events';

const isLoggedIn = window.localStorage.getItem('isLoggedIn');

const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/*" render={() => (
                    isLoggedIn ? (<Route exact path="/events" component={App}/>) : (<Redirect to="/login"/>)
                )}/>
            </Switch>
        </Router>
    )
};

export default Routes;