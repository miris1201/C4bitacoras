import { FormEvent, useState } from 'react';

import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react';

import { useForm } from '../../../hooks/useForm';
import { ModalSearchList } from '../../../interfaces'
import { useAppDispatch } from '../../../store/hooks';
import { setSearchTipoCierre } from '../../../store/slices/catalogos';

export const TipoCierreModalSearch = ({ showModal, setShowModal  }: ModalSearchList ) => {

    const dispatch = useAppDispatch();

    const [loadingBtn, setLoadingBtn] = useState(false);

    const { formValues, handleInputChange } = useForm({
        descripcion: '',
    });

    const { descripcion, } = formValues;
    
    const handleSubmitSearch = ( e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoadingBtn(true);

        dispatch( setSearchTipoCierre(formValues) );
        
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
                                Tipo de cierre
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
