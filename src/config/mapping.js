import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {routing} from "./routing";

const PrivateRoute = ({container: Component, ...rest}) => {
    localStorage.setItem('app_roles', JSON.stringify(routing.map((el) => (el.roleName))));

    return <Route {...rest} render={props => (
        localStorage.getItem('user')
            ? <Component {...props}
                         formConfig={rest.formConfig}
                         dtConfig={rest.dtConfig}
                         apiService={rest.apiService}
                         icons={rest.icons}
                         action={rest.action}
                         title={rest.title}
                         roleLevel={rest.roleLevel}
            />
            : <Redirect to={{pathname: '/login', state: {from: props.location}}}/>
    )}/>
};

export {PrivateRoute};