import { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Grid,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    TablePagination,
    Snackbar,
    MenuItem,
} from '@material-ui/core';
import axios from 'axios';
import { Alert } from '@mui/material';

const ConsultarUsuario = () => {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [showMessage, setShowMessage] = useState(false);
    const [formSexo, setFormSexo] = useState({ sexo: '' });
    const [open, setOpen] = useState(false);
    const [userid, setUserid] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            const result = await axios.get('http://localhost:3000/users/');
            setUsers(result.data);
        };
        fetchUsers();
    }, []);

    const handleClickOpen = (id) => {
        setUserid(id);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = async () => {
        await axios.delete(`http://localhost:3000/users/${userid}`);
        const excluirUsuario = users.filter((usuario) => usuario.id !== userid);
        setUsers([...excluirUsuario]);
        setOpen(false);
    };
    const handleEdit = (id) => {
        const userToEdit = users.find((user) => user.id === id);
        setEditingUser(userToEdit);
        setOpenDialog(true);
    };

    const handleSave = async () => {
        try {
            const updatedUser = { ...editingUser };
            const result = await axios.put(
                `http://localhost:3000/users/${editingUser.id}`,
                updatedUser,
            );
            console.log(result);
            setShowMessage(true);
            setEditingUser(null);
            setOpenDialog(false);
            setUsers((prevUsers) => {
                const updatedUsers = [...prevUsers];
                const userIndex = prevUsers.findIndex(
                    (user) => user.id === editingUser.id,
                );
                updatedUsers[userIndex] = updatedUser;
                return updatedUsers;
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleCancel = () => {
        setEditingUser(null);
        setOpenDialog(false);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormSexo((prevFormSexo) => ({ ...prevFormSexo, [name]: value }));
        setEditingUser((prevEditingUser) => ({
            ...prevEditingUser,
            [name]: value,
        }));
    };
    const handleChangePage = (_event, newPage) => {
        const maxPage = Math.ceil(users.length / rowsPerPage) - 1;
        if (newPage >= 0 && newPage <= maxPage) {
            setPage(newPage);
        }
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Nome</TableCell>
                            <TableCell>CPF</TableCell>
                            <TableCell>Endereço</TableCell>
                            <TableCell>Cidade</TableCell>
                            <TableCell>Número</TableCell>
                            <TableCell>UF</TableCell>
                            <TableCell>Data de Nascimento</TableCell>
                            <TableCell>Sexo</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage,
                            )
                            .map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>{user.id}</TableCell>
                                    <TableCell>{user.nome}</TableCell>
                                    <TableCell>{user.cpf}</TableCell>
                                    <TableCell>{user.endereco}</TableCell>
                                    <TableCell>{user.cidade}</TableCell>
                                    <TableCell>{user.numero}</TableCell>
                                    <TableCell>{user.uf}</TableCell>
                                    <TableCell>
                                        {new Date(
                                            user.nascimento,
                                        ).toLocaleDateString('pt-BR')}
                                    </TableCell>
                                    <TableCell>{user.sexo}</TableCell>
                                    <TableCell>
                                        <Grid container spacing={1}>
                                            <Grid item>
                                                <Button
                                                    variant="outlined"
                                                    color="primary"
                                                    onClick={() =>
                                                        handleEdit(user.id)
                                                    }
                                                >
                                                    Editar
                                                </Button>
                                            </Grid>
                                            <Grid item>
                                                <Button
                                                    variant="outlined"
                                                    color="secondary"
                                                    onClick={() =>
                                                        handleClickOpen(user.id)
                                                    }
                                                >
                                                    Excluir
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
                <TablePagination
                    labelRowsPerPage="Linhas por página"
                    labelDisplayedRows={({ from, to, count }) =>
                        `${from}-${to} de ${count}`
                    }
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={users.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle
                    style={{ backgroundColor: '#2c387e' }}
                    id="alert-dialog-title"
                >
                    {''}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText
                        id="alert-dialog-description"
                        style={{
                            fontSize: '18px',
                            fontWeight: 'bold',
                            textAlign: 'center',
                            color: 'black',
                        }}
                    >
                        Tem certeza que deseja excluir este usuário ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions style={{ justifyContent: 'center' }}>
                    <Button
                        onClick={handleClose}
                        variant="outlined"
                        color="primary"
                        autoFocus
                    >
                        Cancelar
                    </Button>
                    <Button
                        onClick={handleDelete}
                        variant="outlined"
                        color="secondary"
                    >
                        Excluir
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openDialog} onClose={handleCancel}>
                <DialogTitle
                    style={{
                        color: 'white',
                        textAlign: 'center',
                        backgroundColor: '#1565c0',
                    }}
                >
                    Editar usuário
                </DialogTitle>

                <DialogContent
                    style={{
                        fontSize: '40px',
                        lineHeight: '1.5em',
                    }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Nome"
                                name="nome"
                                value={editingUser?.nome}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="CPF"
                                name="cpf"
                                value={editingUser?.cpf}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Endereço"
                                name="endereco"
                                value={editingUser?.endereco}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Número"
                                name="numero"
                                value={editingUser?.numero}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Cidade"
                                name="cidade"
                                value={editingUser?.cidade}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                select
                                label="UF"
                                name="uf"
                                value={editingUser?.uf}
                                onChange={handleInputChange}
                                fullWidth
                            >
                                
                                <MenuItem value="AC">AC</MenuItem>
                                <MenuItem value="AL">AL</MenuItem>
                                <MenuItem value="AP">AP</MenuItem>
                                <MenuItem value="GO">GO</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Data de Nascimento"
                                name="nascimento"
                                value={editingUser?.nascimento}
                                onChange={handleInputChange}
                                type="date"
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                select
                                label="Sexo"
                                name="sexo"
                                value={formSexo?.sexo}
                                onChange={handleInputChange}
                                fullWidth
                            >
                                <MenuItem value="Masculino">Masculino</MenuItem>
                                <MenuItem value="Feminino">Feminino</MenuItem>
                            </TextField>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions style={{ justifyContent: 'center' }}>
                    <Button
                        id="btn-success"
                        onClick={handleSave}
                        variant="outlined"
                        color="primary"
                    >
                        Salvar
                    </Button>
                    <Button
                        onClick={handleCancel}
                        variant="outlined"
                        color="secondary"
                    >
                        Cancelar
                    </Button>
                </DialogActions>
            </Dialog>
            {showMessage && (
                <Snackbar
                    open={showMessage}
                    autoHideDuration={3000}
                    onClose={() => setShowMessage(false)}
                >
                    <Alert
                        onClose={() => setShowMessage(false)}
                        severity="success"
                    >
                        Usuário cadastrado com sucesso!
                    </Alert>
                </Snackbar>
            )}
        </div>
    );
};

export default ConsultarUsuario;
