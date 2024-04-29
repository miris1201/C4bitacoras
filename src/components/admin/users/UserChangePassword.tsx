import { 
    CButton, 
    CModal, 
    CModalBody, 
    CModalFooter, 
    CModalHeader, 
    CModalTitle 
} from '@coreui/react';
import { useRef, useEffect, useState, FormEvent } from 'react';
import { useForm } from '../../../hooks/useForm';
import { ChangePasswordParams } from '../../../interfaces';
import { useAppDispatch } from '../../../store/hooks';
import { startChangePassword } from '../../../store/slices/users/thunks';

export const UserChangePassword = ( { showModal, setShowModal, id_usuario } : ChangePasswordParams ) => {

    const dispatch = useAppDispatch();

    const { formValues, handleInputChange } = useForm({
        id_usuario: id_usuario,
        old_password: '',
        confirm_password: '',
    });

    const [loadingBtn, setLoadingBtn] = useState(false);

    const { old_password, confirm_password } = formValues;

    const handleSubmitChangePass = ( e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoadingBtn(true);
        dispatch( startChangePassword( formValues, setLoadingBtn, setShowModal ));
    };

    const focusOldPass = useRef<HTMLInputElement>(null);

    useEffect(() => {
        focusOldPass.current?.focus();
    }, [])

    return (
        <CModal 
            alignment="center"
            visible={showModal} 
            onClose={() => setShowModal(false)}>
            <CModalHeader>
                <CModalTitle>Cambiar Password de Usuario</CModalTitle>
            </CModalHeader>
            <form className="row g-3" onSubmit={ handleSubmitChangePass }>
                <CModalBody>
                <div className="row g-3">
                    <div className="col-6">
                        <label htmlFor="old_password">
                            Contraseña Nueva 
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            name="old_password"
                            id="old_password"
                            ref={focusOldPass}
                            value={ old_password }
                            onChange={ handleInputChange }
                        />
                    </div>
                    <div className="col-6">
                        <label htmlFor="confirm_password">
                            Confirmación de contraseña 
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            name="confirm_password"
                            id="confirm_password"
                            value={ confirm_password }
                            onChange={ handleInputChange }
                            autoComplete="off"
                        />
                    </div>
                </div>
                </CModalBody>
                <CModalFooter>
                    <button 
                        className="btn btn-outline-danger" 
                        onClick={() => setShowModal(false)}>
                        Cerrar
                    </button>
                    <button
                        type="submit" 
                        disabled={ loadingBtn }
                        className="btn btn-outline-info">
                        Cambiar password
                    </button>
                </CModalFooter>
            </form>
        </CModal>
    )
}
