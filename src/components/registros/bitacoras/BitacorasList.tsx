
import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { usePermission } from '../../../hooks/usePermission';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { exportDataBitacoras, setFilterDepartamentos, setPageNumberBitacoras, setSearchBitacoras, startGetComboDepartamentos, startGetRegBitacoras, unSetActiveBitacoras } from '../../../store/slices/registros';
import { HeaderList, Loading, NoAccess, Pager } from '../../ui/UserInterface';
import { useGetNewPage } from '../../../hooks/useGetNewPage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExcel, faFilter, faMagnifyingGlass, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { setReadOnly, setShowList } from '../../../store/slices/transaction';
import { BitacoraInterface } from '../../../interfaces';
import { BitacorasListItem } from './BitacorasListItem';
import { BitacorasModalSearch } from './BitacorasModalSearch';

export const BitacorasList: FC = (): JSX.Element => {

    const { pathname } = useLocation();
    const allowed = usePermission( pathname );

    const { list, page, totalRows, totalPages, filterSearch, filterDeptos } = useAppSelector( state => state.bitacoras);  
    const { comboDepartamentos } = useAppSelector( state => state.departamentos);
    const { loading } = useAppSelector( state => state.transaction)
    
    const { systemOptions } = useAppSelector(state => state.login);    
    const { id_zona, id_rol } = systemOptions;    
    
    const [ valFilterDeptos, setValFilterDeptos] = useState<Array<any>>([]);
    const [loadingExport, setLoadingExport] = useState(false);
    const [ showModalFilter, setShowModalFilter ] = useState(false);

    const dispatch = useAppDispatch();

    if ( loading ) { return( <Loading/>); }

    if (allowed.length === 0) { return( <NoAccess/> ); }

    const { nuevo, exportar } = allowed[0];

    const setChangeWindow = ( ) => {
        
        dispatch( unSetActiveBitacoras() );
        dispatch( setShowList( false ) );
        dispatch( setReadOnly( false ) );
  
    }

    const handleChangePage = (
        type:number , 
        iniend: number|null = null,
        event: ChangeEvent<HTMLInputElement> | null = null,
    ) => {

        const nPage = useGetNewPage( page ,type, event, iniend )

        dispatch( setPageNumberBitacoras( nPage ) );

    }

    useEffect(() => {

        if (comboDepartamentos.length === 0) {
            dispatch( startGetComboDepartamentos() );            
        }
    }, [dispatch, comboDepartamentos])


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
                    dispatch( setFilterDepartamentos( arrayValues ));
                }
            }

        }else{
            setValFilterDeptos( filterDeptos );
        }

    }, [ comboDepartamentos ]);

    useEffect(() => {
        dispatch( startGetRegBitacoras( id_zona, id_rol ) );
    
    }, [dispatch, page, filterSearch, filterDeptos]);

    const setSearchEmpty = () => {
        dispatch( setSearchBitacoras({}) );
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

        dispatch( setFilterDepartamentos(newArrayValues) );
        setValFilterDeptos(newArrayValues);

    }

    return (
        <>
        <div className="card  mb-4">
            <HeaderList
                title='Bitacoras'
            />
            <div className='card-body '>
                <div className='row'>
                    <div className="col-2 col-lg-4">
                        <ul className="nav nav-pills">
                            <li className="nav-item">
                                {
                                    ( nuevo ) && 
                                    <button 
                                        className="btn btn-outline-primary me-2"
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
                                        className="btn btn-outline-primary me-2"
                                        disabled={ loadingExport }
                                        onClick={() => {
                                            dispatch( exportDataBitacoras(id_zona, id_rol, setLoadingExport ) );
                                        }}
                                    >
                                        <FontAwesomeIcon icon={ faFileExcel } /> Exportar
                                    </button> 
                                }
                            </li>
                        </ul>
                    </div>            
                    <div className="col-6 col-lg-4">
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
                    <div className="col-4 col-lg-4">
                        {
                            ( Object.keys(filterSearch).length > 0) ?
                            <button
                                className="btn  btn-outline-primary me-2 float-end"
                                onClick={() => {
                                    setSearchEmpty();
                                }}
                            >
                                <FontAwesomeIcon icon={faFilter} /> 
                            </button>
                            :
                            <button
                                className="btn  btn-outline-primary me-2 float-end"
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
                        <table className="table table-hover">
                            <thead className="table-light">
                                <tr>
                                    <th scope="col">Folio</th>
                                    <th scope="col">Fecha</th>
                                    <th scope="col">Zona</th>
                                    <th scope="col">Departamento</th>
                                    <th scope="col">Unidad</th>
                                    <th scope="col">Reporte</th>     
                                    <th scope="col">Función</th>                               
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    list.map(( item: BitacoraInterface, index )=>(
                                        <tr key={ index }>
                                            {<BitacorasListItem
                                                item={item}/>}
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
        <BitacorasModalSearch
            showModal={ showModalFilter }
            setShowModal={ setShowModalFilter }
        />
    }
    </>
    )
}
