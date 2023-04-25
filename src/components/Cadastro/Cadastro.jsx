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
} from '@material-ui/core';
import Axios from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const schema = yup.object().shape({
    nome: yup.string().required('Nome obrigatório'),
    cpf: yup.string().required('CPF obrigatório'),
    endereco: yup.string().required('Endereço obrigatório'),
    cidade: yup.string().required('Cidade obrigatório'),
    numero: yup.string(),
    uf: yup.string().required('Uf obrigartório'),
    nascimento: yup.string().required('Data de nascimento obrigatório'),
    sexo: yup.string().required('Informe o sexo'),
});

const Cadastro = () => {
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

    useEffect(async () => {
        if (!siglaUf || siglaUf.length === 0) {
            try {
                const response = await Axios.get(
                    `https://servicodados.ibge.gov.br/api/v1/localidades/estados`,
                );
                const data = response.data;
                console.log(data);
                setSiglaUf(data);
            } catch (error) {
                console.log(error);
            }
        }
    }, [siglaUf, Axios]);

    const checkCEP = async (e) => {
        const cep = e.target.value.replace(/\D/g, '');
        console.log(cep);
        try {
            const response = await Axios.get(
                `https://viacep.com.br/ws/${cep}/json/`,
            );
            const data = response.data;
            console.log(data);
            setValue('endereco', data.logradouro);
            setValue('cidade', data.localidade);
            setValue('uf', data.uf);
        } catch (error) {
            console.log(error);
        }
    };

    const onSubmit = async (data) => {
        console.log(data);
        try {
            const response = await Axios.post(
                'http://localhost:3000/users/',
                data,
            );
            console.log(response.data);

            navigate('/consultar-usuario');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1
                style={{ textAlign: 'center', color: 'Black', padding: '10px' }}
            >
                Cadastro
            </h1>
            <Box sx={{ width: '99%' }}>
                <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    style={{ height: '60vh', marginLeft: '15px' }}
                >
                    <Grid
                        item
                        container
                        columnspacing={{ xs: 1, sm: 2, md: 3 }}
                        xs={7}
                    >
                        <Grid item xs={6}>
                            <TextField
                                variant="outlined"
                                placeholder="Nome"
                                {...register('nome')}
                                error={Boolean(errors.nome)}
                                style={{ width: '400px', margin: '10px' }}
                            />
                            {errors.nome && (
                                <FormHelperText error>
                                    {errors.nome?.message}
                                </FormHelperText>
                            )}
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                variant="outlined"
                                placeholder="CPF"
                                {...register('cpf')}
                                error={Boolean(errors.cpf)}
                                style={{ width: '400px', margin: '10px' }}
                            />
                            {errors.cpf && (
                                <FormHelperText error>
                                    {errors.cpf?.message}
                                </FormHelperText>
                            )}
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                variant="outlined"
                                placeholder="Endereço"
                                {...register('endereco')}
                                error={Boolean(errors.endereco)}
                                style={{ width: '400px', margin: '10px' }}
                            />
                            {errors.endereco && (
                                <FormHelperText error>
                                    {errors.endereco?.message}
                                </FormHelperText>
                            )}
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                variant="outlined"
                                placeholder="CEP"
                                {...register('cep')}
                                onBlur={checkCEP}
                                error={Boolean(errors.cep)}
                                style={{ width: '400px', margin: '10px' }}
                            />
                            {errors.cep && (
                                <FormHelperText error>
                                    {errors.cep?.message}
                                </FormHelperText>
                            )}
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                variant="outlined"
                                placeholder="Cidade"
                                {...register('cidade')}
                                error={Boolean(errors.cidade)}
                                fullWidth
                                style={{ width: '400px', margin: '10px' }}
                            />
                            {errors.cidade && (
                                <FormHelperText error>
                                    {errors.cidade?.message}
                                </FormHelperText>
                            )}
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                variant="outlined"
                                placeholder="Número"
                                {...register('numero')}
                                error={Boolean(errors.numero)}
                                fullWidth
                                style={{ width: '400px', margin: '10px' }}
                            />
                            {errors.numero && (
                                <FormHelperText error>
                                    {errors.numero?.message}
                                </FormHelperText>
                            )}
                        </Grid>

                        <Grid item xs={6}>
                            <FormControl variant="outlined">
                                <Select
                                    native
                                    variant="outlined"
                                    id="uf"
                                    {...register('uf')}
                                    error={Boolean(errors.uf)}
                                    style={{ width: '400px', margin: '10px' }}
                                >
                                    <option value="">
                                        Selecione UF
                                    </option>
                                    {siglaUf.sort().map((uf) => (
                                        // eslint-disable-next-line react/jsx-key
                                        <option key={`${uf}`} value={uf.sigla}>
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

                        <Grid item xs={6}>
                            <TextField
                                variant="outlined"
                                placeholder="Data de nascimento"
                                type="date"
                                {...register('nascimento')}
                                error={Boolean(errors.nascimento)}
                                style={{ width: '400px', margin: '10px' }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            {errors.nascimento && (
                                <FormHelperText error>
                                    {errors.nascimento?.message ===
                                    'Campo obrigatório'
                                        ? 'Por favor, informe a data de nascimento'
                                        : 'Data de nascimento inválida'}
                                </FormHelperText>
                            )}
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl
                                style={{ width: '400px', margin: '10px' }}
                            >
                                <InputLabel id="sexo-label">Sexo</InputLabel>
                                <Select
                                    variant="outlined"
                                    labelId="sexo-label"
                                    id="sexo-label"
                                    value={sexo}
                                    {...register('sexo')}
                                    onChange={(e) => setSexo(e.target.value)}
                                    error={Boolean(errors.sexo)}
                                >
                                    <MenuItem value="Feminino">
                                        Feminino
                                    </MenuItem>
                                    <MenuItem value="Masculino">
                                        Masculino
                                    </MenuItem>
                                </Select>
                                {errors.sexo && (
                                    <FormHelperText error>
                                        {errors.sexo?.message}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                        <Grid
                            container
                            justifyContent="center"
                            style={{ marginBottom: '10px' }}
                        >
                            <Box mt={6}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                >
                                    Cadastrar
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </form>
    );
};

export default Cadastro;
