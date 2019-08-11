import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Collapse} from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {routing} from "../../config/routing";

const AppNavbar = props => {
    const [collapsed, setCollapsed] = useState(true);

    const toggleNavbar = () => {
        setCollapsed(!collapsed);
    };

    const {userRoles} = props;
    const appTitle = process.env.REACT_APP_TITLE;
    return <>
        <Navbar color="dark" dark expand="md">
            <NavbarBrand tag={Link} to="/">{appTitle}</NavbarBrand>
            <NavbarToggler onClick={toggleNavbar} className="mr-2"/>
            <Collapse isOpen={!collapsed} navbar>
                <Nav navbar>
                    {routing.map((route, index) =>
                        userRoles && userRoles.hasOwnProperty(route.roleName) && route.navbar && userRoles[route.roleName] !== 'role denied' &&
                        <NavItem key={index}>
                            <NavLink tag={Link} to={route.reactPath}>{route.roleName}</NavLink>
                        </NavItem>
                    )}
                </Nav>
                <Nav className="ml-auto" navbar>
                    <NavItem><NavLink tag={Link} to="/logout">
                        <FontAwesomeIcon icon="sign-out-alt" size="lg"/> Logout</NavLink>
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar>
    </>

};

AppNavbar.propTypes = {
    userRoles: PropTypes.object.isRequired,
};

export default React.memo(AppNavbar);