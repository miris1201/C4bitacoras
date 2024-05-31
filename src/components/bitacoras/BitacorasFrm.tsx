

import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { startGetComboDepartamentos, startGetComboTipo, startInsertColonia } from '../../store/slices/catalogos';
import { useForm } from '../../hooks/useForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { setShowList } from '../../store/slices/transaction';
import { HeaderList } from '../ui/UserInterface';
import { faSave, faStepBackward } from '@fortawesome/free-solid-svg-icons';
import { setComboDepartamentos, startGetComboZona, startInsertBitacoras } from '../../store/slices/bitacoras';

export const BitacorasFrm: FC = () => {

    const dispatch = useAppDispatch();
    const [loadingBtn, setloadingBtn] = useState(false);

    const {idActive, bActive, comboDepartamentos, comboZona} = useAppSelector(state => state.bitacoras);
    const { readOnly } = useAppSelector(state => state.transaction);
 
    const {
        folio: dFolio,
        fecha_captura: dFechaCaptura,
        id_usuario: dIdUsuario,
        id_zona: dIdZona,
        id_departamento: dIdDepartamento,
        unidad: dUnidad,
        hora: dHora,
        fecha: dFecha, 
        detalle: dDetalle
    } = bActive;

    const { formValues, handleInputChange, setValues } = useForm({
        id_update: idActive,
        folio: dFolio,
        fecha_captura: dFechaCaptura,
        id_usuario: dIdUsuario,
        id_zona: dIdZona,
        id_departamento: dIdDepartamento,
        unidad: dUnidad,
        hora: dHora,
        fecha: dFecha, 
        detalle: dDetalle

    });

    const { folio, fecha_captura, id_usuario, id_zona, id_departamento, unidad, hora, fecha, detalle } = formValues;

    const handleSubmitForm = ( e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setloadingBtn(true);
        dispatch( startInsertBitacoras( formValues,  setloadingBtn));
    }

    useEffect(() => {
        
        if (comboZona.length === 0) {
            dispatch( startGetComboZona() );
            
        }
    }, [dispatch, comboZona])

    useEffect(() => {
        
        if (comboDepartamentos.length === 0) {
            dispatch( startGetComboDepartamentos() );
            
        }
    }, [dispatch, comboDepartamentos])

    let titleMain = "Nueva bitacora";
    let titleHeader = (Number(idActive) === 2 || readOnly) ? 'Visualizando bitacora' : 'Editar bitacora';
    titleMain = (idActive === 0) ? titleMain : titleHeader;

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
                        <div className="col-6 col-lg-4 col-xl-6">
                            <label htmlFor="folio">
                                Nombre(s)<span className="text-danger">*</span>
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                name="folio"
                                id="folio"
                                value={folio}
                                onChange={handleInputChange}
                                autoComplete="off"
                                autoFocus={true}
                                readOnly={readOnly}
                                required
                            />
                        </div>
                        <div className="col-6 col-lg-4 col-xl-2">
                            <label htmlFor="unidad">
                                Unidad <span className="text-danger">*</span>
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                name="unidad"
                                id="unidad"
                                value={unidad}
                                onChange={handleInputChange}
                                readOnly={readOnly}
                                autoComplete="off"
                                required
                            />
                        </div>
                        <div className="col-6 col-lg-4 col-xl-2">
                            <label htmlFor="detalle">
                                Detalle <span className="text-danger">*</span>
                            </label>
                                <input
                                type="text"
                                className="form-control"
                                name="detalle"
                                id="detalle"
                                value={detalle}
                                readOnly={readOnly}
                                onChange={handleInputChange}
                                autoComplete="off"
                                required
                                />
                        </div>
                        <div className="col-6 col-lg-4 col-xl-2">
                            <label htmlFor="id_departamento">
                                Departamento: <span className="text-danger">*</span>
                            </label>
                            <select
                            name="id_departamento"
                            id="id_departamento"
                            value={id_departamento}
                            disabled={readOnly}
                            onChange={ handleInputChange }
                            className="form-select"
                            required
                            >
                                <option value="">Selecciona</option>
                                {
                                    (setComboDepartamentos.length > 0) &&
                                    comboDepartamentos.map((item, index) =>(
                                        <option 
                                            key={ `combo${ index }`} 
                                            value={ item.id_departamento }>
                                            { item.departamento }    
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
