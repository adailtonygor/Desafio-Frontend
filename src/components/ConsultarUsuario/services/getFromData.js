import { removerAcentos } from "../../../utils/validations.utils";

export const filterUsers = (users, searchTermo, searchTipo) => {
    
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
