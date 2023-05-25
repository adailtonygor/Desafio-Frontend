import { useState, useEffect, useMemo } from 'react';
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
    TextField,
    Select,
    MenuItem,
} from '@material-ui/core';
import { Alert } from '@mui/material';
import useStyles from './Styles';
import EditarUsuario from '../EditarUsuario/EditarUsuario';
import {
    editarUsuario,
    deleteUsuarios,
    getListaUsuarios,
} from '../../services';
import { useForm } from 'react-hook-form';
import { schema } from '../FormUsuario/schema';
import { yupResolver } from '@hookform/resolvers/yup';

const ConsultarUsuario = () => {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [showMessage, setShowMessage] = useState(false);
    const [open, setOpen] = useState(false);
    const [cpf, setCpf] = useState(null);
    const [searchTermo, setSearchTermo] = useState('');
    const [searchTipo, setSearchTipo] = useState('nome');

    const classes = useStyles();

    useEffect(() => {
        const fetchUsers = async () => {
            const result = await getListaUsuarios();

            setUsers(result.content);
        };
        fetchUsers();
    }, []);

    const handleSearchTermoChange = (event) => {
        setSearchTermo(event.target.value);
        setPage(0);
    };
    const handleSearchTipoChange = (event) => {
        setSearchTipo(event.target.value);
        setSearchTermo('');
        setPage(0);
    };

    const validations = useMemo(() => schema(), []);

    const methods = useForm({
        resolver: yupResolver(validations),
    });

    const { setValue } = methods;

    const handleClickOpen = (cpf) => {
        setCpf(cpf);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = async () => {
        await deleteUsuarios(cpf);
        const excluirUsuario = users.filter((usuario) => usuario.cpf !== cpf);
        setUsers([...excluirUsuario]);
        setOpen(false);
    };

    const handleEdit = (cpf) => {
        const user = users.find((user) => user.cpf === cpf);
        setValue('nome', user?.nome);
        setValue('cpf', user?.cpf);
        setValue('cep', user?.cep);
        setValue('endereco', user?.endereco);
        setValue('cidade', user?.cidade);
        setValue('numero', user?.numero);
        setValue('uf', user?.uf);
        setValue('nascimento', user?.nascimento);
        setValue('sexo', user?.sexo);

        setEditingUser(user);
        setOpenDialog(true);
    };

    const handleSave = async (data) => {
        try {
            await editarUsuario(editingUser.cpf, data);

            setShowMessage(true);
            setEditingUser(null);
            setOpenDialog(false);
            setUsers((prevUsers) => {
                const updatedUsers = [...prevUsers];
                const userIndex = prevUsers.findIndex(
                    (user) => user.cpf === editingUser.cpf,
                );
                updatedUsers[userIndex] = {
                    ...data,
                    id: editingUser.id,
                    cpf: editingUser.cpf,
                };
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
                <Grid
                    container
                    justifyContent="center"
                    className={classes.buscaAvancada}
                >
                    <Grid item xs={2}>
                        <TextField
                            label="Pesquisar"
                            value={searchTermo}
                            onChange={handleSearchTermoChange}
                            variant="outlined"
                            size="small"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <Select
                            value={searchTipo}
                            onChange={handleSearchTipoChange}
                            variant="outlined"
                            size="small"
                            fullWidth
                            className={classes.buscaPesquisa}
                        >
                            <MenuItem value="nome">Nome</MenuItem>
                            <MenuItem value="cpf">CPF</MenuItem>
                            <MenuItem value="nascimento">
                                Data de Nascimento
                            </MenuItem>
                            <MenuItem value="sexo">Sexo</MenuItem>
                            <MenuItem value="uf">UF</MenuItem>
                            <MenuItem value="cidade">Cidade</MenuItem>
                        </Select>
                    </Grid>
                </Grid>
                <Table className={classes.tableUsuarios}>
                    <TableHead>
                        <TableRow>
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
                            .filter((user) => {
                                if (searchTermo) {
                                    switch (searchTipo) {
                                        case 'nome':
                                            if (
                                                !user.nome
                                                    .toLowerCase()
                                                    .includes(
                                                        searchTermo.toLowerCase(),
                                                    )
                                            ) {
                                                return false;
                                            }
                                            break;
                                        case 'cpf':
                                            if (
                                                !user.cpf
                                                    .toLowerCase()
                                                    .includes(
                                                        searchTermo.toLowerCase(),
                                                    )
                                            ) {
                                                return false;
                                            }
                                            break;

                                        case 'sexo':
                                            if (
                                                !user.sexo
                                                    .toLowerCase()
                                                    .includes(
                                                        searchTermo.toLowerCase(),
                                                    )
                                            ) {
                                                return false;
                                            }
                                            break;
                                        case 'uf':
                                            if (
                                                !user.uf
                                                    .toLowerCase()
                                                    .includes(
                                                        searchTermo.toLowerCase(),
                                                    )
                                            ) {
                                                return false;
                                            }
                                            break;
                                        case 'cidade':
                                            if (
                                                !user.cidade
                                                    .toLowerCase()
                                                    .includes(
                                                        searchTermo.toLowerCase(),
                                                    )
                                            ) {
                                                return false;
                                            }
                                            break;
                                        default:
                                            return true;
                                    }
                                }
                                return true;
                            })
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage,
                            )
                            .map((user, index) => (
                                <TableRow key={`${user.id}-${index}`}>
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
                                                        handleEdit(user.cpf)
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
                                                        handleClickOpen(
                                                            user.cpf,
                                                        )
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
                open={openDialog}
                handleSave={handleSave}
                methods={methods}
                onClickCancel={() => handleCancel()}
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
