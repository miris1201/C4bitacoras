

import React, { FC, FormEvent, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { usePermission } from '../../../hooks/usePermission';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';

import Select from 'react-select';
import moment from 'moment';
import { HeaderList, NoAccess } from '../../ui/UserInterface';
import { useForm } from '../../../hooks/useForm';
import { startInsertServicios } from '../../../store/slices/registros';
import { startComboCuadrantes, startGetComboColonias, startGetComboEmergencias, startGetComboOperativos, startGetComboProcedencia, startGetComboSector, startGetComboTipoCierre, startGetComboTipoEmergencia } from '../../../store/slices/catalogos';
import { setShowList } from '../../../store/slices/transaction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faShareFromSquare, faSquareArrowUpRight, faStepBackward, faUserPen } from '@fortawesome/free-solid-svg-icons';
import { AsignarModalFrm } from './AsignarModalFrm';

export const ServiciosFrm: FC = () => {

    const { pathname } = useLocation();
    const allowed = usePermission(pathname);
    
    const dispatch = useAppDispatch();

    const [loadingBtn, setLoadingBtn] = useState( false );
    const [disabled, setDisabled] = useState(false);
    const [showInputs, setShowInputs] = useState( false );
    const [showOtros, setShowOtros] = useState( false )
    const [ showModalAsignar, setShowModalAsignar ] = useState(false);

    const { idActive, rActive  } = useAppSelector( state => state.servicios);
    const { comboEmergencias } = useAppSelector( state => state.emergencias);
    const { comboProcedencia } = useAppSelector( state => state.procedencia);
    const { comboOperativos } = useAppSelector( state => state.operativos);
    const { comboColonias } = useAppSelector( state => state.colonias);
    const { comboTipoEmergencia } = useAppSelector( state => state.tipoEmergencia);
    const { comboTipoCierre } = useAppSelector( state => state.tipoCierre);
    const { uid, systemOptions } = useAppSelector(state => state.login);

    const { id_zona, id_rol } = systemOptions;

    const { readOnly } = useAppSelector( state => state.transaction);


    let inputClass = (idActive > 0) ? 'form-control-plaintext fw-bolder' : 'form-control';

    const { 
        id_servicio: dId_servicio,
        folio: dFolio,
        id_status: dId_status,
        id_zona: dId_zona,        
        id_emergencia: dId_emergencia,
        emergencia: dEmergencia,
        fecha: dFecha,
        hora: dHora,
        id_turno: dId_turno,
        id_llamada: dId_llamada,
        id_operativo: dId_operativo,
        operativo: dOperativo,
        otros_operativos: dOtroOperativo,
        nombre: dNombre,
        telefono: dTelefono,
        id_colonia: dId_colonia,
        colonia: dColonia,
        calle: dCalle,
        calle1: dCalle1,
        observaciones: dObservaciones,
        id_cuadrante: dId_cuadrante,
        sector: dSector,
        cuadrante: dCuadrante,
        placas: dPlacas,
        serie: dSerie,
        color: dColor,
        marca: dMarca,
        subMarca: dSubMarca,
        modelo: dModelo,
        resultado: dResultado,
        unidad: dUnidad,
        hrecibe: dHRecibe,
        hasignacion: dHAsignacion,
        harribo: dHArribo,
        id_emergencia_cierre: dId_emergencia_cierre,
        emergencia_cierre: dEmergencia_cierre,
        id_tipo_cierre: dId_tipo_cierre,
        tipo_cierre: dTipo_cierre,
        id_tipo_emergencia: dId_tipo_emergencia,
        tipo_emergencia: dTipo_emergencia,
        fecha_captura_dtl: dFecha_dtl,
        usuario_dtl: dUsuario_dtl,
        fecha_cierre: dFecha_cierre,
        usuario_cierre: dUsuario_cierre
    } = rActive;

    if (allowed.length === 0) {
        return (<NoAccess />);
    }

    const toDay = moment().format('YYYY-MM-DD');
    const hour = moment().format('HH:mm');

    const { formValues, handleInputChange, setValues} = useForm({
        id_update: idActive,
        id_servicio: dId_servicio,
        folio: dFolio,
        id_status: dId_status,
        id_usuario: uid,
        id_zona_b: dId_zona || id_zona, 
        id_emergencia: (dId_emergencia == null ) ? 0 : dId_emergencia,
        emergencia: (dEmergencia == "") ? "Selecciona la emergencia" : dEmergencia,
        fecha : (dFecha == "" || dFecha == null ) ? toDay: dFecha,
        hora : (dHora == "" || dHora == null ) ? hour: dHora,
        id_turno: dId_turno,
        id_llamada: dId_llamada,
        id_operativo: (dId_operativo == null ) ? 0 : dId_operativo,
        operativo: (dOperativo == "" || dOperativo == null) ? 'Selecciona el operativo' : dOperativo,
        otros_operativos: (dOtroOperativo == null) ? '' : dOtroOperativo,
        nombre: dNombre,
        telefono: dTelefono,
        id_colonia: dId_colonia,
        colonia: dColonia,
        calle: dCalle,
        calle1: dCalle1,
        observaciones: dObservaciones,
        id_cuadrante: dId_cuadrante,
        sector: dSector,
        cuadrante: dCuadrante,
        placas: (dPlacas == null ) ? '': dPlacas,
        color: (dColor == null ) ? '': dColor,
        serie: (dSerie == null ) ? '': dSerie,
        modelo: (dModelo == null ) ? '': dModelo,
        marca: (dMarca == null ) ? '': dMarca,
        subMarca: (dSubMarca == null ) ? '': dSubMarca,
        resultado: dResultado,
        unidad: dUnidad,
        hrecibe: dHRecibe,
        hasignacion: dHAsignacion,
        harribo: dHArribo,
        id_emergencia_cierre: (dId_emergencia_cierre == null) ? 0 : dId_emergencia_cierre,
        emergencia_cierre: (dEmergencia_cierre == "" || dEmergencia_cierre == null) ? 'Selecciona' : dEmergencia_cierre,
        id_tipo_cierre: (dId_tipo_cierre == null) ? 0 : dId_tipo_cierre, 
        tipo_cierre: (dTipo_cierre == "" || dTipo_cierre == null) ? 'Selecciona' : dTipo_cierre,
        id_tipo_emergencia: (dId_tipo_emergencia == null) ? 0 : dId_tipo_emergencia,
        tipo_emergencia: (dTipo_emergencia == "" || dTipo_emergencia == null) ? 'Selecciona' : dTipo_emergencia, 
        fecha_captura_dtl: (dFecha_dtl == null) ? '----' : dFecha_dtl,
        usuario_dtl: (dUsuario_dtl == null || dUsuario_dtl == "" ) ? '----' : dUsuario_dtl,
        fecha_cierre: (dFecha_cierre == null) ? '----' : dFecha_cierre,
        usuario_cierre: (dUsuario_cierre == null || dUsuario_cierre == "") ? '----' : dUsuario_cierre
    });

    

    const { folio,
            id_zona_b, 
            id_servicio,
            id_status, 
            id_emergencia, 
            emergencia, 
            fecha, hora, 
            id_turno, 
            id_llamada, 
            id_operativo, 
            operativo, 
            otros_operativos, 
            id_colonia, 
            colonia, 
            nombre, 
            telefono, 
            calle, 
            calle1, 
            observaciones,
            id_cuadrante,
            sector,
            cuadrante,
            placas,
            color,
            serie,
            marca,
            subMarca,
            modelo,
            resultado,
            unidad,
            hrecibe,
            hasignacion,
            harribo,
            id_emergencia_cierre,
            emergencia_cierre,
            id_tipo_cierre,
            tipo_cierre,
            id_tipo_emergencia,
            tipo_emergencia,
            fecha_captura_dtl,
            usuario_dtl,
            fecha_cierre,
            usuario_cierre
        } = formValues;
        
        
    useEffect(() => {
        if (comboEmergencias.length === 0) {
            dispatch( startGetComboEmergencias() );
        }
    
        if (id_emergencia == 37 || id_emergencia == 36 ) {
            setShowInputs(true);
        }

    }, [dispatch, comboEmergencias])

    useEffect(() => {
        if (comboProcedencia.length === 0) {
            dispatch( startGetComboProcedencia() );
        }
    }, [dispatch, comboProcedencia])

    useEffect(() => {
        if (comboOperativos.length === 0) {
            dispatch( startGetComboOperativos() );
        }

        if (id_operativo == 16) {
            setShowOtros(true);
        } else {
            setShowOtros(false);
        }
    
    }, [dispatch, comboOperativos])

    useEffect(() => {

        if (comboColonias.length === 0) {
            dispatch( startGetComboColonias() );
        }
    
    }, [dispatch, comboColonias])

    useEffect(() => {
        if (comboTipoEmergencia.length === 0) {
            dispatch( startGetComboTipoEmergencia() );
        }
    
    }, [dispatch, comboTipoEmergencia])

    useEffect(() => {
        if (comboTipoCierre.length === 0) {
            dispatch( startGetComboTipoCierre() );
        }
    
    }, [dispatch, comboTipoCierre])

    
    const handleSubmitForm = ( e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoadingBtn(true);
        dispatch( startInsertServicios( formValues,  setLoadingBtn));
    }
    
    const handleChangeEmergencia = (opcion : any) => {
        
        let id_e = opcion.value;

        if (parseInt(id_e) == 37 || parseInt(id_e) == 36) {
            setShowInputs( true );
        } else {
            setShowInputs( false );            
        }

        setValues({
            ...formValues,
            id_emergencia: id_e

        });
    }

    const handleChangeColonia = (opcion : any) => {
        
        let id_c = opcion.value;
        setValues({
            ...formValues,
            id_colonia: id_c

        });
    }

    const handleChangeOperativo = (opcion : any) => {
        
        let id_o = opcion.value;
        if (id_o == 16) {
            setShowOtros( true );
        } else {
            setShowOtros( false );
        }

        setValues({
            ...formValues,
            id_operativo: id_o

        });
    }

    let titleMain = "Servicios";
    let titleHeader = (Number(id_status) === 2 || readOnly) ? `Asignar servicio (Folio N° ${folio})` : `Responder servicio ( Folio N° ${folio } )`;
    titleMain = (idActive === 0) ? titleMain : titleHeader;

    return(
        <>
        <div className="card mb-4">
            <HeaderList title={titleMain}/>
            <div className="card-body">
                <ul className="nav nav-pills mb-4">
                    <li className="nav-item">
                        <button
                            className="btn btn-outline-danger btn-sm me-2 float-end"
                            onClick={() => {
                                dispatch(setShowList( true ));
                            }}
                        >
                            <FontAwesomeIcon icon={faStepBackward} /> Regresar
                        </button>
                    
                    </li>
                    {
                        (id_status == 1) &&
                        <li className="nav-item">
                            <button
                                className="btn btn-success me-2 btn-sm float-end"
                                title='Asignar servicio'
                                onClick={ ()=> {
                                    setShowModalAsignar( true );
                                }}
                                >                 
                                <FontAwesomeIcon icon={faShareFromSquare} /> Asignar
                            </button>                    
                        </li>
                    }
                     {
                        (id_status == 2) &&
                        <li className="nav-item">
                            <button
                                className="btn btn-warning me-2 btn-sm float-end"
                                title='Respuesta servicio'
                                onClick={ ()=> {
                                    setShowModalAsignar( true );
                                }}
                                >                 
                                <FontAwesomeIcon icon={faUserPen} /> Respuesta
                            </button>                    
                        </li>
                    }
                </ul>
                <form className="g-3" onSubmit={handleSubmitForm}>
                    <div className="row">                        
                        <div className="col-6 col-lg-4 col-xl-2">
                            <label htmlFor="fecha">
                                Fecha<span className="text-danger">*</span>
                            </label>
                            <input
                                type="date"
                                className={inputClass}
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
                                className={inputClass}
                                name="hora"
                                id="hora"
                                onChange={handleInputChange}
                                value={ hora }
                                readOnly={readOnly}
                                autoComplete="off"
                                required
                            />
                        </div>
                        <div className="col-6 col-lg-4 col-xl-2">
                            <label htmlFor="id_turno">
                                Turno: <span className="text-danger">*</span>
                            </label>
                            <select
                            name="id_turno"
                            id="id_turno"
                            value={id_turno}
                            disabled={readOnly}
                            onChange={ handleInputChange }
                            className={inputClass}
                            required
                            >
                                <option value="">Selecciona</option>
                                <option value="1">PRIMERO</option>
                                <option value="2">SEGUNDO</option>
                                <option value="3">TERCERO</option>
                               
                            </select>
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
                                className={inputClass}
                                required
                                >
                                <option value="">Selecciona</option>
                                <option value="1">Poniente</option>
                                <option value="2">Oriente</option>
                                
                            </select>
                        </div>
                        <div className="col-12 col-lg-6 col-xl-4">
                           <label htmlFor="id_emergencia">
                                Emergencias <span className="text-danger">*</span>
                            </label>
                            {
                            (comboEmergencias !== undefined) &&
                            (comboEmergencias.length > 0) &&
                            <Select 
                                required
                                className='indicatorsContainer'
                                isDisabled={ readOnly }
                                placeholder={ 'Selecciona el departamento' }
                                onChange={ handleChangeEmergencia }
                                defaultValue={ 
                                    {'value' : id_emergencia, 'label' : emergencia}
                                }
                                options={ 
                                    comboEmergencias.map(reg => ({ 
                                        value: reg.id_emergencia, label: reg.emergencias
                                    })) 
                                }
                            />
                            }
                        </div>
                    </div>    
                    <div className="row">
                        <div className="col-12 col-md-6 col-xl-2">
                            <label htmlFor="id_llamada">
                                Procedencia de llamada <span className='text-danger'>*</span>
                            </label>
                            <select
                                name="id_llamada"
                                id="id_llamada"
                                value={id_llamada}
                                disabled={readOnly}
                                onChange={handleInputChange}
                                className={inputClass}
                                required
                            >
                                <option value="">Selecciona</option>
                                {
                                    (comboProcedencia !== undefined) &&
                                    (comboProcedencia.length > 0) &&
                                    comboProcedencia.map((item, index) => (
                                        (readOnly)
                                        ?
                                        <option
                                            key={`comboP${index}`}
                                            value={item.id_procedencia}>
                                            {item.descripcion}
                                        </option>
                                        :
                                        (item.activo == 1) &&
                                        <option
                                            key={`combo${index}`}
                                            value={item.id_procedencia}>
                                            {item.descripcion}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="col-12 col-md-6 col-xl-3">
                            <label htmlFor="id_operativo">
                                Operativos <span className='text-danger'>*</span>
                            </label>
                            {
                            (comboOperativos !== undefined) &&
                            (comboOperativos.length > 0) &&
                            <Select 
                                required
                                className="react-select-container"
                                classNamePrefix="react-select"
                                isDisabled={ readOnly }
                                placeholder={ 'Selecciona el operativo' }
                                onChange={ handleChangeOperativo }
                                defaultValue={ 
                                    {'value' : id_operativo, 'label' : operativo}
                                }
                                options={ 
                                    comboOperativos.map(reg => ({ 
                                        value: reg.id_operativo, label: reg.descripcion
                                    })) 
                                }
                            />
                            }
                        </div>
                        {
                        (!showOtros) && 
                        (otros_operativos !== null) || (
                        <div className="col-12 col-lg-6 col-xl-2">
                            <label htmlFor="nombre">
                                Especifica el operativo<span className="text-danger">*</span>
                            </label>
                            <input
                                type="text"
                                className={inputClass}
                                name="otro_operativo"
                                id="otro_operativo"
                                onChange={handleInputChange}
                                autoComplete="off"
                                autoFocus={false}
                                value={ otros_operativos }
                                disabled={ readOnly }
                                required
                            />
                        </div>
                        )}
                        <div className="col-12 col-lg-6 col-xl-4">
                            <label htmlFor="nombre">
                                Nombre<span className="text-danger">*</span>
                            </label>
                            <input
                                type="text"
                                className={inputClass}
                                name="nombre"
                                id="nombre"
                                onChange={handleInputChange}
                                autoComplete="off"
                                autoFocus={false}
                                value={ nombre }
                                disabled={ readOnly }
                                required
                            />
                        </div>
                        <div className="col-12 col-lg-6 col-xl-2">
                            <label htmlFor="telefono">
                                Teléfono<span className="text-danger">*</span>
                            </label>
                            <input
                                type="text"
                                className={inputClass}
                                name="telefono"
                                id="telefono"
                                onChange={handleInputChange}
                                autoComplete="off"
                                autoFocus={false}
                                value={ telefono }
                                disabled={ readOnly }
                                required
                            />
                        </div>
                        <div className="col-12 col-lg-6 col-xl-4">
                            <label htmlFor="id_colonia">
                                Colonia <span className="text-danger">*</span>
                            </label>
                            {
                            (comboColonias !== undefined) &&
                            (comboColonias.length > 0) &&
                            <Select 
                                required
                                isDisabled={ readOnly }
                                placeholder={ 'Selecciona la colonia ' }
                                onChange={ handleChangeColonia }
                                defaultValue={ 
                                    {'value' : id_colonia, 'label' : colonia}
                                }
                                options={ 
                                    comboColonias.map(reg => ({ 
                                        value: reg.id_colonia, label: reg.colonias
                                    })) 
                                }
                            />
                            }
                        </div>
                        <div className="col-6 col-lg-6 col-xl-3">
                            <label htmlFor="calle">
                                Calle<span className="text-danger">*</span>
                            </label>
                            <input
                                type="text"
                                className={inputClass}
                                name="calle"
                                id="calle"
                                onChange={handleInputChange}
                                autoComplete="off"
                                autoFocus={false}
                                value={ calle }
                                disabled={ readOnly }
                                required
                            />
                        </div>
                        <div className="col-6 col-lg-6 col-xl-3">
                            <label htmlFor="calle1">
                                Esquina / Referencia<span className="text-danger">*</span>
                            </label>
                            <input
                                type="text"
                                className={inputClass}
                                name="calle1"
                                id="calle1"
                                onChange={handleInputChange}
                                autoComplete="off"
                                autoFocus={false}
                                value={ calle1 }
                                disabled={ readOnly }
                            />
                        </div>
                    </div>  
                    {                    
                    (showInputs) && (                        
                    <div className="row">                        
                        <div className="col-6 col-lg-4 col-xl-2">
                            <label htmlFor="placas">
                                Placas 
                            </label>
                            <input
                                type="text"
                                className={inputClass}
                                name="placas"
                                id="placas"
                                onChange={handleInputChange}
                                autoComplete="off"
                                autoFocus={false}
                                disabled={ readOnly }
                                value={placas}
                            />
                        </div>
                        <div className="col-6 col-lg-4 col-xl-2">
                            <label htmlFor="modelo">
                                Modelo
                            </label>
                            <input
                                type="text"
                                className={inputClass}
                                name="modelo"
                                id="modelo"
                                onChange={handleInputChange}
                                autoComplete="off"
                                autoFocus={false}
                                disabled={ readOnly }
                                value={modelo}
                            />
                        </div>
                        <div className="col-6 col-lg-4 col-xl-2">
                            <label htmlFor="marca">
                                Marca
                            </label>
                            <input
                                type="text"
                                className={inputClass}
                                name="marca"
                                id="marca"
                                onChange={handleInputChange}
                                autoComplete="off"
                                autoFocus={false}
                                disabled={ readOnly }
                                value={marca}
                            />
                        </div>
                        <div className="col-6 col-lg-4 col-xl-2">
                            <label htmlFor="submarca">
                                SubMarca
                            </label>
                            <input
                                type="text"
                                className={inputClass}
                                name="submarca"
                                id="submarca"
                                onChange={handleInputChange}
                                autoComplete="off"
                                autoFocus={false}
                                disabled={ readOnly }
                                value={ subMarca }
                            />
                        </div>
                        <div className="col-6 col-lg-4 col-xl-2">
                            <label htmlFor="color">
                                Color
                            </label>
                            <input
                                type="text"
                                className={inputClass}
                                name="color"
                                id="color"
                                onChange={handleInputChange}
                                autoComplete="off"
                                autoFocus={false}
                                disabled={ readOnly }
                                value={ color }
                            />
                        </div>
                        <div className="col-6 col-lg-4 col-xl-2">
                            <label htmlFor="serie">
                                Serie
                            </label>
                            <input
                                type="text"
                                className={inputClass}
                                name="serie"
                                id="serie"
                                onChange={handleInputChange}
                                autoComplete="off"
                                autoFocus={false}
                                value={ serie }
                            />
                        </div>
                    </div>
                    )}              
                    <div className="row">  
                        <div className="col-12">
                            <label htmlFor="observaciones">
                                Reporte <span className="text-danger">*</span>
                            </label>
                            <textarea name="observaciones" id="observaciones" 
                                rows={5} 
                                className={inputClass}
                                disabled={ readOnly }
                                onChange={ handleInputChange }
                                value={ observaciones } ></textarea>
                        </div>
                    </div>
                    {
                    (id_status >= 2) &&
                    <div className="row mt-3">
                        <div className="col-12 me-2">
                            <h5>Detalle de Asignación</h5>
                            <i className='me-2 list-group-item'>Usuario Captura: <strong> { usuario_dtl } </strong> </i>
                            <i className='me-2  list-group-item'>Fecha captura: <strong> { fecha_captura_dtl } </strong></i>
                            <br />
                        </div>
                        <div className="col-6 col-lg-3 col-xl-2">
                            <label htmlFor="hasignacion">
                                Hr. Asignación
                            </label>
                            <input
                                type="text"
                                className={inputClass}
                                disabled={ readOnly }
                                value={ hasignacion }
                            />
                        </div>
                        <div className="col-6 col-lg-3 col-xl-2">
                            <label htmlFor="unidad">
                                Unidad
                            </label>
                            <input
                                type="text"
                                className={inputClass}
                                disabled={ readOnly }
                                value={ unidad }
                            />
                        </div>
                        <div className="col-6 col-md-3 col-xl-2">
                            <label htmlFor="sector">
                                Sector 
                            </label>
                            <input
                                type="text"
                                className={inputClass}
                                disabled={ readOnly }
                                value={ sector }
                            />
                        </div>
                        <div className="col-6 col-md-3 col-xl-2">
                            <label htmlFor="cuadrante">
                                Cuadrante
                            </label>
                            <input
                                type="text"
                                className={inputClass}
                                disabled={ readOnly }
                                value={ cuadrante }
                            />                           
                        </div>
                    </div>
                    }
                    {
                    (id_status >= 3) &&
                    <div className="row mt-3">
                        <div className="col-12 mt-2">
                            <h5>Detalle del cierre de servicio</h5>
                            <i className='me-2 list-group-item'>Usuario Cierre: <strong> { usuario_cierre } </strong> </i>
                            <i className='m2-2  list-group-item'>Fecha Cierre: <strong> { fecha_cierre } </strong></i>
                            <br />
                        </div>
                        <div className="col-6 col-lg-2 col-xl-1">
                            <label>
                                Hr. Arribo
                            </label>
                            <input
                                type="text"
                                className={inputClass}
                                disabled={ readOnly }
                                value={ harribo }
                            />
                        </div>
                        <div className="col-6 col-lg-2 col-xl-2">
                            <label>
                                Hr. Termino
                            </label>
                            <input
                                type="text"
                                className={inputClass}
                                disabled={ readOnly }
                                value={ hrecibe }
                            />
                        </div>
                        <div className="col-6 col-lg-3 col-xl-3">
                            <label>
                                Tipo de emergencia
                            </label>
                            <input
                                type="text"
                                className={inputClass}
                                disabled={ readOnly }
                                value={ tipo_emergencia }
                            />
                        </div>
                        <div className="col-6 col-lg-3 col-xl-3">
                            <label> Emergencia Cierre </label>
                            <input
                                type="text"
                                className={inputClass}
                                disabled={ readOnly }
                                value={ emergencia_cierre }
                            />
                        </div>
                        <div className="col-6 col-lg-3 col-xl-3">
                            <label>
                                Tipo de Cierre
                            </label>
                            <input
                                type="text"
                                className={inputClass}
                                disabled={ readOnly }
                                value={ tipo_cierre }
                            />
                        </div>
                        <div className="col-12">
                            <label htmlFor="observaciones">
                                Reporte <span className="text-danger">*</span>
                            </label>
                            <textarea
                                rows={7} 
                                className={inputClass}
                                value={ resultado } ></textarea>
                        </div>
                    </div>
                    }
                </form>
                {
                    (showModalAsignar) &&
                    <AsignarModalFrm
                        showModal={ showModalAsignar }
                        setShowModal={ setShowModalAsignar }
                    />
                }
            </div>
        </div>
        </>
    )

}
