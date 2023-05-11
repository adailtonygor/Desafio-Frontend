/* eslint-disable react/prop-types */
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';
import useStyles from './Styles';

import { FormProvider } from 'react-hook-form';
import FormUsuario from '../FormUsuario/FormUsuario';

const EditarUsuario = ({
    open,
    onClose,
    handleSave,
    methods,
    onClickCancel,
}) => {
    const classes = useStyles();

    return (
        <Dialog open={open} onClose={onClose} maxWidth="lg">
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

export default EditarUsuario;
