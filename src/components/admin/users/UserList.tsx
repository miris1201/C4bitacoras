import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faFileExcel, faFilter, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { usePermission } from '../../../hooks/usePermission';

import { Loading, Pager, HeaderList, NoAccess } from '../../ui/UserInterface';
import { ItemUser } from '../../../interfaces';

import { setPageNumber, unSetActiveUser, setSearchUser } from '../../../store/slices/users';
import { startGetRegUsers, exportDataUsers } from '../../../store/slices/users/thunks';
import { setReadOnly, setShowList } from '../../../store/slices/transaction';

import { UserListItem } from './UserListItem';
import { UserFrmSearch } from './UserFrmSearch';
import { useGetNewPage } from '../../../hooks/useGetNewPage';

export const UserList: FC = (): JSX.Element => {

    const { pathname } = useLocation();
    const allowed = usePermission( pathname ) ;

    const { list, page, totalPages, totalRows, filterSearch } = useAppSelector(state => state.users);
    const { loading } = useAppSelector(state => state.transaction);

    const [ loadingExport, setLoadingExport ] = useState(false);
    const [ showModalFilter, setShowModalFilter ] = useState(false);

    const dispatch = useAppDispatch();

    useEffect(() => {

        dispatch( startGetRegUsers() );

    }, [ dispatch, page, filterSearch ]);

    if( loading ){
        return( <Loading/> );
    }
    
    if(allowed.length === 0){
        return( <NoAccess/> );
    }

    const { edit, elim, nuevo, exportar } = allowed[0];

    const setChangeWindow = ( ) => {
        
        dispatch( unSetActiveUser() );
        dispatch( setShowList( false ) );
        dispatch( setReadOnly( false ) );

    }

    const handleChangePage = ( 
        type:number , 
        iniend: number|null = null,
        event: ChangeEvent<HTMLInputElement> | null = null,
    ) => {

        const nPage = useGetNewPage( page ,type, event, iniend )

        dispatch( setPageNumber( nPage ) );

    }

    return (
        <>
        <div className="card mb-4">
            <HeaderList
                title='Usuarios'
                totalRows={ totalRows }
            />
            <div className="card-body">
                <div className="row">
                    <div className="col-8">
                        <ul className="nav nav-pills ">
                            <li className="nav-item">
                                {
                                    ( nuevo ) && 
                                    <button 
                                        className="btn btn-outline-info btn-sm me-2"
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
                                        className="btn btn-outline-success btn-sm me-2"
                                        disabled={ loadingExport }
                                        onClick={() => {
                                            dispatch( exportDataUsers( setLoadingExport ) );
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
                            className="btn btn-outline-warning btn-sm me-2 float-end"
                            onClick={() => {
                                dispatch ( setSearchUser({}) ); 
                            }}
                        >
                            <FontAwesomeIcon icon={faFilter} /> 
                        </button>
                        :
                        <button
                            className="btn btn-outline-info btn-sm me-2 float-end"
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
                                    <th scope="col">Usuario</th>
                                    <th scope="col">No. empleado</th>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Estatus</th>
                                    <th 
                                        scope="col"
                                        className="text-center">
                                        Funciones
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    list.map(( item: ItemUser, index )=>(
                                        <tr key={ index }>
                                            {<UserListItem 
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
                                            colSpan={6}
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
            <UserFrmSearch
                showModal={ showModalFilter }
                setShowModal={ setShowModalFilter }
            />
        }
        </>
    )
}
