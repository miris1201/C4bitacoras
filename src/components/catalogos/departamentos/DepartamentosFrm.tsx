

import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { startGetComboDepartamentos, startInsertDepartamentos } from '../../../store/slices/catalogos';
import { useForm } from '../../../hooks/useForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { setShowList } from '../../../store/slices/transaction';
import { HeaderList } from '../../ui/UserInterface';
import { faSave, faStepBackward } from '@fortawesome/free-solid-svg-icons';

export const DepartamentosFrm: FC = () => {

    const dispatch = useAppDispatch();
    const [loadingBtn, setloadingBtn] = useState(false);

    const {idActive, rActive, comboDepartamentos} = useAppSelector(state => state.departamentos);
    const { readOnly } = useAppSelector(state => state.transaction);
 
    const {
        departamento: dDepartamento,
        abreviatura: dAbreviatura
    } = rActive;

    const { formValues, handleInputChange, setValues } = useForm({
        id_update: idActive,
        departamento: dDepartamento,
        abreviatura: dAbreviatura

    });

    const { departamento, abreviatura } = formValues;

    const handleSubmitForm = ( e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setloadingBtn(true);
        dispatch( startInsertDepartamentos( formValues,  setloadingBtn));
    }

    useEffect(() => {
        
        if (comboDepartamentos.length === 0) {
            dispatch( startGetComboDepartamentos() );
            
        }
    }, [dispatch, comboDepartamentos])

    let titleMain = "Nuevo departamento";
    let titleHeader = (Number(idActive) === 2 || readOnly) ? 'Visualizando departamento' : 'Editar departamento';
    titleMain = (idActive === 0) ? titleMain : titleHeader;

    return(
        <>
            <div className="card mb-4">
            <HeaderList title={ titleMain }/>
            <div className="card-body">
                <ul className="nav nav-pills mb-2">
                    <li className="nav-item">
                    <button
                        className="btn btn-outline-danger btn-sm"
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
                        <div className="col-6 col-lg-4 col-xl-6">
                            <label htmlFor="departamento">
                                Departamento <span className="text-danger">*</span>
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                name="departamento"
                                id="departamento"
                                value={departamento}
                                onChange={handleInputChange}
                                autoComplete="off"
                                autoFocus={true}
                                readOnly={readOnly}
                                required
                            />
                        </div>
                        <div className="col-6 col-lg-4 col-xl-4">
                            <label htmlFor="abreviatura">
                                Abreviatura <span className="text-danger">*</span>
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                name="abreviatura"
                                id="abreviatura"
                                value={abreviatura}
                                onChange={handleInputChange}
                                autoComplete="off"
                                autoFocus={true}
                                readOnly={readOnly}
                                required
                            />
                        </div>
                    </div>                    
                    <div className="row mt-4">
                        <div className="col-12">
                            {readOnly || (
                            <button
                                type="submit"
                                disabled={loadingBtn}
                                className="btn btn-outline-info btn-sm"
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
