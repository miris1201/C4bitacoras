import { useEffect, useState, FormEvent, FC } from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faStepBackward } from "@fortawesome/free-solid-svg-icons";

import { useForm } from '../../../hooks/useForm';

import { UserProfileCheck } from "./UserProfileCheck";
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setShowList } from "../../../store/slices/transaction";

import { startGetProfilebyId, startInsertReg, startGetComboProfiles } from '../../../store/slices/users/thunks';
import { HeaderList } from '../../ui/UserInterface';

export const UserFrm: FC = () => {

    const dispatch = useAppDispatch();

    const [ loadingBtn, setLoadingBtn ] = useState( false );
    
    const { idActive, uActive, dataProfileId, comboProfile } = useAppSelector(state => state.users);
    const { readOnly } = useAppSelector(state => state.transaction);

    //Valores por default en caso de venir de una edición/vista
    const {
        nombre: dNombre,
        apepa: dApepa,
        apema: dApema,
        usuario: dUsuario,
        no_empleado: dNo_empleado,
        id_zona: dId_zona,
        id_rol: dId_rol,
        admin: dAdmin,
        sexo: dSexo,
        menuActive
    } = uActive;

    const { formValues, handleInputChange, setValues } = useForm({
        id_update: idActive,
        nombre: dNombre,
        apepa: dApepa,
        apema: dApema || '',
        usuario: dUsuario,
        no_empleado: dNo_empleado,
        clave: "",
        id_rol: dId_rol || '',
        id_zona: dId_zona || '',
        sexo: dSexo || '',
        admin: dAdmin,
        menu: dataProfileId,
    });
    const [ idRolIni, setIdRolIni ] = useState <string|number>( dId_rol );
    //Variables que van para el formulario
    const { nombre, apepa, apema, usuario, clave, id_rol, id_zona, sexo, no_empleado, menu } = formValues;

    const hanbleSubmitForm = ( e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoadingBtn(true);
        dispatch( startInsertReg( formValues,  setLoadingBtn));
    };

    useEffect(() => {
        
        if( ((id_rol > "" && menuActive.length === 0) || ( id_rol > "" ||  idActive > 0)) && (id_rol !== idRolIni && dataProfileId.length > 0 ) ){
            setIdRolIni(id_rol);
            dispatch ( startGetProfilebyId( id_rol, setValues, formValues ));
        }
        
    }, [ dispatch, id_rol ])
    
    useEffect(() => {
       
        if( comboProfile.length === 0){
            dispatch ( startGetComboProfiles() );
        }
  
    }, [ dispatch, comboProfile ])

    
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

    return (
        <div className="card mb-4">
            <HeaderList title='Agregando Usuario'/>
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
                            <label htmlFor="usuario">
                                Nombre de Usuario <span className="text-danger">*</span>
                            </label>
                                <input
                                type="text"
                                className="form-control"
                                name="usuario"
                                id="usuario"
                                value={usuario}
                                readOnly={readOnly}
                                onChange={handleInputChange}
                                autoComplete="off"
                                required
                                />
                        </div>
                        <div className="col-6 col-lg-4 col-xl-4">
                            <label htmlFor="clave">
                                Password (clave de acceso)<span className="text-danger">*</span>
                            </label>
                                <input
                                type="password"
                                className="form-control"
                                name="clave"
                                value={clave}
                                onChange={handleInputChange}
                                id="clave"
                                autoComplete="off"
                                required={readOnly}
                                readOnly={readOnly}
                                />
                        </div>
                        <div className="col-6 col-lg-4 col-xl-4">
                            <label htmlFor="sexo">
                                Sexo: <span className="text-danger">*</span>
                            </label>
                            <select
                            name="sexo"
                            id="sexo"
                            value={sexo}
                            disabled={readOnly}
                            onChange={ handleInputChange }
                            className="form-select"
                            required
                            >
                                <option value="">Selecciona</option>
                                <option value="1">Femenino</option>
                                <option value="2">Masculino</option>
                               
                            </select>
                        </div>
                        
                        <div className="col-6 col-lg-4 col-xl-4">
                            <label htmlFor="id_zona">
                                Zona: <span className="text-danger">*</span>
                            </label>
                            <select
                            name="id_zona"
                            id="id_zona"
                            value={id_zona}
                            disabled={readOnly}
                            onChange={ handleInputChange }
                            className="form-select"
                            required
                            >
                                <option value="">Selecciona</option>
                                <option value="1">Poniente</option>
                                <option value="2">Oriente</option>
                               
                            </select>
                        </div>
                        <div className="col-6 col-lg-4 col-xl-4">
                            <label htmlFor="no_empleado">
                                No. empleado<span className="text-danger">*</span>
                            </label>
                                <input
                                type="text"
                                className="form-control"
                                name="no_empleado"
                                value={no_empleado}
                                onChange={handleInputChange}
                                id="no_empleado"
                                autoComplete="off"
                                required={readOnly}
                                readOnly={readOnly}
                                />
                        </div>
                        <div className="col-6 col-lg-4 col-xl-4">
                            <label htmlFor="id_rol">
                                Perfil: <span className="text-danger">*</span>
                            </label>
                            <select
                            name="id_rol"
                            id="id_rol"
                            value={id_rol}
                            disabled={readOnly}
                            onChange={ handleInputChange }
                            className="form-select"
                            required
                            >
                                <option value="">Selecciona</option>
                                {
                                    (comboProfile.length > 0) &&
                                    comboProfile.map((item, index) =>(
                                        <option 
                                            key={ `combo${ index }`} 
                                            value={ item.id_rol }>
                                            { item.rol }    
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                    {  
                        ( id_rol != "" ) && 
                        <UserProfileCheck 
                            menu={ menu }
                            handleCheckBoxChange={ handleCheckBoxChange }
                            handleCheckBoxChangeChild={ handleCheckBoxChangeChild }
                        />
                    
                    }
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
    );
};
