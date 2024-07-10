
import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { usePermission } from '../../../hooks/usePermission';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { exportDataServicios, setFilterDeptos, setFilterEstatus, setPageNumberServicios, setSearchServicios, startGetComboDepartamentos, startGetComboEstatus, startGetRegServicios, unSetActiveServicios } from '../../../store/slices/registros';
import { HeaderList, Loading, NoAccess, Pager } from '../../ui/UserInterface';
import { useGetNewPage } from '../../../hooks/useGetNewPage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExcel, faFilter, faMagnifyingGlass, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { setReadOnly, setShowList } from '../../../store/slices/transaction';
import { BitacoraInterface, ServicioInterface } from '../../../interfaces';
import { ServiciosListItem } from './ServiciosListItem';
import { ServiciosModalSearch } from './ServiciosModalSearch';

export const ServiciosList: FC = (): JSX.Element => {

    const { pathname } = useLocation();
    const allowed = usePermission( pathname );

    const { list, page, totalRows, totalPages, filterSearch, filterDeptos, filterStatus, comboStatus } = useAppSelector( state => state.servicios);  
    const { comboDepartamentos } = useAppSelector( state => state.departamentos);
    const { loading } = useAppSelector( state => state.transaction)
    
    const { systemOptions } = useAppSelector(state => state.login);    
    const { id_zona, id_rol } = systemOptions;    
    
    const [ valFilterDeptos, setValFilterDeptos] = useState<Array<any>>([]);
    const [ valFilterStatus, setValFilterStatus] = useState<Array<any>>([]);
    const [loadingExport, setLoadingExport] = useState(false);
    const [ showModalFilter, setShowModalFilter ] = useState(false);

    const dispatch = useAppDispatch();

    if ( loading ) { return( <Loading/>); }

    if (allowed.length === 0) { return( <NoAccess/> ); }

    const { edit, elim, nuevo, exportar } = allowed[0];

    const setChangeWindow = ( ) => {
        
        dispatch( unSetActiveServicios() );
        dispatch( setShowList( false ) );
        dispatch( setReadOnly( false ) );
  
    }

    const handleChangePage = ( 
        type:number , 
        iniend: number|null = null,
        event: ChangeEvent<HTMLInputElement> | null = null,
    ) => {

        const nPage = useGetNewPage( page ,type, event, iniend )

        dispatch( setPageNumberServicios( nPage ) );

    }

    useEffect(() => {

        if (comboDepartamentos.length === 0) {
            dispatch( startGetComboDepartamentos() );            
        }
    }, [dispatch, comboDepartamentos])

    useEffect(() => {
        if (comboStatus.length === 0){
            dispatch( startGetComboEstatus() );
        }
    }, [dispatch, comboStatus])
    

    useEffect(() => {

        if ( filterDeptos.length === 0 ) {

            if( filterDeptos !== undefined){
                
                if( comboDepartamentos.length > 0){

                    let arrayValues: number[] = [];

                    comboDepartamentos.forEach(element => {

                        let id_depto = parseInt(element.id_tipo_nota);
                        if( id_depto > 0 && element.default_bar == 1  ){       
                            arrayValues.push( id_depto);
                        }
                       
                    });
                    
                    setValFilterDeptos( arrayValues );
                    dispatch( setFilterDeptos( arrayValues ));
                }
            }

        }else{
            setValFilterDeptos( filterDeptos );
        }

    }, [ comboDepartamentos ]);

    useEffect(() => {
        if ( filterStatus.length === 0) {
            if ( filterStatus !== undefined) {
                if (comboStatus.length > 0) {
                    let arrayStatus : number[] = [];

                    comboStatus.forEach(element => {
                        let id_estatus = parseInt(element.id_estatus);
                        if (id_estatus > 0) {
                            arrayStatus.push(id_estatus);
                        }
                        
                    });

                    setValFilterStatus(arrayStatus);
                    dispatch( setFilterEstatus(arrayStatus));

                }
            }
        }

    }, [comboStatus]);


    useEffect(() => {
        dispatch( startGetRegServicios( id_zona, id_rol ) );
    
    }, [dispatch, page, filterSearch, filterDeptos, filterStatus]);

    const setSearchEmpty = () => {
        dispatch( setSearchServicios({}) );
    }

    const handleChangeDeptos = ( { target }: ChangeEvent<HTMLInputElement>  ) => {
        const { value } = target;
        
        let newArrayValues: number[] = [...filterDeptos ];

        let estatusValue = parseInt(value)
        
        let doAdd = ( filterDeptos.includes( estatusValue ) ) ? false : true;
        
        if( doAdd ) {
            newArrayValues.push( estatusValue );
        }else{
            const index = newArrayValues.indexOf(estatusValue);
            newArrayValues.splice(index, 1);
        }

        dispatch( setFilterDeptos(newArrayValues) );
        setValFilterDeptos(newArrayValues);

    }

    const handleChangeStatus = ( { target }: ChangeEvent<HTMLInputElement>  ) => {
        const { value } = target;
        
        let newArrayVal: number[] = [...filterStatus ];

        let statusValue = parseInt(value)
        
        let doAddS = ( filterStatus.includes( statusValue ) ) ? false : true;
        
        if( doAddS ) {
            newArrayVal.push( statusValue );
        }else{
            const index = newArrayVal.indexOf(statusValue);
            newArrayVal.splice(index, 1);
        }

        dispatch( setFilterEstatus(newArrayVal) );
        setValFilterStatus(newArrayVal);

    }

    return (
        <>
        <div className="card  mb-4">
            <HeaderList
                title='Servicios'
            />
            <div className='card-body '>
                <div className='row'>
                    <div className="col-2">
                        <ul className="nav nav-pills">
                            <li className="nav-item">
                                {
                                    ( nuevo ) && 
                                    <button 
                                        className="btn btn-success btn-sm me-2"
                                        onClick={ () => { setChangeWindow() }  }
                                    >
                                    <FontAwesomeIcon icon={ faPlusCircle } /> Agregar
                                    </button> 
                                }
                            </li>
                            <li className="nav-item">
                                {
                                    ( exportar ) && 
                                    <button 
                                        className="btn btn-info btn-sm me-2"
                                        disabled={ loadingExport }
                                        onClick={() => {
                                            dispatch( exportDataServicios(id_zona, id_rol, setLoadingExport ) );
                                        }}
                                    >
                                        <FontAwesomeIcon icon={ faFileExcel } /> Exportar
                                    </button> 
                                }
                            </li>
                        </ul>
                    </div>  
                    <div className="col-4">
                        <div className="btn-group" role="group" aria-label="Departamentos">
                            {
                                (comboDepartamentos !== undefined) &&
                                (comboDepartamentos.length > 0) &&
                                comboDepartamentos.map((item, index) => (
                                    <div key={ "btnDesc"+index }>
                                        <input
                                            type="checkbox" 
                                            title={ item.departamento }
                                            className="btn-check "
                                            name="filterSearch[]" 
                                            checked={ (valFilterDeptos.includes(parseInt(item.id_departamento))) ? true: false }
                                            id={"btncheck"+index }
                                            value={ item.id_departamento }
                                            onChange={ handleChangeDeptos }
                                            autoComplete="off"
                                            key={ index }
                                            />
                                        
                                        <label className="btn btn-outline-danger" 
                                            htmlFor={"btncheck"+index }
                                            title={item.departamento}>                                        
                                            {item.abreviatura}
                                        </label>
                                    </div>
                                ))
                            }
                        </div>
                    </div>          
                    <div className="col-3">
                        <div className="btn-group" role="group" aria-label="Estatus">
                            {
                                (comboStatus !== undefined) &&
                                (comboStatus.length > 0) &&
                                comboStatus.map((item, index) => (
                                    <div key={ "btnStatus"+index }>
                                        <input
                                            type="checkbox" 
                                            title={ item.id_estatus }
                                            className="btn-check "
                                            name="filterStatus[]" 
                                            checked={ (valFilterStatus.includes(parseInt(item.id_estatus))) ? true: false }
                                            id={"btnchk"+index }
                                            value={ item.id_estatus }
                                            onChange={ handleChangeStatus }
                                            autoComplete="off"
                                            key={ index }
                                            />
                                        
                                        <label className="btn btn-outline-info" 
                                            htmlFor={"btnchk"+index }
                                            title={item.descripcion}>                                        
                                            {item.descripcion}
                                        </label>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="col-3">
                        {
                            ( Object.keys(filterSearch).length > 0) ?
                            <button
                                className="btn btn-warning btn-sm me-2 float-end"
                                onClick={() => {
                                    setSearchEmpty();
                                }}
                            >
                                <FontAwesomeIcon icon={faFilter} /> 
                            </button>
                            :
                            <button
                                className="btn btn-primary btn-sm me-2 float-end"
                                onClick={() => {
                                    setShowModalFilter( true );
                                }}
                            >
                                <FontAwesomeIcon icon={ faMagnifyingGlass } /> 
                            </button>
                        } 
                    </div>
                </div>
                <div className="tab-content rounded-bottom mt-2">
                    <div 
                        className="table-responsive" 
                        role="tabpanel">
                        <table className="table table-hover ">
                            <thead className="table-light">
                                <tr>
                                    <th scope="col"></th>
                                    <th scope="col">Folio</th>
                                    <th scope="col">Fecha</th>
                                    <th scope="col">Zona</th>
                                    <th scope="col">Departamento</th>
                                    <th scope="col">Emergencia</th>
                                    <th scope="col">Reporte</th>                                    
                                    <th scope="col">Funciones</th>                                    
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    list.map(( item: ServicioInterface, index )=>(
                                        <tr key={ index }>
                                            {<ServiciosListItem
                                                item={item}
                                                index={index}
                                                edit={ edit }
                                                elim={ elim }/>}
                                        </tr>
                                    ))
                                }
                            </tbody>
                            <tfoot>
                                {
                                    ( Object.keys(list).length == 0) &&
                                    <tr>
                                        <td 
                                            colSpan={5}
                                            className="text-center">
                                            <strong>No se encontraron registros en la base de datos</strong>
                                        </td>
                                    </tr>
                                }
                            </tfoot>
                        </table>
                    </div>
                </div>
                {
                    ( Object.keys(list).length > 0) &&
                    <Pager
                        page={ page }
                        totalPages={ totalPages }
                        handleChangePage={ handleChangePage }
                    />
                }
            </div>
        </div>
        {
        showModalFilter &&
        <ServiciosModalSearch
            showModal={ showModalFilter }
            setShowModal={ setShowModalFilter }
        />
        }
        {
            
        }
    </>
    )
}
