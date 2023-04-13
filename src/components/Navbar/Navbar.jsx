/* eslint-disable react/no-unknown-property */
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@mui/material';

function NavBar() {
    return (
        <AppBar position="static">
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <NavLink
                    to="/"
                    style={({ isActive, isPending }) => {
                        return {
                            fontWeight: isActive ? 'Bold' : '',
                            color: isPending ? 'white' : 'white',
                            textDecoration: 'none',
                        };
                    }}
                >
                    Desafio Nova
                </NavLink>

                <div sx={{ display: 'flex' }}>
                    <Button color="inherit" component={Link} to="/cadastro">
                        Cadastro
                    </Button>
                    <Button color="inherit" component={Link} to="/UserTable">
                        Usuário
                    </Button>
                </div>
            </Toolbar>
        </AppBar>
    );
}

export default NavBar;
