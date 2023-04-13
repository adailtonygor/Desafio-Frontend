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
} from '@material-ui/core';
import axios from 'axios';

const UserTable = () => {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    

    useEffect(() => {
        const fetchUsers = async () => {
            const result = await axios.get('http://localhost:3000/users/');
            setUsers(result.data);
        };
        fetchUsers();
    }, []);

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:3000/users/${id}`);
        const excluirUsuario = users.filter((usuario) => usuario.id !== id);
        setUsers([...excluirUsuario]);
        //console.log(`Delete user with id ${id}`);
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
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.cpf}</TableCell>
                                    <TableCell>{user.endereco}</TableCell>
                                    <TableCell>
                                        {new Date(
                                            user.datadenascimento,
                                        ).toLocaleDateString()}
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
                <DialogTitle>Editar Usuário </DialogTitle>
                <DialogContent>
                    <TextField
                        label="Name"
                        name="name"
                        value={editingUser?.name}
                        onChange={handleInputChange}
                        fullWidth
                    />
                    <TextField
                        label="cpf"
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
                        name="datadenascimento"
                        value={editingUser?.datadenascimento}
                        onChange={handleInputChange}
                        fullWidth
                    />
                    <TextField
                        label="Sexo"
                        name="sexo"
                        value={editingUser?.sexo}
                        onChange={handleInputChange}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
           
        </div>
    );
};

export default UserTable;
