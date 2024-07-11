import React from 'react';
import { useDispatch } from 'react-redux';
import imgLogo from '../../assets/brand/logo.jpg';

import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react';
import { AppSidebarNav } from './AppSidebarNav';

import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

import { buildMenu } from './_nav';

import logo from '../../assets/brand/logo.png';

import { setSideBar } from '../../store/slices/template';
import { useAppSelector } from '../../store/hooks';

const AppSidebar = () => {

	const dispatch    	  = useDispatch();
	const { sidebarShow } = useAppSelector( (state) => state.template );

	const handleSideBarClick = ( visible:boolean ) => {
		dispatch( setSideBar( visible ) );
	}

	const { menu }  = useAppSelector((state) => state.login)
	
	const _navval = buildMenu( menu );

	return (
		<CSidebar
			position="fixed"
			visible={sidebarShow}
			onVisibleChange={(visible) => {
				handleSideBarClick( visible )
			}}
		>
			<CSidebarBrand className="d-none d-md-flex bg-white">
			{/* <h2 className="base__logo">C4</h2> */}
			<img src={imgLogo}
            	width="68%" alt="LOGO"/>
			</CSidebarBrand>
			<CSidebarNav>
				<SimpleBar>
				<AppSidebarNav items={_navval} />
				</SimpleBar>
			</CSidebarNav>
			<CSidebarToggler />
		</CSidebar>
  )
}

export default React.memo(AppSidebar)
