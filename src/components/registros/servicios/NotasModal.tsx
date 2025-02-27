
import React, { FormEvent, useState } from 'react'
import { iModalNotas } from '../../../interfaces'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { useForm } from '../../../hooks/useForm';
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react';
import Swal from 'sweetalert2';
import { startInsertNotes } from '../../../store/slices/registros';

export const NotasModal = ({showModal, setShowModal}: iModalNotas) => {

    const dispatch = useAppDispatch();
    const [loadingBtnNotas, setLoadingBtnNotas] = useState(false);

    const {idActive, rActive } = useAppSelector(state => state.servicios);
    const { uid } = useAppSelector(state => state.login);

    const {
        folio,
        id_zona
    } = rActive;

    const { formValues: frmNotesVal, handleInputChange: handleInputChangeNote, setValues: setValuesNotes } = useForm({
        id_update: idActive,
        folio: folio,
        id_zona: id_zona,
        id_usuario: uid,
        descripcion: ''
    });

    const { descripcion } = frmNotesVal;

    const handleSubmitNote = (e: FormEvent<HTMLFormElement>) => {
        //Evitar propagación de submits en formularios anidados
        e.stopPropagation();
        e.preventDefault();

        setLoadingBtnNotas(true);
        
        if( descripcion != null ){

            dispatch(startInsertNotes(frmNotesVal, setLoadingBtnNotas));
            setShowModal(false);

        }else{
            Swal.fire({
                title: 'Validación de campos',
                text: "Debes de ingresar correctamente la información",
                icon: 'error',

            }).then((result) => {
                setLoadingBtnNotas(false);
            })
        }
    
      }

    return (
        <CModal 
            backdrop="static"
            alignment='center'
            visible={showModal}
            onClose={() => setShowModal(false)}>
            <CModalHeader>
                <CModalTitle>Notas</CModalTitle>
            </CModalHeader>
            <form className='row g-3' onSubmit={ handleSubmitNote }>
                <CModalBody>
                    <div className="row">                
                        <div className="col-12">
                            <label htmlFor="descripcion">
                                Nota
                            </label>
                            <textarea name="descripcion" 
                                id="descripcion"
                                className='form-control'
                                rows={3}
                                autoFocus={true}
                                onChange={handleInputChangeNote}
                                value={descripcion}>
                            </textarea>
                        </div>                
                    </div>
                </CModalBody>
                <CModalFooter>
                    <CButton
                        color="outline-danger"
                        onClick={() => setShowModal(false)}>
                        Cerrar
                    </CButton>
                    <button
                        type="submit"
                        disabled={loadingBtnNotas}
                        className="btn btn-outline-info">
                        Guardar
                    </button>
                </CModalFooter>
            </form>
        </CModal>
    )
}

