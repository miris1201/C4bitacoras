import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faFileExcel, faFilter, faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';

import { usePermission } from '../../../hooks/usePermission';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';

import { setReadOnly, setShowList } from '../../../store/slices/transaction';
import { 
    startGetRegOperadores, 
    exportDataOperadores, 
    setPageNumberOperadores, 
    setSearchOperadores, 
    unSetActiveOperador } from '../../../store/slices/catalogos';

import { OperadorInterface } from '../../../interfaces';
import { HeaderList, Loading, NoAccess, Pager } from '../../ui/UserInterface';

import { OperadoresListItem } from './OperadoresListItem';
import { OperadoresModalSearch } from './OperadoresModalSearch';

export const OperadoresList: FC  = (): JSX.Element => {

    const { pathname } = useLocation();
    const allowed = usePermission( pathname ) ;

    const { list, page,  totalRows, totalPages, filterSearch } = useAppSelector(state => state.operadores);
    const { loading } = useAppSelector(state => state.transaction);
    
    const [loadingExport, setLoadingExport] = useState(false);
    const [ showModalFilter, setShowModalFilter ] = useState(false);

    const dispatch = useAppDispatch();

    useEffect(() => {

        dispatch( startGetRegOperadores() );

    }, [ dispatch, page, filterSearch ]);

    if( loading ){
        return( <Loading/> );
    }
    
    if(allowed.length === 0){
        return( <NoAccess/> );
    }

    const { edit, elim, nuevo, exportar } = allowed[0];

    const setChangeWindow = ( ) => {
        
        dispatch( unSetActiveOperador() );
        dispatch( setShowList( false ) );
        dispatch( setReadOnly( false ) );

    }

    const handleChangePage = ( 
        type:number , 
        event: ChangeEvent<HTMLInputElement> | null = null
    ) => {

        let newPage = null; 
        
        if( event === null ){
            newPage = ( type === 1) ? page + 1 : page - 1 ;
        }else{
            newPage = parseInt(event.target.value);
        }

        dispatch( setPageNumberOperadores( newPage ) );

    }

    const setSearchEmpty = () => {
        dispatch ( setSearchOperadores({}) ); 
    }

    return (
        <div className="card mb-4">
            <HeaderList
                title='Operadores'
                totalRows={ totalRows }
            />
            <div className="card-body">
                <div className="row">
                    <div className="col-8">
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
                                            dispatch( exportDataOperadores( setLoadingExport ) );
                                        }}
                                    >
                                        <FontAwesomeIcon icon={ faFileExcel } /> Exportar
                                    </button> 
                                }
                            </li>
                        </ul>
                    </div>
                    <div className="col-4">
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
                                    <th scope="col">Id</th>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Correo</th>
                                    <th scope="col">Tarjeta</th>
                                    <th 
                                        scope="col"
                                        className="text-center">
                                        Funciones
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    list.map(( item: OperadorInterface, index )=>(
                                        <tr key={ index }>
                                            {<OperadoresListItem 
                                                item={item}
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
                <Pager
                    page={ page }
                    totalPages={ totalPages }
                    handleChangePage={ handleChangePage }
                />
            </div>
            {
                showModalFilter &&
                <OperadoresModalSearch
                    showModal={ showModalFilter }
                    setShowModal={ setShowModalFilter }
                />
            }
        </div>
    )
}
