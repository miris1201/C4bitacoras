import { FC, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setShowList } from '../../store/slices/transaction';
import { ProfileList } from '../../components/admin/profiles/ProfileList';
import { ProfileFrm } from '../../components/admin/profiles/ProfileFrm';

const Profiles: FC = (): JSX.Element => {

    const { showList } = useAppSelector((state) => state.transaction);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch( setShowList(true) );
    }, [ dispatch ]);

    return (
        ( showList ) 
        ? <ProfileList/>
        : <ProfileFrm />
    )
}

export default Profiles;