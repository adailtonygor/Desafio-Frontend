/* eslint-disable react/no-unknown-property */
import { NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { AppBar, Toolbar } from '@material-ui/core';
import useStyles from './Styles';

function NavBar() {
    const [setActive] = useState(false);
    const classes = useStyles();
    const location = useLocation();

    const handleClick = () => {
        setActive(true);
    };

    const handleBlur = () => {
        setActive(false);
    };

    return (
        <AppBar position="static">
            <Toolbar className={classes.root}>
                <NavLink
                    to="/"
                    onClick={handleClick}
                    onBlur={handleBlur}
                    className={`${classes.title} ${classes.link} ${
                        location.pathname === '/' ? classes.activeLink : ''
                    }`}
                    exact
                >
                    Desafio Nova
                </NavLink>

                <div className={classes.rightSection}>
                    <NavLink
                        to="/cadastro"
                        onClick={handleClick}
                        onBlur={handleBlur}
                        className={`${classes.link} ${
                            location.pathname === '/cadastro'
                                ? classes.activeLink
                                : ''
                        }`}
                    >
                        Cadastro
                    </NavLink>
                    <NavLink
                        to="/consultar-usuario"
                        onClick={handleClick}
                        onBlur={handleBlur}
                        className={`${classes.link} ${
                            location.pathname === '/consultar-usuario'
                                ? classes.activeLink
                                : ''
                        }`}
                    >
                        Usuário
                    </NavLink>
                </div>
            </Toolbar>
        </AppBar>
    );
}

export default NavBar;
