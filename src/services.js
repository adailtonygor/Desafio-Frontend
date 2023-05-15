import { ENDPOINT } from './components/endpoint';
import axios from 'axios';

export const getConsultaCep = (cep) =>
    axios.get(`${ENDPOINT.CEP}/${cep}/json/`);

export const getConsultaUf = () => axios.get(ENDPOINT.ESTADOS);

export const postOnSubmit = (data) => axios.post(ENDPOINT.USERS, data);

export const getListaUsuarios = () => axios.get(ENDPOINT.USERS);

export const deleteUsuarios = (userid) =>
    axios.delete(`${ENDPOINT.USERS}${userid}`);

export const dadosUsuario = (id, updatedUser) =>
    axios.put(`${ENDPOINT.USERS}${id}`, updatedUser);

