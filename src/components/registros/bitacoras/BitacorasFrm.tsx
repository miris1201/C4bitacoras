

import { FC, useState, FormEvent, useEffect } from 'react'
import Swal from "sweetalert2";

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { useForm } from '../../../hooks/useForm';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faStepBackward } from '@fortawesome/free-solid-svg-icons';

import { usePermission } from '../../../hooks/usePermission';
import { useLocation } from 'react-router-dom';

import { HeaderList, NoAccess } from '../../ui/UserInterface';
import { setShowList } from '../../../store/slices/transaction';
import { startInsertBitacora } from '../../../store/slices/registros';
import { startGetComboDepartamentos } from '../../../store/slices/catalogos';

import Select from 'react-select';
import moment from 'moment';

export const BitacorasFrm: FC = () => {
    
    const { pathname } = useLocation();
    const allowed = usePermission(pathname);
    
    const dispatch = useAppDispatch();

    const [loadingBtn, setLoadingBtn] = useState( false );
    const [disabled, setDisabled] = useState(false);

    const { idActive, rActive } = useAppSelector( state => state.bitacoras);
    const { comboDepartamentos } = useAppSelector( state => state.departamentos);
    const { uid, systemOptions } = useAppSelector(state => state.login);

    const { id_zona, id_rol } = systemOptions;

    const { readOnly } = useAppSelector( state => state.transaction);

    const { 
        folio: dFolio,
        id_zona_b: dId_zona,        
        id_departamento: dId_departamento,
        departamento: dDepartamento,
        unidad: dUnidad,
        fecha: dFecha,
        hora: dHora,
        detalle: dDetalle
    } = rActive;

    if (allowed.length === 0) {
        return (<NoAccess />);
    }

    const toDay = moment().format('YYYY-MM-DD');
    const hour = moment().format('HH:mm');

    const { formValues, handleInputChange, setValues} = useForm({
        id_update: idActive,
        folio: dFolio,
        id_usuario: uid,
        id_zona_b: dId_zona || id_zona, 
        id_departamento: dId_departamento,
        departamento: dDepartamento,
        unidad: dUnidad,
        fecha : (dFecha == "" || dFecha == null ) ? toDay: dFecha,
        hora : (dHora == "" || dHora == null ) ? hour: dHora,
        detalle: dDetalle
    });

    const { id_zona_b, id_departamento, departamento, unidad, fecha, hora, detalle } = formValues;
    
    
    const handleSubmitForm = ( e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoadingBtn(true);

        if (detalle != null && detalle != "" 
                && id_departamento != 0 
                && unidad != "" && id_zona != 0)  {
            dispatch( startInsertBitacora( formValues,  setLoadingBtn));

        } else {
            Swal.fire({
                title: 'Validación de campos',
                text: "Debes de ingresar los campos requeridos.",
                icon: 'error',
            }).then((result) => {
                setLoadingBtn(false);
            })
        }
       
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
                        <div className="col-12 col-lg-4 col-xl-3">
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
                        <div className="col-6 col-lg-4 col-xl-2">
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
                                autoFocus={false}
                                disabled={!disabled}
                                value={ fecha }
                                required
                            />
                        </div>
                        <div className="col-6 col-lg-4 col-xl-2">
                            <label htmlFor="hora">
                                Hora <span className="text-danger">*</span>
                            </label>
                            <input
                                type="time"
                                className="form-control"
                                name="hora"
                                id="hora"
                                onChange={handleInputChange}
                                value={ hora }
                                readOnly={readOnly}
                                autoComplete="off"
                                required
                            />
                        </div>
                        <div className="col-6 col-lg-3 col-xl-2">
                            <label htmlFor="unidad">
                                Unidad <span className="text-danger">*</span>
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                name="unidad"
                                id="unidad"
                                readOnly={readOnly}
                                onChange={handleInputChange}
                                autoComplete="off"
                                required
                                />
                        </div>
                        <div className="col-6 col-lg-4 col-xl-2">
                            <label htmlFor="id_zona_b">
                                Zona: <span className="text-danger">*</span>
                            </label>
                            <select
                                name="id_zona_b"
                                id="id_zona_b"
                                value={ id_zona_b }
                                disabled={(id_rol == 3) ? !readOnly : readOnly }
                                onChange={ handleInputChange }
                                className="form-select"
                                required
                                >
                                <option value="">Selecciona</option>
                                <option value="1">Poniente</option>
                                <option value="2">Oriente</option>                                
                            </select>
                        </div>
                    </div>    
                    <div className="row">  
                        <div className="col-12">
                            <label htmlFor="detalle">
                                Reporte <span className="text-danger">*</span>
                            </label>
                            <textarea name="detalle" id="detalle" 
                                rows={5} 
                                className="form-control" 
                                required
                                onChange={  handleInputChange } ></textarea>
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
