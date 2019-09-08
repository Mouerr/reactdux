import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Collapse} from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const AppNavbar = props => {
    const [collapsed, setCollapsed] = useState(true);

    const toggleNavbar = () => {
        setCollapsed(!collapsed);
    };

    const {mappingNavbar} = props;
    const appTitle = process.env.REACT_APP_TITLE;

    return <>
        <Navbar color="dark" dark expand="md">
            <NavbarBrand tag={Link} to="/">{appTitle}</NavbarBrand>
            <NavbarToggler onClick={toggleNavbar} className="mr-2"/>
            <Collapse isOpen={!collapsed} navbar>
                <Nav navbar>
                    {mappingNavbar.map(value => {
                        const navbarElement = value.split("#");
                        return <NavItem key={value}>
                            <NavLink tag={Link} to={navbarElement[1]}>{navbarElement[0]}</NavLink>
                        </NavItem>
                    })}
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
    mappingNavbar: PropTypes.array.isRequired,
};

export default React.memo(AppNavbar);