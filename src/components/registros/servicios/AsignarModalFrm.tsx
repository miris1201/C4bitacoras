

import { FormEvent, useEffect, useState } from 'react'
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'
import { useForm } from '../../../hooks/useForm';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';

import { iModalAsignar } from '../../../interfaces'

import Select from'react-select';
import moment from 'moment';
import Swal from 'sweetalert2';
import { startComboCuadrantes, startGetComboSector } from '../../../store/slices/catalogos';
import { startInsertAsignacion } from '../../../store/slices/registros';

export const AsignarModalFrm = ({ showModal, setShowModal }: iModalAsignar) => {

    const dispatch = useAppDispatch();
    const [loadingBtnDtl, setLoadingBtnDtl] = useState(false);
  
    const { idActive, rActive } = useAppSelector(state => state.servicios);
    const { readOnly } = useAppSelector(state => state.transaction);
    const { comboSector } = useAppSelector( state => state.cuadrantes);
    const { comboCuadrantes } = useAppSelector( state => state.cuadrantes);
	const { uid, systemOptions } = useAppSelector(state => state.login);

    const {
        id_servicio,
        folio,
        id_zona
    } = rActive;

    const hour = moment().format('HH:mm');

    const { formValues: frmAsignarValues, handleInputChange: handleInputAsignarChange, setValues: setValuesAsignar } = useForm({
        id_update: idActive,
        id_servicio: id_servicio,  
        id_zona: id_zona, 
        id_usuario_dtl: uid,
        folio: folio,
        hasignacion: hour,
        unidad: '',
        sector: 0,
        id_cuadrante: 0
    });

    const { hasignacion, unidad, sector, id_cuadrante  } = frmAsignarValues;

    useEffect(() => {
        if (comboSector.length === 0) {
            dispatch( startGetComboSector( id_zona ) );
        }
    
    }, [dispatch, comboSector])

    const handleChangeSector = (opcion : any) => {
        
      let id_sector = opcion.value;

      dispatch( startComboCuadrantes(id_sector) );

      setValuesAsignar({
          ...frmAsignarValues,
          sector: id_sector

      });
  }

    const handleSubmitAddAsignar = (e: FormEvent<HTMLFormElement>) => {
      //Evitar propagación de submits en formularios anidados
          e.stopPropagation();
          e.preventDefault();
  
          setLoadingBtnDtl(true);
      
        if( unidad != null && sector > 0 && id_cuadrante > 0){
            dispatch(startInsertAsignacion(frmAsignarValues, setLoadingBtnDtl));
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

    return (
        <CModal 
            backdrop="static"
            alignment='center'
            visible={showModal}
            onClose={() => setShowModal(false)}>
            <CModalHeader>
                <CModalTitle>Asignar servicio</CModalTitle>
            </CModalHeader>
            <form className='row g-3' onSubmit={ handleSubmitAddAsignar }>
            <CModalBody>
                <div className="row">                
                    <div className="col-6 col-xl-6">
                        <label htmlFor="hasignacion">
                            Hr. Asignación
                        </label>
                        <input
                            type="time"
                            className="form-control"
                            name="hasignacion"
                            id="hasignacion"
                            onChange={handleInputAsignarChange}
                            autoComplete="off"
                            autoFocus={false}
                            value={ hasignacion }
                        />
                    </div>
                    <div className="col-6 col-xl-6">
                        <label htmlFor="unidad">
                            Unidad
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            name="unidad"
                            id="unidad"
                            onChange={handleInputAsignarChange}
                            autoComplete="off"
                            autoFocus={false}
                            value={ unidad }
                        />
                    </div>
                    <div className="col-6 col-xl-6">
                        <label htmlFor="sector">
                            Sector <span className='text-danger'>*</span>
                        </label>
                        {
                        (comboSector !== undefined) &&
                        (comboSector.length > 0) &&
                        <Select 
                            required
                            placeholder={ 'Selecciona  ' }
                            onChange={ handleChangeSector }
                            defaultValue={ 
                                {'value' : sector, 'label' : sector}
                            }
                            options={ 
                                comboSector.map(reg => ({ 
                                    value: reg.sector, label: reg.sector
                                })) 
                            }
                        />
                        }
                    </div>
                    <div className="col-6 col-xl-6">
                        <label htmlFor="id_cuadrante">
                            Cuadrante <span className='text-danger'>*</span>
                        </label>
                        <select
                            name="id_cuadrante"
                            id="id_cuadrante"
                            value={id_cuadrante}
                            onChange={handleInputAsignarChange}
                            className="form-select"
                            required >
                            <option value="">Selecciona</option>
                            {
                                (comboCuadrantes !== undefined) &&
                                (comboCuadrantes.length > 0) &&
                                comboCuadrantes.map((item, index) => (                                    
                                    (item.activo == 1) &&
                                    <option
                                        key={`combo${index}`}
                                        value={item.id_cuadrante}>
                                        {item.cuadrante}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                </div>
            </CModalBody>
            <CModalFooter>
                    <CButton
                        color="outline-danger btn-sm"
                        onClick={() => setShowModal(false)}>
                        Cerrar
                    </CButton>
                    <button
                        type="submit"
                        disabled={loadingBtnDtl}
                        className="btn btn-outline-primary">
                        Guardar
                    </button>
                </CModalFooter>
          </form>
        </CModal>
    )
}
