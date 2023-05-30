import axios from 'axios';
import {
    deleteUsuarios,
    editarUsuario,
    getConsultaCep,
    getConsultaUf,
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
});
