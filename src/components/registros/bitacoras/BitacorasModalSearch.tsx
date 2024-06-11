

import React, { FormEvent, useState } from 'react'
import { ModalSearchList } from '../../../interfaces'
import { useAppDispatch } from '../../../store/hooks'
import { useForm } from '../../../hooks/useForm';
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react';
import { setSearchBitacoras } from '../../../store/slices/registros';

export const BitacorasModalSearch = ({ showModal, setShowModal }: ModalSearchList) => {
    
    const dispatch = useAppDispatch();
    const [ loadingBtn, setLoadingBtn ] = useState( false );
    
    const {formValues, handleInputChange } = useForm({
        folio: '',
        
    });

    const { folio } = formValues;

    const handleSubmitSearch = ( e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoadingBtn(true);

        dispatch( setSearchBitacoras(formValues) );
        
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
                            <label htmlFor="folio">
                                Folio
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                name="folio"
                                id="folio"
                                value={ folio }
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
