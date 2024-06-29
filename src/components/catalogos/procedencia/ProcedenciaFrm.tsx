

import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { startGetComboProcedencia, startInsertProcedencia } from '../../../store/slices/catalogos';
import { useForm } from '../../../hooks/useForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { setShowList } from '../../../store/slices/transaction';
import { HeaderList } from '../../ui/UserInterface';
import { faSave, faStepBackward } from '@fortawesome/free-solid-svg-icons';

export const ProcedenciaFrm: FC = () => {

    const dispatch = useAppDispatch();
    const [loadingBtn, setloadingBtn] = useState(false);

    const {idActive, rActive, comboProcedencia} = useAppSelector(state => state.procedencia);
    const { readOnly } = useAppSelector(state => state.transaction);
 
    const {
        descripcion: dDescripcion
    } = rActive;

    const { formValues, handleInputChange, setValues } = useForm({
        id_update: idActive,
        descripcion: dDescripcion

    });

    const { descripcion } = formValues;

    const handleSubmitForm = ( e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setloadingBtn(true);
        dispatch( startInsertProcedencia( formValues,  setloadingBtn));
    }

    useEffect(() => {
        
        if (comboProcedencia.length === 0) {
            dispatch( startGetComboProcedencia() );
            
        }
    }, [dispatch, comboProcedencia])

    let titleMain = "Nueva procedencia de llamada";
    let titleHeader = (Number(idActive) === 2 || readOnly) ? 'Visualizando procedencia de llamada' : 'Editar procedencia de llamada';
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
                            <label htmlFor="descripcion">
                                Descripción <span className="text-danger">*</span>
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                name="descripcion"
                                id="descripcion"
                                value={descripcion}
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
