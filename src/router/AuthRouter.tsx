import { CContainer, CSpinner } from "@coreui/react";
import { FC, Suspense, lazy } from "react";
import { useRoutes } from "react-router-dom";

import { AppFooter, AppHeader, AppSidebar } from "../components/ui";
import { Loading } from "../components/ui/UserInterface";

const Users = lazy(() => import('../screens/admin/Users'));
const Profiles = lazy(() => import('../screens/admin/Profiles'));
const Home = lazy(() => import('../screens/Home'));
const Operadores = lazy(() => import('../screens/catalogos/Operadores'));

const App: FC = (): JSX.Element => {
	let routes = useRoutes([
		{ path: "/", element: <Home /> },
		{ path: "/users", element: <Users /> },
		{ path: "/rol", element: <Profiles /> },
		{ path: "/operadores", element: <Operadores /> },
	]);
	return <>{routes}</>;
};

export const AuthRouter = () => {
	return (
		<div>
			<AppSidebar />
			<div className="wrapper d-flex flex-column min-vh-100 bg-light">
				<AppHeader />
				<div className="body flex-grow-1 px-3">
					<CContainer>
						<Suspense fallback={<Loading/>}>
							<App />
						</Suspense>
					</CContainer>
				</div>
				<AppFooter />
			</div>
		</div>
	);
};
