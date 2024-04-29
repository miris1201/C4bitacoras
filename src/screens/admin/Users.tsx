import { FC, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setShowList } from '../../store/slices/transaction';
import { UserList } from '../../components/admin/users/UserList';
import { UserFrm } from '../../components/admin/users/UserFrm';

const Users: FC = (): JSX.Element => {

    const { showList } = useAppSelector((state) => state.transaction);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch( setShowList(true) );
    }, [ dispatch ]);

    return (
        ( showList ) 
        ? <UserList/>
        : <UserFrm />
    )
}

export default Users;