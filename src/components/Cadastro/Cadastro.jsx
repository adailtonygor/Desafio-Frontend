import { useForm } from 'react-hook-form';
import {
    TextField,
    Button,
    Grid,
    FormHelperText,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@material-ui/core';
import Axios from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const schema = yup.object().shape({
    nome: yup.string().required('Nome obrigatório'),
    cpf: yup.string().required('CPF obrigatório'),
    endereco: yup.string().required('Endereço obrigatório'),
    nascimento: yup.string().required('Data de nascimento obrigatório'),
    sexo: yup.string().required('Informe o sexo'),
});

const Cadastro = () => {
    const [sexo, setSexo] = useState('');
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        console.log(data);
        try {
            const response = await Axios.post(
                'http://localhost:3000/users/',
                data,
            );
            console.log(response.data);

            navigate('/consultarUsuario');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container direction="column" alignItems="center" spacing={3}>
                <Grid item>
                    <TextField
                        label="Nome"
                        {...register('nome')}
                        error={Boolean(errors.nome)}
                        style={{ width: '400px' }}
                    />
                    {errors.nome && (
                        <FormHelperText error>
                            {errors.nome?.message}
                        </FormHelperText>
                    )}
                </Grid>
                <Grid item>
                    <TextField
                        label="CPF"
                        {...register('cpf')}
                        error={Boolean(errors.cpf)}
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
                        error={Boolean(errors.endereco)}
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
                        {...register('nascimento')}
                        error={Boolean(errors.nascimento)}
                        style={{ width: '400px' }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    {errors.nascimento && (
                        <FormHelperText error>
                            {errors.nascimento?.message === 'Campo obrigatório'
                                ? 'Por favor, informe a data de nascimento'
                                : 'Data de nascimento inválida'}
                        </FormHelperText>
                    )}
                </Grid>
                <Grid item>
                    <FormControl style={{ width: '400px' }}>
                        <InputLabel id="sexo-label">Sexo</InputLabel>
                        <Select
                            labelId="sexo-label"
                            id="sexo-label"
                            value={sexo}
                            {...register('sexo')}
                            onChange={(e) => setSexo(e.target.value)}
                            error={Boolean(errors.sexo)}
                        >
                            <MenuItem value="Feminino">Feminino</MenuItem>
                            <MenuItem value="Masculino">Masculino</MenuItem>
                        </Select>
                        {errors.sexo && (
                            <FormHelperText error>
                                {errors.sexo?.message}
                            </FormHelperText>
                        )}
                    </FormControl>
                </Grid>
                <Grid item style={{ marginBottom: '16px' }}>
                    <Button type="submit" variant="contained" color="primary">
                        Cadastrar
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default Cadastro;
