

import React, { FC, FormEvent, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { startGetComboTipo, startInsertColonia } from '../../../store/slices/catalogos';
import { useForm } from '../../../hooks/useForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { setShowList } from '../../../store/slices/transaction';
import { HeaderList } from '../../ui/UserInterface';
import { faSave, faStepBackward } from '@fortawesome/free-solid-svg-icons';

export const ColoniasFrm: FC = () => {

    const dispatch = useAppDispatch();
    const [loadingBtn, setloadingBtn] = useState(false);

    const {idActive, rActive, comboTipo} = useAppSelector(state => state.colonias);
    const { readOnly } = useAppSelector(state => state.transaction);
 
    const {
        nombre: dNombre,
        tipo: dTipo,
        sector: dSector,
        region: dRegion
    } = rActive;

    const { formValues, handleInputChange, setValues } = useForm({
        id_update: idActive,
        nombre: dNombre,
        tipo: dTipo,
        sector: dSector || '',
        region: dRegion || '',

    });

    const { nombre, tipo, sector, region } = formValues;

    const handleSubmitForm = ( e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setloadingBtn(true);
        dispatch( startInsertColonia( formValues,  setloadingBtn));
    }

    useEffect(() => {
        
        if (comboTipo.length === 0) {
            dispatch( startGetComboTipo() );
            
        }
    }, [dispatch, comboTipo])
    

    return(
        <>
            <div className="card mb-4">
            <HeaderList title='Agregando Colonia'/>
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
                            <label htmlFor="nombre">
                                Nombre(s)<span className="text-danger">*</span>
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                name="nombre"
                                id="nombre"
                                value={nombre}
                                onChange={handleInputChange}
                                autoComplete="off"
                                autoFocus={true}
                                readOnly={readOnly}
                                required
                            />
                        </div>
                        <div className="col-6 col-lg-4 col-xl-4">
                            <label htmlFor="sector">
                                Sector <span className="text-danger">*</span>
                            </label>
                            <input
                                type="number"
                                className="form-control"
                                name="sector"
                                id="sector"
                                value={sector}
                                onChange={handleInputChange}
                                readOnly={readOnly}
                                autoComplete="off"
                                min={1}
                                max={20}
                            />
                        </div>
                        <div className="col-6 col-lg-4 col-xl-4">
                            <label htmlFor="region">
                                Región <span className="text-danger">*</span>
                            </label>
                                <input
                                type="text"
                                className="form-control"
                                name="region"
                                id="region"
                                value={region}
                                readOnly={readOnly}
                                onChange={handleInputChange}
                                autoComplete="off"
                                min={1}
                                max={4}
                                />
                        </div>
                        <div className="col-6 col-lg-4 col-xl-4">
                            <label htmlFor="tipo">
                                Tipo: <span className="text-danger">*</span>
                            </label>
                            <select
                            name="tipo"
                            id="tipo"
                            value={tipo}
                            disabled={readOnly}
                            onChange={ handleInputChange }
                            className="form-select"
                            required
                            >
                                <option value="">Selecciona</option>
                                {
                                    (comboTipo.length > 0) &&
                                    comboTipo.map((item, index) =>(
                                        <option 
                                            key={ `combo${ index }`} 
                                            value={ item.tipo }>
                                            { item.tipo }    
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
