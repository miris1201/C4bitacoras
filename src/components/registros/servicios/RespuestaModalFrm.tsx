

import { useState } from 'react'
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'
import { iModalRespuesta } from '../../../interfaces'
import { useAppDispatch, useAppSelector } from '../../../store/hooks';

export const RespuestaModalFrm = ({ showModal, setShowModal }: iModalRespuesta) => {

    const dispatch = useAppDispatch();
    const [loadingBtnDtl, setLoadingBtnDtl] = useState(false);
  
    const { idActive, rActive } = useAppSelector(state => state.servicios);
    const { readOnly } = useAppSelector(state => state.transaction);
    const { comboSector } = useAppSelector( state => state.cuadrantes);
    const { comboCuadrantes } = useAppSelector( state => state.cuadrantes);
	const { uid, systemOptions } = useAppSelector(state => state.login);

    const { id_zona } = systemOptions;

    return(
        <CModal 
          backdrop="static"
          alignment='center'
          visible={showModal}
          onClose={() => setShowModal(false)}>
          <CModalHeader>
            <CModalTitle>Asigar servicio</CModalTitle>
          </CModalHeader>
          <form className='row g-3'>
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
                          autoComplete="off"
                          autoFocus={false}
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
                          autoComplete="off"
                          autoFocus={false}
                      />
                  </div>
                  <div className="col-6 col-xl-6">
                      <label htmlFor="sector">
                          Sector <span className='text-danger'>*</span>
                      </label>
                     
                  </div>
                  <div className="col-6 col-xl-6">
                      <label htmlFor="id_cuadrante">
                          Cuadrante <span className='text-danger'>*</span>
                      </label>
                      <select
                          name="id_cuadrante"
                          id="id_cuadrante"
                          className="form-select"
                          required
                      >
                          <option value="">Selecciona</option>
                          
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
                        className="btn btn-outline-info btn-sm">
                        Guardar
                    </button>
                </CModalFooter>
          </form>
        </CModal>
    )
}
