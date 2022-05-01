import React from 'react';
import { Navigate } from 'react-router-dom';

export function Protected({ isLoggedIn, children }) {
	if (!isLoggedIn) {
		return <Navigate to="/login" replace />;
	}
    
    return children;
};

// const useProtected=()=>{
// 	const user = useSelector((state) => state.auth.authToken);
	
// 	if (!user) {
// 		return <Navigate to="/login" replace />;
// 	}
// }
