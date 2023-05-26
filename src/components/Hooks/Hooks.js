import { getConsultaCep } from '../../services';

export const usecheckCEP = async (
    e,
    setLoading,
    setValue,
    setCepError,
    isHookForm = false,
) => {
    const cep = e.target.value.replace(/\D/g, '');
    if (!cep) {
        return;
    }
    setLoading(true);
    try {
        const response = await getConsultaCep(cep);
        const data = response.data;
        if (data.erro) {
            throw new Error('mensagem de erro!');
        }
        setValue('endereco', data.logradouro);
        setValue('cidade', data.localidade);
        setValue('uf', data.uf);
        setCepError(null);
        if (isHookForm) {
            return {
                endereco: data.logradouro,
                cidade: data.localidade,
                uf: data.uf,
            };
        }
    } catch (error) {
        console.error(error);
        setLoading(false);
        if (error.response && error.response.data && error.response.data.erro) {
            setCepError('CEP inválido!');
        } else {
            setCepError('CEP inválido');
        }
    } finally {
        setLoading(false);
    }
};

export function filterUsers(users, searchTermo, searchTipo) {
    function removerAcentos(texto) {
        return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }
    return users.filter((user) => {
        if (searchTermo) {
            const searchTermoSemAcentos = removerAcentos(
                searchTermo.toLowerCase(),
            );
            switch (searchTipo) {
                case 'nome':
                    if (
                        !removerAcentos(user.nome.toLowerCase()).includes(
                            searchTermoSemAcentos,
                        )
                    ) {
                        return false;
                    }
                    break;
                case 'cpf':
                    if (
                        !removerAcentos(user.cpf.toLowerCase()).includes(
                            searchTermoSemAcentos,
                        )
                    ) {
                        return false;
                    }
                    break;
                case 'sexo':
                    if (
                        !removerAcentos(user.sexo.toLowerCase()).includes(
                            searchTermoSemAcentos,
                        )
                    ) {
                        return false;
                    }
                    break;
                case 'uf':
                    if (
                        !removerAcentos(user.uf.toLowerCase()).includes(
                            searchTermoSemAcentos,
                        )
                    ) {
                        return false;
                    }
                    break;
                case 'cidade':
                    if (
                        !removerAcentos(user.cidade.toLowerCase()).includes(
                            searchTermoSemAcentos,
                        )
                    ) {
                        return false;
                    }
                    break;
                default:
                    return true;
            }
        }
        return true;
    });
}
