import { useState, FormEvent, FC } from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faStepBackward } from "@fortawesome/free-solid-svg-icons";

import { useForm } from '../../../hooks/useForm';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setShowList } from "../../../store/slices/transaction";
import { startInsertReg } from '../../../store/slices/catalogos/';

export const OperadoresFrm: FC = () => {

  	const dispatch = useAppDispatch();

    const [ loadingBtn, setLoadingBtn ] = useState( false );
    const { idActive, rActive } = useAppSelector(state => state.operadores);
    const { readOnly } = useAppSelector(state => state.transaction);

	//Valores por default en caso de venir de una edición/vista
    const {
        nombre: dNombre,
        apepa: dApepa,
        apema: dApema,
        email: dCorreo,
        password: dPassword,
	} = rActive;

    const { formValues, handleInputChange, setValues } = useForm({
        id_update: idActive,
        nombre: dNombre,
        apepa: dApepa || '',
        apema: dApema || '',
        password: dPassword,
        email: dCorreo || ''
    });

    //Variables que van para el formulario
    const { nombre, apepa, apema, email, password } = formValues;

	const hanbleSubmitForm = ( e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoadingBtn(true);
        dispatch( startInsertReg( formValues,  setLoadingBtn));
    };

	return (
		<div className="card mb-4">
            <div className="card-header">
                <strong>Agregando Operador</strong>
            </div>
            <div className="card-body">
                <ul className="nav nav-pills mb-2">
                    <li className="nav-item">
                    <button
                        className="btn btn-warning"
                        onClick={() => {
                            dispatch(setShowList( true ));
                        }}
                    >
                        <FontAwesomeIcon icon={faStepBackward} /> Regresar
                    </button>
                    </li>
                </ul>
				<form className="g-3" onSubmit={hanbleSubmitForm}>
                    <div className="row">
                        <div className="col-6 col-lg-4 col-xl-4">
                            <label htmlFor="nombre">
                                Nombre(s)<span className="text-danger">*</span>
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                name="nombre"
                                id="nombre"
                                value={nombre}
                                onChange={handleInputChange}
                                autoComplete="off"
                                autoFocus={true}
                                readOnly={readOnly}
                                required
                            />
                        </div>
                        <div className="col-6 col-lg-4 col-xl-4">
                            <label htmlFor="apepa">
                                Apellido Paterno <span className="text-danger">*</span>
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                name="apepa"
                                id="apepa"
                                value={apepa}
                                onChange={handleInputChange}
                                readOnly={readOnly}
                                autoComplete="off"
                            />
                        </div>
                        <div className="col-6 col-lg-4 col-xl-4">
                            <label htmlFor="apema">
                                Apellido Materno <span className="text-danger">*</span>
                            </label>
                                <input
                                type="text"
                                className="form-control"
                                name="apema"
                                id="apema"
                                value={apema}
                                readOnly={readOnly}
                                onChange={handleInputChange}
                                autoComplete="off"
                                />
                        </div>
                        <div className="col-6 col-lg-4 col-xl-4">
                            <label htmlFor="password">
                                Password (clave de acceso)<span className="text-danger">*</span>
                            </label>
                                <input
                                type="password"
                                className="form-control"
                                name="password"
                                value={password}
                                onChange={handleInputChange}
                                id="password"
                                autoComplete="off"
                                required={readOnly}
                                readOnly={readOnly}
                                />
                        </div>
                        <div className="col-6 col-lg-4 col-xl-4">
                            <label htmlFor="email">Correo electrónico</label>
                                <input
                                type="email"
                                className="form-control"
                                name="email"
                                value={email}
                                readOnly={readOnly}
                                onChange={ handleInputChange }
                                id="email"
                                autoComplete="off"
                                />
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-12">
                            {readOnly || (
                            <button
                                type="submit"
                                disabled={loadingBtn}
                                className="btn btn-primary"
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
	)
}
