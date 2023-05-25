import { FormProvider, useForm } from 'react-hook-form';

import { useNavigate } from 'react-router-dom';

import { postOnSubmit } from '../../services';
import FormUsuario from '../FormUsuario/FormUsuario';
import { useMemo, useState } from 'react';
import { schema } from '../FormUsuario/schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@mui/material';

const Cadastro = () => {
    const [mensagemError, setMensagemError] = useState(null);

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            await postOnSubmit(data);
            navigate('/consultar-usuario');
        } catch (error) {
            setMensagemError(error.response.data);
            console.error(error);
        }
    };

    const validations = useMemo(() => schema(), []);

    const methods = useForm({
        resolver: yupResolver(validations),
    });

    return (
        <FormProvider {...methods}>
            <FormUsuario isEdicao={false} onSubmit={onSubmit} />
            <Snackbar
                open={Boolean(mensagemError)}
                autoHideDuration={3000}
                onClose={() => setMensagemError(null)}
            >
                <Alert onClose={() => setMensagemError(null)} severity="error">
                    {mensagemError}
                </Alert>
            </Snackbar>
        </FormProvider>
    );
};

export default Cadastro;
