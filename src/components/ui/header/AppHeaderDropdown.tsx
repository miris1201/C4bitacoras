import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  CAvatar,
  CDropdown,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  cilUser,
  cilAccountLogout
} from '@coreui/icons';
import CIcon from '@coreui/icons-react';

import avatar8 from '../../../assets/images/avatars/avatar.png';
import avatarf from '../../../assets/images/avatars/avatar2.png';
import avatarm from '../../../assets/images/avatars/avatar5.png';
import { useAppSelector } from '../../../store/hooks';
import { startLogout } from '../../../store/slices/login';
import { AccountModalForm } from '../AccountModalForm';


const AppHeaderDropdown = () => {

	const dispatch = useDispatch();

	const { name, systemOptions } = useAppSelector( state => state.login );
	const [showModalAccount, setShowModalAccount] = useState(false);

	const { sexo } = systemOptions;

	const handleLogOut = () => {
		dispatch( startLogout() );
	}
	
	const handleShowModalDataUser = () => {
		setShowModalAccount(true);
		
	}

	return (
		<>
		<CDropdown variant="nav-item">
			<CDropdownToggle 
				className="py-0" 
				caret={false}>
				<strong className="me-2">{ name }</strong>
				<CAvatar src={(sexo == 1) ? avatarf : avatarm } size="md" />
			</CDropdownToggle>
			<CDropdownMenu 
				className="pt-0" >
				<CDropdownHeader 
					className="py-3">
					Preferencias
				</CDropdownHeader>
					<CDropdownItem 
						onClick={ handleShowModalDataUser }>
						<CIcon 
							icon={ cilUser } 
							className="me-2" />
						Perfil
					</CDropdownItem>
					<CDropdownItem 
						onClick={ handleLogOut }>
						<CIcon 
							icon={ cilAccountLogout } 
							className="me-2" 
						/>
						Salir
					</CDropdownItem>
			</CDropdownMenu>
		</CDropdown>
		{
			(showModalAccount) &&
			<AccountModalForm
                showModal={ showModalAccount }
                setShowModal={ setShowModalAccount }
            />
		}
		</>
	)
}

export default AppHeaderDropdown
