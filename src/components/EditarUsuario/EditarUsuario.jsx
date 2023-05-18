import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';
import useStyles from './Styles';
import PropTypes from 'prop-types'
import { FormProvider } from 'react-hook-form';
import FormUsuario from '../FormUsuario/FormUsuario';

const EditarUsuario = ({
    open,
    handleSave,
    methods,
    onClickCancel,
}) => {
    const classes = useStyles();

    return (
        <Dialog open={open} maxWidth="lg">
            <DialogTitle className={classes.titulo}>Editar usuário</DialogTitle>

            <DialogContent className={classes.root}>
                <FormProvider {...methods}>
                    <FormUsuario
                        isEdicao={true}
                        onSubmit={handleSave}
                        onClickCancel={onClickCancel}
                    />
                </FormProvider>
            </DialogContent>
        </Dialog>
    );
};

EditarUsuario.propTypes = {
    open: PropTypes.bool.isRequired,
    handleSave: PropTypes.func.isRequired,
    methods: PropTypes.object.isRequired,
    onClickCancel: PropTypes.func.isRequired,
  };

export default EditarUsuario;
