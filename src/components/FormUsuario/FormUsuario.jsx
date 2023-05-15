/* eslint-disable no-extra-boolean-cast */
import {
    Grid,
    TextField,
    InputAdornment,
    FormControl,
    InputLabel,
    FormHelperText,
    Select,
    Box,
    Button,
    CircularProgress,
    MenuItem,
    Typography,
} from '@material-ui/core';
import { useFormContext } from 'react-hook-form';

import useStyles from './Styles';
import { checkCEP } from '../Hooks/Hooks';
import { useState, useEffect } from 'react';
import InputMask from 'react-input-mask';
import { getConsultaUf } from '../../services';
import { validateCPF } from '../ValidarCPF/validarCpf';
// eslint-disable-next-line react/prop-types
const FormUsuario = ({ isEdicao, onSubmit, onClickCancel }) => {
    const classes = useStyles();

    const [cepError, setCepError] = useState('');
    const [loading, setLoading] = useState(false);
    const [siglaUf, setSiglaUf] = useState([]);
    const [isCPFValid, setIsCPFValid] = useState(true);
    
    const handleCPFChange = (event) => {
        const cpf = event.target.value;
        if (cpf) {
            const isValid = validateCPF(cpf);
            setIsCPFValid(isValid);
        } else {
            setIsCPFValid(true);
        }
    };

    const {
        register,
        setValue,
        getValues,
        handleSubmit: handleFormSubmit,
        formState: { errors },
    } = useFormContext();

    const handleCheckCep = async (e) => {
        await checkCEP(e, setLoading, setValue, setCepError);
    };

    const handleSubmit = (data) => {
        if (!isCPFValid) {
            return;
        }
        onSubmit(data);
    };

    const fetchData = async () => {
        try {
            const response = await getConsultaUf();
            const data = response.data;
            setSiglaUf(data);
            if (isEdicao) {
                const ufValue = data.find((uf) => uf.sigla === getValues('uf'));
                if (ufValue) {
                    setValue('uf', ufValue.sigla);
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (!siglaUf || siglaUf.length === 0) {
            fetchData();
        }
    }, [siglaUf]);

    return (
        <form
            className={classes.form}
            onSubmit={handleFormSubmit(handleSubmit)}
        >
            <Typography className={classes.titulo} variant="h3" gutterBottom>
                {isEdicao ? '' : 'Cadastro'}
            </Typography>
            <Grid container spacing={1}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Nome"
                        type="text"
                        variant="outlined"
                        placeholder="Nome"
                        {...register('nome')}
                        error={Boolean(errors.nome)}
                        helperText={errors.nome?.message}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        type="text"
                        label="CPF"
                        variant="outlined"
                        {...register('cpf')}
                        error={Boolean(errors.cpf) || !isCPFValid}
                        defaultValue={getValues('cpf')}
                        helperText={
                            errors.cpf?.message ||
                            (!isCPFValid && 'CPF inválido')
                        }
                        fullWidth
                        onBlur={handleCPFChange}
                        InputProps={{
                            inputComponent: InputMask,
                            inputProps: {
                                mask: '999.999.999-99',
                                maskChar: null,
                                placeholder: '___.___.___-__',
                            },
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        type="text"
                        label="CEP"
                        variant="outlined"
                        {...register('cep')}
                        error={Boolean(errors.cep)}
                        defaultValue={getValues('cep')}
                        helperText={errors.cep?.message || cepError}
                        fullWidth
                        InputProps={{
                            inputComponent: InputMask,
                            inputProps: {
                                mask: '99999-999',
                                maskChar: null,
                                disabled: loading,
                                onBlur: handleCheckCep,
                            },
                            startAdornment: loading && (
                                <InputAdornment position="start">
                                    <CircularProgress />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Endereço"
                        type="text"
                        variant="outlined"
                        placeholder="Endereço"
                        {...register('endereco')}
                        error={Boolean(errors.endereco)}
                        helperText={errors.endereco?.message}
                        fullWidth
                        InputLabelProps={{
                            shrink: Boolean(getValues('endereco')) || loading,
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Cidade"
                        type="text"
                        variant="outlined"
                        placeholder="Cidade"
                        {...register('cidade')}
                        error={Boolean(errors.cidade)}
                        helperText={errors.cidade?.message}
                        fullWidth
                        InputLabelProps={{
                            shrink: Boolean(getValues('cidade')) || loading,
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Número"
                        type="number"
                        variant="outlined"
                        placeholder="Número"
                        {...register('numero')}
                        error={Boolean(errors.numero)}
                        helperText={errors.numero?.message}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth variant="outlined">
                        <InputLabel htmlFor="outlined-age-native-simple" shrink={Boolean(getValues('uf')) } >
                            UF
                        </InputLabel>
                        <Select
                            label="UF"
                            native
                            variant="outlined"
                            {...register('uf')}
                           
                            onChange={(event) =>
                                setValue('uf', event.target.value)
                            }
                            error={Boolean(errors.uf)}
                            inputlabelprops={{
                                id: 'outlined-age-native-simple',
                            }}
                        >
                            <option value=""></option>
                            {siglaUf.sort().map((uf, index) => (
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
                        label="Data de nascimento"
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
                    <FormControl
                        variant="outlined"
                        className={classes.margin}
                        fullWidth
                    >
                        <InputLabel id="demo-simple-select-outlined-label">
                            Sexo
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            variant="outlined"
                            id="demo-simple-select-outlined"
                            {...register('sexo')}
                            defaultValue={getValues('sexo')}
                            error={Boolean(errors.sexo)}
                            label="Sexo"
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
                <Grid item xs={12} sm={12}>
                    <Box className={classes.button}>
                        <Button
                            type="submit"
                            variant="outlined"
                            color="primary"
                        >
                            {isEdicao ? 'Salvar' : 'Cadastro'}
                        </Button>
                        <Box mx={2}></Box>
                        <Button
                            type={isEdicao ? 'button' : 'reset'}
                            onClick={isEdicao ? onClickCancel : null}
                            variant="outlined"
                            color="secondary"
                        >
                            {isEdicao ? 'Cancelar' : 'Limpar'}
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </form>
    );
};

export default FormUsuario;
