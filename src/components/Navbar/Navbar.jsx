/* eslint-disable react/no-unknown-property */
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { AppBar, Toolbar } from '@mui/material';

function NavBar() {
    const [active, setActive] = useState(false);

    const handleClick = () => {
        setActive(true);
    };

    const handleBlur = () => {
        setActive(false);
    };

    
    return (
        <AppBar position="static">
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <NavLink
                    to="/"
                    onClick={handleClick}
                    onBlur={handleBlur}
                    style={({ isActive, isPending }) => {
                        return {
                            fontWeight: isActive ? 'Bold' : '',
                            color: isPending ? 'white' : 'white',
                            textDecoration: 'none',
                            margin: active ? '10px' : '0',
                            transition: 'margin 0.1s ease-in-out',
                        };
                    }}
                >
                    Desafio Nova
                </NavLink>

                <div sx={{ display: 'flex' }}>
                    <NavLink
                        to="/cadastro"
                        onClick={handleClick}
                        onBlur={handleBlur}
                        style={({ isActive, isPending }) => {
                            return {
                                fontWeight: isActive ? 'Bold' : '',
                                color: isPending ? 'white' : 'white',
                                textDecoration: 'none',
                                margin: '0 10px',
                                    
                            };
                        }}
                    >
                        Cadastro
                    </NavLink>
                    <NavLink
                        to="/consultarUsuario"
                        onClick={handleClick}
                        onBlur={handleBlur}
                        style={({ isActive, isPending }) => {
                            return {
                                fontWeight: isActive ? 'Bold' : '',
                                color: isPending ? 'white' : 'white',
                                textDecoration: 'none',  
                                margin: active ? '5px' : '0',
                                transition: 'margin 0.1s ease-in-out',
                            };
                        }}
                    >
                        Usuário
                    </NavLink>
                </div>
            </Toolbar>
        </AppBar>
    );
}

export default NavBar;
