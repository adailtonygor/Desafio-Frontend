import { useState } from 'react';

import { useForm } from 'react-hook-form';
import {
    TextField,
    Button,
    RadioGroup,
    Radio,
    FormControlLabel,
    Grid,
    Snackbar,
    FormHelperText,
} from '@material-ui/core';
import { Alert } from '@mui/material';
import Axios from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';

const schema = yup.object().shape({
    name: yup.string().required('Nome obrigatório'),
    cpf: yup
        .string()
        .required('CPF obrigatório'),
        
    endereco: yup.string().required('Endereço obrigatório'),
    datadenascimento: yup.date().required('Data de nascimento obrigatório'),
    sexo: yup.string().required('Informe o sexo'),
});

const Cadastro = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const [open, setOpen] = useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const onSubmit = async (data) => {
        try {
            const response = await Axios.post(
                'http://localhost:3000/users/',
                data,
            );
            console.log(response.data);
            handleOpen();

           navigate("/UserTable")
        } catch (error) {
            console.log(error);
            handleOpen();
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container direction="column" alignItems="center" spacing={3}>
                <Grid item>
                    <TextField
                        label="Name"
                        {...register('name')}
                        error={errors.name ? true : undefined}
                        style={{ width: '400px' }}
                    />
                    {errors.name && (
                        <FormHelperText error>
                            {errors.name?.message}
                        </FormHelperText>
                    )}
                </Grid>
                <Grid item>
                    <TextField
                        label="CPF"
                        {...register('cpf')}
                        error={errors.cpf ? true : undefined}
                        style={{ width: '400px' }}
                    />
                    {errors.cpf && (
                        <FormHelperText error>
                            {errors.cpf?.message}
                        </FormHelperText>
                    )}
                </Grid>
                <Grid item>
                    <TextField
                        label="Endereço"
                        {...register('endereco')}
                        error={errors.endereco ? true : undefined}
                        style={{ width: '400px' }}
                    />
                    {errors.endereco && (
                        <FormHelperText error>
                            {errors.endereco?.message}
                        </FormHelperText>
                    )}
                </Grid>
                <Grid item>
                    <TextField
                        label="Data de nascimento"
                        type="date"
                        {...register('datadenascimento')}
                        error={errors.datadenascimento ? true : undefined}
                        style={{ width: '400px' }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    {errors.datadenascimento && (
                        <FormHelperText error>
                            {errors.datadenascimento?.message}
                        </FormHelperText>
                    )}
                </Grid>
                <Grid item>
                    <RadioGroup
                        {...register('sexo')}
                        error={errors.sexo ? true : undefined}
                    >
                        {errors.sexo && (
                            <FormHelperText error>
                                {errors.sexo?.message}
                            </FormHelperText>
                        )}
                        <FormControlLabel
                            value="Masculino"
                            control={<Radio {...register('sexo')} />}
                            label="Masculino"
                        />
                        <FormControlLabel
                            value="Feminino"
                            control={<Radio {...register('sexo')} />}
                            label="Feminino"
                        />
                    </RadioGroup>
                    <Button type="submit" variant="contained" color="primary">
                        Cadastrar
                    </Button>
                </Grid>
            </Grid>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    Cadastro realizado com sucesso!
                </Alert>
            </Snackbar>
        </form>
    );
};

export default Cadastro;
