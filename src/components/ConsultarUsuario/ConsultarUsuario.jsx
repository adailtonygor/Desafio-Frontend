import { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Grid,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    TablePagination,
    Snackbar,
} from '@material-ui/core';
import { Alert } from '@mui/material';
import useStyles from './Styles';
import EditarUsuario from '../EditarUsuario/EditarUsuario';
import { dadosUsuario, deleteUsuarios, getListaUsuarios } from '../../services';

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
    const classes = useStyles();

    useEffect(() => {
        const fetchUsers = async () => {
            const result = await getListaUsuarios();
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
        await deleteUsuarios(userid);
        const excluirUsuario = users.filter((usuario) => usuario.id !== userid);
        setUsers([...excluirUsuario]);
        setOpen(false);
    };
    const handleEdit = (id) => {
        const user = users.find((user) => user.id === id);
        setEditingUser(user);
        setFormSexo({ sexo: user.sexo });
        setOpenDialog(true);
    };

    const handleSave = async () => {
        try {
            const updatedUser = { ...editingUser };
            await dadosUsuario(editingUser, updatedUser);

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
            console.error(error);
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
                            <TableCell>CEP</TableCell>
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
                                    <TableCell>{user.cep}</TableCell>
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
                    className={classes.colorConfirmarExclusão}
                    id="alert-dialog-title"
                ></DialogTitle>
                <DialogContent>
                    <DialogContentText
                        id="alert-dialog-description"
                        className={classes.excluirUsuarioDialog}
                    >
                        Tem certeza que deseja excluir este usuário ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions className={classes.botoesExcluirUsuarioDialog}>
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

            <EditarUsuario
                user={editingUser}
                open={openDialog}
                formSexo={formSexo}
                editingUser={editingUser}
                handleInputChange={handleInputChange}
                handleCancel={handleCancel}
                handleSave={handleSave}
                setOpen={setOpenDialog}
            />

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
