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
    DialogActions,
    TablePagination,
    Snackbar,
    MenuItem,
} from '@material-ui/core';
import axios from 'axios';

const ConsultarUsuario = () => {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [showMessage, setShowMessage] = useState(false);
    const [formSexo, setFormSexo] = useState({ sexo: '' });

    
    useEffect(() => {
        const fetchUsers = async () => {
            const result = await axios.get('http://localhost:3000/users/');
            setUsers(result.data);
        };
        fetchUsers();
    }, []);

    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            'Tem certeza que deseja excluir este usuário?',
        );
        if (confirmed) {
            await axios.delete(`http://localhost:3000/users/${id}`);
            const excluirUsuario = users.filter((usuario) => usuario.id !== id);
            setUsers([...excluirUsuario]);
            //console.log(`Delete user with id ${id}`);
        }
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
                                                        handleDelete(user.id)
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

            <Dialog open={openDialog} onClose={handleCancel}>
                <DialogTitle
                    style={{
                        color: 'white',
                        textAlign: 'center',
                        backgroundColor: '#1565c0',
                    }}
                >
                    Editar Usuário{' '}
                </DialogTitle>
                <DialogContent style={{ fontSize: '30px', lineHeight: '3em' }}>
                    <TextField
                        label="Nome"
                        name="nome"
                        value={editingUser?.nome}
                        onChange={handleInputChange}
                        fullWidth
                    />
                    <TextField
                        label="CPF"
                        name="cpf"
                        value={editingUser?.cpf}
                        onChange={handleInputChange}
                        fullWidth
                    />
                    <TextField
                        label="Endereço"
                        name="endereco"
                        value={editingUser?.endereco}
                        onChange={handleInputChange}
                        fullWidth
                    />
                    <TextField
                        label="Data de nascimento"
                        name="nascimento"
                        value={editingUser?.nascimento}
                        onChange={handleInputChange}
                        fullWidth
                        //type='date'
                        //InputLabelProps={{
                        //  shrink: true,
                        //  }}
                    />
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
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleCancel}
                        variant="outlined"
                        color="secondary"
                    >
                        Cancel
                    </Button>
                    <Button
                        id="btn-success"
                        onClick={handleSave}
                        variant="outlined"
                        color="primary"
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
            {showMessage && (
                <Snackbar
                    open={showMessage}
                    autoHideDuration={2000}
                    onClose={() => setShowMessage(false)}
                    message="Usuário cadastrado com sucesso!"
                />
            )}
        </div>
    );
};

export default ConsultarUsuario;
