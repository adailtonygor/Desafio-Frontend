import { FormProvider, useForm } from 'react-hook-form';

import { useNavigate } from 'react-router-dom';

import { postOnSubmit } from '../../services';
import FormUsuario from '../FormUsuario/FormUsuario';
import { useMemo } from 'react';
import {schema} from '../FormUsuario/schema';
import { yupResolver } from '@hookform/resolvers/yup';



const Cadastro = () => {
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
         
            await postOnSubmit(data);
            navigate('/consultar-usuario');
          
        } catch (error) {
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
        </FormProvider>
    );
};

export default Cadastro;
