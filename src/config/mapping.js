import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {routing} from "./routing";

const PrivateRoute = ({container: Component, ...rest}) => {
    localStorage.setItem('app_roles', JSON.stringify(routing.map((el) => (el.roleName))));

    return <Route {...rest} render={props => (
        localStorage.getItem('user')
            ? <Component {...props}
                         formconfig={rest.formconfig}
                         dtconfig={rest.dtconfig}
                         apiservice={rest.apiservice}
                         icons={rest.icons}
                         action={rest.action}
            />
            : <Redirect to={{pathname: '/login', state: {from: props.location}}}/>
    )}/>
};

export {PrivateRoute};