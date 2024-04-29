import React from 'react';
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
import { useAppSelector } from '../../../store/hooks';
import { startLogout } from '../../../store/slices/login';

const AppHeaderDropdown = () => {

	const dispatch = useDispatch();

	const { name } = useAppSelector( state => state.login );

	const handleLogOut = () => {
		dispatch( startLogout() );
	}
	
	const handleShowModalDataUser = () => {
	}

	return (
		<CDropdown variant="nav-item">
			<CDropdownToggle 
				className="py-0" 
				caret={false}>
				<strong className="me-2">{ name }</strong>
				<CAvatar src={avatar8} size="md" />
			</CDropdownToggle>
			<CDropdownMenu 
				className="pt-0" 
				placement="bottom-end">
				<CDropdownHeader 
					className="bg-dark py-3">
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
	)
}

export default AppHeaderDropdown
