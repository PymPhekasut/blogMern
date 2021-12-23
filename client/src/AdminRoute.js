

import { getUser } from "./services/authorize";
import { Route, Redirect } from "react-router-dom";
import { Component } from "react";

const AdminRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            //if login so show components from Myroute
            getUser() ? (<Component {...props} />) :
                (<Redirect to={{ pathname: "/login", state: { form: props.location } }}
                />
                )
        }
    />
);

export default AdminRoute;