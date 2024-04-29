
import { useSelector, useDispatch } from 'react-redux';
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderNav,
  CHeaderToggler,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilMenu } from '@coreui/icons';

import { AppHeaderDropdown } from './header/index';
import { RootState } from '../../store/store';
import { setSideBar } from '../../store/slices/template';

const AppHeader = () => {

	const dispatch = useDispatch();
	const { sidebarShow } = useSelector((state: RootState) => state.template);
	
	const handleSideBarClick = () => {
		dispatch( setSideBar( !sidebarShow ) );
	}

	return (
		<CHeader position="sticky" className="mb-4">
			<CContainer fluid>
				<CHeaderToggler
					className="ps-1"
					onClick={ handleSideBarClick }
				>
					<CIcon icon={cilMenu} size="lg" />
				</CHeaderToggler>
				<CHeaderBrand className="mx-auto d-md-none">
					
				</CHeaderBrand>
				<CHeaderNav className="ms-3">
					<AppHeaderDropdown />
				</CHeaderNav>
			</CContainer>
		</CHeader>
	)
}

export default AppHeader
