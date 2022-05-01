import React from 'react';
import './Nav.css';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from './redux/authSlice';
import bg from './img/user-circle.png';
export default function Nav() {
  const dispatch = useDispatch()
	const user = useSelector((state) => state.auth.authToken);
	return (
		<div className="nav">
      <Link to={'/customers'}>
				<h2>Customers</h2>
			</Link>
			<Link to={'/clients'}>
				<h2>Clients</h2>
			</Link>
			<Link to={'/users'}>
				<h2>Użytkownicy</h2>
			</Link>
			<Link to={'/countries'}>
				<h2>Kraje</h2>
			</Link>
			<Link to={'/rick'}>
				<h2>Rick & Morty</h2>
			</Link>
		{	user===""?(<Link to={'/login'}>
				<h2 type="button">Login</h2>
			</Link>):(<Link to="/login"><h2 onClick={() => {dispatch(logout())}}>Logout</h2></Link>)}
			<div className='user-welcome'>
				<img className="img-user" src={bg} alt="user" />
				{user === '' ? null : <h3>{`Welcome ${user} !`}</h3>}
			</div>
		</div>
	);
}
