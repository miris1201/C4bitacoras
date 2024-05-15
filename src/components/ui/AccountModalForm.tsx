import { FormEvent, useState } from 'react';
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react';


import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useForm } from '../../hooks/useForm';

import Swal from "sweetalert2";

import { dataAccountParams } from '../../interfaces';
import { startChangePassword } from '../../store/slices/users/thunks';

export const AccountModalForm = ({ showModal, setShowModal }: dataAccountParams) => {

	const dispatch = useAppDispatch();
	
	const [loadingBtnDtl, setLoadingBtnDtl] = useState(false);
	
	const { uid, name, systemOptions } = useAppSelector(state => state.login);

	const { formValues, handleInputChange } = useForm({
		id_usuario: uid,
        old_password: '',
        confirm_password: ''
    });
	
	const { nombre_completo, no_empleado, sexo } = systemOptions;
	
	const { id_usuario, old_password, confirm_password } = formValues;

	let genero = (sexo == 1) ? 'Femenino' : 'Masculino';

	const handleSubmitForm = ( e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoadingBtnDtl(true);
        dispatch(  startChangePassword( formValues, setLoadingBtnDtl, setShowModal ));
    };

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
            <form className="g-3" onSubmit={handleSubmitForm}>
                <CModalBody> 					
					<div className="row g-12">					
						<div className="col-6">
							<span>Nombre: <strong>{ nombre_completo }</strong></span> <br />
							<span>Usuario: <strong>{ name }</strong></span> <br />							
						</div>
						<div className="col-6">
							<span>No. empleado: <strong>{ no_empleado }</strong></span> <br />
							<span>Sexo: <strong>{ genero }</strong></span> <br />
                        </div><br />
					</div>	
					<div className="row g-12">						
						<div className="col-6">
                            <label htmlFor="old_password">
                                Contraseña Nueva <span className='text-danger'>*</span>
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                name="old_password"
                                id="old_password"
								value={ old_password }
								onChange={ handleInputChange}
                                autoComplete="off"
                            />
                        </div>
						<div className="col-6">
							<label htmlFor="confirm_password">
								Confirmar contraseña <span className='text-danger'>*</span>
							</label>
							<input
								type="password"
								className="form-control"
								name="confirm_password"
								id="confirm_password"
								value={ confirm_password }
								onChange={ handleInputChange}
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
