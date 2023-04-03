import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton,} from '@material-ui/core';
import { Edit, Delete } from '@material-ui/icons';
import axios from 'axios';



const UserTable = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const result = await axios.get('https://jsonplaceholder.typicode.com/users');
      setUsers(result.data);
    };
    fetchUsers();
  }, []);

  const handleEdit = (id) => {
    console.log(`Edit user with id ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Delete user with id ${id}`);
  };
 
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Nome</TableCell>
            <TableCell>CPF</TableCell>
            <TableCell>Endereço</TableCell>
            <TableCell>Data de Nascimento</TableCell>
            <TableCell>Sexo</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.nome}</TableCell>
              <TableCell>{user.cpf}</TableCell>
              <TableCell>{user.endereco}</TableCell>
              <TableCell>{user.datadenascimento}</TableCell>
              <TableCell>{user.sexo}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleEdit(user.id)}>
                  <Edit />
                </IconButton>
                <IconButton onClick={() => handleDelete(user.id)}>
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;