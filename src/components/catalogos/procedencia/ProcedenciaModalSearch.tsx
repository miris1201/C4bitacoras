import { FormEvent, useState } from 'react';

import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react';

import { useForm } from '../../../hooks/useForm';
import { ModalSearchList } from '../../../interfaces'
import { useAppDispatch } from '../../../store/hooks';
import { setSearchProcedencia } from '../../../store/slices/catalogos';

export const ProcedenciaModalSearch = ({ showModal, setShowModal  }: ModalSearchList ) => {

    const dispatch = useAppDispatch();

    const [loadingBtn, setLoadingBtn] = useState(false);

    const { formValues, handleInputChange } = useForm({
        descripcion: '',
    });

    const { descripcion, } = formValues;
    
    const handleSubmitSearch = ( e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoadingBtn(true);

        dispatch( setSearchProcedencia(formValues) );
        
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
                        <div className="col-12">
                            <label htmlFor="descripcion">
                                Procedencia de llamada
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                name="descripcion"
                                id="descripcion"
                                autoComplete='off'
                                value={ descripcion }
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
