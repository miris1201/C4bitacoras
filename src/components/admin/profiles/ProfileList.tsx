import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faFileExcel, faFilter, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import { Loading, Pager, HeaderList, NoAccess } from '../../ui/UserInterface';

import { ProfileListItem } from './ProfileListItem';

import { usePermission } from '../../../hooks/usePermission';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { ItemProfile } from '../../../interfaces';
import { setShowList } from '../../../store/slices/transaction';
import { exportDataProfiles, startGetRegProfiles } from '../../../store/slices/profiles/thunks';
import { setPageNumber, setReadOnly, setSearchProfile, unSetActiveProfile } from '../../../store/slices/profiles';
import { ProfileModalSearch } from './ProfileModalSearch';
import { useGetNewPage } from '../../../hooks/useGetNewPage';

export const ProfileList: FC = (): JSX.Element => {

    const { pathname } = useLocation();
    const allowed = usePermission( pathname ) ;
    const { list, page, totalPages, totalRows, filterSearch } = useAppSelector(state => state.profiles);
    const { loading } = useAppSelector(state => state.transaction);

    const [loadingExport, setLoadingExport] = useState(false);
    const [ showModalFilter, setShowModalFilter ] = useState(false);

    const dispatch = useAppDispatch();

    useEffect(() => {

        dispatch( startGetRegProfiles() );

    }, [ dispatch, page, filterSearch]);

    if( loading ){
        return( <Loading/> );
    }
    
    if(allowed.length === 0){
        return( <NoAccess/> );
    }

    const { edit, elim, nuevo, exportar } = allowed[0];

    const setChangeWindow = ( ) => {
        
        dispatch( unSetActiveProfile() );
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
                title='Perfiles'
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
                                        className="btn btn-outline-success btn-sm me-2"
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
                                            dispatch( exportDataProfiles( setLoadingExport ) );
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
                                className="btn btn-outline-success btn-sm me-2 float-end"
                                onClick={() => {
                                    dispatch ( setSearchProfile({}) ); 
                                }}
                            >
                                <FontAwesomeIcon icon={faFilter} /> 
                            </button>
                            :
                            <button
                                className="btn btn-outline-success  btn-sm me-2 float-end"
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
                                    <th scope="col">Rol</th>
                                    <th scope="col">Descripción</th>
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
                                    list.map(( item: ItemProfile, index )=>(
                                        <tr key={ index }>
                                            {<ProfileListItem 
                                                item={ item }
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
            <ProfileModalSearch
                showModal={ showModalFilter }
                setShowModal={ setShowModalFilter }
            />
        }
        </>
    )
}
