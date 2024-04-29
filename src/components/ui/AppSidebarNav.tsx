import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import PropTypes from 'prop-types'

import { CBadge } from '@coreui/react'

interface AppSidebarValues {
  items: Array<any>;
}

export const AppSidebarNav = ({ items }: AppSidebarValues) => {

	const location = useLocation()
	const navLink = (name : string, icon : string, badge:any) => {

		return (
		<>
			{icon && icon}
			{name && name}
			{badge && (
			<CBadge color={badge.color} className="ms-auto">
				{badge.text}
			</CBadge>
			)}
		</>
		)
	}

	const navItem = (item:any, index: number) => {
		const { component, name, badge, icon, ...rest } = item
		const Component = component
		return (
			<Component
				{...(rest.to &&
				!rest.items && {
					component: NavLink,
				})}
				key={index}
				{...rest}
			>
				{navLink(name, icon, badge)}
			</Component>
		)
	}

	const navGroup = (item:any, index: number) => {

		const { component, name, icon, to, ...rest } = item

		const Component = component

		return (
		<Component
			idx={String(index)}
			key={index}
			toggler={navLink(name, icon, '')}
			visible={location.pathname.startsWith(to)}
			{...rest}
		>
			{item.items?.map((item:any, index:number) =>
			item.items ? navGroup(item, index) : navItem(item, index),
			)}
		</Component>
		)
	}

	return (
		<React.Fragment>
		{items &&
			items.map((item:any, index:number) => (item.items ? navGroup(item, index) : navItem(item, index)))}
		</React.Fragment>
	)
}

AppSidebarNav.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
}
