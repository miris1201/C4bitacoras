import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { CContainer, CSpinner } from '@coreui/react';

const AppContent = () => {
  return (
    <CContainer lg>
		<Suspense fallback={<CSpinner color="primary" />}>
			<BrowserRouter>
			</BrowserRouter>
		</Suspense>
	</CContainer>
  )
}

export default React.memo(AppContent)
