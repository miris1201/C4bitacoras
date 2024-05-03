import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'
import { FormEvent, useState } from 'react';
import { useForm } from '../../../hooks/useForm';
import { ModalSearchList } from '../../../interfaces'
import { useAppDispatch } from '../../../store/hooks';
import { setSearchUser } from '../../../store/slices/users';

export const UserFrmSearch = ({ showModal, setShowModal  }: ModalSearchList ) => {
    
    const dispatch = useAppDispatch();

    const [loadingBtn, setLoadingBtn] = useState(false);

    const { formValues, handleInputChange } = useForm({
        id_usuario: '',
        usuario: '',
        nombre: '',
    });

    const { id_usuario, usuario, nombre } = formValues;
    
    const handleSubmitSearch = ( e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoadingBtn(true);

        dispatch( setSearchUser(formValues) );
        
        setLoadingBtn(false);
        setShowModal(false);

    }

    return (
        <CModal
        alignment="center"
        visible={showModal} 
        onClose={() => setShowModal(false)}>
            <CModalHeader>
                <CModalTitle>Búsqueda</CModalTitle>
            </CModalHeader>
            <form className="row g-3" onSubmit={ handleSubmitSearch }>
                <CModalBody>
                    <div className="row g-3">
                        <div className="col-6">
                            <label htmlFor="id_usuario">
                                ID
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                name="id_usuario"
                                id="id_usuario"
                                value={ id_usuario }
                                onChange={ handleInputChange }
                            />
                        </div>
                        <div className="col-6">
                            <label htmlFor="nombre">
                                Nombre
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                name="nombre"
                                id="nombre"
                                value={ nombre }
                                onChange={ handleInputChange }
                            />
                        </div>
                        <div className="col-6">
                            <label htmlFor="usuario">
                                Usuario
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                name="usuario"
                                id="usuario"
                                value={ usuario }
                                onChange={ handleInputChange }
                            />
                        </div>
                    </div>
                </CModalBody>
                <CModalFooter>
                    <CButton
                        color="outline-danger btn-sm"
                        onClick={() => setShowModal(false)}>
                        Cerrar
                    </CButton>
                    <button
                        type="submit" 
                        disabled={ loadingBtn }
                        className="btn btn-outline-info btn-sm">
                        Realizar Búsqueda
                    </button>
                </CModalFooter>
            </form>
        </CModal>
    )
}
