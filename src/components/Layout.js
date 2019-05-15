import React from 'react';
import AppNavbar from "./AppNavbar";

import {Container} from 'reactstrap';
import BreadcrumbC from "./UI/Breadcrumb";
import AlertC from "./UI/Alert";

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