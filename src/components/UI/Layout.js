import React from 'react';
import AppNavbar from "./AppNavbar";

import {Container} from 'reactstrap';
import BreadcrumbC from "./Breadcrumb";
import AlertC from "./Alert";

const Layout = props => {
    const {loggedIn, user, alert} = props;

    return (
        <>
            <AppNavbar loggedIn={loggedIn} user={user}/>

            <Container>
                <BreadcrumbC/>
                <AlertC alert={alert}/>

                {props.children}
            </Container>
        </>
    )
};

export default Layout;