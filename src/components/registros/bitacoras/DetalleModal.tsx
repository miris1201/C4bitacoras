
import { iModalDetalle } from '../../../interfaces'
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react';


export const DetalleModal = ({folio, user, fecha, detalle, showModal, setShowModal}: iModalDetalle) => {

    return (
        <CModal 
            backdrop="static"
            alignment="center"
            visible={showModal}
            onClose={() => setShowModal(false)} >
            <CModalHeader>
                <CModalTitle>Detalle</CModalTitle>
            </CModalHeader>
            <form className='row g-3'>
                <CModalBody>
                    <div className="row">
						<div className="col-12">
                            <i>Folio: <strong> { folio}</strong> <br />
                                User captura: <strong>{ user }</strong> <br />
                                Fecha captura: <strong> { fecha }</strong><hr /></i>
                            <i className='text-justify'>{ detalle }</i>
						</div>
					</div>
                </CModalBody>
                <CModalFooter>
                    <CButton
                        color="outline-primary"
                        onClick={() => setShowModal(false)}>
                        Cerrar
                    </CButton>
                </CModalFooter>
            </form>
        </CModal>
    )
}

