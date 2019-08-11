import React from 'react';
import AppNavbar from "./AppNavbar";

import {Container} from 'reactstrap';
import BreadcrumbC from "./Breadcrumb";
import AlertC from "./Alert";

const Layout = props => {
    const {loggedIn, user, alert} = props;

    return (
        <>
            {loggedIn && <AppNavbar loggedIn={loggedIn} userRoles={user.roles}/>}

            <Container>
                <BreadcrumbC/>
                {Object.keys(alert).length > 0 && <AlertC alert={alert}/>}

                {props.children}
            </Container>
        </>
    )
};

export default Layout;