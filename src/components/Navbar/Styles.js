import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
        fontSize: '1.2rem',
    },
    rightSection: {
        display: 'flex',
        alignItems: 'center',
    },
    link: {
        fontWeight: 'bold',
        color: 'white',
        textDecoration: 'none',
        margin: '0 10px',
    },
    activeLink: {
        fontWeight: 'bold',
        fontSize: '1.2rem',
    },
});

export default useStyles;
