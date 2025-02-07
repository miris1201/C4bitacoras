import { FormEvent, useEffect, useState } from 'react';

import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react';

import { useForm } from '../../../hooks/useForm';
import { ModalSearchList } from '../../../interfaces'
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setSearchEmergencias, startGetComboDepartamentos, startGetComboZona } from '../../../store/slices/catalogos';
import Select from 'react-select';

export const EmergenciasModalSearch = ({ showModal, setShowModal  }: ModalSearchList ) => {

    const dispatch = useAppDispatch();

    const [loadingBtn, setLoadingBtn] = useState(false);
    const {comboDepartamentos} = useAppSelector(state => state.departamentos);

    const { formValues, handleInputChange, setValues } = useForm({
        id_departamento: '',
        descripcion: '',
    });

    const { id_departamento, descripcion } = formValues;
    
    const handleSubmitSearch = ( e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoadingBtn(true);

        dispatch( setSearchEmergencias(formValues) );
        
        setLoadingBtn(false);
        setShowModal(false);

    }

    useEffect(() => {
        if (comboDepartamentos.length === 0) {
            dispatch( startGetComboDepartamentos() );
            
        }
    }, [dispatch, comboDepartamentos])
    

    const handleChangeDepto = (opcion : any) => {
        
        let selectIdDepto = opcion.value;

        setValues({
            ...formValues,
            id_departamento: selectIdDepto

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
                        <div className="col-12">
                           <label htmlFor="id_departamento">
                                Departamento <span className="text-danger">*</span>
                            </label>
                            {
                            (comboDepartamentos !== undefined) &&
                            (comboDepartamentos.length > 0) &&
                            <Select 
                                required
                                id="id_departamento"
                                name="id_departamento"
                                placeholder={ 'Selecciona el departamento' }
                                onChange={ handleChangeDepto }
                                defaultValue={
                                    { 'value': '', 'label': 'Selecciona el departamento' }
                                  }
                                options={ 
                                    comboDepartamentos.map(reg => ({ 
                                        value: reg.id_departamento, label: reg.departamento 
                                    })) 
                                }
                            />
                            }
                        </div>                   
                        <div className="col-12">
                            <label htmlFor="descripcion">
                                Emergencia
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
