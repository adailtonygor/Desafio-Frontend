import { USERS_ENDPOINT } from './components/endpoint';
import { ESTADOS_ENDPOINT } from './components/endpoint';
import { CEP_ENDPOINT } from './components/endpoint';
import axios from 'axios';

export const getConsultaCep = (cep) =>
    axios.get(`${CEP_ENDPOINT}/${cep}/json/`);

export const getConsultaUf = () => axios.get(ESTADOS_ENDPOINT);

export const postOnSubmit = (data) => axios.post(USERS_ENDPOINT, data);

export const getListaUsuarios = () => axios.get(USERS_ENDPOINT);

export const deleteUsuarios = (userid) =>
    axios.delete(`${USERS_ENDPOINT}${userid}`);

export const dadosUsuario = (editingUser, updatedUser) =>
    axios.put(`${USERS_ENDPOINT}${editingUser.id}`, updatedUser);
