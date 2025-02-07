import { FormEvent, useEffect, useState } from 'react';

import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react';

import { useForm } from '../../../hooks/useForm';
import { ModalSearchList } from '../../../interfaces'
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setSearchCuadrantes, startGetComboZona } from '../../../store/slices/catalogos';
import Select from 'react-select';

export const CuadrantesModalSearch = ({ showModal, setShowModal  }: ModalSearchList ) => {

    const dispatch = useAppDispatch();

    const [loadingBtn, setLoadingBtn] = useState(false);
    const {comboZona} = useAppSelector(state => state.cuadrantes);

    const { formValues, handleInputChange, setValues } = useForm({
        id_zona: '',
        cuadrante: '',
    });

    const { id_zona, cuadrante } = formValues;
    
    const handleSubmitSearch = ( e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoadingBtn(true);

        dispatch( setSearchCuadrantes(formValues) );
        
        setLoadingBtn(false);
        setShowModal(false);

    }

    useEffect(() => {
        if (comboZona.length === 0) {
            dispatch( startGetComboZona() );
            
        }
    }, [dispatch, comboZona])
    

    const handleChangeZona = (opcion : any) => {
        
        let selectIdZona = opcion.value;

        setValues({
            ...formValues,
            id_zona: selectIdZona

        });
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
                        <div className="col-6 col-lg-4 col-xl-6">
                           <label htmlFor="id_zona">
                                Zona <span className="text-danger">*</span>
                            </label>
                            {
                            (comboZona !== undefined) &&
                            (comboZona.length > 0) &&
                            <Select 
                                required
                                id="id_zona"
                                name="id_zona"
                                placeholder={ 'Selecciona la zona' }
                                onChange={ handleChangeZona }
                                defaultValue={
                                    { 'value': '', 'label': 'Selecciona zona' }
                                  }
                                options={ 
                                    comboZona.map(reg => ({ 
                                        value: reg.id_zona, label: reg.zona 
                                    })) 
                                }
                            />
                            }
                        </div>                   
                        <div className="col-6">
                            <label htmlFor="cuadrante">
                                Cuadrante
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                name="cuadrante"
                                id="cuadrante"
                                value={ cuadrante }
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
