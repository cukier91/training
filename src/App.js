import './App.css';
import Users from './Users';
import UserDetail from './UserDetail';
import Countries from './Countries/Countries';
import RandM from './RandM';
import Login from './Login';
import Clients from './Clients';
import AddClient from './AddClient';
import Customers from './Customers';
import Nav from './Nav';
import EditClient from './EditClient';
import {Protected} from './Protected';
import { BrowserRouter as Routers, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {Navigate} from 'react-router-dom'


function App() {
	const user = useSelector((state) => state.auth.authToken);
	return (
		<Routers>
			<Nav />
			<Routes>
				<Route path="/" element={<Login />} />
				<Route
					path="rick"
					element={
						<Protected isLoggedIn={user}>
							<RandM />
						</Protected>
					}
				/>
				<Route path='clients' element={<Clients/>}/>
				<Route path="login" element={user===""?<Login />:<Navigate to="/countries"/>} />
				<Route path="users" element={<Protected isLoggedIn={user===""?false:true}>
							<Users />
						</Protected>} />
				<Route path="countries" element={<Countries />} />
				<Route path="add" element={<AddClient />} />
				<Route path="user" element={<UserDetail />}>
					<Route path=":userId" element={<UserDetail />} />
				</Route>
        <Route
					path="customers"
					element={
						<Protected isLoggedIn={user===""?false:true}>
							<Customers />
						</Protected>
					}
				/>
				<Route path="edit" element={<EditClient />}>
					<Route path=":clientId" element={<EditClient />} />
				</Route>
			</Routes>
		</Routers>
	);
}

export default App;
