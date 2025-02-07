import { useEffect, useState, FormEvent, FC } from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faStepBackward } from "@fortawesome/free-solid-svg-icons";

import { useForm } from '../../../hooks/useForm';

import { ProfileCheck } from "./ProfileCheck";
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setShowList } from "../../../store/slices/transaction";
import { startGetMenu, startInsertReg } from '../../../store/slices/profiles/thunks';
import { HeaderList } from '../../ui/UserInterface';

export const ProfileFrm: FC = () => {

    const dispatch = useAppDispatch();

    const [ loadingBtn, setLoadingBtn ] = useState( false );
    const { idActive, rActive, readOnly, dataProfileId } = useAppSelector(state => state.profiles);

    //Valores por default en caso de venir de una edición/vista
    const {
        rol: dRol,
        descripcion: dDescripcion
    } = rActive;

    const { formValues, handleInputChange, setValues } = useForm({
        id_update: idActive,
        rol: dRol || '',
        descripcion: dDescripcion || '',
        menu: dataProfileId,
    });

    //Variables que van para el formulario
    const { rol, descripcion, menu  } = formValues;

    const hanbleSubmitForm = ( e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoadingBtn(true);
        dispatch( startInsertReg( formValues,  setLoadingBtn));
    };

    useEffect(() => {
       
        if( idActive === 0 ){
            dispatch ( startGetMenu( setValues, formValues ));
        }
    // eslint-disable-next-line
    }, [ dispatch, idActive])

    const handleCheckBoxChange = ( index: number ) => () => {

        let values = {
            ...menu[index],
            isChecked : !menu[index].isChecked
        }

        let menuLast = {
            ...menu, 
            [index] : values
        }

        let arrMenuLast = Object.values(menuLast);

        setValues({
            ...formValues,
            menu: arrMenuLast
        });

    }
    
    const handleCheckBoxChangeChild = ( index:number , indexChild:any , action: string ) => () => {

        let nMenu = [...menu];
        let noVal;

        if( action === 'value'){
            noVal = (parseInt(nMenu[index]._children[indexChild].value)  === 1)  ? 0 : 1;    
        }
        if( action === 'nuevo'){
            noVal = (parseInt(nMenu[index]._children[indexChild].nuevo)  === 1)  ? 0 : 1;    
        }
        if( action === 'edit'){
            noVal = (parseInt(nMenu[index]._children[indexChild].edit)  === 1)  ? 0 : 1;    
        }
        if( action === 'elim'){
            noVal = (parseInt(nMenu[index]._children[indexChild].elim)  === 1)  ? 0 : 1;    
        }
        if( action === 'exportar'){
            noVal = (parseInt(nMenu[index]._children[indexChild].exportar)  === 1)  ? 0 : 1;    
        }
        if( action === 'imp'){
            noVal = (parseInt(nMenu[index]._children[indexChild].imp)  === 1)  ? 0 : 1;    
        }
            
        let newValueChildIndex = {
            ...nMenu[index]._children[indexChild],
            [action] : noVal
        }

        let valueChildArrChild = [
            ...nMenu[index]._children
        ]

        let newValueChilds = {
            ...valueChildArrChild,
            [ indexChild ] : newValueChildIndex
        }

        let arrNewValueChilds  = Object.values(newValueChilds);
        let valueIndexVal = {
            ...nMenu[index]
        }
        
        let newIndexVal = {
            ...valueIndexVal,
            '_children' : arrNewValueChilds
        }

        let Menulast = {
            ...nMenu,
                [ index ] : newIndexVal
        }
        
        let arrMenu = Object.values(Menulast);

        setValues({
            ...formValues,
            menu: arrMenu
        });

    }

    let titleMain = "Nuevo Rol";
    let titleHeader = (Number(idActive) === 2 || readOnly) ? 'Visualizando rol' : 'Editar rol';
    titleMain = (idActive === 0) ? titleMain : titleHeader;

    return (
        <div className="card mb-4">
            <HeaderList title={titleMain}/>
            <div className="card-body">
                <ul className="nav nav-pills mb-2">
                    <li className="nav-item">
                    <button
                        className="btn btn-outline-primary"
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
                    <div className="col-6 col-lg-6 col-xl-6">
                            <label htmlFor="nombre">
                                Nombre<span className="text-danger">*</span>
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                name="rol"
                                id="rol"
                                value={ rol }
                                onChange={handleInputChange}
                                autoComplete="off"
                                autoFocus={true}
                                readOnly={readOnly}
                                required
                            />
                        </div>
                        <div className="col-12 col-lg-6 col-xl-6">
                            <label htmlFor="apepat">
                                Descripción <span className="text-danger">*</span>
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                name="descripcion"
                                id="descripcion"
                                value={ descripcion }
                                onChange={handleInputChange}
                                readOnly={readOnly}
                            />
                        </div>
                    </div>
                     <ProfileCheck 
                        menu={ menu }
                        handleCheckBoxChange={ handleCheckBoxChange }
                        handleCheckBoxChangeChild={ handleCheckBoxChangeChild }
                    />
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
            </div>
        </div>
    );
};
