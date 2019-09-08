import React from 'react';
import AppNavbar from "./AppNavbar";
import {Container} from 'reactstrap';
import AlertC from "./Alert";

const Layout = props => {
    const {loggedIn, mappingNavbar} = props;

    return (
        <>
            {loggedIn && <AppNavbar mappingNavbar={mappingNavbar}/>}

            <Container>
                <AlertC/>
                {props.children}
            </Container>
        </>
    )
};

export default Layout;