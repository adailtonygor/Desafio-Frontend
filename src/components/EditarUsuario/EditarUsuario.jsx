/* eslint-disable react/prop-types */
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    MenuItem,
    Grid,
    Button,
} from '@material-ui/core';
import useStyles from './Styles';

const EditarUsurio = ({
    open,
    onClose,
    editingUser,
    handleInputChange,
    formSexo,
    handleCancel,
    handleSave,
}) => {
    const classes = useStyles();

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle className={classes.titulo}>Editar usuário</DialogTitle>

            <DialogContent className={classes.root}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            label="Nome"
                            name="nome"
                            value={editingUser?.nome}
                            onChange={handleInputChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            label="CPF"
                            name="cpf"
                            value={editingUser?.cpf}
                            onChange={handleInputChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            variant="outlined"
                            label="CEP"
                            name="cep"
                            value={editingUser?.cep}
                            onChange={handleInputChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            variant="outlined"
                            label="Endereço"
                            name="endereco"
                            value={editingUser?.endereco}
                            onChange={handleInputChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            variant="outlined"
                            label="Número"
                            name="numero"
                            value={editingUser?.numero}
                            onChange={handleInputChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            variant="outlined"
                            label="Cidade"
                            name="cidade"
                            value={editingUser?.cidade}
                            onChange={handleInputChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            variant="outlined"
                            select
                            label="UF"
                            name="uf"
                            value={editingUser?.uf || ''}
                            onChange={handleInputChange}
                            fullWidth
                        ></TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            variant="outlined"
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
                            variant="outlined"
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
            <DialogActions className={classes.button}>
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
    );
};

export default EditarUsurio;
