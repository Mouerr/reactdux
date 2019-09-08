import React from 'react';
import AppNavbar from "./AppNavbar";

import {Container} from 'reactstrap';
import BreadcrumbC from "./Breadcrumb";
import AlertC from "./Alert";

const Layout = props => {
    const {loggedIn, mappingNavbar} = props;

    return (
        <>
            {loggedIn && <AppNavbar mappingNavbar={mappingNavbar}/>}

            <Container>
                <BreadcrumbC/>
                <AlertC/>
                {props.children}
            </Container>
        </>
    )
};

export default Layout;