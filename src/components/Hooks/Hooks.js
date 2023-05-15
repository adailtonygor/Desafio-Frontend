import { getConsultaCep } from "../../services";

export const checkCEP = async (
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
