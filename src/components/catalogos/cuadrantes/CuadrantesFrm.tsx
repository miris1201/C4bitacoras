

import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { startGetComboSector, startGetComboZona, startInsertColonia } from '../../../store/slices/catalogos';
import { useForm } from '../../../hooks/useForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { setShowList } from '../../../store/slices/transaction';
import { HeaderList } from '../../ui/UserInterface';
import { faSave, faStepBackward } from '@fortawesome/free-solid-svg-icons';
import Select from 'react-select';

export const CuadrantesFrm: FC = () => {

    const dispatch = useAppDispatch();
    const [loadingBtn, setloadingBtn] = useState(false);

    const {idActive, rActive, comboSector, comboZona} = useAppSelector(state => state.cuadrantes);
    const { readOnly } = useAppSelector(state => state.transaction);
 
    const {
        id_zona: dId_zona,
        sector: dSector,
        cuadrante: dCuadrante
    } = rActive;

    const { formValues, handleInputChange, setValues } = useForm({
        id_update: idActive,
        id_zona: dId_zona,
        sector: dSector || '',
        cuadrante: dCuadrante,
        id_zona_ref: 0,
        desc_id_zona: 'Selecciona la zona', 

    });

    const { id_zona, sector, cuadrante, id_zona_ref, desc_id_zona } = formValues;

    let titleMain = "Nuevo cuadrante";
    let titleHeader = (Number(idActive) === 2 || readOnly) ? 'Visualizando cuadrante' : 'Editar cuadrante';
    titleMain = (idActive === 0) ? titleMain : titleHeader;

    const handleSubmitForm = ( e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setloadingBtn(true);
        dispatch( startInsertColonia( formValues,  setloadingBtn));
    }

    useEffect(() => {
        
        if (id_zona.length > 0) {
            dispatch( startGetComboSector(id_zona) );
            
        }
    }, [dispatch, comboSector])

    useEffect(() => {
        
        if (comboZona.length === 0) {
            dispatch( startGetComboZona() );
            
        }
    }, [dispatch, comboZona])

    
    const handleChangeSector = (opcion : any) => {
        
        let id_zona = opcion.value; 
        let txtzona = opcion.label;

        dispatch( startGetComboSector(id_zona) );

        setValues({
            ...formValues,
            id_zona: id_zona,
            ["desc_id_zona"]: txtzona,

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
                        <div className="col-6 col-lg-4 col-xl-4">
                            <label htmlFor="cuadrante">
                                Cuadrante<span className="text-danger">*</span>
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                name="cuadrante"
                                id="cuadrante"
                                value={cuadrante}
                                onChange={handleInputChange}
                                autoComplete="off"
                                autoFocus={true}
                                readOnly={readOnly}
                                required
                            />
                        </div>
                        <div className="col-6 col-lg-4 col-xl-2">
                            <label htmlFor="id_zona">
                                Zona <span className="text-danger">*</span>
                            </label>
                            {
                            (comboZona !== undefined) &&
                            (comboZona.length > 0) &&
                            <Select 
                                required
                                id='id_zona'
                                value={ 
                                    {'value' : id_zona_ref, 'label' : desc_id_zona}   
                                }
                                placeholder={ 'Selecciona la zona' }
                                onChange={ handleChangeSector }
                                options={ 
                                    comboZona.map(reg => ({ 
                                        value: reg.id_zona, label: reg.zona 
                                    })) 
                                }
                            />
                            }
                        </div>      
                                                  
                        <div className="col-6 col-lg-4 col-xl-2">
                            <label htmlFor="sector">
                                Sector: <span className="text-danger">*</span>
                            </label>
                            <select
                            name="sector"
                            id="sector"
                            value={sector}
                            disabled={readOnly}
                            onChange={ handleInputChange }
                            className="form-select"
                            required
                            >
                                <option value="">Selecciona</option>
                                {
                                    (comboSector.length > 0) &&
                                    comboSector.map((item, index) =>(
                                        <option 
                                            key={ `combo${ index }`} 
                                            value={ item.sector }>
                                            { item.sector }    
                                        </option>
                                    ))
                                }
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
