import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {Navbar, NavbarBrand, Nav, NavItem, NavLink} from 'reactstrap';

const AppNavbar = props => {
    const {loggedIn, user, registered_routes} = props;

    return (
        <>
            {loggedIn &&
            <Navbar color="dark" dark expand="md">
                <NavbarBrand tag={Link} to="/">REACT</NavbarBrand>
                <Nav navbar>
                    {user && registered_routes.map((route, index) =>
                        user.routes && user.routes.indexOf(route.path) !== -1 && route.navbar &&
                        <NavItem key={index}>
                            <NavLink tag={Link} to={route.path}>{route.label}</NavLink>
                        </NavItem>
                    )}
                </Nav>
                <Nav className="ml-auto" navbar>
                    <NavItem><NavLink tag={Link} to="/login"><span
                        className="glyphicon glyphicon-log-out"/> Logout</NavLink></NavItem>
                </Nav>
            </Navbar>}
        </>
    )
};

AppNavbar.propTypes = {
    loggedIn: PropTypes.bool,
    user: PropTypes.object,
    registered_routes: PropTypes.array.isRequired
};

export default AppNavbar;