import React from 'react';
import './style.scss';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Authorization from '../Authorization';
import Admin from '../Admin';
import User from '../User';

function App() {
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/">
                    <Authorization/>
                </Route>
                <Route path="/admin">
                    <Admin/>
                </Route>
                <Route path="/user/:id">
                    <User/>
                </Route>
            </Switch>
        </BrowserRouter>
    );
}
export default App;