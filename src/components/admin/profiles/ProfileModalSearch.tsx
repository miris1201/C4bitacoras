import { FormEvent, useState } from 'react';
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react';

import { ModalSearchList } from '../../../interfaces';
import { useAppDispatch } from '../../../store/hooks';
import { setSearchProfile } from '../../../store/slices/profiles';

import { useForm } from '../../../hooks/useForm';

export const ProfileModalSearch = ({ showModal, setShowModal  }: ModalSearchList ) => {

    const dispatch = useAppDispatch();

    const [loadingBtn, setLoadingBtn] = useState(false);

    const { formValues, handleInputChange } = useForm({
        rol: '',
        descripcion: '',
    });


    const { rol, descripcion } = formValues;
    
    const handleSubmitSearch = ( e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoadingBtn(true);

        dispatch( setSearchProfile(formValues) );
        
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
                            <label htmlFor="rol">
                                Rol
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                name="rol"
                                id="rol"
                                value={ rol }
                                onChange={ handleInputChange }
                            />
                        </div>
                        <div className="col-6">
                            <label htmlFor="descripcion">
                                Descripción
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                name="descripcion"
                                id="descripcion"
                                value={ descripcion }
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
