

import React, { FormEvent, useEffect, useState } from 'react'
import { ModalSearchList } from '../../../interfaces'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { useForm } from '../../../hooks/useForm';
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react';
import { setSearchBitacoras } from '../../../store/slices/registros';


export const BitacorasModalSearch = ({ showModal, setShowModal }: ModalSearchList) => {
    
    const dispatch = useAppDispatch();
    const { comboDepartamentos } = useAppSelector( state => state.departamentos);

    const [ loadingBtn, setLoadingBtn ] = useState( false );
    
    const {formValues, handleInputChange, setValues } = useForm({
        folio: '',
        fecha_inicial: '',
        fecha_final: '',
        
    });

    const { folio, fecha_inicial, fecha_final } = formValues;

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
            <CModalHeader >
                <CModalTitle>Búsqueda</CModalTitle>
            </CModalHeader>
            <form className="row g-3" onSubmit={ handleSubmitSearch }>
                <CModalBody>
                    <div className="row g-3">                        
                        <div className="col-4">
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
                        <div className="col-8">
                            <label htmlFor="fecha_inicial">
								Fecha Inicial
                            </label>
                            <input
                                type="date"
                                className="form-control"
                                name="fecha_inicial"
                                id="fecha_inicial"
                                value={ fecha_inicial }
                                onChange={ handleInputChange }
                            />
                        </div>
						<div className="col-6">
                            <label htmlFor="fecha_final">
								Fecha Final
                            </label>
                            <input
                                type="date"
                                className="form-control"
                                name="fecha_final"
                                id="fecha_final"
                                value={ fecha_final }
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
