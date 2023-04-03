import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Button } from '@mui/material';



function NavBar() {
    return (
            <AppBar position="static">
              <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}   >
                  Desafio Nova
                </Typography>
                <Button color="inherit" component={Link} to="/cadastro">Cadastro</Button>
                <Button color="inherit" component={Link} to="/UserList">Usuário</Button>

              </Toolbar>
            </AppBar>
             
            
          );
        }
        

            
         

export default NavBar;

