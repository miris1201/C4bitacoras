import { useState } from 'react';
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react';


import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { useForm } from '../../../hooks/useForm';

import Swal from "sweetalert2";

import { dataAccountParams } from '../../../interfaces';
import { setMyAccount } from '../../../store/slices/users';

export const AccountModalForm = ({ showModal, setShowModal }: dataAccountParams) => {

	// const dispatch = useAppDispatch();
	
	const [loadingBtnDtl, setLoadingBtnDtl] = useState(false);
	
	// const { idActive, uActive } = useAppSelector(state => state.users);

	const { idActive, uActive } = useAppSelector(state => state.users);
	
	console.log(uActive);


	const {
		nombre: dNombre,
        apepa: dApepa,
        apema: dApema,
        usuario: dUsuario,
        no_empleado: dNo_empleado,
    } = uActive;

	
    const { formValues, handleInputChange, setValues } = useForm({
		id_update: idActive,
        nombre: dNombre,
        apepa: dApepa,
        apema: dApema || '',
        usuario: dUsuario,
        no_empleado: dNo_empleado
    });
	
	const { nombre, apepa, apema, usuario, no_empleado } = formValues;
	// console.log(no_empleado);
	

	return (
		<CModal
			backdrop="static"
            alignment="center"
			size="lg"
            visible={ showModal }
            onClose={() => setShowModal(false)}>
            <CModalHeader>
                <CModalTitle>Mi Cuenta </CModalTitle>
            </CModalHeader>
            <form className="row g-12">
                <CModalBody> 					
                    <div className="row g-12">
						<div className="col-6">
                            <label htmlFor="usuario">
                                Usuario
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                name="usuario"
                                id="usuario"
                                value={ usuario }
                                onChange={handleInputChange}
                                autoComplete="off"
								disabled
                            />
                        </div>
						<div className="col-6">
							<label htmlFor="no_empleado">
								No. empleado <span className='text-danger'>*</span>
							</label>
							<input
								type="text"
								className="form-control"
								name="no_empleado"
								id="no_empleado"
								value={ no_empleado }
								onChange={handleInputChange}
								autoComplete="off"
								autoFocus={false}
								disabled
							/>
						</div>
						<div className="col-4">
							<label htmlFor="nombre">
								Nombre <span className='text-danger'>*</span>
							</label>
							<input
								type="text"
								className="form-control"
								name="nombre"
								id="nombre"
								value={ nombre }
								onChange={handleInputChange}
								autoComplete="off"
								autoFocus={false}
								disabled
							/>
						</div>
						<div className="col-4">
							<label htmlFor="apepa">
								Apellido Paterno <span className='text-danger'>*</span>
							</label>
							<input
								type="text"
								className="form-control"
								name="apepa"
								id="apepa"
								value={ apepa }
								onChange={handleInputChange}
								autoComplete="off"
								autoFocus={false}
								disabled
							/>
						</div>
						<div className="col-4">
							<label htmlFor="apema">
								Apellido Materno
							</label>
							<input
								type="text"
								className="form-control"
								name="apema"
								id="apema"
								value={ apema }
								onChange={handleInputChange}
								autoComplete="off"
								autoFocus={false}
								disabled
							/>
						</div>
						<div className="col-6">
                            <label htmlFor="clave_nueva">
                                Contraseña Nueva <span className='text-danger'>*</span>
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                name="clave_nueva"
                                id="clave_nueva"
                                onChange={handleInputChange}
                                autoComplete="off"
                            />
                        </div>
						<div className="col-6">
							<label htmlFor="clave_conf">
								Confirmar contraseña <span className='text-danger'>*</span>
							</label>
							<input
								type="password"
								className="form-control"
								name="clave_conf"
								id="clave_conf"
								onChange={handleInputChange}
								autoComplete="off"
								autoFocus={false}
							/>
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
                        Actualizar contraseña
                    </button>
                </CModalFooter>
            </form>
        </CModal>
	)
}
