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
} from '@material-ui/core';
import { useFormContext } from 'react-hook-form';

import useStyles from './Styles';
import { checkCEP } from '../../services';
import { useState, useEffect } from 'react';
import InputMask from 'react-input-mask';
import { getConsultaUf } from '../../services';

// eslint-disable-next-line react/prop-types
const FormUsuario = ({ isEdicao, onSubmit, onClickCancel }) => {
    const classes = useStyles();

    const [cepError, setCepError] = useState('');
    const [loading, setLoading] = useState(false);
    const [siglaUf, setSiglaUf] = useState([]);

    const {
        register,
        setValue,
        getValues,
        handleSubmit,
        formState: { errors },
    } = useFormContext();

    const handleCheckCep = async (e) => {
        await checkCEP(e, setLoading, setValue, setCepError);
    };

    const fetchData = async () => {
        try {
            const response = await getConsultaUf();
            const data = response.data;
            setSiglaUf(data);
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
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <h1 className={classes.titulo}>{isEdicao ? '' : 'Cadastro'}</h1>

            <Grid container spacing={1}>
                <Grid item xs={12} sm={6}>
                    <TextField
                    label='Nome'
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
                        error={Boolean(errors.cpf)}
                        defaultValue={getValues('cpf')}
                        helperText={errors.cpf?.message}
                        fullWidth
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
                        <InputLabel shrink={Boolean(getValues('uf'))}>
                            {Boolean(getValues('uf')) ? '' : 'UF'}
                        </InputLabel>
                        <Select
                            label="UF"
                            id="demo-simple-select-outlined"
                            native
                            variant="outlined"
                            {...register('uf')}
                            value={getValues('uf')}
                            onChange={(event) =>
                                setValue('uf', event.target.value)
                            }
                            error={Boolean(errors.uf)}
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
                        {...register('nascimento', {
                            validate: {
                                notFuture: (value) => {
                                    const selectedDate = new Date(value);
                                    const today = new Date();
                                    today.setHours(0, 0, 0, 0);
                                    return (
                                        selectedDate <= today ||
                                        'Data de nascimento não pode ser no futuro'
                                    );
                                },
                            },
                        })}
                        error={Boolean(errors.nascimento)}
                        fullWidth
                        helperText={errors.nascimento?.message}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputProps={{
                            max: new Date().toISOString().slice(0, 10),
                        }}
                    />
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
