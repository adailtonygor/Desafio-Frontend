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
    Box,
    CircularProgress,
    InputAdornment,
} from '@material-ui/core';
import Axios from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useStyles from './Styles';

import { getConsultaCep, getConsultaUf, postOnSubmit } from '../../services';



const schema = yup.object().shape({
    nome: yup.string().required('Nome obrigatório'),
    cpf: yup.string().required('CPF obrigatório'),
    endereco: yup.string().required('Endereço obrigatório'),
    cidade: yup.string().required('Cidade obrigatório'),
    numero: yup.string(),
    uf: yup.string().required('Uf obrigartório'),
    nascimento: yup.string().required('Data de nascimento obrigatório'),
    sexo: yup.string().required('Informe o sexo'),
    cep: yup.string().required('CEP obrigatório'),
});

const Cadastro = () => {
    const [loading, setLoading] = useState(false);
    const classes = useStyles();
    const [siglaUf, setSiglaUf] = useState([]);
    const [sexo, setSexo] = useState('');
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        async function fetchData() {
            if (!siglaUf || siglaUf.length === 0) {
                try {
                    const response = await getConsultaUf();
                    const data = response.data;

                    setSiglaUf(data);
                } catch (error) {
                    console.error(error);
                }
            }
        }
        fetchData();
    }, [siglaUf, Axios]);

    const checkCEP = async (e) => {
        setLoading(true);
        const cep = e.target.value.replace(/\D/g, '');
        try {
            const response = await getConsultaCep(cep);
            const data = response.data;
            setValue('endereco', data.logradouro);
            setValue('cidade', data.localidade);
            setValue('uf', data.uf);
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    const onSubmit = async (data) => {
        try {
            await postOnSubmit(data);
            navigate('/consultar-usuario');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <h1 className={classes.titulo}>Cadastro</h1>

            <Grid container spacing={1}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        variant="outlined"
                        placeholder="Nome"
                        {...register('nome')}
                        error={Boolean(errors.nome)}
                        fullWidth
                    />
                    {errors.nome && (
                        <FormHelperText error>
                            {errors.nome?.message}
                        </FormHelperText>
                    )}
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        variant="outlined"
                        placeholder="CPF"
                        {...register('cpf')}
                        error={Boolean(errors.cpf)}
                        fullWidth
                    />
                    {errors.cpf && (
                        <FormHelperText error>
                            {errors.cpf?.message}
                        </FormHelperText>
                    )}
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        disabled={loading}
                        variant="outlined"
                        placeholder="CEP"
                        {...register('cep')}
                        onBlur={checkCEP}
                        error={Boolean(errors.cep)}
                        fullWidth
                        InputProps={{
                            startAdornment: loading && (
                                <InputAdornment position="start">
                                    <CircularProgress />
                                </InputAdornment>
                            ),
                        }}
                    />

                    {errors.cep && (
                        <FormHelperText error>
                            {errors.cep?.message}
                        </FormHelperText>
                    )}
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        variant="outlined"
                        placeholder="Endereço"
                        {...register('endereco')}
                        error={Boolean(errors.endereco)}
                        fullWidth
                    />
                    {errors.endereco && (
                        <FormHelperText error>
                            {errors.endereco?.message}
                        </FormHelperText>
                    )}
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        variant="outlined"
                        placeholder="Cidade"
                        {...register('cidade')}
                        error={Boolean(errors.cidade)}
                        fullWidth
                    />
                    {errors.cidade && (
                        <FormHelperText error>
                            {errors.cidade?.message}
                        </FormHelperText>
                    )}
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        variant="outlined"
                        placeholder="Número"
                        {...register('numero')}
                        error={Boolean(errors.numero)}
                        fullWidth
                    />
                    {errors.numero && (
                        <FormHelperText error>
                            {errors.numero?.message}
                        </FormHelperText>
                    )}
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth variant="outlined">
                        <Select
                            native
                            variant="outlined"
                            id="uf"
                            {...register('uf')}
                            error={Boolean(errors.uf)}
                        >
                            <option value="">Selecione UF</option>
                            {siglaUf.sort().map((uf, index) => (
                                // eslint-disable-next-line react/jsx-key
                                <option key={index} value={uf.sigla}>
                                    {uf.sigla}
                                </option>
                            ))}
                        </Select>
                        {errors.uf && (
                            <FormHelperText error>
                                {errors.uf?.message}
                            </FormHelperText>
                        )}
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        variant="outlined"
                        placeholder="Data de nascimento"
                        type="date"
                        {...register('nascimento')}
                        error={Boolean(errors.nascimento)}
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    {errors.nascimento && (
                        <FormHelperText error>
                            {errors.nascimento?.message}
                        </FormHelperText>
                    )}
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl className={classes.margin} fullWidth>
                        <InputLabel htmlFor="sexo">Sexo</InputLabel>
                        <Select
                            variant="outlined"
                            label="Sexo"
                            id="sexo-label"
                            value={sexo}
                            {...register('sexo')}
                            onChange={(e) => setSexo(e.target.value)}
                            error={Boolean(errors.sexo)}
                        >
                            <MenuItem value=""> Selecione o Sexo </MenuItem>
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
                <Grid item xs={12} sm={12}>
                    <Box className={classes.button}>
                        <Button
                            type="submit"
                            variant="outlined"
                            color="primary"
                        >
                            Cadastrar
                        </Button>
                        <Box mx={2}></Box>
                        <Button
                            type="reset"
                            variant="outlined"
                            color="secondary"
                        >
                            Limpar
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </form>
    );
};

export default Cadastro;
