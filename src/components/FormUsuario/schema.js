import * as yup from 'yup';

export const schema = () =>
    yup.object().shape({
        nome: yup
            .string()
            .required('Nome obrigatório')
            .min(3, 'O nome deve ter pelo menos 3 caracteres'),
        cpf: yup
            .string()
            .required('CPF obrigatório')
            .min(11, 'CPF inválido, mínimo de 11 caracteres')
            .transform((value) => (value ? value.replace(/\D/g, '') : '')),
        endereco: yup.string().required('Endereço obrigatório'),
        cidade: yup.string().required('Cidade obrigatório'),
        numero: yup.string(),
        uf: yup.string().required('Uf obrigartório'),
        nascimento: yup
        .string()
        .max(new Date(), 'A data de nascimento não pode ser uma data futura')
        .required('A data de nascimento é obrigatória')
        .test('is-future-date', 'A data de nascimento não pode ser uma data futura', function (value) {
          const selectedDate = new Date(value);
          const currentDate = new Date();
          return selectedDate <= currentDate;
        }),
        sexo: yup.string().required('Informe o sexo'),
        cep: yup
            .string()
            .required('CEP obrigatório')
            .transform((value) => (value ? value.replace(/\W/g, '') : '')),
    });
