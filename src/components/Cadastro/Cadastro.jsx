import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, RadioGroup, Radio, FormControlLabel,Grid } from '@material-ui/core';
import Axios from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  name: yup.string().required('Nome e obrigatorio'),
  cpf: yup.string().required('CPF e obrigatorio').matches(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, 'CPF must be in the format XXX.XXX.XXX-XX'),
  address: yup.string().required('Endereço obrigatorio'),
  birthday: yup.date().required('Birthday is required'),
  sex: yup.string().required('Sex is required')
});

const Cadastro = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    try {
      const response = await Axios.post('/api/register', data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
       <Grid container direction="column"  alignItems="center" spacing={3}>
        <Grid item >
      <TextField
      
        label="Name"
        {...register("name")}
        error={!!errors.name}
        helperText={errors.name?.message}
      />
      </Grid>
      <Grid item >
      <TextField
        label="CPF"
        {...register("cpf")}
        error={!!errors.cpf}
        helperText={errors.cpf?.message}
      />
      </Grid>
      <Grid item >
      <TextField
        label="Address"
        {...register("address")}
        error={!!errors.address}
        helperText={errors.address?.message}
      />
       </Grid>
       <Grid item >
      <TextField
        label="Birthday"
        type="date"
        {...register("birthday")}
        error={!!errors.birthday}
        helperText={errors.birthday?.message}
        InputLabelProps={{
          shrink: true,
        }}
      />
      </Grid>
      <Grid item >
      <RadioGroup {...register("sex")} error={!!errors.sex} helperText={errors.sex?.message}>
        <FormControlLabel value="Masculino" control={<Radio />} label="Masculino" />
        <FormControlLabel value="Feminino" control={<Radio />} label="Feminino" />
      </RadioGroup>
      <Button type="submit" variant="contained" color="primary">Enviar</Button>
      </Grid>
      </Grid>
    </form>
  );
};

export default Cadastro;