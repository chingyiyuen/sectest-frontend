import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Dashboard from "../containers/Dashboard/Dashboard";
import ClientPage from "../containers/ClientPage/ClientPage";

export default () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/dashboard" exact render={() => <Dashboard />} />
                <Route path="/client" exact render={() => <ClientPage />} />
                <Route path="/" exact render={() => <Dashboard />} />
            </Switch>
        </BrowserRouter>
    );
};
