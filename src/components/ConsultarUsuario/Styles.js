import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    excluirUsuarioDialog: {
        fontSize: '18px',
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'black',
    },
    colorConfirmarExclusão: {
        backgroundColor: '#2c387e',
    },

    botoesExcluirUsuarioDialog: {
        justifyContent: 'center',
    },

    buscaAvancada: {
        alignItems: 'center',
        marginTop: '30px',
    },

    buscaPesquisa: {
        height: '40px',
        margin: '0 8px',
    },
   
    tableUsuarios: {
        marginTop: '30px',
    },
});

export default useStyles;
