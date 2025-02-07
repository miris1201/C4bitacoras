

import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { startGetComboDepartamentos, startInsertEmergencias } from '../../../store/slices/catalogos';
import { useForm } from '../../../hooks/useForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { setShowList } from '../../../store/slices/transaction';
import { HeaderList } from '../../ui/UserInterface';
import { faSave, faStepBackward } from '@fortawesome/free-solid-svg-icons';
import Select from 'react-select';

export const EmergenciasFrm: FC = () => {

    const dispatch = useAppDispatch();
    const [loadingBtn, setloadingBtn] = useState(false);

    const {idActive, rActive} = useAppSelector(state => state.emergencias);
    const {comboDepartamentos} = useAppSelector(state => state.departamentos);
    const { readOnly } = useAppSelector(state => state.transaction);
 
    const {
        id_departamento: dId_departamento,
        departamento: dDepartamento,
        descripcion: dDescripcion
    } = rActive;

    const { formValues, handleInputChange, setValues } = useForm({
        id_update: idActive,
        id_departamento: dId_departamento || 0,
        departamento: (dDepartamento == "") ? 'Selecciona el departamento' : dDepartamento,
        descripcion: dDescripcion

    });

    const { id_departamento, departamento, descripcion } = formValues;

    let titleMain = "Nueva emergencia";
    let titleHeader = (Number(idActive) === 2 || readOnly) ? 'Visualizando emergencia' : 'Editar emergencia';
    titleMain = (idActive === 0) ? titleMain : titleHeader;

    const handleSubmitForm = ( e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setloadingBtn(true);
        dispatch( startInsertEmergencias( formValues,  setloadingBtn));
    }

    useEffect(() => {
        if (comboDepartamentos.length === 0) {
            dispatch( startGetComboDepartamentos() );
            
        }
    }, [dispatch, comboDepartamentos])
    
    const handleChangeDepto = (opcion : any) => {
        
        let selectDepto = opcion.value;

        setValues({
            ...formValues,
            id_departamento: selectDepto

        });
    }

    return(
        <>
            <div className="card mb-4">
            <HeaderList title={ titleMain }/>
            <div className="card-body">
                <ul className="nav nav-pills mb-2">
                    <li className="nav-item">
                        <button
                            className="btn btn-outline-primary"
                            onClick={() => {
                                dispatch(setShowList( true ));
                            }}
                        >
                            <FontAwesomeIcon icon={faStepBackward} /> Regresar
                        </button>
                    </li>
                </ul>
                <form className="g-3" onSubmit={handleSubmitForm}>
                    <div className="row">
                        <div className="col-6 col-lg-4 col-xl-8">
                            <label htmlFor="descripcion">
                                Emergencia<span className="text-danger">*</span>
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                name="descripcion"
                                id="descripcion"
                                value={descripcion}
                                onChange={handleInputChange}
                                autoComplete="off"
                                autoFocus={true}
                                readOnly={readOnly}
                                required
                            />
                        </div>
                        <div className="col-6 col-lg-4 col-xl-4">
                           <label htmlFor="id_departamento">
                                Departamento <span className="text-danger">*</span>
                            </label>
                            {
                            (comboDepartamentos !== undefined) &&
                            (comboDepartamentos.length > 0) &&
                            <Select 
                                required
                                placeholder={ 'Selecciona el departamento' }
                                onChange={ handleChangeDepto }
                                defaultValue={ 
                                    {'value' : id_departamento, 'label' : departamento}
                                }
                                options={ 
                                    comboDepartamentos.map(reg => ({ 
                                        value: reg.id_departamento, label: reg.departamento 
                                    })) 
                                }
                            />
                            }
                        </div>
                    </div>                    
                    <div className="row mt-4">
                        <div className="col-6 d-grid gap-2 mx-auto">
                            {readOnly || (
                            <button
                                type="submit"
                                disabled={loadingBtn}
                                className="btn btn-outline-primary"
                                id="btn_guardar"
                            >
                                <FontAwesomeIcon icon={faSave} /> Guardar
                            </button>
                            )}
                        </div>
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}
