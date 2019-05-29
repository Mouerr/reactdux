import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Collapse} from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {routing} from "../../config/routing";

class AppNavbar extends React.Component {
    state = {
        collapsed: true
    };
    toggleNavbar=() =>{
        this.setState({
            collapsed: !this.state.collapsed
        });
    };

    render() {
        const {loggedIn, user} = this.props;
        const appTitle=  process.env.REACT_APP_TITLE;
        return <>
            {loggedIn &&
            <Navbar color="dark" dark expand="md">
                <NavbarBrand tag={Link} to="/">{appTitle}</NavbarBrand>
                <NavbarToggler onClick={this.toggleNavbar} className="mr-2"/>
                <Collapse isOpen={!this.state.collapsed} navbar>
                    <Nav navbar>
                        {user && routing.map((route, index) =>
                            user.roles && user.roles.hasOwnProperty(route.roleName) && route.navbar && user.roles[route.roleName] !== 'role denied' &&
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
            </Navbar>}
        </>
    }
}

AppNavbar.propTypes = {
    loggedIn: PropTypes.bool,
    user: PropTypes.object,
};

export default AppNavbar;