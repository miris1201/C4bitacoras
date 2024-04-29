import React from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faHome, faHouse, faScrewdriverWrench, faFolderClosed } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

import { CNavGroup, CNavItem } from "@coreui/react";
import { CIconProps } from "@coreui/icons-react/dist/CIcon";
import { CNavGroupProps } from "@coreui/react/dist/components/nav/CNavGroup";

library.add(faCode, faHome, faHouse, faScrewdriverWrench, faFolderClosed);

export const buildMenu = ( menu : any ) => {

  	let objNav: Array<any> = [
		{
			component: CNavItem,
			name: "Inicio",
			to: "/",
			icon: <FontAwesomeIcon icon={'house'} className="nav-icon" />,
		},
	];
	  
    menu.forEach( ( item:any, index:number ) => {

		interface itemsIcons {
			component: React.ForwardRefExoticComponent<CNavGroupProps & React.RefAttributes<HTMLLIElement>>;
			name: string;
			to: string;
			icon?: CIconProps | string[] | undefined;
			items?: Array<any>
		}

		let itemsToAdd:Array<itemsIcons> = [];

		item._children.forEach( ( itemChild: any ) => {
			itemsToAdd.push(
				{
					component: CNavItem,
					name: itemChild.texto,
					to: itemChild.link,
				}
			 )
		});

		objNav.push(
			{
				component: CNavGroup,
				name: item.texto,
				to: "/",
				icon: <FontAwesomeIcon icon={ item.className } className="nav-icon" />,
				items: itemsToAdd
			}
		)
		
    	}		
	)
	
    return objNav;
}


