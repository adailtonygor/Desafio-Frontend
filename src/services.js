import { ENDPOINT } from './components/endpoint';
import axios from 'axios';

export const getConsultaCep = (cep) =>
    axios.get(`${ENDPOINT.CEP}/${cep}/json/`);

export const getConsultaUf = () => axios.get(ENDPOINT.ESTADOS);

export const postOnSubmit = (data) =>
    axios.post(ENDPOINT.USERS + 'cadastrar', mapperToBackend(data));

export const getListaUsuarios = async () => {
    return await axios
        .get(ENDPOINT.USERS)
        .then((result) => {
            const content = result.data.content.map((data) => {
                return mapperToFrontend(data);
            });
            return {
                ...result.data,
                content,
            };
        })
        .catch((error) =>
            console.error('Não foi possivel exibir lista.', error),
        );
};

export const deleteUsuarios = (cpf) =>
    axios.delete(`${ENDPOINT.USERS}${cpf}`);


export const editarUsuario = (cpf, updatedUser) =>
    axios.put(`${ENDPOINT.USERS}${cpf}`,mapperToBackend(updatedUser));

const mapperToBackend = (data) => {
    data = {
        ...data,
        endereco: {
            logradouro: data.endereco,
            numero: data.numero,
            cidade: data.cidade,
            uf: data.uf,
        },
    };

    delete data.cep;
    delete data.uf;
    delete data.numero;
    return data;
};

const mapperToFrontend = (dto) => {
    const endereco = dto.endereco;

    const data = {
        ...dto,
        endereco: endereco.logradouro,
        numero: endereco.numero,
        cidade: endereco.cidade,
        uf: endereco.uf,
    };

    return data;
};
