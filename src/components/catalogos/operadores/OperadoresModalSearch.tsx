import { FormEvent, useState } from 'react';

import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react';

import { useForm } from '../../../hooks/useForm';
import { ModalSearchList } from '../../../interfaces'
import { useAppDispatch } from '../../../store/hooks';
import { setSearchOperadores } from '../../../store/slices/catalogos';

export const OperadoresModalSearch = ({ showModal, setShowModal  }: ModalSearchList ) => {

    const dispatch = useAppDispatch();

    const [loadingBtn, setLoadingBtn] = useState(false);

    const { formValues, handleInputChange } = useForm({
        id: '',
        nombre: '',
        correo: '',
    });

    const { id, nombre, correo } = formValues;
    
    const handleSubmitSearch = ( e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoadingBtn(true);

        dispatch( setSearchOperadores(formValues) );
        
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
                            <label htmlFor="id">
                                ID
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                name="id"
                                id="id"
                                value={ id }
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
                            <label htmlFor="correo">
                                Correo
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                name="correo"
                                id="correo"
                                value={ correo }
                                onChange={ handleInputChange }
                            />
                        </div>
                    </div>
                </CModalBody>
                <CModalFooter>
                    <CButton
                        color="secondary"
                        onClick={() => setShowModal(false)}>
                        Cerrar
                    </CButton>
                    <button
                        type="submit" 
                        disabled={ loadingBtn }
                        className="btn btn-success">
                        Realizar Búsqueda
                    </button>
                </CModalFooter>
            </form>
        </CModal>
    )
}
