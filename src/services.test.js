import axios from 'axios';
import {
    deleteUsuarios,
    getConsultaCep,
    getConsultaUf,
    editarUsuario,
    postOnSubmit,
    mapperToFrontend,
    mapperToBackend,
} from './services';
import { jest } from '@jest/globals';
import { ENDPOINT } from './components/endpoint';

describe('testando rota', () => {
    test('Testando getConsultaCep', async () => {
        const cep = '74937300';
        const spy = jest.spyOn(axios, 'get');

        spy.mockImplementationOnce(() => Promise.resolve({ result: 'ok' }));

        const result = await getConsultaCep(cep);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(result).toEqual({ result: 'ok' });
        expect(spy).toHaveBeenCalledWith(`${ENDPOINT.CEP}/${cep}/json/`);
    });
    test('Testando getConsultaUf', async () => {
        const spy = jest.spyOn(axios, 'get');

        spy.mockImplementationOnce(() => Promise.resolve({ result: 'ok' }));

        const result = await getConsultaUf();

        expect(spy).toHaveBeenCalledTimes(2);
        expect(result).toEqual({ result: 'ok' });
        expect(spy).toHaveBeenCalledWith(ENDPOINT.ESTADOS);
    });

    test('Testando deleteUsuarios', async () => {
        const cpf = '70306472112';
        const spy = jest.spyOn(axios, 'delete');

        spy.mockImplementationOnce(() => Promise.resolve({ result: 'ok' }));

        const result = await deleteUsuarios(cpf);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(result).toEqual({ result: 'ok' });
        expect(spy).toHaveBeenCalledWith(`${ENDPOINT.USERS}${cpf}`);
    });
    test('Testando editarUsuario', async () => {
        const cpf = '70306472112';
        const updatedUser = { name: 'Adailton' };
        const spy = jest.spyOn(axios, 'put');

        spy.mockImplementationOnce(() => Promise.resolve({ result: 'ok' }));

        const result = await editarUsuario(cpf, updatedUser);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(result).toEqual({ result: 'ok' });
        expect(spy).toHaveBeenCalledWith(
            `${ENDPOINT.USERS}${cpf}`,
            mapperToBackend(updatedUser),
        );
    });

    test('Testando mapperToBackend', () => {
        const data = {
            endereco: 'Rua J 12',
            numero: 0,
            cidade: 'Aparecida de Goiânia',
            uf: 'GO',
            cep: '74937300',
        };

        const resultadoEsperado = {
            endereco: {
                logradouro: 'Rua J 12',
                numero: 0,
                cidade: 'Aparecida de Goiânia',
                uf: 'GO',
            },
            cidade: 'Aparecida de Goiânia',
        };

        const result = mapperToBackend(data);

        expect(result).toEqual(resultadoEsperado);
    });
    test('Testando mapperToFrontend', () => {
        const dto = {
            endereco: {
                logradouro: 'Rua T 14',
                numero: 1,
                cidade: 'Trindade',
                uf: 'GO',
            },
        };
        const resultadoEsperado = {
            ...dto,
            endereco: 'Rua T 14',
            numero: 1,
            cidade: 'Trindade',
            uf: 'GO',
        };

        const result = mapperToFrontend(dto);

        expect(result).toEqual(resultadoEsperado);
    });
   
});
