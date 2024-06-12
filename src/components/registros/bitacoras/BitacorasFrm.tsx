

import React, { FC, useState, FormEvent, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { useForm } from '../../../hooks/useForm';
import { startInsertBitacora } from '../../../store/slices/registros';
import { startGetComboDepartamentos } from '../../../store/slices/catalogos';
import { HeaderList } from '../../ui/UserInterface';
import { setShowList } from '../../../store/slices/transaction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faStepBackward } from '@fortawesome/free-solid-svg-icons';
import Select from 'react-select';

export const BitacorasFrm: FC = () => {

    const dispatch = useAppDispatch();
    const [loadingBtn, setLoadingBtn] = useState( false )

    const { idActive, rActive } = useAppSelector( state => state.bitacoras);
    const { comboDepartamentos } = useAppSelector( state => state.departamentos);
    const { readOnly } = useAppSelector( state => state.transaction);

    const { 
        folio: dFolio,
        id_usuario: didUsuario,
        usuario: dUsuario,
        id_zona: dId_zona,        
        id_departamento: dId_departamento,
        departamento: dDepartamento,
        unidad: dUnidad,
        fecha: dFecha,
        hora: dHora,
        detalle: dDetalle
    } = rActive;


    const { formValues, handleInputChange, setValues} = useForm({
        id_update: idActive,
        folio: dFolio,
        id_usuario: didUsuario,
        usuario: dUsuario,
        id_zona: dId_zona,
        id_departamento: dId_departamento,
        departamento: dDepartamento,
        unidad: dUnidad,
        fecha: dFecha,
        hora: dHora,
        detalle: dDetalle
    });

    const { folio, id_usuario, usuario, id_zona, id_departamento, departamento, unidad, fecha, hora, detalle } = formValues;

    const handleSubmitForm = ( e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoadingBtn(true);
        dispatch( startInsertBitacora( formValues,  setLoadingBtn));
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
            <HeaderList title='Bitacoras'/>
            <div className="card-body">
                <ul className="nav nav-pills mb-2">
                    <li className="nav-item">
                    <button
                        className="btn btn-outline-danger btn-sm"
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
                        <div className="col-6 col-lg-4 col-xl-3">
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
                        <div className="col-6 col-lg-3 col-xl-3">
                            <label htmlFor="fecha">
                                Fecha<span className="text-danger">*</span>
                            </label>
                            <input
                                type="date"
                                className="form-control"
                                name="fecha"
                                id="fecha"
                                onChange={handleInputChange}
                                autoComplete="off"
                                autoFocus={true}
                                readOnly={readOnly}
                                required
                            />
                        </div>
                        <div className="col-6 col-lg-4 col-xl-2">
                            <label htmlFor="sector">
                                Sector <span className="text-danger">*</span>
                            </label>
                            <input
                                type="number"
                                className="form-control"
                                name="sector"
                                id="sector"
                                onChange={handleInputChange}
                                readOnly={readOnly}
                                autoComplete="off"
                                min={1}
                                max={19}
                                required
                            />
                        </div>
                        <div className="col-6 col-lg-4 col-xl-2">
                            <label htmlFor="region">
                                Región <span className="text-danger">*</span>
                            </label>
                                <input
                                type="number"
                                className="form-control"
                                name="region"
                                id="region"
                                readOnly={readOnly}
                                onChange={handleInputChange}
                                autoComplete="off"
                                min={1}
                                max={4}
                                required
                                />
                        </div>
                        <div className="col-6 col-lg-4 col-xl-2">
                            <label htmlFor="tipo">
                                Tipo: <span className="text-danger">*</span>
                            </label>
                            <select
                            name="tipo"
                            id="tipo"
                            disabled={readOnly}
                            onChange={ handleInputChange }
                            className="form-select"
                            required
                            >
                                <option value="">Selecciona</option>
                                
                            </select>
                        </div>
                    </div>                    
                    <div className="row mt-4">
                        <div className="col-12">
                            {readOnly || (
                            <button
                                type="submit"
                                disabled={loadingBtn}
                                className="btn btn-outline-info btn-sm"
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
