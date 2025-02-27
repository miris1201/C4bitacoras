import { FormEvent, useEffect, useState } from 'react'
import { useForm } from '../../../hooks/useForm';

import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'
import { iModalRespuesta } from '../../../interfaces'
import { useAppDispatch, useAppSelector } from '../../../store/hooks';

import Select from'react-select';
import moment from 'moment';
import Swal from 'sweetalert2';

import { setComboEmergencias, startComboEmergenciaCierre,  
         startGetComboEmergencias,  
         startGetComboTipoCierre, 
         startGetComboTipoEmergencia } from '../../../store/slices/catalogos';
import { startInsertResultado } from '../../../store/slices/registros';

export const RespuestaModalFrm = ({ showModal, setShowModal }: iModalRespuesta) => {

    const dispatch = useAppDispatch();
    const [loadingBtnDtl, setLoadingBtnDtl] = useState(false);
  
    const { idActive, rActive } = useAppSelector(state => state.servicios);
    const { readOnly } = useAppSelector(state => state.transaction);
    const { comboTipoEmergencia } = useAppSelector( state => state.tipoEmergencia);
    const { comboEmergencias } = useAppSelector( state => state.emergencias);
    const { comboTipoCierre } = useAppSelector( state => state.tipoCierre);
	const { uid } = useAppSelector(state => state.login);

    const {
        folio,
        id_zona
    } = rActive;


    const hour = moment().format('HH:mm');

    const { formValues: frmRespValues, handleInputChange: handleInputRespuestaChange, setValues: setValuesRespuesta } = useForm({
        id_update: idActive,
        folio: folio,
        id_zona: id_zona, 
        id_usuario_cierre: uid,
        harribo: hour,
        hrecibe: hour,
        id_tipo_emergencia: 0,
        id_emergencia_cierre: 0,
        id_tipo_cierre: 0, 
        resultado: ''
    });

    const {
        id_update,
        id_usuario_cierre,
        harribo,
        hrecibe,
        id_tipo_emergencia,
        id_emergencia_cierre,
        id_tipo_cierre,
        resultado
    } = frmRespValues;
 

    useEffect(() => {
        if (comboTipoEmergencia.length === 0) {
            dispatch( startGetComboTipoEmergencia() );
        }
    
    }, [dispatch, comboTipoEmergencia])

    useEffect(() => {
        if (comboEmergencias.length === 0) {
            dispatch( startGetComboEmergencias() );
        }
    
    }, [dispatch, comboEmergencias])


    useEffect(() => {
        if (comboTipoCierre.length === 0) {
            dispatch( startGetComboTipoCierre() );
        }
    
    }, [dispatch, comboTipoCierre])

    const handleChangeEmergenciaCierre = (opcion : any) => {
        
        let id_e = opcion.value;

        setValuesRespuesta({
            ...frmRespValues,
            id_emergencia_cierre: id_e

        });
    }

    const handleSubmitAddRespuesta = (e: FormEvent<HTMLFormElement>) => {
        //Evitar propagación de submits en formularios anidados
            e.stopPropagation();
            e.preventDefault();
    
            setLoadingBtnDtl(true);

        if( id_tipo_emergencia > 0 && id_emergencia_cierre > 0 && id_tipo_cierre > 0
           && resultado != "" && resultado != null ){

            dispatch(startInsertResultado(frmRespValues, setLoadingBtnDtl));
            setShowModal(false);
        }else{
          Swal.fire({
                    title: 'Validación de campos',
                    text: "Debes de ingresar correctamente la información",
                    icon: 'error',
                }).then((result) => {
                    setLoadingBtnDtl(false);
                })
        }
    
      }

    return(
        <CModal 
            size='lg'
            backdrop="static"
            alignment='center'
            visible={showModal}
            onClose={() => setShowModal(false)}>
            <CModalHeader>
                <CModalTitle>Respuesta del servicio</CModalTitle>
            </CModalHeader>
            <form className='row g-3' onSubmit={ handleSubmitAddRespuesta }>
                <CModalBody>
                    <div className="row">                
                        <div className="col-6 col-xl-6">
                            <label htmlFor="harribo">
                                Hr. Arribo <span className='text-danger'>*</span>
                            </label>
                            <input
                                type="time"
                                className="form-control"
                                name="harribo"
                                id="harribo"
                                autoComplete="off"
                                onChange={handleInputRespuestaChange}
                                value={harribo}
                                autoFocus={false}
                            />
                        </div>
                        <div className="col-6 col-xl-6">
                            <label htmlFor="hrecibe">
                                Hr. Termino <span className='text-danger'>*</span>
                            </label>
                            <input
                                type="time"
                                className="form-control"
                                name="hrecibe"
                                id="hrecibe"
                                autoComplete="off"
                                value={hrecibe}
                                onChange={handleInputRespuestaChange}
                                autoFocus={false}
                            />
                        </div>
                        <div className="col-6 col-xl-6 mt-2">
                            <label htmlFor="id_tipo_emergencia">
                                Tipo emergencia <span className='text-danger'>*</span>
                            </label>
                            <select
                                name="id_tipo_emergencia"
                                id="id_tipo_emergencia"
                                className="form-select"
                                value={id_tipo_emergencia}
                                onChange={handleInputRespuestaChange}
                                required
                            >
                                <option value="">Selecciona</option>
                                {
                                    (comboTipoEmergencia !== undefined) &&
                                    (comboTipoEmergencia.length > 0) &&
                                     comboTipoEmergencia.map((item, index) => (                                    
                                        (item.activo == 1) &&
                                        <option
                                            key={`comboTE${index}`}
                                            value={item.id_tipo_emergencia}>
                                            {item.descripcion}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="col-6 col-xl-6 mt-2">
                            <label htmlFor="id_tipo_cierre">
                                Tipo cierre <span className='text-danger'>*</span>
                            </label>
                            <select
                                name="id_tipo_cierre"
                                id="id_tipo_cierre"
                                className="form-select"
                                value={id_tipo_cierre}
                                onChange={handleInputRespuestaChange}
                                required
                            >
                                <option value="">Selecciona</option>
                                {
                                    (comboTipoCierre !== undefined) &&
                                    (comboTipoCierre.length > 0) &&
                                    comboTipoCierre.map((item, index) => (                                    
                                        (item.activo == 1) &&
                                        <option
                                            key={`comboTC${index}`}
                                            value={item.id_tipo_cierre}>
                                            {item.descripcion}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="col-12 mt-2">
                            <label htmlFor="id_emergencia_cierre">
                                Emergencia de cierre
                                <span className='text-danger'>*</span>
                            </label>
                            {
                            (comboEmergencias !== undefined) &&
                            (comboEmergencias.length > 0) &&
                            <Select         
                                placeholder={ 'Selecciona la emergencia' }
                                onChange={ handleChangeEmergenciaCierre }
                                options={
                                    comboEmergencias.map(reg => ({
                                        value: reg.id_emergencia, label: reg.emergencias
                                    }))
                                }
                            />
                            }
                        </div>
                        <div className="col-12 mt-2">
                            <label htmlFor="resultado">
                                Resultado
                                <span className='text-danger'>*</span>
                            </label>
                            <textarea name="resultado" id="resultado" rows={6}
                                className='form-control' 
                                onChange={handleInputRespuestaChange}
                                value={resultado}></textarea>
                        </div>
                    </div>
                </CModalBody>
                <CModalFooter>
                    <CButton
                        color="outline-danger"
                        onClick={() => setShowModal(false)}>
                        Cerrar
                    </CButton>
                    <button
                        type="submit"
                        disabled={loadingBtnDtl}
                        className="btn btn-outline-info">
                        Guardar
                    </button>
                </CModalFooter>
            </form>
        </CModal>
    )
}
