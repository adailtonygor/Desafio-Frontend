import React, { useState } from 'react';
import { TextField, Button, Grid, Box } from '@material-ui/core';




function App() {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [endereco, setEndereco] = useState('');
  const [complemento, setComplemento] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');

  const handleNomeChange = (event) => {
    const value = event.target.value.replace(/[^a-zA-Z\s]/g, '').substr(0, 50);
    setNome(value);
  };

  const handleCpfChange = (event) => {
    const value = event.target.value.replace(/[^0-9]/g, '').substr(0, 11);
    setCpf(value);
  };

  const handleEnderecoChange = (event) => {
    const value = event.target.value.substr(0, 50);
    setEndereco(value);
  };

  const handleComplementoChange = (event) => {
    const value = event.target.value.substr(0, 50);
    setComplemento(value);
  };

  const handleDataNascimentoChange = (event) => {
    setDataNascimento(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({
      nome,
      cpf,
      endereco,
      complemento,
      dataNascimento,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Nome"
            value={nome}
            onChange={handleNomeChange}
            inputProps={{ maxLength: 50 }}
           
          />

        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="CPF"
            value={cpf}
            onChange={handleCpfChange}
            inputProps={{ maxLength: 11 }}
          />

        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Endereço"
            value={endereco}
            onChange={handleEnderecoChange}
            inputProps={{ maxLength: 50 }}
          />

        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Complemento"
            value={complemento}
            onChange={handleComplementoChange}
            inputProps={{ maxLength: 50 }}
            
          />

        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Data de Nascimento"
            type="date"
            value={dataNascimento}
            onChange={handleDataNascimentoChange}
            InputLabelProps={{
              shrink: true,
              
            }}
          />

        </Grid>
        <Grid item xs={12}>
          <Box textAlign ="center">
          <Button type="submit" variant="contained" color="primary">
            Cadastrar
          </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
}

export default App;