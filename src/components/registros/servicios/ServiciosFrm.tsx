

import React, { FC, FormEvent, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { usePermission } from '../../../hooks/usePermission';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';

import Select from 'react-select';
import moment from 'moment';
import { HeaderList, NoAccess } from '../../ui/UserInterface';
import { useForm } from '../../../hooks/useForm';
import { startInsertServicios } from '../../../store/slices/registros';
import { startComboCuadrantes, startGetComboColonias, startGetComboEmergencias, startGetComboOperativos, startGetComboProcedencia } from '../../../store/slices/catalogos';
import { setShowList } from '../../../store/slices/transaction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faShareFromSquare, faStepBackward, faUserPen } from '@fortawesome/free-solid-svg-icons';
import { AsignarModalFrm } from './AsignarModalFrm';
import { RespuestaModalFrm } from './RespuestaModalFrm';

export const ServiciosFrm: FC = () => {

    const { pathname } = useLocation();
    const allowed = usePermission(pathname);
    
    const dispatch = useAppDispatch();

    const [loadingBtn, setLoadingBtn] = useState( false );
    const [disabled, setDisabled] = useState(false);
    const [showInputs, setShowInputs] = useState( false );
    const [showOtros, setShowOtros] = useState( false )
    const [ showModalAsignar, setShowModalAsignar ] = useState(false);
    const [ showModalRespuesta, setShowModalRespuesta ] = useState(false);

    const { idActive, rActive  } = useAppSelector( state => state.servicios);
    const { comboEmergencias } = useAppSelector( state => state.emergencias);
    const { comboProcedencia } = useAppSelector( state => state.procedencia);
    const { comboOperativos } = useAppSelector( state => state.operativos);
    const { comboColonias } = useAppSelector( state => state.colonias);
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
        region: dRegion,
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
        usuario_cierre: dUsuario_cierre,
        notas_dtl: dNotasList,
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
        otros_operativos: (dOtroOperativo == null || dOtroOperativo == "") ? 'Sin datos' : dOtroOperativo,
        nombre: dNombre,
        telefono: dTelefono, 
        id_colonia:  (dId_colonia == null ) ? 0 : dId_colonia,
        colonia: dColonia,
        calle: dCalle,
        calle1: dCalle1,
        observaciones: dObservaciones,
        id_cuadrante: (dId_cuadrante == null ) ? 0 : dId_cuadrante,
        sector: (dSector == null) ? '----' : dSector,
        cuadrante: (dCuadrante == undefined) ? '----' : dCuadrante,
        region: (dRegion == null || dRegion == undefined) ? '----' : dRegion,
        placas: (dPlacas == null || dPlacas == undefined ) ? '': dPlacas,
        color: (dColor == null || dColor == undefined) ? '': dColor,
        serie: (dSerie == null || dSerie == undefined) ? '': dSerie,
        modelo: (dModelo == null || dModelo == undefined) ? '': dModelo,
        marca: (dMarca == null || dMarca == undefined) ? '': dMarca,
        subMarca: (dSubMarca == null || dSubMarca == undefined) ? '': dSubMarca,
        resultado: (dResultado == null || dResultado == undefined) ? '': dResultado,
        unidad: (dUnidad == null || dUnidad == undefined) ? '': dUnidad,
        hrecibe: (dHRecibe == null || dHRecibe == undefined) ? '': dHRecibe,
        hasignacion: (dHAsignacion == null || dHAsignacion == undefined) ? '': dHAsignacion,
        harribo: (dHArribo == null || dHArribo == undefined) ? '' : dHArribo,
        id_emergencia_cierre: (dId_emergencia_cierre == null) ? 0 : dId_emergencia_cierre,
        emergencia_cierre: (dEmergencia_cierre == "" || dEmergencia_cierre == null) ? 'Selecciona' : dEmergencia_cierre,
        id_tipo_cierre: (dId_tipo_cierre == null) ? 0 : dId_tipo_cierre, 
        tipo_cierre: (dTipo_cierre == "" || dTipo_cierre == null) ? 'Selecciona' : dTipo_cierre,
        id_tipo_emergencia: (dId_tipo_emergencia == null) ? 0 : dId_tipo_emergencia,
        tipo_emergencia: (dTipo_emergencia == "" || dTipo_emergencia == null) ? 'Selecciona' : dTipo_emergencia, 
        fecha_captura_dtl: (dFecha_dtl == null) ? '----' : dFecha_dtl,
        usuario_dtl: (dUsuario_dtl == null || dUsuario_dtl == "" ) ? '----' : dUsuario_dtl,
        fecha_cierre: (dFecha_cierre == null) ? '----' : dFecha_cierre,
        usuario_cierre: (dUsuario_cierre == null || dUsuario_cierre == "") ? '----' : dUsuario_cierre,
        notasDtl: dNotasList,
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
            sector,
            cuadrante,
            region,
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
            emergencia_cierre,
            tipo_cierre,
            tipo_emergencia,
            fecha_captura_dtl,
            usuario_dtl,
            fecha_cierre,
            usuario_cierre,
            notasDtl
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
    let titleHeader = `Asignar servicio (Folio N° ${folio})`;

    if(id_status == 2) {
        titleHeader = `Responder servicio (Folio N° ${folio})`;

    } else if(id_status == 3) {
        titleHeader = `Servicio concluido (Folio N° ${folio})`;

    }

    titleMain = (idActive === 0) ? titleMain : titleHeader;

    return(
        <>
        <div className="card mb-4">
            <HeaderList title={titleMain}/>
            <div className="card-body">
                <ul className="nav nav-pills mb-4">
                    <li className="nav-item">
                        <button
                            className="btn btn-outline-primary me-2 float-end"
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
                                className="btn btn-outline-danger me-2 float-end"
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
                                className="btn btn-outline-danger me-2 float-end"
                                title='Respuesta servicio'
                                onClick={ ()=> {
                                    setShowModalRespuesta( true );
                                }}
                                >                 
                                <FontAwesomeIcon icon={faUserPen} /> Respuesta
                            </button>                    
                        </li>
                    }
                </ul>
                <form className="g-3" onSubmit={handleSubmitForm}>
                    <div className="row">                        
                        <div className="col-6 col-lg-4 col-xl-3 col-xxl-2">
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
                                readOnly={readOnly}
                                // disabled={!disabled}
                                value={ fecha }
                                required
                            />
                        </div>
                        <div className="col-6 col-lg-4 col-xl-3 col-xxl-2">
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
                        <div className="col-6 col-lg-4 col-xl-3 col-xxl-2">
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
                        <div className="col-6 col-lg-4 col-xl-3 col-xxl-2">
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
                        <div className="col-12 col-lg-8 col-xl-6 col-xxl-4">
                           <label htmlFor="id_emergencia">
                                Emergencias <span className="text-danger">*</span>
                            </label>
                            {
                            (comboEmergencias !== undefined) &&
                            (comboEmergencias.length > 0) &&
                            <Select 
                                required
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
                        <div className="col-12 col-lg-6 col-xl-3 col-xxl-3">
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
                        <div className="col-12 col-lg-6 col-xl-3 col-xxl-3">
                            <label htmlFor="id_operativo">
                                Operativos <span className='text-danger'>*</span>
                            </label>
                            {
                            (comboOperativos !== undefined) &&
                            (comboOperativos.length > 0) &&
                            <Select 
                                required
                                className="react-select-container"
                                classNamePrefix="form-select"
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
                        <div className="col-12 col-lg-6 col-xl-4 col-xxl-3">
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
                        <div className="col-12 col-lg-6 col-xl-4 col-xxl-3">
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
                        <div className="col-12 col-lg-6 col-xl-4 col-xxl-3">
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
                        <div className="col-12 col-lg-12 col-xl-6 col-xxl-4">
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
                        <div className="col-6 col-lg-6 col-xl-3 col-xxl-4">
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
                        <div className="col-6 col-lg-6 col-xl-3 col-xxl-4">
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
                        <div className='col-md-12'>
                            <div className="card mt-3 ">
                                <div className="card-body">
                                    <div className="col-12 me-2">
                                        <h5 className='text-center'>Detalle de Asignación</h5>
                                        <i className='me-2 list-group-item'>Usuario Captura: <strong> { usuario_dtl } </strong> </i>
                                        <i className='me-2  list-group-item'>Fecha captura: <strong> { fecha_captura_dtl } </strong></i>
                                        <br />
                                    </div>
                                    {/* <div className="row"> */}
                                        <div className="col-xs-6">
                                            <p>Hr. Asignación: <strong> { hasignacion }</strong> <br />
                                                Unidad: <strong> { unidad }</strong><br />
                                                Sector: <strong> { sector }</strong><br />                                                
                                                Cuadrante: <strong> { cuadrante }</strong><br />                                                
                                                Región: <strong> { region }</strong><br />                                                
                                            </p>
                                        </div>
                                    {/* </div> */}
                                </div>
                            </div>
                        </div>
                    }
                    {
                    (id_status == 3) &&      
                    <div className='col-12'>
                        <div className="card mt-3">
                            <div className="card-body">
                                <div className="col-12 me-2">
                                    <h5 className='text-center'>Detalle del cierre de servicio</h5>
                                    <i className='me-2 list-group-item'>Usuario Cierre: <strong> { usuario_cierre } </strong> </i>
                                    <i className='me-2  list-group-item'>Fecha Cierre: <strong> { fecha_cierre } </strong></i>
                                    <br />
                                </div>
                                <div className="row">
                                    <div className="col-xs-6">
                                        <p>Hr. Arribo: <strong> { harribo }</strong> <br />
                                            Hr. Termino: <strong> { hrecibe }</strong><br />
                                            Tipo de emergencia: <strong> { tipo_emergencia }</strong><br />                                                
                                            Emergencia Cierre: <strong> { emergencia_cierre }</strong><br />                                                
                                            Tipo de cierre: <strong> { tipo_cierre }</strong><br />
                                            Reporte: <strong> { resultado }</strong><br />
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    }
                    <div className="row mt-2">
                        <i>Notas</i>
                        {
                            (notasDtl.length > 0) &&
                            notasDtl.map((item: any) => (
                                <div key={item.id_nota}  className='col-11 border-bottom'>
                                    <div className='fw-bolder'>
                                        <li>{item.descripcion}</li></div>
                                </div>
                            ))
                        }
                        {
                            (notasDtl.length == 0) &&
                            <div>
                                <h6><i className='fw-bolder'>
                                    No hay notas registradas.
                                </i></h6>
                            </div>
                        }
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
                {
                    (showModalAsignar) &&
                    <AsignarModalFrm
                        showModal={ showModalAsignar }
                        setShowModal={ setShowModalAsignar }
                    />
                }
                {
                    (showModalRespuesta) &&
                    <RespuestaModalFrm
                        showModal= { showModalRespuesta}
                        setShowModal={ setShowModalRespuesta }
                    />
                }
            </div>
        </div>
        </>
    )

}
